const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')

const { calculateDamageAdvanced } = require('./utils/pvp')
const express = require("express")
const QRCode = require("qrcode")

console.log('Bot starting...')

const mongoose = require('mongoose')
const bosses = require('./bosses')
const getRank = require('./utils/rank')
const { getSkillDamage } = require('./utils/skills')
const Boss = require('./models/Boss')
const { getTotalStats } = require('./utils/stats')
const { generateEquipmentShop } = require('./systems/shopSystem')
const Player = require('./models/Player')
const Market = require('./models/Market')
const Shop = require('./models/Shop')

// شحن الشخصيات مرة واحدة
const characters = require('./characters.json')

if (!global.shopStarted) {
    global.shopStarted = true
    setInterval(async () => {
        try {
            const shopItems = generateEquipmentShop()
            await Player.updateMany({}, {
                $set: {
                    "shop.items": shopItems,
                    "shop.lastRefresh": Date.now()
                }
            })
            console.log("🏪 Shop refreshed")
        } catch (e) {
            console.log("Shop refresh error:", e)
        }
    }, 24 * 60 * 60 * 1000) // كل 24 ساعة
}

const abilityIcons = {
    attack: "⚔️",
    defense: "🛡️",
    crit: "🎯",
    dodge: "💨",
    reflect: "🪞",
    lifesteal: "🩸",
    bossDamage: "👑",
    freeze: "❄️",
    stun: "💫",
    ultimate: "🌟"
}

// دالة توليد متجر الشخصيات الموحدة
async function generateCharacterShop() {
    try {
        const rarities = [
            { name: 'عادي', chance: 50 },
            { name: 'ممتاز', chance: 30 },
            { name: 'اسطوري', chance: 15 },
            { name: 'SSS', chance: 5 }
        ]

        function getRandomRarity() {
            let rand = Math.random() * 100
            let sum = 0
            for (const r of rarities) {
                sum += r.chance
                if (rand <= sum) return r.name
            }
            return 'عادي'
        }

        const oldShop = await Shop.findOne()
        if (oldShop) {
            const age = Date.now() - oldShop.createdAt
            if (age < 60 * 60 * 1000) return await Shop.find()
        }

        let shopItems = []
        for (let i = 0; i < 5; i++) {
            const rarity = getRandomRarity()
            const pool = characters.filter(c => c.rarity === rarity)
            if (!pool.length) continue

            const character = pool[Math.floor(Math.random() * pool.length)]
            const priceMultiplier = { 'عادي': 1000, 'ممتاز': 3000, 'اسطوري': 8000, 'SSS': 20000 }
            const price = priceMultiplier[rarity] + Math.floor(Math.random() * 1000)

            shopItems.push({ character, price })
        }

        await Shop.deleteMany({})
        await Shop.insertMany(shopItems)
        return shopItems
    } catch (err) {
        console.error("Error in generateCharacterShop:", err)
    }
}

generateCharacterShop().catch(console.error)

setInterval(async () => {
    try {
        await generateCharacterShop()
        console.log('✅ Shop refreshed')
    } catch (err) {
        console.log('❌ Shop refresh error:', err)
    }
}, 60 * 60 * 1000)

let currentBoss = null
const ABILITY_CHANCE = 30

const levelAbilities = {
    5: { name: "👁️ شارينغان", type: "crit", value: 5, description: "5% ضربة حرجة إضافية" },
    10: { name: "🛡️ صلابة الحديد", type: "defense", value: 5, description: "تقليل الضرر 5%" },
    15: { name: "⚔️ عين الصقر", type: "crit", value: 5, description: "زيادة فرصة الضربة الحرجة" },
    20: { name: "🔥 لهب التنين", type: "reflect", value: 5, description: "إرجاع 5% من الضرر" },
    25: { name: "🌑 رينيغان", type: "lifesteal", value: 5, description: "استعادة 5% من الضرر" },
    30: { name: "💀 سوسانو", type: "attack", value: 10, description: "زيادة الهجوم 10%" },
    35: { name: "🦅 غرائز المقاتل", type: "dodge", value: 10, description: "زيادة المراوغة 10%" },
    40: { name: "👑 هاكي الملك", type: "stun", value: 5, description: "5% شل الخصم" },
    45: { name: "🐉 تنين الأساطير", type: "bossDamage", value: 10, description: "ضرر إضافي ضد الزعيم" },
    50: { name: "☄️ قوة الكواكب", type: "attack", value: 15, description: "زيادة الهجوم 15%" },
    55: { name: "❄️ تجميد الزمن", type: "freeze", value: 5, description: "5% تجميد الخصم" },
    60: { name: "⚔️ سيد المعارك", type: "crit", value: 10, description: "10% ضربة حرجة" },
    65: { name: "🛡️ درع العمالقة", type: "defense", value: 10, description: "تقليل الضرر 10%" },
    70: { name: "🌋 غضب البركان", type: "reflect", value: 10, description: "عكس 10% من الضرر" },
    75: { name: "👹 قوة الشياطين", type: "attack", value: 20, description: "زيادة الهجوم 20%" },
    80: { name: "🌌 بوابة الأبعاد", type: "dodge", value: 15, description: "15% مراوغة" },
    85: { name: "🌩️ سيد العواصف", type: "reflect", value: 15, description: "يعكس 15% من الضرر على الخصم" },
    90: { name: "💎 الجسد الماسي", type: "defense", value: 15, description: "تقليل الضرر 15%" },
    95: { name: "🔥 ملك الجحيم", type: "lifesteal", value: 15, description: "استعادة 15% من الضرر" },
    100: { name: "🌟 الحاكم المطلق", type: "ultimate", value: 25, description: "زيادة جميع الإحصائيات 25%" }
}

const towerFloors = [
    { floor: 1, power: 100, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 2, power: 200, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 3, power: 300, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 4, power: 400, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 5, power: 500, image: "https://i.ibb.co/S7MYnHwK/d3e32f445a48b03ce66a6a0263c82209.jpg" },
    { floor: 6, power: 600, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 7, power: 700, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 8, power: 800, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 9, power: 900, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 10, power: 1000, image: "https://i.ibb.co/wZSxYGwB/daaf196974a336df16b38316cf1a92fe.jpg" },
    { floor: 11, power: 1100, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 12, power: 1200, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 13, power: 1300, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 14, power: 1400, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 15, power: 1500, image: "https://i.ibb.co/Kx32GkHX/12293457284af38fb6b88758031744fb.jpg" },
    { floor: 16, power: 1600, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 17, power: 1700, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 18, power: 1800, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 19, power: 1900, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 20, power: 2500, image: "https://i.ibb.co/wZSxYGwB/daaf196974a336df16b38316cf1a92fe.jpg" },
    { floor: 21, power: 2100, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 22, power: 2200, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 23, power: 2300, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 24, power: 2400, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 25, power: 3500, image: "https://i.ibb.co/G3NnF7YC/46d1f696c88e983ee8524cc2b4b117b4.jpg" },
    { floor: 26, power: 2600, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 27, power: 2700, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 28, power: 2800, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 29, power: 2900, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 30, power: 5000, image: "https://i.ibb.co/JRK1vHjm/e06dcfcff98f3cc474e6c330375386c6.jpg" }
];

function getTowerReward(floor) {
    switch (floor) {
        case 1: case 2: case 3: case 4: return { draws: 1, xp: 100 }
        case 5: return { money: 500, xp: 500, box: 'basic' }
        case 6: case 7: case 8: case 9: return { draws: 1, xp: 150 }
        case 10: return { money: 1000, xp: 1000, box: 'rare' }
        case 11: case 12: case 13: case 14: return { draws: 1, xp: 200 }
        case 15: return { money: 1500, xp: 2000, box: 'epic' }
        case 16: case 17: case 18: case 19: return { draws: 1, xp: 300 }
        case 20: return { money: 2000, xp: 3000, box: 'legendary' }
        case 21: case 22: case 23: case 24: return { draws: 1, xp: 400 }
        case 25: return { money: 3000, xp: 5000, box: 'sss_chance' }
        case 26: case 27: case 28: case 29: return { draws: 1, xp: 500 }
        case 30: return { money: 4000, xp: 10000, box: 'sss_high', title: '👑 ملك الأبطال' }
        default: return null
    }
}

function getRandomCharacterByBox(boxType) {
    let pool = []
    switch (boxType) {
        case 'basic': pool = characters.filter(c => c.rarity === 'عادي' || c.rarity === 'ممتاز'); break;
        case 'rare': pool = characters.filter(c => c.rarity === 'عادي' || c.rarity === 'ممتاز' || c.rarity === 'أسطوري'); break;
        case 'epic': pool = characters.filter(c => c.rarity === 'ممتاز' || c.rarity === 'أسطوري'); break;
        case 'legendary': pool = characters.filter(c => c.rarity === 'أسطوري'); break;
        case 'sss_chance': pool = Math.random() < 0.05 ? characters.filter(c => c.rarity === 'SSS') : characters.filter(c => c.rarity === 'أسطوري'); break;
        case 'sss_high': pool = Math.random() < 0.30 ? characters.filter(c => c.rarity === 'SSS') : characters.filter(c => c.rarity === 'أسطوري'); break;
    }
    return pool[Math.floor(Math.random() * pool.length)]
}

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('MongoDB Error:', err))

const playersFile = './players.json'
const marketFile = './market.json'

const app = express()
let qrCodeData = ""

app.get("/", (req, res) => {
    if (qrCodeData) {
        res.send(`<html><body style="background:#111;display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;color:white;font-family:sans-serif;"><h2>امسح QR لتشغيل البوت</h2><img src="${qrCodeData}" width="300" /></body></html>`)
    } else {
        res.send(`<html><body style="background:#111;color:white;display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;"><h2>البوت متصل بالفعل ✅</h2></body></html>`)
    }
})

app.listen(process.env.PORT || 3000, () => { console.log("Server running") })

const animeNames = [
    'لوفي','زورو','نامي','سانجي','اوسوب','تشوبر','روبين','فرانكي','بروك','جينبي','شانكس','إيس','سابو','لاو','ميهوك','دوفلامينغو','كايدو','بيغ مام','كروكودايل','سموكر','كيزارو','أوكيجي','أكاينو','باغي','بيرونا','هانكوك','ياماتو','كاتاكوري','كيد','كيلر','هوكينز','دريك','بوني','كوبي','غارب','سينغوكو','رايلي','نيوغيت','ماركو','جوزو','فيستا','تيتش','اينيل','لوتشي','كاكو','كاليفا','موريا','سيزار','فيغابانك','كينيمون','مومونوسكي','أودين','كوين','كينغ','جاك','أوروتشي','هيوري','ريبيكا','فيفي','كاروت','بيدرو','ألبيدا','كورينا','بيبو','شيراهوشي','أرلونغ','هاتشي','باولي','فوكسي',
    'كونان','ران','كوغورو','هايبرا','أغاسا','هيجي','كايتو','ساتو','تاكاغي','تشيبا','ميغوري','جين','فودكا','فيرموث','بوربون','كير','شوكيتشي','ماري','ماسومي','أكاي','يوساكو','يوكو','ميتسوهيكو','غينتا','أيومي','سيرا','جودي','كازوها','موميجي','شينتشي','واكاسا','روم','ري','أزوسا','سوبارو','أكيمي','أتسوشي','ماكوتو','يامامورا',
    'غوكو','فيجيتا','غوهان','ترانكس','غوتين','بيكولو','فريزا','سيل','بوو','بيروس','ويس','برولي','جيرين','هيت','كابا','كايل','كاليفلا','زينو','باردوك','راديتز','نابا','كريلين','تشاوزو','بولما','فيديل','بان','بلاك','زاماسو','تورليس','فيجيتو','ساتان',
    'إيتشيغو','روكيا','أوريهيمي','تشاد','أوريو','bياكويا','رينجي','توشيرو','أيزن','جين','إيكاكو','زاراكي','ياتشيرو','أونوهانا','مايوري','نيمو','سويفون','يورويتشي','كيسكي','شينجي','غريمجو','ألكيورا','نيل','ستارك','هاليبال','باراغان','نويتورا','زوماري','يامي','بامبي','جوغرام','يوهاباخ',
    'تانجيرو','نيزوكو','زينيتسو','إينوسكي','غيو','شينوبو','رينغوكو','أوزوي','ميتسوري','موشيرو','أوباناي','سانيمي','غيومي','كاغايا','أكازا','دوما','كوكوشيبو','موزان','روي','غيوكو','داكي','غيوتارو','كاناو','غينيا','ماكومو','سابيتو','يوشيرو','تامايو','اوي',
    'يوجي','ميغومي','نوبارا','غوجو','سوكونا','غيتو','يوتا','ماكي','توجي','نانامي','مي مي','تشوسو','ماهيتو','هانامي','داغون','إينوماكي','باندا','هاكاري','كاشيمو','هيغورو','كينجاكو','يوكي','تودو','ميوا','مومو',
    'إيرين','ميكاسا','أرمين','ليفاي','هانجي','إروين','راينر','بيرتولت','آني','زيك','بيك','غابي','فالكو','جان','كوني','ساشا','هيستوريا','يومير','فلوك',
    'ناتسو','لوسي','غراي','إيرزا','ويندي','جيلال','غاجيل','ليفي','ماكاروف','ميراجين','لاكسوس','كانا','فريد','إلفمان','ليسانا','بانثرلي','شارلي','روغ','ستينغ','يوكينو','كاغورا','أولتير','زيريف','مايفيس','أكنولوغيا',
    'غون','كيلوا','كورابيكا','ليوريو','هيسوكا','إيلومي','كرولو','فيتان','فينكس','نوبوناغا','شالنارك','باكونودا','بيسكيت','كايتو','ميرويم','بيتو','بوف','يوبي',
    'ناروتو','ساسكي','ساكورا','كاكاشي','إيتاتشي','مادارا','أوبيتو','هاشيراما','توبيراما','هيروزين','ميناتو','كوشينا','جيرايا','تسونادي','أوروتشيمارو','غارا','نيجي','روك لي','تن تن','شينو','كيبا','هيناتا','تيماري','ساي','ياماتو','كيلر بي','ديدارا','ساسوري','كيسامي','كونان','باين','ناغاتو','كاغويا','بوروتو','سارادا','ميتسوكي','كاواكي',
    'ديكو','باكوغو','شوتو','أوراراكا','تسويو','مومو','كيريشيما','يامي','دينجي','آيزاوا','أول مايت','شينسو','هوكس','إنديفور','توغا','شيغاراكي','ستاين','ميريو','تاماكي','نيجيري',
    'جينتوكي','شينباتشي','كاغورا','هاسيغاوا','تاكاساغي','كاتسورا','أوكيتا','هيجيكاتا','كوندو','كاموي',
    'سايتاما','جينوس','تاتسوماكي','بانغ','fوبوكي','جارو','سونيك','بوروس','كينغ','مومن رايدر',
    'ميليوداس','بان','كينغ','ديان','إليزابيث','إسكانور','ميرلين','غوثر','زيلدريس','إستاروسا',
    'ريمورو','شونا','شيون','بينيمارو','fيلدورا','ميلم',
    'أكوا','ميغومين','داركنيس','كازوما',
    'سوبارو','إيميليا','ريم','رام','بياتريس','أوتو','يوليوس','راينهارد',
    'إيسديث','تاتسومي','أكامي','ليون','شيلسي','بولات','كورومي',
    'ليلوك','سوزاكو','سي سي',
    'شويا','ناغيسا','كارما','كورو سينسي',
    'تاكيميتشي','مايكي','دراكن','باجي','تشيفويو','كازوتورا','كيساكي','هانما','إيزانا','كاكوتشو','إينوي','كوكو','تايجو','هاكاي','يوزوها','هينا'
]
let namesCount = 1

async function spawnBoss(sock, groupId) {
    if (bosses.length === 0) return
    currentBoss = { ...bosses[Math.floor(Math.random() * bosses.length)] }
    await Boss.deleteMany({})
    await Boss.create(currentBoss)
    await sock.sendMessage(groupId, {
        text: `🔥 ظهر زعيم عالمي جديد!\n\n👑 ${currentBoss.name}\n\n❤️ ${currentBoss.hp}/${currentBoss.maxHp}\n\n⚔️ استخدم .زعيم للمعلومات\n🗡️ استخدم .هجوم للمشاركة`
    })
}

// تشغيل البوت الرئيسي
async function startBot() {
    const savedBoss = await Boss.findOne()
    if (savedBoss) {
        currentBoss = savedBoss
        console.log('✅ تم تحميل الزعيم المحفوظ')
    }

    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({ auth: state })

    sock.ev.on('creds.update', saveCreds)

    const safeSend = async (jid, data) => {
        try { return await sock.sendMessage(jid, data) } catch (e) { console.log('Send error:', e) }
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, qr } = update
        if (qr) qrCodeData = await QRCode.toDataURL(qr)
        if (connection === 'open') {
            console.log('البوت اشتغل')
            const GROUP_ID = "120363020823525909@g.us"
            await spawnBoss(sock, GROUP_ID)
            setInterval(async () => {
                if (!currentBoss) await spawnBoss(sock, GROUP_ID)
            }, 60 * 60 * 1000)
        }
        if (connection === 'close') {
            console.log('انقطع الاتصال')
            setTimeout(() => { startBot() }, 5000)
        }
    })

    // استقبال الرسائل والأوامر
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg?.message) return

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text
        if (!text) return

        const userId = msg.key.participant || msg.key.remoteJid

        // .بوت
        if (text.startsWith('.بوت')) {
            await safeSend(msg.key.remoteJid, { text: '🤖 البوت يعمل بنجاح' })
        }

        // .صوره
        if (text === '.صوره') {
            const folderPath = './images'
            if (!fs.existsSync(folderPath)) return safeSend(msg.key.remoteJid, { text: 'المجلد غير موجود' })
            const files = fs.readdirSync(folderPath)
            if (files.length === 0) return sock.sendMessage(msg.key.remoteJid, { text: 'لا توجد صور' })
            const randomImage = files[Math.floor(Math.random() * files.length)]
            const imagePath = path.join(folderPath, randomImage)
            await sock.sendMessage(msg.key.remoteJid, { image: fs.readFileSync(imagePath) })
        }

        // .البرج
        if (text === '.البرج') {
            let player = await Player.findOne({ userId })
            if (!player) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا تملك حساباً' })

            if (player.towerCompleted) {
                return sock.sendMessage(msg.key.remoteJid, {
                    text: `👑 لقد أكملت برج الأبطال\n\n🏆 اللقب: ${player.title}\n\n🏰 الطابق: 30/30\n\n⚔️ هجوم إضافي: ${player.attackBonus || 0}%\n🛡️ دفاع إضافي: ${player.defenseBonus || 0}%\n❤️ صحة إضافية: ${player.hpBonus || 0}%\n⚡ سرعة إضافية: ${player.speedBonus || 0}%`
                })
            }

            const floor = towerFloors.find(f => f.floor === player.towerFloor)
            if (!floor) return

            return sock.sendMessage(msg.key.remoteJid, {
                image: { url: floor.image },
                caption: `🏰 برج الأبطال\n\n📍 الطابق الحالي: ${floor.floor}/30\n\n⚔️ القوة المطلوبة:\n${floor.power}\n\n👥 الشخصيات المستخدمة:\n${player.usedCharacters?.length || 0}/30\n\n🏆 اللقب النهائي:\n👑 ملك الأبطال\n\nاستعمل:\n.طابق ${player.towerFloor} رقم_الشخصية`
            })
        }

        // .resetall
        if (text === '.resetall') {
            try {
                await Player.updateMany({}, {
                    $set: {
                        level: 1, xp: 0, attackBonus: 0, defenseBonus: 0, critBonus: 0, dodgeBonus: 0,
                        reflectBonus: 0, lifestealBonus: 0, bossDamageBonus: 0, specialAbilities: [], bonusAppliedLevels: []
                    }
                })
                return sock.sendMessage(msg.key.remoteJid, { text: '✅ تم تصفير جميع اللاعبين إلى لفل 1' })
            } catch (err) {
                return sock.sendMessage(msg.key.remoteJid, { text: '❌ حدث خطأ أثناء التصفير' })
            }
        }

        // .صوت
        if (text === '.صوت') {
            const folderPath = './audio'
            if (!fs.existsSync(folderPath)) return
            const files = fs.readdirSync(folderPath)
            if (files.length === 0) return sock.sendMessage(msg.key.remoteJid, { text: 'لا توجد صوتيات' })
            const randomAudio = files[Math.floor(Math.random() * files.length)]
            await sock.sendMessage(msg.key.remoteJid, { audio: fs.readFileSync(path.join(folderPath, randomAudio)), mimetype: 'audio/mpeg', ptt: false })
        }

        // .اصوات
        if (text === '.اصوات') {
            const folderPath = './sounds'
            if (!fs.existsSync(folderPath)) return
            const files = fs.readdirSync(folderPath)
            if (files.length === 0) return sock.sendMessage(msg.key.remoteJid, { text: 'لا توجد اصوات' })
            const randomAudio = files[Math.floor(Math.random() * files.length)]
            await sock.sendMessage(msg.key.remoteJid, { audio: fs.readFileSync(path.join(folderPath, randomAudio)), mimetype: 'audio/mpeg', ptt: false })
        }

        // أوامر الأسماء
        if (text === '.اسم') { namesCount = 1; return sock.sendMessage(msg.key.remoteJid, { text: '*تم تغيير .كت إلى اسم واحد*' }) }
        if (text === '.اسمين') { namesCount = 2; return sock.sendMessage(msg.key.remoteJid, { text: '*تم تغيير .كت إلى اسمين*' }) }
        if (text === '.ثلاث') { namesCount = 3; return sock.sendMessage(msg.key.remoteJid, { text: '*تم تغيير .كت إلى 3 أسماء*' }) }

        // .سوق المعدات
        if (text.startsWith('.سوق المعدات')) {
            const player = await Player.findOne({ userId })
            if (!player) return
            const DAY = 24 * 60 * 60 * 1000
            const needRefresh = !player.shop.lastRefresh || Date.now() - player.shop.lastRefresh >= DAY || !player.shop.items.length

            if (needRefresh) {
                const shopItems = generateEquipmentShop()
                player.shop.items = shopItems
                player.shop.lastRefresh = Date.now()
                await player.save()
            }

            let shopText = `🏪 *سوق المعدات للمقاتلين* 🏪\n\n`
            player.shop.items.forEach((item, i) => {
                shopText += `*#${i + 1}* 🗡️ *الاسم:* ${item.name}\n⭐ *الندرة:* ${item.rarity}\n💰 *السعر:* ${item.price} عملة\n━━━━━━━━━━━━━━━\n`
            })
            const nextRefresh = Math.max(0, DAY - (Date.now() - player.shop.lastRefresh))
            shopText += `\n🕒 *التجديد بعد:* ${Math.floor(nextRefresh / 3600000)} ساعة`
            return sock.sendMessage(msg.key.remoteJid, { text: shopText })
        }

        // .شراء_معدات
        if (text.startsWith('.شراء_معدات')) {
            const num = parseInt(text.split(' ')[1]) - 1
            const player = await Player.findOne({ userId })
            if (!player || !player.shop?.items?.[num]) return
            const item = player.shop.items[num]

            if (player.money < item.price) return sock.sendMessage(msg.key.remoteJid, { text: '❌ ما عندك فلوس كافية' })
            player.money -= item.price
            player.inventory.push(item)
            await player.save()
            return sock.sendMessage(msg.key.remoteJid, { text: `✅ تم شراء ${item.name}` })
        }

        // .تركيب
        if (text === '.تركيب') {
            const player = await Player.findOne({ userId })
            if (!player || !player.inventory.length) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا يوجد معدات' })
            let textMsg = `⚔️ اختر رقم لتجهيز المعدة:\n\n`
            player.inventory.forEach((item, i) => {
                textMsg += `#${i + 1}\n🗡️ ${item.name}\n🎚️ ${item.type}\n⭐ ${item.rarity}\n━━━━━━━━━━━\n`
            })
            textMsg += `\n📌 الاستخدام:\n.لبس رقم نوع\n\nمثال:\n.لبس 1 weapon`
            return sock.sendMessage(msg.key.remoteJid, { text: textMsg })
        }

        // .لبس
        if (text.startsWith('.لبس')) {
            const args = text.split(' ')
            const index = parseInt(args[1]) - 1
            const type = args[2]
            const player = await Player.findOne({ userId })
            if (!player) return
            const item = player.inventory?.[index]
            if (!item) return sock.sendMessage(msg.key.remoteJid, { text: '❌ رقم غير صحيح' })
            if (item.type !== type) return sock.sendMessage(msg.key.remoteJid, { text: `❌ هذه ليست ${type}` })

            player.equipment = player.equipment || {}
            player.equipment[type] = item
            await player.save()
            return sock.sendMessage(msg.key.remoteJid, { text: `✅ تم تجهيز ${item.name} في ${type}` })
        }

        // قتال PVP مهارات وحالات
        if (text.startsWith('.قتال pvp')) {
            const attacker = await Player.findOne({ userId })
            const defenderJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
            if (!attacker) return safeSend(msg.key.remoteJid, { text: '❌ لا تملك حساب' })
            if (!defenderJid) return safeSend(msg.key.remoteJid, { text: '❌ مثال: .قتال pvp @user' })
            const defender = await Player.findOne({ userId: defenderJid })
            if (!defender) return safeSend(msg.key.remoteJid, { text: '❌ اللاعب غير موجود' })
            if (attacker.userId === defender.userId) return safeSend(msg.key.remoteJid, { text: '❌ لا يمكنك قتال نفسك' })

            const now = Date.now()
            if (attacker.lastPvP && now - attacker.lastPvP < 30000) return safeSend(msg.key.remoteJid, { text: '⏳ انتظر 30 ثانية' })
            attacker.lastPvP = now

            const aEq = attacker.equipment || {}
            const dEq = defender.equipment || {}
            const aStats = { hp: attacker.hp || 10000, attack: (attacker.attack || 500) + (aEq.weapon?.attack || 0), crit: (attacker.crit || 5) + (aEq.accessory?.crit || 0), dodge: (attacker.dodge || 3) + (aEq.accessory?.dodge || 0), burn: 0, bleed: 0, stun: 0 }
            const dStats = { hp: defender.hp || 10000, attack: (defender.attack || 500) + (dEq.weapon?.attack || 0), crit: (defender.crit || 5) + (dEq.accessory?.crit || 0), dodge: (defender.dodge || 3) + (dEq.accessory?.dodge || 0), burn: 0, bleed: 0, stun: 0 }

            let aHP = aStats.hp, dHP = dStats.hp
            let log = `⚔️ PvP بدأ!\n@${attacker.userId.split('@')[0]} VS @${defender.userId.split('@')[0]}\n`
            let turn = 1, turnAttacker = true

            function getSkill() { const r = Math.random(); return r > 0.85 ? "ultimate" : r > 0.55 ? "skill" : "normal" }
            function applyStatus(target, skill) {
                if (skill === "skill" && Math.random() < 0.3) target.burn = 2
                if (skill === "ultimate") {
                    if (Math.random() < 0.3) target.stun = 1
                    if (Math.random() < 0.2) target.bleed = 3
                }
            }

            while (aHP > 0 && dHP > 0) {
                log += `\n🔁 الدور ${turn}\n`
                let atk = turnAttacker ? aStats : dStats
                let def = turnAttacker ? dStats : aStats
                let defHP = turnAttacker ? dHP : aHP

                if (atk.burn > 0) { defHP -= 80; atk.burn--; log += `🔥 Burn damage!\n` }
                if (atk.bleed > 0) { defHP -= 120; atk.bleed--; log += `🩸 Bleed damage!\n` }
                if (atk.stun > 0) { atk.stun--; log += `💫 Stunned - skip turn\n`; turnAttacker = !turnAttacker; turn++; continue }

                if (Math.random() * 100 < def.dodge) {
                    log += `💨 تفادى الضربة!\n`
                } else {
                    let skill = getSkill()
                    let damage = atk.attack
                    if (skill === "skill") damage *= 1.5
                    if (skill === "ultimate") damage *= 2.5
                    if (Math.random() * 100 < atk.crit) { damage *= 2; log += `🔥 CRIT!\n` }
                    defHP -= Math.floor(damage)
                    applyStatus(def, skill)
                    log += `⚔️ ${skill.toUpperCase()} - ${Math.floor(damage)} dmg\n`
                }

                if (turnAttacker) dHP = defHP; else aHP = defHP;
                turnAttacker = !turnAttacker
                turn++
            }

            const winner = aHP > 0 ? attacker : defender
            const loser = aHP > 0 ? defender : attacker
            winner.wins = (winner.wins || 0) + 1
            loser.losses = (loser.losses || 0) + 1
            winner.mmr = (winner.mmr || 0) + 25
            loser.mmr = Math.max(0, (loser.mmr || 0) - 15)
            attacker.rank = getRank(attacker.mmr)
            defender.rank = getRank(defender.mmr)

            await attacker.save()
            await defender.save()

            return safeSend(msg.key.remoteJid, { text: `⚔️ انتهى القتال!\n\n🏆 الفائز: @${winner.userId.split('@')[0]}\n\n📊 النتائج:\n🥇 ${attacker.userId.split('@')[0]}: ${attacker.rank} (${attacker.mmr})\n🥈 ${defender.userId.split('@')[0]}: ${defender.rank} (${defender.mmr})\n\n🔥 PvP مطور بنظام مهارات + حالات` })
        }

        // .اشرح pvp
        if (text.startsWith('.اشرح pvp')) {
            const explanation = `⚔️ شرح نظام PvP (المطور)\n\n━━━━━━━━━━━━━━━\n🧠 1) نظام القتال\n━━━━━━━━━━━━━━━\n• يعتمد على نظام أدوار ويستمر حتى ينتهي HP الخصم.\n\n🔥 2) المهارات\n• NORMAL (عادي)\n• SKILL (ضرر + تأثير)\n• ULTIMATE (ضرر قوي + تجميد/نزيف)\n\n🩸 3) التأثيرات\n• BURN (حرق دوري) | BLEED (نزيف) | STUN (شلل دور كامل)\n\n🛡️ 4) نظام الرانك\n• برونزي، فضي، ذهبي، بلاتيني، ماستر، أسطوري (تزيد MMR مع الفوز)`
            return safeSend(msg.key.remoteJid, { text: explanation })
        }

        // .بروفايل
        if (text === '.بروفايل') {
            try {
                let player = await Player.findOne({ userId })
                if (!player) player = await Player.create({ userId })

                const unlockedAbilities = Object.keys(levelAbilities)
                    .filter(lvl => (player.level || 1) >= Number(lvl))
                    .map(lvl => levelAbilities[lvl])
                const abilitiesText = unlockedAbilities.length > 0
                    ? unlockedAbilities.map(a => `${abilityIcons[a.type] || "✨"} ${a.name}\n📊 القوة: ${a.value}%\n📝 ${a.description}`).join('\n\n')
                    : "لا توجد قدرات بعد"

                const charsList = player.characters || []
                let strongest = null
                for (const char of charsList) {
                    if (!strongest || Number(char.power || 0) > Number(strongest.power || 0)) strongest = char
                }

                let profilePic = null
                try {
                    profilePic = await Promise.race([
                        sock.profilePictureUrl(userId, 'image'),
                        new Promise(resolve => setTimeout(() => resolve(null), 5000))
                    ])
                } catch (e) { profilePic = null }

                const profileText = `👤 الملف الشخصي\n\n🎖️ اللقب: ${player.title || 'لا يوجد'}\n⭐ المستوى: ${player.level || 1}\n✨ الخبرة: ${player.xp || 0}\n💰 المال: ${player.money || 0}\n🎟️ السحبات: ${player.pulls || 0}\n❤️ HP: ${player.hp || 10000}\n\n✨ تأثير القدرات الإجمالي:\n⚔️ هجوم: +${player.attackBonus || 0}%\n🛡️ دفاع: +${player.defenseBonus || 0}%\n🎯 كريت: +${player.critBonus || 0}%\n💨 مراوغة: +${player.dodgeBonus || 0}%\n\n🏰 الطابق الحالي: ${player.towerFloor || 1}/30\n📦 المخزون: ${charsList.length}/${player.maxCharacters || 30}\n\n🎖️ القدرات المكتسبة:\n${abilitiesText}\n\n🏆 أقوى شخصية:\n🧿 الاسم: ${strongest ? strongest.name : 'لا يوجد'}\n⚔️ القوة: ${strongest ? strongest.power : '-'}`

                if (profilePic) {
                    return await sock.sendMessage(msg.key.remoteJid, { image: { url: profilePic }, caption: profileText })
                }
                return await sock.sendMessage(msg.key.remoteJid, { text: profileText })
            } catch (err) {
                return await sock.sendMessage(msg.key.remoteJid, { text: '❌ حدث خطأ أثناء فتح البروفايل' })
            }
        }

        // .قدراتي
        if (text === '.قدراتي') {
            const me = await Player.findOne({ userId })
            if (!me) return
            if (!me.specialAbilities) me.specialAbilities = []

            for (let i = 5; i <= me.level; i += 5) {
                const ability = levelAbilities[i]
                if (ability && !me.specialAbilities.includes(ability.name)) me.specialAbilities.push(ability.name)
            }
            await me.save()
            return safeSend(msg.key.remoteJid, { text: `✨ قدراتك:\n\n${me.specialAbilities.join('\n') || 'لا توجد قدرات'}\n\n📊 الإجمالي: ${me.specialAbilities.length}` })
        }

        // .كت
        if (text === '.كت') {
            const shuffled = animeNames.sort(() => 0.5 - Math.random())
            const names = shuffled.slice(0, namesCount)
            return sock.sendMessage(msg.key.remoteJid, { text: `*${names.join('* , *')}*` })
        }

        // .فتحبكج
        if (text.startsWith('.فتحبكج ')) {
            let player = await Player.findOne({ userId })
            if (!player) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا يوجد حساب' })
            const boxType = text.replace('.فتحبكج ', '').trim().toLowerCase()
            if (!player.boxes || !player.boxes[boxType] || player.boxes[boxType] <= 0) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا تملك هذا البكج' })

            let rarity = 'عادي'
            const chance = Math.random() * 100
            if (boxType === 'basic') rarity = chance <= 20 ? 'ممتاز' : 'عادي'
            else if (boxType === 'rare') rarity = chance <= 5 ? 'اسطوري' : chance <= 50 ? 'ممتاز' : 'عادي'
            else if (boxType === 'epic') rarity = chance <= 25 ? 'اسطوري' : 'ممتاز'
            else if (boxType === 'legendary') rarity = 'اسطوري'
            else if (boxType === 'sss_chance') rarity = chance <= 5 ? 'SSS' : 'اسطوري'
            else if (boxType === 'sss_high') rarity = chance <= 30 ? 'SSS' : 'اسطوري'

            const list = characters.filter(c => c.rarity === rarity)
            if (!list.length) return sock.sendMessage(msg.key.remoteJid, { text: `❌ لا توجد شخصيات ${rarity}` })
            const character = list[Math.floor(Math.random() * list.length)]

            player.boxes[boxType]--
            player.characters.push(character)
            await player.save()
            return sock.sendMessage(msg.key.remoteJid, { text: `🎁 تم فتح البكج وحصلت على: ${character.name} [${character.rarity}]` })
        }

        // .فتح
        if (text.startsWith('.فتح ')) {
            let player = await Player.findOne({ userId })
            if (!player) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا يوجد حساب' })
            const boxType = text.split(' ')[1]
            if (!player.boxes || !player.boxes[boxType] || player.boxes[boxType] <= 0) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا تملك هذا الصندوق' })

            const character = getRandomCharacterByBox(boxType)
            player.boxes[boxType]--

            const alreadyOwned = player.characters.some(c => c.name === character.name)
            if (alreadyOwned) {
                const compensation = Math.floor(character.power * 2)
                player.money += compensation
                await player.save()
                return sock.sendMessage(msg.key.remoteJid, { text: `♻️ حصلت على شخصية مكررة: ${character.name}\n💰 تم تعويضك بـ ${compensation} مال` })
            }

            player.characters.push(character)
            await player.save()
            return sock.sendMessage(msg.key.remoteJid, { text: `🎁 تم فتح الصندوق!\n🧿 الشخصية: ${character.name}\n🌟 الندرة: ${character.rarity}\n⚔️ القوة: ${character.power}` })
        }

        // .طابق البرج
        if (text.startsWith('.طابق')) {
            let player = await Player.findOne({ userId })
            if (!player) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا تملك حساباً' })
            if (player.towerCompleted) return sock.sendMessage(msg.key.remoteJid, { text: '👑 لقد أكملت البرج بالفعل' })

            const args = text.trim().split(/\s+/)
            if (args.length < 3) return sock.sendMessage(msg.key.remoteJid, { text: `❌ استخدم:\n.طابق رقم_الطابق رقم_الشخصية` })

            const floorNumber = Number(args[1])
            const charNumber = Number(args[2]) - 1
            if (floorNumber !== player.towerFloor) return sock.sendMessage(msg.key.remoteJid, { text: `❌ الطابق الحالي لديك هو ${player.towerFloor}` })

            const floor = towerFloors.find(f => f.floor === floorNumber)
            const character = player.characters?.[charNumber]
            if (!floor || !character) return sock.sendMessage(msg.key.remoteJid, { text: '❌ البيانات غير صحيحة' })

            if (player.usedCharacters?.includes(character.name)) return sock.sendMessage(msg.key.remoteJid, { text: '❌ هذه الشخصية استعملتها سابقاً' })

            const finalPower = Math.floor(character.power * (1 + (player.attackBonus || 0) / 100))
            if (finalPower < floor.power) return sock.sendMessage(msg.key.remoteJid, { text: `❌ فشل الطابق ${floor.floor}\n⚔️ قوتك: ${finalPower} | المطلوب: ${floor.power}` })

            player.usedCharacters.push(character.name)
            const reward = getTowerReward(floor.floor)
            player.towerFloor++
            if (reward.money) player.money += reward.money
            if (reward.draws) player.pulls += reward.draws

            await player.save()
            return sock.sendMessage(msg.key.remoteJid, { text: `🏆 تم اجتياز الطابق ${floor.floor} بنجاح باستخدام ${character.name}!` })
        }

        // .متجرالتذاكر
        if (text === '.متجرالتذاكر') {
            return sock.sendMessage(msg.key.remoteJid, { text: `🛒 متجر التذاكر:\n\n basic: 5 تذاكر\n rare: 10 تذاكر\n epic: 20 تذكرة\n للشراء استخدم: .شراءصندوق اسم_الصندوق` })
        }

        // .شراءصندوق
        if (text.startsWith('.شراءصندوق ')) {
            let player = await Player.findOne({ userId })
            if (!player) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لم يتم العثور على حسابك' })
            const args = text.split(' ')
            const item = args[1]?.toLowerCase()
            const prices = { basic: 5, rare: 10, epic: 20, legendary: 35 }
            if (!prices[item]) return sock.sendMessage(msg.key.remoteJid, { text: '❌ صندوق غير متاح' })

            player.towerTickets = player.towerTickets || 0
            if (player.towerTickets < prices[item]) return sock.sendMessage(msg.key.remoteJid, { text: '❌ لا تملك تذاكر كافية' })

            player.towerTickets -= prices[item]
            player.boxes = player.boxes || {}
            player.boxes[item] = (player.boxes[item] || 0) + 1
            await player.save()
            return sock.sendMessage(msg.key.remoteJid, { text: `✅ تم شراء صندوق ${item}` })
        }

        // .صناديقي
        if (text === '.صناديقي') {
            let player = await Player.findOne({ userId })
            if (!player) return
            player.boxes = player.boxes || {}
            return sock.sendMessage(msg.key.remoteJid, { text: `🎁 صناديقك:\n\n📦 Basic: ${player.boxes.basic || 0}\n📦 Rare: ${player.boxes.rare || 0}` })
        }

        // .بوس / .زعيم / .هجوم
        if (text === '.بوس') {
            if (!currentBoss) return sock.sendMessage(msg.key.remoteJid, { text: '⏳ لا يوجد زعيم حالياً' })
            return sock.sendMessage(msg.key.remoteJid, { text: `🔥 الزعيم الحالي: 👑 ${currentBoss.name}\n💀 استخدم .زعيم لمواجهته` })
        }

        if (text === '.زعيم') {
            if (!currentBoss) return safeSend(msg.key.remoteJid, { text: '❌ لا يوجد زعيم عالمي حالياً' })
            return sock.sendMessage(msg.key.remoteJid, { image: { url: currentBoss.image }, caption: `👑 الزعيم العالمي: ${currentBoss.name}\n❤️ الصحة: ${currentBoss.hp}/${currentBoss.maxHp}\n\n⚔️ استخدم .هجوم لمهاجمته` })
        }

        if (text === '.هجوم') {
            if (!currentBoss) return safeSend(msg.key.remoteJid, { text: '❌ لا يوجد زعيم حالياً' })
            const me = await Player.findOne({ userId })
            if (!me || !me.characters.length) return safeSend(msg.key.remoteJid, { text: '❌ لا تملك شخصيات للهجوم' })

            const strongest = me.characters.sort((a, b) => b.power - a.power)[0]
            let damage = Math.floor(strongest.power * (1 + (me.attackBonus || 0) / 100))

            currentBoss.hp = Math.max(0, currentBoss.hp - damage)
            await Boss.updateOne({}, { hp: currentBoss.hp })

            me.bossDamage = (me.bossDamage || 0) + damage
            await me.save()

            if (currentBoss.hp <= 0) {
                currentBoss = null
                await Boss.deleteMany({})
                return safeSend(msg.key.remoteJid, { text: '🎉 تم القضاء على الزعيم العالمي وتوزيع الجوائز!' })
            }

            return safeSend(msg.key.remoteJid, { text: `⚔️ هجمت على الزعيم بـ ${strongest.name} وسببت ${damage} ضرر!\n❤️ صحة الزعيم المتبقية: ${currentBoss.hp}/${currentBoss.maxHp}` })
        }

        // .اسحب
        if (text === '.اسحب') {
            let player = await Player.findOne({ userId })
            if (!player) player = await Player.create({ userId, pulls: 5 })

            if ((player.characters || []).length >= (player.maxCharacters || 30)) return safeSend(msg.key.remoteJid, { text: '❌ مخزنك ممتلئ' })
            if ((player.pulls || 0) <= 0) return safeSend(msg.key.remoteJid, { text: '⏳ لا تملك سحبات متبقية' })

            player.pulls--
            const randomChar = characters[Math.floor(Math.random() * characters.length)]
            player.characters.push(randomChar)
            await player.save()

            return safeSend(msg.key.remoteJid, { text: `🎉 حصلت على الشخصية: ${randomChar.name} [${randomChar.rarity}]! السحبات المتبقية: ${player.pulls}` })
        }

        // .شخصياتي
        if (text === '.شخصياتي') {
            const player = await Player.findOne({ userId })
            if (!player || !player.characters.length) return safeSend(msg.key.remoteJid, { text: '📭 لا توجد شخصيات لديك' })
            let txt = `👤 ━━〔 شخصياتك 〕━━ 👤\n\n`
            player.characters.forEach((c, i) => { txt += `#${i + 1} 🧿 ${c.name} | ⚔️ القوة: ${c.power}\n` })
            return safeSend(msg.key.remoteJid, { text: txt })
        }

        // .قتال_مجموع
        if (text.startsWith('.قتال_مجموع')) {
            const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            if (!mentioned) return safeSend(msg.key.remoteJid, { text: '❌ يرجى منشن الخصم' });
            const me = await Player.findOne({ userId });
            const enemy = await Player.findOne({ userId: mentioned });
            if (!me || !enemy) return safeSend(msg.key.remoteJid, { text: '❌ أحد اللاعبين لا يملك حساباً' });

            let myPower = me.characters.reduce((sum, c) => sum + Number(c.power || 0), 0);
            let enemyPower = enemy.characters.reduce((sum, c) => sum + Number(c.power || 0), 0);

            let winner = myPower >= enemyPower ? me : enemy;
            winner.money = (winner.money || 0) + 1000;
            await winner.save();

            return safeSend(msg.key.remoteJid, { text: `⚔️ انتهت المعركة الإجمالية!\n\nقوتك: ${myPower} VS قوة الخصم: ${enemyPower}\n👑 الفائز هو @${winner.userId.split('@')[0]} وحصل على 1000 مال!` });
        }

    }) // إغلاق الأحداث النهائي
}

startBot().catch(console.error)
