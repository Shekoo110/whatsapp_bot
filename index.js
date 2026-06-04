const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')

const { calculateDamageAdvanced } = require('./utils/pvp')
const express = require("express")
const QRCode = require("qrcode")
const cooldowns = new Map()

console.log('Bot starting...')

const mongoose = require('mongoose')
const PvP = require('./models/PvP')

const bosses = require('./bosses')
const characters = require('./characters.json')
const getRank = require('./utils/rank')
const { getSkillDamage } = require('./utils/skills')
const Boss = require('./models/Boss')
const { getTotalStats } = require('./utils/stats')
const { generateEquipmentShop } = require('./systems/shopSystem')
if (!global.shopStarted) {

    global.shopStarted = true

    const Player = require('./models/Player')

    setInterval(async () => {

        const shopItems = generateEquipmentShop()

        await Player.updateMany({}, {
            $set: {
                "shop.items": shopItems,
                "shop.lastRefresh": Date.now()
            }
        })

        console.log("🏪 Shop refreshed")

    }, 24 * 60 * 60 * 1000) // كل 24 ساعة
}

const Player = require('./models/Player')
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
const Market = require('./models/Market')
const Shop = require('./models/Shop')
// require / imports هنا


// 👇 هنا مباشرة


async function generateCharacterShop() {

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

            if (rand <= sum) {
                return r.name
            }
        }

        return 'عادي'
    }

    const allCharacters = characters

const oldShop = await Shop.findOne()

if (oldShop) {

    const age =
        Date.now() - oldShop.createdAt

    if (age < 60 * 60 * 1000) {
        return await Shop.find()
    }
}

    let shopItems = []

    for (let i = 0; i < 5; i++) {

        const rarity = getRandomRarity()

        const pool = allCharacters.filter(
            c => c.rarity === rarity
        )

        if (!pool.length) continue

        const character =
            pool[Math.floor(Math.random() * pool.length)]

        const priceMultiplier = {
            'عادي': 1000,
            'ممتاز': 3000,
            'اسطوري': 8000,
            'SSS': 20000
        }

        const price =
            priceMultiplier[rarity] +
            Math.floor(Math.random() * 1000)

        shopItems.push({
            character,
            price
        })
    }

    await Shop.deleteMany({})
    await Shop.insertMany(shopItems)

    return shopItems
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

5: {
    name: "👁️ شارينغان",
    type: "crit",
    value: 5,
    description: "5% ضربة حرجة إضافية"
},

10: {
    name: "🛡️ صلابة الحديد",
    type: "defense",
    value: 5,
    description: "تقليل الضرر 5%"
},

15: {
    name: "⚔️ عين الصقر",
    type: "crit",
    value: 5,
    description: "زيادة فرصة الضربة الحرجة"
},

20: {
    name: "🔥 لهب التنين",
    type: "reflect",
    value: 5,
    description: "إرجاع 5% من الضرر"
},

25: {
    name: "🌑 رينيغان",
    type: "lifesteal",
    value: 5,
    description: "استعادة 5% من الضرر"
},

30: {
    name: "💀 سوسانو",
    type: "attack",
    value: 10,
    description: "زيادة الهجوم 10%"
},

35: {
    name: "🦅 غرائز المقاتل",
    type: "dodge",
    value: 10,
    description: "زيادة المراوغة 10%"
},

40: {
    name: "👑 هاكي الملك",
    type: "stun",
    value: 5,
    description: "5% شل الخصم"
},

45: {
    name: "🐉 تنين الأساطير",
    type: "bossDamage",
    value: 10,
    description: "ضرر إضافي ضد الزعيم"
},

50: {
    name: "☄️ قوة الكواكب",
    type: "attack",
    value: 15,
    description: "زيادة الهجوم 15%"
},

55: {
    name: "❄️ تجميد الزمن",
    type: "freeze",
    value: 5,
    description: "5% تجميد الخصم"
},

60: {
    name: "⚔️ سيد المعارك",
    type: "crit",
    value: 10,
    description: "10% ضربة حرجة"
},

65: {
    name: "🛡️ درع العمالقة",
    type: "defense",
    value: 10,
    description: "تقليل الضرر 10%"
},

70: {
    name: "🌋 غضب البركان",
    type: "reflect",
    value: 10,
    description: "عكس 10% من الضرر"
},

75: {
    name: "👹 قوة الشياطين",
    type: "attack",
    value: 20,
    description: "زيادة الهجوم 20%"
},

80: {
    name: "🌌 بوابة الأبعاد",
    type: "dodge",
    value: 15,
    description: "15% مراوغة"
},

85: {
    name: "🌩️ سيد العواصف",
    type: "reflect",
    value: 15,
    description: "يعكس 15% من الضرر على الخصم"
},

90: {
    name: "💎 الجسد الماسي",
    type: "defense",
    value: 15,
    description: "تقليل الضرر 15%"
},

95: {
    name: "🔥 ملك الجحيم",
    type: "lifesteal",
    value: 15,
    description: "استعادة 15% من الضرر"
},

100: {
    name: "🌟 الحاكم المطلق",
    type: "ultimate",
    value: 25,
    description: "زيادة جميع الإحصائيات 25%"
}

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

        case 1:
            return { draws: 1, xp: 100 }

        case 2:
            return { draws: 1, xp: 100 }

        case 3:
            return { draws: 1, xp: 100 }

        case 4:
            return { draws: 1, xp: 100 }

        case 5:
            return {
                money: 500,
                xp: 500,
                box: 'basic'
            }

        case 6:
            return { draws: 1, xp: 150 }

        case 7:
            return { draws: 1, xp: 150 }

        case 8:
            return { draws: 1, xp: 150 }

        case 9:
            return { draws: 1, xp: 150 }

        case 10:
            return {
                money: 1000,
                xp: 1000,
                box: 'rare'
            }

        case 11:
            return { draws: 1, xp: 200 }

        case 12:
            return { draws: 1, xp: 200 }

        case 13:
            return { draws: 1, xp: 200 }

        case 14:
            return { draws: 1, xp: 200 }

        case 15:
            return {
                money: 1500,
                xp: 2000,
                box: 'epic'
            }

        case 16:
            return { draws: 1, xp: 300 }

        case 17:
            return { draws: 1, xp: 300 }

        case 18:
            return { draws: 1, xp: 300 }

        case 19:
            return { draws: 1, xp: 300 }

        case 20:
            return {
                money: 2000,
                xp: 3000,
                box: 'legendary'
            }

        case 21:
            return { draws: 1, xp: 400 }

        case 22:
            return { draws: 1, xp: 400 }

        case 23:
            return { draws: 1, xp: 400 }

        case 24:
            return { draws: 1, xp: 400 }

        case 25:
            return {
                money: 3000,
                xp: 5000,
                box: 'sss_chance'
            }

        case 26:
            return { draws: 1, xp: 500 }

        case 27:
            return { draws: 1, xp: 500 }

        case 28:
            return { draws: 1, xp: 500 }

        case 29:
            return { draws: 1, xp: 500 }

        case 30:
            return {
                money: 4000,
                xp: 10000,
                box: 'sss_high',
                title: '👑 ملك الأبطال'
            }

        default:
            return null
    }
}

function getRandomCharacterByRarity(rarity) {

    const list = characters.filter(
        c => c.rarity === rarity
    )

    if (!list.length) return null

    return list[
        Math.floor(
            Math.random() * list.length
        )
    ]
}

function getRandomCharacterByBox(boxType) {

    let pool = []

    switch (boxType) {

        case 'basic':
            pool = characters.filter(
                c => c.rarity === 'عادي' || c.rarity === 'ممتاز'
            )
            break

        case 'rare':
            pool = characters.filter(
                c =>
                    c.rarity === 'عادي' ||
                    c.rarity === 'ممتاز' ||
                    c.rarity === 'اسطوري'
            )
            break

        case 'epic':
            pool = characters.filter(
                c =>
                    c.rarity === 'ممتاز' ||
                    c.rarity === 'اسطوري'
            )
            break

        case 'legendary':
            pool = characters.filter(
                c => c.rarity === 'اسطوري'
            )
            break

        case 'sss_chance':

            if (Math.random() < 0.05) {
                pool = characters.filter(
                    c => c.rarity === 'SSS'
                )
            } else {
                pool = characters.filter(
                    c => c.rarity === 'اسطوري'
                )
            }

            break

        case 'sss_high':

            if (Math.random() < 0.30) {
                pool = characters.filter(
                    c => c.rarity === 'SSS'
                )
            } else {
                pool = characters.filter(
                    c => c.rarity === 'اسطوري'
                )
            }

            break
    }

    return pool[
        Math.floor(Math.random() * pool.length)
    ]
}

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {

    console.log('✅ MongoDB Connected')

    await PvP.deleteMany({})
    console.log('PvP cleared')

})
.catch(err => console.log('MongoDB Error:', err))

const safeLoadPlayers = () => {
    try {
        let players = loadPlayers()
        return players || {}
    } catch (e) {
        return {}
    }
}

const safeSavePlayers = (players) => {
    try {
        savePlayers(players)
    } catch (e) {
        console.log('Save error players')
    }
}

const safeLoadMarket = () => {
    try {
        let market = loadMarket()
        return market || []
    } catch (e) {
        return []
    }
}

const safeSaveMarket = (market) => {
    try {
        saveMarket(market)
    } catch (e) {
        console.log('Save error market')
    }
}


// =========================
// ملفات اللعبة
// =========================

const playersFile =
'./players.json'

const marketFile =
'./market.json'

// ===== تشغيل السيرفر =====

const app = express()

let qrCodeData = ""

// ===== صفحة QR =====

app.get("/", (req, res) => {

    if (qrCodeData) {

        res.send(`
        <html>
        <head>
            <title>WhatsApp Bot QR</title>
        </head>

        <body style="
            background:#111;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            flex-direction:column;
            color:white;
            font-family:sans-serif;
        ">

            <h2>امسح QR لتشغيل البوت</h2>

            <img src="${qrCodeData}" width="300" />

        </body>
        </html>
        `)

    } else {

        res.send(`
        <html>
        <body style="
            background:#111;
            color:white;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:sans-serif;
        ">
            <h2>البوت متصل بالفعل ✅</h2>
        </body>
        </html>
        `)

    }

})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running")
})

// =========================
// أسماء الأنمي
// =========================

const animeNames = [
'لوفي','زورو','نامي','سانجي','اوسوب','تشوبر','روبين','فرانكي','بروك','جينبي',
'شانكس','إيس','سابو','لاو','ميهوك','دوفلامينغو','كايدو','بيغ مام','كروكودايل',
'سموكر','كيزارو','أوكيجي','أكاينو','باغي','بيرونا','هانكوك','ياماتو','كاتاكوري',
'كيد','كيلر','هوكينز','دريك','بوني','كوبي','غارب','سينغوكو','رايلي','نيوغيت',
'ماركو','جوزو','فيستا','تيتش','اينيل','لوتشي','كاكو','كاليفا','موريا','سيزار',
'فيغابانك','كينيمون','مومونوسكي','أودين','كوين','كينغ','جاك','أوروتشي','هيوري',
'ريبيكا','فيفي','كاروت','بيدرو','ألبيدا','كورينا','بيبو','شيراهوشي',
'أرلونغ','هاتشي','باولي','فوكسي',

'كونان','ران','كوغورو','هايبرا','أغاسا','هيجي','كايتو','ساتو','تاكاغي',
'تشيبا','ميغوري','جين','فودكا','فيرموث','بوربون','كير','شوكيتشي','ماري',
'ماسومي','أكاي','يوساكو','يوكو','ميتسوهيكو','غينتا','أيومي','سيرا','جودي',
'كازوها','موميجي','شينتشي','كيد','واكاسا',
'روم','ري','أزوسا','سوبارو','أكيمي','أتسوشي','ماكوتو','يامامورا',

'غوكو','فيجيتا','غوهان','ترانكس','غوتين','بيكولو','فريزا','سيل','بوو','بيروس',
'ويس','برولي','جيرين','هيت','كابا','كايل','كاليفلا','زينو','باردوك','راديتز',
'نابا','كريلين','تشاوزو','بولما','فيديل','بان','بلاك',
'زاماسو','تورليس','فيجيتو','ساتان',

'إيتشيغو','روكيا','أوريهيمي','تشاد','أوريو','بياكويا','رينجي','توشيرو','أيزن',
'جين','إيكاكو','زاراكي','ياتشيرو','أونوهانا','مايوري','نيمو','سويفون',
'يورويتشي','كيسكي','شينجي','غريمجو','ألكيورا','نيل','ستارك','هاليبال',
'باراغان','نويتورا','زوماري','يامي','بامبي','جوغرام','يوهاباخ',

'تانجيرو','نيزوكو','زينيتسو','إينوسكي','غيو','شينوبو','رينغوكو','أوزوي',
'ميتسوري','موشيرو','أوباناي','سانيمي','غيومي','كاغايا','أكازا','دوما',
'كوكوشيبو','موزان','روي','غيوكو','داكي','غيوتارو',
'كاناو','غينيا','ماكومو','سابيتو','يوشيرو','تامايو','اوي',

'يوجي','ميغومي','نوبارا','غوجو','سوكونا','غيتو','يوتا','ماكي','توجي','نانامي',
'مي مي','تشوسو','ماهيتو','هانامي','داغون','إينوماكي','باندا','هاكاري',
'كاشيمو','هيغورو','كينجاكو','يوكي','تودو','ميوا','مومو',

'إيرين','ميكاسا','أرمين','ليفاي','هانجي','إروين','راينر','بيرتولت','آني',
'زيك','بيك','غابي','فالكو','جان','كوني','ساشا','هيستوريا','يومير','فلوك',

'ناتسو','لوسي','غراي','إيرزا','ويندي','جيلال','غاجيل','ليفي','ماكاروف',
'ميراجين','لاكسوس','كانا','فريد','إلفمان','ليسانا',
'بانثرلي','شارلي','روغ','ستينغ','يوكينو','كاغورا','أولتير','زيريف',
'مايفيس','أكنولوغيا',

'غون','كيلوا','كورابيكا','ليوريو','هيسوكا','إيلومي','كرولو','فيتان',
'فينكس','نوبوناغا','شالنارك','باكونودا','بيسكيت','كايتو','ميرويم',
'بيتو','بوف','يوبي',

'ناروتو','ساسكي','ساكورا','كاكاشي','إيتاتشي','مادارا','أوبيتو','هاشيراما',
'توبيراما','هيروزين','ميناتو','كوشينا','جيرايا','تسونادي','أوروتشيمارو',
'غارا','نيجي','روك لي','تن تن','شينو','كيبا','هيناتا','تيماري',
'ساي','ياماتو','كيلر بي','ديدارا','ساسوري','كيسامي','كونان','باين',
'ناغاتو','كاغويا','بوروتو','سارادا','ميتسوكي','كاواكي',

'ديكو','باكوغو','شوتو','أوراراكا','تسويو','مومو','كيريشيما','يامي','دينجي','آيزاوا','أول مايت','شينسو','هوكس','إنديفور',
'توغا','شيغاراكي','ستاين','ميريو','تاماكي','نيجيري',

'جينتوكي','شينباتشي','كاغورا','هاسيغاوا','تاكاساغي','كاتسورا','أوكيتا',
'هيجيكاتا','كوندو','كاموي',

'سايتاما','جينوس','تاتسوماكي','بانغ','فوبوكي','جارو','سونيك','بوروس',
'كينغ','مومن رايدر',

'ميليوداس','بان','كينغ','ديان','إليزابيث','إسكانور','ميرلين','غوثر',
'زيلدريس','إستاروسا',

'ريمورو','شونا','شيون','بينيمارو','فيلدورا','ميلم',

'أكوا','ميغومين','داركنيس','كازوما',

'سوبارو','إيميليا','ريم','رام','بياتريس','أوتو',
'يوليوس','راينهارد',

'إيسديث','تاتسومي','أكامي','ليون','شيلسي','بولات','كورومي',

'ليلوك','سوزاكو','سي سي',

'شويا','ناغيسا','كارما','كورو سينسي',

'تاكيميتشي','مايكي','دراكن','باجي','تشيفويو','كازوتورا','كيساكي',
'هانما','إيزانا','كاكوتشو','إينوي','كوكو','تايجو','هاكاي','يوزوها','هينا'
]
// ===== عدد الأسماء =====

let namesCount = 1

// =========================
// دوال المساعدة
// =========================

function loadPlayers() {

    if (!fs.existsSync(playersFile)) {

        fs.writeFileSync(
            playersFile,
            JSON.stringify({}, null, 2)
        )
    }

    return JSON.parse(
        fs.readFileSync(playersFile)
    )
}

function savePlayers(data) {

    fs.writeFileSync(
        playersFile,
        JSON.stringify(data, null, 2)
    )
}

function loadMarket() {

    if (!fs.existsSync(marketFile)) {

        fs.writeFileSync(
            marketFile,
            JSON.stringify([], null, 2)
        )
    }

    return JSON.parse(
        fs.readFileSync(marketFile)
    )
}

function createPlayer() {

    return {

        pulls: 5,
        lastReset: Date.now(),

        characters: [],

        hp: 10000,
        crit: 5,
        dodge: 3,

        xp: 0,
        level: 1,
        money: 0,

        towerFloor: 1,
        usedCharacters: [],
        towerCompleted: false,

        attackBonus: 0,
        defenseBonus: 0,

        critBonus: 0,
        dodgeBonus: 0,
        reflectBonus: 0,
        lifestealBonus: 0,
        bossDamageBonus: 0,

        specialAbilities: [],

        hpBonus: 0,

        maxCharacters: 30,

        title: null
    }
}

// =========================
// متجر الشخصيات
// =========================

async function generateCharacterShop() {

    const shopItems = await Shop.find()

    // ⏳ إذا المتجر موجود ومضى أقل من ساعة، لا تعيد التوليد
    if (shopItems.length > 0) {

    const firstItem = shopItems[0]

    if (firstItem?.createdAt) {

        const age =
            Date.now() -
            new Date(firstItem.createdAt).getTime()

        if (age < 60 * 60 * 1000) return
    }
}

    await Shop.deleteMany({})

    for (let i = 0; i < 10; i++) {

        let rarity = 'عادي'

        const chance = Math.random() * 100

        if (chance <= 10)
            rarity = 'SSS'
        else if (chance <= 20)
            rarity = 'اسطوري'
        else if (chance <= 40)
            rarity = 'ممتاز'

        const pool = characters.filter(
            c => c.rarity === rarity
        )

        if (!pool.length) continue

        const character =
            pool[Math.floor(Math.random() * pool.length)]

        let price = character.power * 2

        if (rarity === 'ممتاز')
            price = character.power * 3

        if (rarity === 'اسطوري')
            price = character.power * 5

        if (rarity === 'SSS')
            price = character.power * 8

        await Shop.create({
            character,
            price
        })
    }
}

async function spawnBoss(sock, groupId) {

    currentBoss = {
        ...bosses[Math.floor(Math.random() * bosses.length)]
    }

    await Boss.deleteMany({})
    await Boss.create(currentBoss)

    await sock.sendMessage(groupId, {
        text: `🔥 ظهر زعيم عالمي جديد!

👑 ${currentBoss.name}

❤️ ${currentBoss.hp}/${currentBoss.maxHp}

⚔️ استخدم .زعيم للمعلومات
🗡️ استخدم .هجوم للمشاركة`
    })
}

// =========================
// تشغيل البوت
// =========================

async function startBot() {

    const savedBoss = await Boss.findOne()

    if (savedBoss) {
        currentBoss = savedBoss
        console.log('✅ تم تحميل الزعيم المحفوظ')
    }

    const { state, saveCreds } =
        await useMultiFileAuthState('auth')

    const sock = makeWASocket({
        auth: state,
    })

    // =========================
    // Shop (مرة واحدة فقط)
    // =========================
    if (!global.shopStarted) {
        global.shopStarted = true

        await generateShop()

        setInterval(async () => {
            await generateShop()
            console.log("🏪 Shop refreshed")
        }, 60 * 60 * 1000)
    }

    // =========================
    // حفظ الجلسة
    // =========================
    sock.ev.on('creds.update', saveCreds)

    // =========================
    // safeSend
    // =========================
    const safeSend = async (jid, data) => {
        try {
            return await sock.sendMessage(jid, data)
        } catch (e) {
            console.log('Send error:', e)
        }
    }

    // =========================
    // CONNECTION
    // =========================
    sock.ev.on('connection.update', async (update) => {

        const { connection, qr } = update

        if (qr) {
            qrCodeData = await QRCode.toDataURL(qr)
        }

        if (connection === 'open') {

            console.log('البوت اشتغل')

            const GROUP_ID = "120363020823525909@g.us"

            await spawnBoss(sock, GROUP_ID)

            setInterval(async () => {
                if (!currentBoss) {
                    await spawnBoss(sock, GROUP_ID)
                }
            }, 60 * 60 * 1000)
        }

        if (connection === 'close') {

            console.log('انقطع الاتصال')

            setTimeout(() => {
                startBot()
            }, 5000)
        }
    })

    // =========================
// الرسائل
// =========================
sock.ev.on('messages.upsert', async ({ messages }) => {

    const msg = messages[0]
    if (!msg?.message) return

    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text

    if (!text) return

    const userId =
        msg.key.participant ||
        msg.key.remoteJid

    const key = userId + '_global'
    const now = Date.now()

    if (
        cooldowns.has(key) &&
        now - cooldowns.get(key) < 2000
    ) {
        return
    }

    cooldowns.set(key, now)

    // جميع الأوامر تبدأ من هنا

    // =========================
    // الأوامر هنا فقط
    // =========================

        // =========================
        // .صوره
        // =========================

        if (text === '.صوره') {

            const folderPath = './images'

            const files =
            fs.readdirSync(folderPath)

            if (files.length === 0) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    { text: 'لا توجد صور' }
                )
            }

            const randomImage =
            files[Math.floor(
                Math.random() * files.length
            )]

            const imagePath =
            path.join(folderPath, randomImage)

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    image:
                    fs.readFileSync(imagePath)
                }
            )
        }

    if (text.startsWith('.تحدي')) {

    const target =
        msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]

    if (!target) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ مثال: .تحدي @user'
        })
    }

    if (target === userId) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا يمكنك تحدي نفسك'
        })
    }

    const targetPlayer =
        await Player.findOne({ userId: target })

    if (!targetPlayer) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ اللاعب لا يملك حساباً'
        })
    }

    const oldFight = await PvP.findOne({
        active: true,
        $or: [
            { player1: userId },
            { player2: userId },
            { player1: target },
            { player2: target }
        ]
    })

    if (oldFight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ أحد اللاعبين داخل قتال بالفعل'
        })
    }

    const player1Data = await Player.findOne({ userId })
const player2Data = await Player.findOne({ userId: target })

if (!player1Data || !player2Data) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ خطأ في بيانات اللاعبين'
    })
}

const hp1 = getTotalStats(player1Data).hp
const hp2 = getTotalStats(player2Data).hp

await PvP.create({
    player1: userId,
    player2: target,
    turn: target,
    active: false,
    hp1,
    hp2
})

    return safeSend(msg.key.remoteJid, {
        text:
`⚔️ تحدي جديد

@${target.split('@')[0]}

تمت دعوتك للقتال

اكتب:

.قبول

أو

.رفض`,
        mentions: [target]
    })
    }
    if (text === '.رفض') {

    const fight = await PvP.findOne({
        player2: userId,
        active: false
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا يوجد تحدي بانتظار رفضه'
        })
    }

    await PvP.deleteOne({
        _id: fight._id
    })

    return safeSend(msg.key.remoteJid, {
        text: 'تم رفض التحدي'
    })
    }

    if (text === '.قبول') {

    const fight = await PvP.findOne({
        player2: userId,
        active: false
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا يوجد تحدي بانتظار قبولك'
        })
    }

    const player1Data =
        await Player.findOne({ userId: fight.player1 })

    const player2Data =
        await Player.findOne({ userId: fight.player2 })
const stats1 =
    getTotalStats(player1Data)

const stats2 =
    getTotalStats(player2Data)

fight.shield1 = stats1.shield
fight.shield2 = stats2.shield
    const team1 = [...player1Data.characters]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

const team2 = [...player2Data.characters]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

console.log("team1 before save =", team1)
console.log("team2 before save =", team2)

fight.team1 = team1
fight.team2 = team2

console.log("fight.team1 before save =", fight.team1)
console.log("fight.team2 before save =", fight.team2)

fight.active = true

const firstTurn =
    Math.random() < 0.5
        ? fight.player1
        : fight.player2

fight.turn = firstTurn

await fight.save()

console.log("saved")

const testFight = await PvP.findById(fight._id)

console.log("DB team1 =", testFight.team1)
console.log("DB team2 =", testFight.team2)

const checkFight = await PvP.findById(fight._id)

console.log("fight =", JSON.stringify(checkFight))
        
const team1Names = team1
    .map(c => `• ${c.name}`)
    .join('\n')

const team2Names = team2
    .map(c => `• ${c.name}`)
    .join('\n')
    
        return safeSend(msg.key.remoteJid, {
    text:
`⚔️ بدأ القتال!

👤 فريق اللاعب الأول:
${team1Names}

👤 فريق اللاعب الثاني:
${team2Names}

❤️ اللاعب الأول: ${fight.hp1}
❤️ اللاعب الثاني: ${fight.hp2}

🎯 الدور الآن:

@${firstTurn.split('@')[0]}

الأوامر المتاحة:

.هجوم الخصم
.مهارة
.ألتميت`,
    mentions: [
        fight.player1,
        fight.player2,
        firstTurn
    ]
})
    }

if (text === '.مهارة') {

const fight = await PvP.findOne({  
    active: true,  
    $or: [  
        { player1: userId },  
        { player2: userId }  
    ]  
})  

if (!fight) {  
    return safeSend(msg.key.remoteJid, {  
        text: '❌ أنت لست داخل قتال'  
    })  
}  

if (fight.turn !== userId) {  
return safeSend(msg.key.remoteJid, {  
    text: '❌ ليس دورك'  
})

}

let attacker

if (userId === fight.player1) {

attacker =  
    fight.team1[  
        Math.floor(  
            Math.random() *  
            fight.team1.length  
        )  
    ]

} else {

attacker =  
    fight.team2[  
        Math.floor(  
            Math.random() *  
            fight.team2.length  
        )  
    ]

}
const playerData =
await Player.findOne({ userId })

    const now = Date.now()

if (playerData.skillCooldown > now) {
    return safeSend(msg.key.remoteJid, {
        text: `⏳ المهارة في كولداون\nانتظر ${Math.ceil((playerData.skillCooldown - now) / 1000)} ثانية`
    })
}

const attackerStats =
getTotalStats(playerData)

const opponentData =
await Player.findOne({
userId:



    
fight.player1 === userId
? fight.player2
: fight.player1
})

const opponentStats =
getTotalStats(opponentData)

attackerStats.power =
attacker.power

attackerStats.level =
playerData.level

opponentStats.level =
opponentData.level

const result =
calculateDamageAdvanced(
attackerStats,
opponentStats
)

let damage = result.damage

damage = Math.floor(
damage * 1.5
)

const isCrit = result.crit

const dodged = result.dodge

let critMessage = ''

if (isCrit) {
critMessage =
'\n💢 ضربة كريتيكال!'
}
if (dodged) {

fight.turn =  
    userId === fight.player1  
        ? fight.player2  
        : fight.player1  

fight.lastMove = new Date()  

await fight.save()  

return safeSend(msg.key.remoteJid, {  
    text:

`💨 تم تفادي المهارة!

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
mentions: [fight.turn]
})
}
let absorbed = 0
if (userId === fight.player1) {

if (fight.shield2 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield2  
    )  

    fight.shield2 -= absorbed  
    damage -= absorbed  
}

} else {

if (fight.shield1 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield1  
    )  

    fight.shield1 -= absorbed  
    damage -= absorbed  
}

}

if (userId === fight.player1) {

fight.hp2 -= damage

} else {

fight.hp1 -= damage

}

let heal = 0

if (
attackerStats.lifesteal > 0 &&
damage > 0
) {

heal = Math.floor(  
    damage *  
    attackerStats.lifesteal /  
    100  
)

if (userId === fight.player1) {

fight.hp1 += heal  

} else {  

    fight.hp2 += heal  
}

}

fight.turn =  
userId === fight.player1  
    ? fight.player2  
    : fight.player1

fight.lastMove = new Date()

if (fight.hp1 <= 0 || fight.hp2 <= 0) {  

const winner =  
    fight.hp1 > 0  
        ? fight.player1  
        : fight.player2  

const loser =  
    winner === fight.player1  
        ? fight.player2  
        : fight.player1  

const winnerData =  
    await Player.findOne({  
        userId: winner  
    })  

const loserData =  
    await Player.findOne({  
        userId: loser  
    })  

const moneyReward =  
    Math.floor(  
        500 + Math.random() * 500  
    )  

const xpReward =  
    Math.floor(  
        200 + Math.random() * 300  
    )  

winnerData.money += moneyReward  
winnerData.xp += xpReward  

let boxReward = ''  

const randomBox = Math.random()  

if (randomBox < 0.60) {  

    winnerData.boxes.basic += 1  
    boxReward = '📦 صندوق عادي'

} else if (randomBox < 0.90) {

winnerData.boxes.rare += 1  
    boxReward = '🎁 صندوق نادر'  

} else {  

    winnerData.boxes.epic += 1  
    boxReward = '✨ صندوق ملحمي'  
}  

winnerData.wins += 1  
winnerData.mmr += 20  

loserData.losses += 1  

loserData.mmr =  
    Math.max(  
        0,  
        loserData.mmr - 10  
    )  

winnerData.rank =  
    getRank(winnerData.mmr)  

loserData.rank =  
    getRank(loserData.mmr)  

await winnerData.save()  
await loserData.save()  

await PvP.deleteOne({  
    _id: fight._id  
})  

return safeSend(msg.key.remoteJid, {  
    text:

`🏆 انتهى القتال

👑 الفائز:
@${winner.split('@')[0]}

💰 الفلوس:
+${moneyReward}

⭐ الخبرة:
+${xpReward}

🏅 MMR:
+20

${boxReward}`,
mentions: [winner]
})
}

await fight.save()

playerData.skillCooldown = Date.now() + 10000
await playerData.save()

let shieldMessage = ''

if (absorbed > 0) {
    shieldMessage = `\n🛡️ امتص الدرع: ${absorbed}`
}

let healMessage = ''

if (heal > 0) {
    healMessage = `\n❤️‍🩹 استعاد: ${heal}`
}

return safeSend(msg.key.remoteJid, {
    text:
`✨ ${attacker.name} استخدم مهارة!

💥 الضرر: ${damage}${critMessage}${shieldMessage}${healMessage}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🛡️ ${fight.shield1 || 0}
🛡️ ${fight.shield2 || 0}

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
    mentions: [fight.turn]
})
}



if (text === '.ألتميت') {
const fight = await PvP.findOne({  
    active: true,  
    $or: [  
        { player1: userId },  
        { player2: userId }  
    ]  
})  

if (!fight) {  
    return safeSend(msg.key.remoteJid, {  
        text: '❌ أنت لست داخل قتال'  
    })  
}  

if (fight.turn !== userId) {  
return safeSend(msg.key.remoteJid, {  
    text: '❌ ليس دورك'  
})

}
    let dotDamage = 0
    if (fight.burn.player1 > 0 && userId === fight.player1) {
    dotDamage += 150
    fight.burn.player1--
}

if (fight.burn.player2 > 0 && userId === fight.player2) {
    dotDamage += 150
    fight.burn.player2--
}

if (fight.poison.player1 > 0 && userId === fight.player1) {
    dotDamage += 100
    fight.poison.player1--
}

if (fight.poison.player2 > 0 && userId === fight.player2) {
    dotDamage += 100
    fight.poison.player2--
}

let attacker

if (userId === fight.player1) {

attacker =  
    fight.team1[  
        Math.floor(  
            Math.random() *  
            fight.team1.length  
        )  
    ]

} else {

attacker =  
    fight.team2[  
        Math.floor(  
            Math.random() *  
            fight.team2.length  
        )  
    ]

}
const playerData =
await Player.findOne({ userId })
    const now = Date.now()

if (playerData.skillCooldown > now) {
    return safeSend(msg.key.remoteJid, {
        text: `⏳ المهارة في كولداون\nانتظر ${Math.ceil((playerData.skillCooldown - now) / 1000)} ثانية`
    })
}

const attackerStats =
getTotalStats(playerData)

const opponentData =
await Player.findOne({
userId:
fight.player1 === userId
? fight.player2
: fight.player1
})

const opponentStats =
getTotalStats(opponentData)

attackerStats.power =
attacker.power

attackerStats.level =
playerData.level

opponentStats.level =
opponentData.level

const result =
calculateDamageAdvanced(
attackerStats,
opponentStats
)

let damage = result.damage
    damage += dotDamage

damage = Math.floor(
    damage * 2.5
)

const isCrit = result.crit

const dodged = result.dodge

let critMessage = ''

if (isCrit) {
critMessage =
'\n💢 ضربة كريتيكال!'
}
if (dodged) {

fight.turn =  
    userId === fight.player1  
        ? fight.player2  
        : fight.player1  

fight.lastMove = new Date()  

await fight.save()  

return safeSend(msg.key.remoteJid, {  
    text:

`💨 تم تفادي المهارة!

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
mentions: [fight.turn]
})
}
let absorbed = 0
if (userId === fight.player1) {

if (fight.shield2 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield2  
    )  

    fight.shield2 -= absorbed  
    damage -= absorbed  
}

} else {

if (fight.shield1 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield1  
    )  

    fight.shield1 -= absorbed  
    damage -= absorbed  
}

}

if (userId === fight.player1) {

fight.hp2 -= damage

} else {

fight.hp1 -= damage

}

let heal = 0

if (
attackerStats.lifesteal > 0 &&
damage > 0
) {

heal = Math.floor(  
    damage *  
    attackerStats.lifesteal /  
    100  
)

if (userId === fight.player1) {

fight.hp1 += heal  

} else {  

    fight.hp2 += heal  
}

}

fight.turn =  
userId === fight.player1  
    ? fight.player2  
    : fight.player1

fight.lastMove = new Date()

if (fight.hp1 <= 0 || fight.hp2 <= 0) {  

const winner =  
    fight.hp1 > 0  
        ? fight.player1  
        : fight.player2  

const loser =  
    winner === fight.player1  
        ? fight.player2  
        : fight.player1  

const winnerData =  
    await Player.findOne({  
        userId: winner  
    })  

const loserData =  
    await Player.findOne({  
        userId: loser  
    })  

const moneyReward =  
    Math.floor(  
        500 + Math.random() * 500  
    )  

const xpReward =  
    Math.floor(  
        200 + Math.random() * 300  
    )  

winnerData.money += moneyReward  
winnerData.xp += xpReward  

let boxReward = ''  

const randomBox = Math.random()  

if (randomBox < 0.60) {  

    winnerData.boxes.basic += 1  
    boxReward = '📦 صندوق عادي'

} else if (randomBox < 0.90) {

winnerData.boxes.rare += 1  
    boxReward = '🎁 صندوق نادر'  

} else {  

    winnerData.boxes.epic += 1  
    boxReward = '✨ صندوق ملحمي'  
}  

winnerData.wins += 1  
winnerData.mmr += 20  

loserData.losses += 1  

loserData.mmr =  
    Math.max(  
        0,  
        loserData.mmr - 10  
    )  

winnerData.rank =  
    getRank(winnerData.mmr)  

loserData.rank =  
    getRank(loserData.mmr)  

await winnerData.save()  
await loserData.save()  

await PvP.deleteOne({  
    _id: fight._id  
})  

return safeSend(msg.key.remoteJid, {  
    text:

`🏆 انتهى القتال

👑 الفائز:
@${winner.split('@')[0]}

💰 الفلوس:
+${moneyReward}

⭐ الخبرة:
+${xpReward}

🏅 MMR:
+20

${boxReward}`,
mentions: [winner]
})
}

await fight.save()

playerData.ultimateCooldown = Date.now() + 30000
await playerData.save()

let shieldMessage = ''

if (absorbed > 0) {
    shieldMessage = `\n🛡️ امتص الدرع: ${absorbed}`
}

let healMessage = ''

if (heal > 0) {
    healMessage = `\n❤️‍🩹 استعاد: ${heal}`
}

return safeSend(msg.key.remoteJid, {
    text:
`🌌 ${attacker.name} أطلق الألتميت!

💥 الضرر: ${damage}${critMessage}${shieldMessage}${healMessage}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🛡️ ${fight.shield1 || 0}
🛡️ ${fight.shield2 || 0}

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
    mentions: [fight.turn]
})
}



if (text === '.هجوم الخصم') {

    const fight = await PvP.findOne({
        active: true,
        $or: [
            { player1: userId },
            { player2: userId }
        ]
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ أنت لست داخل قتال'
        })
    }

    const now = Date.now()

    if (
        fight.lastMove &&
        now - new Date(fight.lastMove).getTime() >
        10 * 60 * 1000
    ) {

        await PvP.deleteOne({
            _id: fight._id
        })

        return safeSend(msg.key.remoteJid, {
            text: '⌛ انتهت المعركة بسبب الخمول'
        })
    }

    if (fight.turn !== userId) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ ليس دورك'
        })
    }
    
    let dotDamage = 0
    if (fight.burn.player1 > 0 && userId === fight.player1) {
    dotDamage += 150
    fight.burn.player1--
}

if (fight.burn.player2 > 0 && userId === fight.player2) {
    dotDamage += 150
    fight.burn.player2--
}

if (fight.poison.player1 > 0 && userId === fight.player1) {
    dotDamage += 100
    fight.poison.player1--
}

if (fight.poison.player2 > 0 && userId === fight.player2) {
    dotDamage += 100
    fight.poison.player2--
}
    console.log("fight.team1 =", fight.team1)
console.log("fight.team2 =", fight.team2)
console.log("fight =", JSON.stringify(fight))
if (
    !fight.team1 ||
    !fight.team2 ||
    !fight.team1.length ||
    !fight.team2.length
) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ بيانات القتال تالفة، أعد إنشاء التحدي'
    })
}
    let attacker

    if (userId === fight.player1) {

        attacker =
            fight.team1[
                Math.floor(
                    Math.random() *
                    fight.team1.length
                )
            ]

    } else {

        attacker =
            fight.team2[
                Math.floor(
                    Math.random() *
                    fight.team2.length
                )
            ]
    }

    const playerData =
    await Player.findOne({ userId })

const attackerStats =
    getTotalStats(playerData)

const opponentData =
    await Player.findOne({
        userId:
            fight.player1 === userId
                ? fight.player2
                : fight.player1
    })

const opponentStats =
    getTotalStats(opponentData)

attackerStats.power =
    attacker.power

attackerStats.level =
    playerData.level

opponentStats.level =
    opponentData.level

const result =
    calculateDamageAdvanced(
        attackerStats,
        opponentStats
    )

let damage = result.damage
    damage += dotDamage

const isCrit = result.crit

const dodged = result.dodge
let critMessage = ''

if (isCrit) {
    critMessage =
        '\n💢 ضربة كريتيكال!'
}
    
    if (dodged) {

    fight.turn =
        userId === fight.player1
            ? fight.player2
            : fight.player1

    fight.lastMove = new Date()

    await fight.save()

    return safeSend(msg.key.remoteJid, {
        text:
`💨 تم تفادي الهجوم!

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
        mentions: [fight.turn]
    })
    }


    // Accuracy
    if (
        attackerStats.accuracy > 0 &&
        Math.random() * 100 >
        attackerStats.accuracy
    ) {

        fight.turn =
            userId === fight.player1
                ? fight.player2
                : fight.player1

        fight.lastMove = new Date()

        await fight.save()

        return safeSend(msg.key.remoteJid, {
            text:
`🎯 أخطأت الضربة

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
            mentions: [fight.turn]
        })
    }

    // Dodge
    if (
        opponentStats.dodge > 0 &&
        Math.random() * 100 <
        opponentStats.dodge
    ) {

        fight.turn =
            userId === fight.player1
                ? fight.player2
                : fight.player1

        fight.lastMove = new Date()

        await fight.save()

        return safeSend(msg.key.remoteJid, {
            text:
`🏃 تم تفادي الهجوم

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
            mentions: [fight.turn]
        })
    }

    

    let critical = false

    if (
        attackerStats.critRate > 0 &&
        Math.random() * 100 <
        attackerStats.critRate
    ) {

        critical = true

        damage = Math.floor(
            damage *
            (
                1 +
                attackerStats.critDamage / 100
            )
        )
    }

    // Shield
    let absorbed = 0

if (userId === fight.player1) {

    if (fight.shield2 > 0) {

        absorbed = Math.min(
            damage,
            fight.shield2
        )

        fight.shield2 -= absorbed
        damage -= absorbed
    }

} else {

    if (fight.shield1 > 0) {

        absorbed = Math.min(
            damage,
            fight.shield1
        )

        fight.shield1 -= absorbed
        damage -= absorbed
    }
}
    if (userId === fight.player1) {

        fight.hp2 -= damage

    } else {

        fight.hp1 -= damage
    }
    fight.hp1 = Math.max(0, fight.hp1)
fight.hp2 = Math.max(0, fight.hp2)

    // Lifesteal
    let heal = 0

    if (
        attackerStats.lifesteal > 0 &&
        damage > 0
    ) {

        heal = Math.floor(
            damage *
            attackerStats.lifesteal /
            100
        )

        if (userId === fight.player1) {

            fight.hp1 += heal

        } else {

            fight.hp2 += heal
        }
    }

    fight.turn =
        userId === fight.player1
            ? fight.player2
            : fight.player1

    fight.lastMove = new Date()

    if (fight.hp1 <= 0 || fight.hp2 <= 0) {

const winner =
    fight.hp1 > 0
        ? fight.player1
        : fight.player2

const loser =
    winner === fight.player1
        ? fight.player2
        : fight.player1

const winnerData =
    await Player.findOne({
        userId: winner
    })

const loserData =
    await Player.findOne({
        userId: loser
    })

const moneyReward =
    Math.floor(
        500 + Math.random() * 500
    )

const xpReward =
    Math.floor(
        200 + Math.random() * 300
    )

winnerData.money += moneyReward
winnerData.xp += xpReward

winnerData.wins += 1
winnerData.mmr += 20
        let boxReward = ''

const randomBox = Math.random()

if (randomBox < 0.60) {

    winnerData.boxes.basic += 1
    boxReward = '📦 صندوق عادي'

} else if (randomBox < 0.90) {

    winnerData.boxes.rare += 1
    boxReward = '🎁 صندوق نادر'

} else {

    winnerData.boxes.epic += 1
    boxReward = '✨ صندوق ملحمي'
}

loserData.losses += 1

loserData.mmr =
    Math.max(
        0,
        loserData.mmr - 10
    )

winnerData.rank =
    getRank(winnerData.mmr)

loserData.rank =
    getRank(loserData.mmr)

await winnerData.save()
await loserData.save()

await PvP.deleteOne({
    _id: fight._id
})

return safeSend(msg.key.remoteJid, {
    text:
`🏆 انتهى القتال

👑 الفائز:
@${winner.split('@')[0]}

💰 الفلوس:
+${moneyReward}

⭐ الخبرة:
+${xpReward}

🏅 MMR:
+20

${boxReward}`,
    mentions: [winner]
})
    }

    await fight.save()

    return safeSend(msg.key.remoteJid, {
        text:
`⚔️ ${attacker.name} هاجم

${critical ? '💥 ضربة حرجة!' : ''}

💥 الضرر: ${damage}
${critMessage}
${absorbed > 0 ? `🛡️ امتص الدرع: ${absorbed}\n` : ''}${heal > 0 ? `❤️‍🩹 امتصاص حياة: +${heal}\n` : ''}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🛡️ ${fight.shield1}
🛡️ ${fight.shield2}

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
        mentions: [fight.turn]
    })
}


    if (text === '.مهارة') {

    const fight = await PvP.findOne({
        active: true,
        $or: [
            { player1: userId },
            { player2: userId }
        ]
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ أنت لست داخل قتال'
        })
    }

    if (fight.turn !== userId) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ ليس دورك'
        })
    }

    const playerData =
    await Player.findOne({ userId })

const stats =
    getTotalStats(playerData)

const damage =
    Math.floor(stats.attack * 1.5 * (0.8 + Math.random() * 0.4))

    if (userId === fight.player1) {

        fight.hp2 -= damage
        fight.turn = fight.player2
        

    } else {

        fight.hp1 -= damage
        fight.turn = fight.player1
    }
await fight.save()
    if (fight.hp1 <= 0 || fight.hp2 <= 0) {

        const winner =
            fight.hp1 > 0
                ? fight.player1
                : fight.player2

        await PvP.deleteOne({
            _id: fight._id
        })

        return safeSend(msg.key.remoteJid, {
            text:
`🏆 انتهى القتال

الفائز:
@${winner.split('@')[0]}`,
            mentions: [winner]
        })
    }

    await fight.save()

    return safeSend(msg.key.remoteJid, {
        text:
`🔥 مهارة خاصة

💥 الضرر:
${damage}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🎯 الدور الآن:

@${fight.turn.split('@')[0]}`,
        mentions: [fight.turn]
    })
    }

        if (text === '.البرج') {

    let player =
        await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا تملك حساباً'
            }
        )
    }

    if (player.towerCompleted) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `👑 لقد أكملت برج الأبطال

🏆 اللقب: ${player.title}

🏰 الطابق: 30/30

⚔️ هجوم إضافي: ${player.attackBonus || 0}%
🛡️ دفاع إضافي: ${player.defenseBonus || 0}%
❤️ صحة إضافية: ${player.hpBonus || 0}%
⚡ سرعة إضافية: ${player.speedBonus || 0}%`
            }
        )
    }

    const floor = towerFloors.find(
        f => f.floor === player.towerFloor
    )

    if (!floor) return

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: floor.image
            },
            caption: `🏰 برج الأبطال

📍 الطابق الحالي: ${floor.floor}/30

⚔️ القوة المطلوبة:
${floor.power}

👥 الشخصيات المستخدمة:
${player.usedCharacters?.length || 0}/30

🏆 اللقب النهائي:
👑 ملك الأبطال

استعمل:
.طابق ${player.towerFloor} رقم_الشخصية`
        }
    )
}
        if (text === '.resetall') {

  try {

    await Player.updateMany(
      {},
      {
        $set: {
          level: 1,
          xp: 0,
          attackBonus: 0,
          defenseBonus: 0,
          critBonus: 0,
          dodgeBonus: 0,
          reflectBonus: 0,
          lifestealBonus: 0,
          bossDamageBonus: 0,
          specialAbilities: [],
          bonusAppliedLevels: []
        }
      }
    )

    return sock.sendMessage(msg.key.remoteJid, {
      text: '✅ تم تصفير جميع اللاعبين إلى لفل 1'
    })

  } catch (err) {
    console.log(err)

    return sock.sendMessage(msg.key.remoteJid, {
      text: '❌ حدث خطأ أثناء التصفير'
    })
  }
        }

        // =========================
        // .صوت
        // =========================

        if (text === '.صوت') {

            const folderPath = './audio'

            const files =
            fs.readdirSync(folderPath)

            if (files.length === 0) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    { text: 'لا توجد صوتيات' }
                )
            }

            const randomAudio =
            files[Math.floor(
                Math.random() * files.length
            )]

            const audioPath =
            path.join(folderPath, randomAudio)

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    audio:
                    fs.readFileSync(audioPath),

                    mimetype: 'audio/mpeg',

                    ptt: false
                }
            )
        }

        // =========================
        // .اصوات
        // =========================

        if (text === '.اصوات') {

            const folderPath = './sounds'

            const files =
            fs.readdirSync(folderPath)

            if (files.length === 0) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    { text: 'لا توجد اصوات' }
                )
            }

            const randomAudio =
            files[Math.floor(
                Math.random() * files.length
            )]

            const audioPath =
            path.join(folderPath, randomAudio)

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    audio:
                    fs.readFileSync(audioPath),

                    mimetype: 'audio/mpeg',

                    ptt: false
                }
            )
        }

        // =========================
        // أوامر الأسماء
        // =========================

        if (text === '.اسم') {

            namesCount = 1

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:
                    '*تم تغيير .كت إلى اسم واحد*'
                }
            )
        }

        if (text === '.اسمين') {

            namesCount = 2

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:
                    '*تم تغيير .كت إلى اسمين*'
                }
            )
        }

        if (text === '.ثلاث') {

            namesCount = 3

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:
                    '*تم تغيير .كت إلى 3 أسماء*'
                }
            )
        }

                if (text.startsWith('.سوق المعدات')) {
            const player = await Player.findOne({ userId })
            if (!player) return

            const DAY = 24 * 60 * 60 * 1000

            // يتجدد المتجر فقط إذا مر 24 ساعة أو كان فارغاً
            const needRefresh =
                !player.shop.lastRefresh ||
                Date.now() - player.shop.lastRefresh >= DAY ||
                !player.shop.items.length

            if (needRefresh) {
                const { generateEquipmentShop } = require('./systems/shopSystem')
                const shopItems = generateEquipmentShop()

                player.shop.items = shopItems
                player.shop.lastRefresh = Date.now()

                await player.save()
            }

            let shopText = `🏪 *سوق المعدات للمقاتلين* 🏪\n\n`

            // عرض المنتجات الموجودة في المتجر
            player.shop.items.forEach((item, i) => {
                shopText += `*#${i + 1}* 🗡️ *الاسم:* ${item.name}\n⭐ *الندرة:* ${item.rarity}\n💰 *السعر:* ${item.price} عملة\n━━━━━━━━━━━━━━━\n`
            })

            // حساب الوقت المتبقي للتجديد القادم (الجزء الخاص بك)
            const nextRefresh = Math.max(0, DAY - (Date.now() - player.shop.lastRefresh))
            const hours = Math.floor(nextRefresh / 3600000)

            shopText += `\n🕒 *التجديد بعد:* ${hours} ساعة`

            return sock.sendMessage(msg.key.remoteJid, { text: shopText })
        }

        if (text.startsWith('.شراء_معدات')) {

    const num = parseInt(text.split(' ')[1]) - 1

    const player = await Player.findOne({ userId })

    const item = player.shop.items[num]

    if (!item) return

    if (player.money < item.price) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ ما عندك فلوس كافية'
        })
    }

    player.money -= item.price

    player.inventory.push(item)

    await player.save()

    return sock.sendMessage(msg.key.remoteJid, {
        text: `✅ تم شراء ${item.name}`
    })
}

        if (text === '.تركيب') {

    const player = await Player.findOne({ userId })

    if (!player || !player.inventory.length) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا يوجد معدات'
        })
    }

    let textMsg = `⚔️ اختر رقم لتجهيز المعدة:\n\n`

    player.inventory.forEach((item, i) => {

        textMsg += `#${i + 1}
🗡️ ${item.name}
🎚️ ${item.type}
⭐ ${item.rarity}

━━━━━━━━━━━\n`
    })

    textMsg += `\n📌 الاستخدام:
.لبس رقم نوع

مثال:
.لبس 1 weapon`

    return sock.sendMessage(msg.key.remoteJid, {
        text: textMsg
    })
}

        if (text.startsWith('.لبس')) {

    const args = text.split(' ')
    const index = parseInt(args[1]) - 1
    const type = args[2] // weapon / armor / accessory

    const player = await Player.findOne({ userId })

    if (!player) return

    const item = player.inventory[index]

    if (!item) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ رقم غير صحيح'
        })
    }

    if (item.type !== type) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: `❌ هذه ليست ${type}`
        })
    }

    // تركيب القطعة
    player.equipment[type] = item

    await player.save()

    return sock.sendMessage(msg.key.remoteJid, {
        text: `✅ تم تجهيز ${item.name} في ${type}`
    })
}


if (text.startsWith('.قتال pvp')) {

    const attacker = await Player.findOne({ userId })
    const defenderJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]

    if (!attacker) {
        return safeSend(msg.key.remoteJid, { text: '❌ لا تملك حساب' })
    }

    if (!defenderJid) {
        return safeSend(msg.key.remoteJid, { text: '❌ مثال: .قتال pvp @user' })
    }

    const defender = await Player.findOne({ userId: defenderJid })

    if (!defender) {
        return safeSend(msg.key.remoteJid, { text: '❌ اللاعب غير موجود' })
    }

    if (attacker.userId === defender.userId) {
        return safeSend(msg.key.remoteJid, { text: '❌ لا يمكنك قتال نفسك' })
    }

    // =========================
    // ⏳ COOLDOWN
    // =========================
    const now = Date.now()

if (attacker.lastPvP && now - attacker.lastPvP < 30000) {
    return safeSend(msg.key.remoteJid, {
        text: '⏳ انتظر 30 ثانية'
    })
}

attacker.lastPvP = now
await attacker.save()

    // =========================
    // 🧠 STATS + EQUIPMENT
    // =========================
    const aEq = attacker.equipment || {}
    const dEq = defender.equipment || {}

    const aStats = {
        hp: attacker.hp,
        attack: (attacker.attack || 500) + (aEq.weapon?.attack || 0),
        crit: (attacker.crit || 5) + (aEq.accessory?.crit || 0),
        dodge: (attacker.dodge || 3) + (aEq.accessory?.dodge || 0),
        burn: 0,
        bleed: 0,
        stun: 0
    }

    const dStats = {
        hp: defender.hp,
        attack: (defender.attack || 500) + (dEq.weapon?.attack || 0),
        crit: (defender.crit || 5) + (dEq.accessory?.crit || 0),
        dodge: (defender.dodge || 3) + (dEq.accessory?.dodge || 0),
        burn: 0,
        bleed: 0,
        stun: 0
    }

    let aHP = aStats.hp
    let dHP = dStats.hp

    let log =
`⚔️ PvP بدأ!

🥊 @${attacker.userId.split('@')[0]}
VS
🥊 @${defender.userId.split('@')[0]}

━━━━━━━━━━━━━━
`

    let turn = 1
let turnAttacker = true

function getSkill() {
    const r = Math.random()
    if (r > 0.85) return "ultimate"
    if (r > 0.55) return "skill"
    return "normal"
}

function applyStatus(target, skill) {

    if (skill === "skill") {
        if (Math.random() < 0.3) target.burn = 2
    }

    if (skill === "ultimate") {
        if (Math.random() < 0.3) target.stun = 1
        if (Math.random() < 0.2) target.bleed = 3
    }
}

const MAX_TURNS = 50

while (
    aHP > 0 &&
    dHP > 0 &&
    turn <= MAX_TURNS
) {

    log += `\n🔁 الدور ${turn}\n`



    // =========================
    // ⚔️ FIGHT LOOP
    // =========================
    

        log += `\n🔁 الدور ${turn}\n`

        let atk = turnAttacker ? aStats : dStats
        let def = turnAttacker ? dStats : aStats

        let defHP = turnAttacker ? dHP : aHP

        // 🔥 status damage

if (atk.burn > 0) {
    defHP -= 80
    atk.burn--
    log += `🔥 حرق -80 HP\n`
}

if (atk.bleed > 0) {
    defHP -= 120
    atk.bleed--
    log += `🩸 نزيف -120 HP\n`
}

if (defHP <= 0) {
    if (turnAttacker) dHP = 0
    else aHP = 0
    break
}

if (atk.stun > 0) {
    atk.stun--
    log += `💫 مذهول - خسر دوره\n`
    turnAttacker = !turnAttacker
    turn++
    continue
}

        // 🛡️ dodge
        if (Math.random() * 100 < def.dodge) {
            log += `💨 تفادى الضربة!\n`
        } else {

            let skill = getSkill()

            let damage = atk.attack

            if (skill === "skill") damage *= 1.5
            if (skill === "ultimate") damage *= 2.5

            // crit
            if (Math.random() * 100 < atk.crit) {
                damage *= 2
                log += `🔥 CRIT!\n`
            }

            defHP -= Math.floor(damage)

            applyStatus(def, skill)

            log += `⚔️ ${skill.toUpperCase()} - ${Math.floor(damage)} dmg\n`
        }

        if (turnAttacker) dHP = defHP
        else aHP = defHP
        log += `
❤️ ${attacker.userId.split('@')[0]}: ${Math.max(0, aHP)} HP
💙 ${defender.userId.split('@')[0]}: ${Math.max(0, dHP)} HP
`

        turnAttacker = !turnAttacker
        turn++
    }

    // =========================
    // 🏆 RESULT
    // =========================
    const winner = aHP > 0 ? attacker : defender
    const loser = aHP > 0 ? defender : attacker

    winner.wins = (winner.wins || 0) + 1
    loser.losses = (loser.losses || 0) + 1

    winner.mmr += 25
    loser.mmr = Math.max(0, loser.mmr - 15)

    attacker.rank = getRank(attacker.mmr)
    defender.rank = getRank(defender.mmr)

    await attacker.save()
    await defender.save()

    return safeSend(msg.key.remoteJid, {
    text: `${log}

━━━━━━━━━━━━━━━━━━

🏆 الفائز:
@${winner.userId.split('@')[0]}

📊 النتائج:

🥇 @${attacker.userId.split('@')[0]}
${attacker.rank} (${attacker.mmr})

🥈 @${defender.userId.split('@')[0]}
${defender.rank} (${defender.mmr})`,

    mentions: [
        attacker.userId,
        defender.userId
    ]
})
}

        if (text.startsWith('.اشرح pvp')) {

    const explanation =
`⚔️ شرح نظام PvP (المطور)

━━━━━━━━━━━━━━━
🧠 1) نظام القتال
━━━━━━━━━━━━━━━
• القتال يعتمد على نظام أدوار (Turn-Based)
• كل لاعب يهاجم بالتناوب
• القتال يستمر حتى ينتهي HP أحد اللاعبين

━━━━━━━━━━━━━━━
🔥 2) المهارات (Skills)
━━━━━━━━━━━━━━━
يوجد 3 أنواع:

• NORMAL → ضربة عادية
• SKILL → ضرر أقوى + احتمال تأثير
• ULTIMATE → ضرر عالي + تأثيرات قوية

━━━━━━━━━━━━━━━
💥 3) الضرر (Damage System)
━━━━━━━━━━━━━━━
• يعتمد على Attack الأساسي
• يتم ضربه في:
  - Skill multiplier
  - Critical Hit (ضربة حرجة)
  - معدات اللاعب

━━━━━━━━━━━━━━━
🔥 4) الضربة الحرجة (Critical)
━━━━━━━━━━━━━━━
• احتمال بنسبة crit%
• تضاعف الضرر ×2

━━━━━━━━━━━━━━━
💨 5) التفادي (Dodge)
━━━━━━━━━━━━━━━
• احتمال dodge%
• إذا نجح:
  ❌ لا يتم استقبال أي ضرر

━━━━━━━━━━━━━━━
🩸 6) حالات القتال (Status Effects)
━━━━━━━━━━━━━━━
• BURN → ضرر كل دور
• BLEED → نزيف لعدة أدوار
• STUN → فقدان دور كامل

━━━━━━━━━━━━━━━
🛡️ 7) المعدات (Equipment System)
━━━━━━━━━━━━━━━
• Weapon → يزيد Attack
• Armor → يزيد HP / تقليل ضرر
• Accessory → يزيد Crit / Dodge

━━━━━━━━━━━━━━━
📊 8) نظام الرانك (Rank System)
━━━━━━━━━━━━━━━
يعتمد على MMR:

• برونزي
• فضي
• ذهبي
• بلاتيني
• ماستر
• أسطوري

كل قتال:
✔ يزيد أو ينقص MMR

━━━━━━━━━━━━━━━
🏆 9) المكافآت
━━━━━━━━━━━━━━━
الفائز يحصل على:
• 💰 فلوس
• ⭐ XP
• 📦 صناديق حسب الرانك

━━━━━━━━━━━━━━━
⚔️ الخلاصة
━━━━━━━━━━━━━━━
PvP الآن = نظام RPG كامل داخل البوت
(مهارات + معدات + حالات + رانك + مكافآت)

🔥 مستعد للتطوير القادم`;

    return safeSend(msg.key.remoteJid, {
        text: explanation
    });
}
        
        
        if (text === '.بروفايل') {

try {

    console.time('PROFILE')

    let player = await Player.findOne({ userId })

if (!player) {
    player = await Player.create({
        userId
    })
}

// 👇 هنا تضيفه مباشرة
const unlockedAbilities = Object.keys(levelAbilities)
    .filter(lvl => player.level >= Number(lvl))
    .map(lvl => levelAbilities[lvl])
const abilitiesText = unlockedAbilities.length > 0
    ? unlockedAbilities.map(a => {
        const icon = abilityIcons[a.type] || "✨"

        return `${icon} ${a.name}
⚡ النوع: ${a.type}
📊 القوة: ${a.value}%
📝 ${a.description}`
    }).join('\n\n')
    : "لا توجد قدرات بعد"
// بعدها يكمل الكود الطبيعي
const characters = Array.isArray(player.characters)
    ? player.characters
    : []

    let strongest = null

    for (const char of characters) {

        if (
            !strongest ||
            Number(char.power || 0) >
            Number(strongest.power || 0)
        ) {
            strongest = char
        }
    }

    console.timeLog(
        'PROFILE',
        'PLAYER LOADED'
    )

    let profilePic = null

    try {

        profilePic = await Promise.race([
            sock.profilePictureUrl(
                userId,
                'image'
            ),
            new Promise(resolve =>
                setTimeout(
                    () => resolve(null),
                    5000
                )
            )
        ])

    } catch (e) {

        profilePic = null
    }

    console.timeLog(
        'PROFILE',
        'PHOTO CHECKED'
    )

    const profileText =

`👤 الملف الشخصي

🎖️ اللقب:
${player.title || 'لا يوجد'}

⭐ المستوى:
${player.level || 1}

✨ الخبرة:
${player.xp || 0}

💰 المال:
${player.money || 0}

🎟️ السحبات:
${player.pulls || 0}

🎫 تذاكر المتجر:
${player.towerTickets || 0}

❤️ HP:
${player.hp || 10000}

━━━━━━━━━━━━━━

✨ تأثير القدرات (الإجمالي):

⚔️ هجوم:
+${player.attackBonus || 0}%

🛡️ دفاع:
+${player.defenseBonus || 0}%

🎯 كريت:
+${player.critBonus || 0}%

💨 مراوغة:
+${player.dodgeBonus || 0}%

🪞 عكس الضرر:
+${player.reflectBonus || 0}%

🩸 امتصاص الحياة:
+${player.lifestealBonus || 0}%

💖 HP:
+${player.hpBonus || 0}%

👑 ضرر الزعيم:
+${player.bossDamageBonus || 0}%

━━━━━━━━━━━━━━

🏰 الطابق الحالي:
${player.towerFloor || 1}/30

📦 المخزون:
${player.characters.length}/${player.maxCharacters || 30}

👑 ضرر الزعيم:
${player.bossDamage || 0}

🎖️ القدرات المكتسبة

${abilitiesText}

━━━━━━━━━━━━━━

🏆 أقوى شخصية

🧿 الاسم:
${strongest ? strongest.name : 'لا يوجد'}

🌟 الندرة:
${strongest ? strongest.rarity : '-'}

⚔️ القوة:
${strongest ? strongest.power : '-'}`

    if (profilePic) {

        try {

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    image: {
                        url: profilePic
                    },
                    caption: profileText
                }
            )

            console.timeEnd('PROFILE')
            return

        } catch (e) {

            console.log(
                'PROFILE IMAGE ERROR:',
                e
            )
        }
    }

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: profileText
        }
    )

    console.timeEnd('PROFILE')

} catch (err) {

    console.log(
        'PROFILE ERROR:',
        err
    )

    return await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
            '❌ حدث خطأ أثناء فتح البروفايل'
        }
    )
}

}
        
if (text === '.قدراتي') {

    const me = await Player.findOne({ userId })
    if (!me.specialAbilities) me.specialAbilities = []

for (let i = 5; i <= me.level; i += 5) {
  const ability = levelAbilities[i]

  if (ability && !me.specialAbilities.includes(ability.name)) {
    me.specialAbilities.push(ability.name)
  }
}
if (!me.claimedLevelRewards) me.claimedLevelRewards = []

for (let i = 5; i <= me.level; i += 5) {
  if (me.claimedLevelRewards.includes(i)) continue

  switch (i) {
    case 10:
      me.boxes.basic += 5
      break

    case 20:
      me.boxes.rare += 3
      break

    case 30:
      me.boxes.rare += 5
      break
  }

  me.money = (me.money || 0) + 500

  me.claimedLevelRewards.push(i)
}

await me.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`✨ قدراتك

${me.specialAbilities.join('\n') || 'لا توجد قدرات'}

📊 عدد القدرات:
${me.specialAbilities.length}`
        }
    )
}
        // =========================
        // .كت
        // =========================

        if (text === '.كت') {

            const shuffled =
            animeNames.sort(
                () => 0.5 - Math.random()
            )

            const names =
            shuffled.slice(0, namesCount)

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:
                    `*${names.join('* , *')}*`
                }
            )
        }

        if (text.startsWith('.فتحبكج ')) {

    let player = await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ لا يوجد حساب' }
        )
    }

    const boxType =
        text.replace('.فتحبكج ', '')
            .trim()
            .toLowerCase()

    if (
        !player.boxes ||
        !player.boxes[boxType] ||
        player.boxes[boxType] <= 0
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا تملك هذا البكج'
            }
        )
    }

    let rarity
    const chance = Math.random() * 100

    switch (boxType) {

        case 'basic':
            rarity =
                chance <= 20
                    ? 'ممتاز'
                    : 'عادي'
            break

        case 'rare':
            if (chance <= 5)
                rarity = 'اسطوري'
            else if (chance <= 50)
                rarity = 'ممتاز'
            else
                rarity = 'عادي'
            break

        case 'epic':
            rarity =
                chance <= 25
                    ? 'اسطوري'
                    : 'ممتاز'
            break

        case 'legendary':
            rarity = 'اسطوري'
            break

        case 'sss_chance':
            rarity =
                chance <= 5
                    ? 'SSS'
                    : 'اسطوري'
            break

        case 'sss_high':
            rarity =
                chance <= 30
                    ? 'SSS'
                    : 'اسطوري'
            break

        default:
            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: '❌ نوع البكج غير معروف'
                }
            )
    }

    const list =
        characters.filter(
            c => c.rarity === rarity
        )

    if (!list.length) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `❌ لا توجد شخصيات ${rarity}`
            }
        )
    }

    const character =
        list[
            Math.floor(
                Math.random() * list.length
            )
        ]

    player.boxes[boxType]--

    player.characters.push(character)

    await player.save()

    const imagePath =
        path.join(
            __dirname,
            character.image
        )

    if (!fs.existsSync(imagePath)) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`🎁 تم فتح البكج

🧿 ${character.name}
🌟 ${character.rarity}
⚔️ ${character.power}

❌ صورة الشخصية غير موجودة`
            }
        )
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: fs.readFileSync(imagePath),

            caption:
`🎁 ═══〔 تم فتح البكج 〕═══

🧿 الاسم: ${character.name}

🌟 الندرة: ${character.rarity}

⚔️ القوة: ${character.power}

🌌 الأنمي: ${character.anime}

📦 البكج: ${boxType}

🎉 تمت إضافة الشخصية إلى مخزونك`
        }
    )
        }

        if (text.startsWith('.فتح ')) {

    let player = await Player.findOne({ userId })

    if (!player)
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ لا يوجد حساب' }
        )

    const boxType =
        text.split(' ')[1]

    if (
        !player.boxes ||
        !player.boxes[boxType] ||
        player.boxes[boxType] <= 0
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا تملك هذا الصندوق'
            }
        )
    }

    const character =
        getRandomCharacterByBox(boxType)

    player.boxes[boxType]--

const alreadyOwned =
    player.characters.some(
        c =>
            c.name === character.name &&
            c.form === character.form
    )

if (alreadyOwned) {

    const compensation =
        Math.floor(character.power * 2)

    player.money += compensation

    await player.save()

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`♻️ حصلت على شخصية مكررة

🧿 ${character.name}

💰 تم تحويلها إلى

${compensation} مال`
        }
    )
}

player.characters.push(character)

await player.save()

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🎁 تم فتح الصندوق!

🧿 الشخصية:
${character.name}

🌟 الندرة:
${character.rarity}

⚔️ القوة:
${character.power}

🌌 الأنمي:
${character.anime}`
        }
    )
}

if (text.startsWith('.طابق')) {

    let player = await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا تملك حساباً'
        })
    }

    if (player.towerCompleted) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '👑 لقد أكملت البرج بالفعل'
        })
    }

    const args = text.trim().split(/\s+/)

    if (args.length < 3) {
        return sock.sendMessage(msg.key.remoteJid, {
            text:
`❌ استخدم:

.طابق رقم_الطابق رقم_الشخصية

مثال:
.طابق 1 1`
        })
    }

    const floorNumber = Number(args[1])
    const charNumber = Number(args[2]) - 1

    if (
        isNaN(floorNumber) ||
        isNaN(charNumber)
    ) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ يجب إدخال أرقام صحيحة'
        })
    }

    if (floorNumber !== player.towerFloor) {
        return sock.sendMessage(msg.key.remoteJid, {
            text:
`❌ الطابق الحالي لديك هو ${player.towerFloor}`
        })
    }

    const floor = towerFloors.find(
        f => f.floor === floorNumber
    )

    if (!floor) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ هذا الطابق غير موجود'
        })
    }

    const character =
        player.characters?.[charNumber]

    if (!character) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ الشخصية غير موجودة'
        })
    }

    if (
        player.usedCharacters?.includes(
            character.name
        )
    ) {
        return sock.sendMessage(msg.key.remoteJid, {
            text:
'❌ هذه الشخصية استعملتها سابقاً في البرج'
        })
    }

    const finalPower = Math.floor(
        character.power *
        (
            1 +
            (player.attackBonus || 0) / 100
        )
    )

    if (finalPower < floor.power) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`❌ فشل الطابق ${floor.floor}

⚔️ قوة الشخصية:
${finalPower}

🏰 المطلوب:
${floor.power}`
            }
        )
    }

    player.usedCharacters.push(
        character.name
    )

    const reward =
        getTowerReward(floor.floor)

    player.towerFloor++

    if (reward.money)
        player.money += reward.money

    if (reward.draws)
    player.towerTickets =
        (player.towerTickets || 0) +
        reward.draws

    if (reward.box) {

        if (!player.boxes) {
            player.boxes = {}
        }

        player.boxes[reward.box] =
            (player.boxes[reward.box] || 0) + 1
    }

    player.attackBonus =
        (player.attackBonus || 0) + 5

    if (floor.floor === 30) {

        player.towerCompleted = true
        player.title = '👑 ملك الأبطال'

        player.attackBonus += 10
        player.maxCharacters += 5
    }

    await player.save()

    let rewardText = ''

    if (reward.money)
        rewardText +=
`💰 المال: +${reward.money}\n`

    if (reward.xp)
        rewardText +=
`⭐ الخبرة: +${reward.xp}\n`

    if (reward.draws)
    rewardText +=
`🎫 تذاكر المتجر: +${reward.draws}\n`
    if (reward.box)
        rewardText +=
`🎁 الصندوق: ${reward.box}\n`

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: floor.image
            },
            caption:

`🏆 تم اجتياز الطابق ${floor.floor}

🧿 الشخصية المستخدمة:
${character.name}

⚔️ القوة النهائية:
${finalPower}

━━━━━━━━━━━━━━

🎁 الجوائز

${rewardText}

📈 المكافآت الدائمة

⚔️ هجوم: ${player.attackBonus}%
🛡️ دفاع: ${player.defenseBonus}%
❤️ HP: ${player.hpBonus}%
💨 سرعة: ${player.speedBonus}%

━━━━━━━━━━━━━━

🏰 الطابق التالي:
${player.towerFloor}`
        }
    )
}

        if (text === '.متجرالتذاكر') {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🛒 ═══〔 متجر التذاكر 〕═══

📦 Basic Box
🎫 السعر: 5 تذاكر متجر

📦 Rare Box
🎫 السعر: 10 تذاكر متجر

📦 Epic Box
🎫 السعر: 20 تذكرة متجر

📦 Legendary Box
🎫 السعر: 35 تذكرة متجر

📦 SSS Chance Box
🎫 السعر: 60 تذكرة متجر

📦 SSS High Box
🎫 السعر: 100 تذكرة متجر
━━━━━━━━━━━━━━

🌟 شخصية ممتازة عشوائية
🎫 السعر: 15 تذكرة متجر

👑 شخصية أسطورية عشوائية
🎫 السعر: 40 تذكرة متجر

🔥 شخصية SSS عشوائية
🎫 السعر: 150 تذكرة متجر

━━━━━━━━━━━━━━

🛍️ الشراء:

.شراء basic
.شراء rare
.شراء epic
.شراء legendary
.شراء ssschance
.شراء ssshigh

.شراء ممتاز
.شراء اسطوري
.شراء sss`
        }
    )
        }

        if (text.startsWith('.شراءصندوق ')) {

let player = await Player.findOne({ userId })

if (!player) {
    return sock.sendMessage(msg.key.remoteJid, {
        text: '❌ لم يتم العثور على حسابك'
    })
}

if (!player.boxes) {
    player.boxes = {}
}

if (!player.towerTickets) {
    player.towerTickets = 0
}

const args = text.split(' ')
const item = args[1]?.toLowerCase()

if (!item) {
    return sock.sendMessage(msg.key.remoteJid, {
        text: '❌ اكتب اسم الصندوق'
    })
}

const prices = {
    basic: 5,
    rare: 10,
    epic: 20,
    legendary: 35,
    ssschance: 60,
    ssshigh: 100
}

const names = {
    basic: '📦 Basic',
    rare: '📦 Rare',
    epic: '📦 Epic',
    legendary: '📦 Legendary',
    ssschance: '📦 SSS Chance',
    ssshigh: '📦 SSS High'
}

if (!prices[item]) {
    return sock.sendMessage(msg.key.remoteJid, {
        text:
`❌ الصندوق غير موجود

📦 basic
📦 rare
📦 epic
📦 legendary
📦 ssschance
📦 ssshigh`
})
}

if (player.towerTickets < prices[item]) {
    return sock.sendMessage(msg.key.remoteJid, {
        text:

`❌ ليس لديك تذاكر متجر كافية

🎫 المطلوب: ${prices[item]}
🎫 لديك: ${player.towerTickets}`
})
}

player.towerTickets -= prices[item]

player.boxes[item] =
    (player.boxes[item] || 0) + 1

await player.save()

return sock.sendMessage(msg.key.remoteJid, {
    text:

`✅ تم شراء الصندوق بنجاح

${names[item]}

🎫 السعر: ${prices[item]} تذكرة متجر
🎫 المتبقي: ${player.towerTickets}

📦 عدد هذا الصندوق:
${player.boxes[item]}`
})
}

        if (text === '.صناديقي') {

    let player = await Player.findOne({ userId })

    if (!player) {
        player = await Player.create({ userId })
    }

    if (!player.boxes) {
        player.boxes = {
            basic: 0,
            rare: 0,
            epic: 0,
            legendary: 0,
            sss_chance: 0,
            sss_high: 0
        }
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🎁 ════〔 صناديقك 〕════

📦 Basic: ${player.boxes.basic || 0}

📦 Rare: ${player.boxes.rare || 0}

📦 Epic: ${player.boxes.epic || 0}

📦 Legendary: ${player.boxes.legendary || 0}

📦 SSS Chance: ${player.boxes.sss_chance || 0}

📦 SSS High: ${player.boxes.sss_high || 0}`
        }
    )
        }

        if (text === '.بوس') {

    if (!currentBoss) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '⏳ لا يوجد زعيم حالياً'
        })
    }

    return sock.sendMessage(msg.key.remoteJid, {
        text: `🔥 الزعيم الحالي:

👑 ${currentBoss.name}

💀 استخدم .زعيم لمواجهته`
    })
}
        
if (text === '.جوائز') {

return safeSend(msg.key.remoteJid, {
    text:

`🏆 جوائز الزعيم العالمي 🏆

🥇 المركز الأول

💰 10000 مال
⭐ 1000 XP
👑 شخصية أسطورية عشوائية

━━━━━━━━━━━━━━━━━━

🥈 المركز الثاني

💰 5000 مال
⭐ 500 XP

🎲 30% شخصية أسطورية
🎲 50% شخصية ممتازة

━━━━━━━━━━━━━━━━━━

🥉 المركز الثالث

💰 2500 مال
⭐ 500 XP
✨ شخصية ممتازة عشوائية

━━━━━━━━━━━━━━━━━━

⚔️ يتم تحديد الفائزين حسب
إجمالي الضرر المسبب للزعيم

📊 استخدم .زعيم لمعرفة الزعيم الحالي`
})

}
        
        if (text === '.هجوم') {

if (!currentBoss) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ لا يوجد زعيم حالياً'
    })
}

if (currentBoss.hp <= 0) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ تم هزيمة الزعيم بالفعل'
    })
}

const me = await Player.findOne({ userId })

if (!me || !me.characters.length) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ لا تملك شخصيات'
    })
}

const now = Date.now()

if (
    me.lastBossAttack &&
    now - me.lastBossAttack < 30000
) {

    const left = Math.ceil(
        (30000 -
        (now - me.lastBossAttack))
        / 1000
    )

    return safeSend(
        msg.key.remoteJid,
        {
            text: `⏳ انتظر ${left} ثانية قبل الهجوم مرة أخرى`
        }
    )
}

me.lastBossAttack = now

const strongest = me.characters.sort(
    (a, b) => b.power - a.power
)[0]

let damage = strongest.power

// بونص الهجوم
damage = Math.floor(
    damage * (1 + (me.attackBonus || 0) / 100)
)

// بونص ضرر الزعيم
damage = Math.floor(
    damage * (1 + (me.bossDamageBonus || 0) / 100)
)

const critChance = 15 + (me.critBonus || 0)

const roll = Math.random() * 100

let abilityText = ""

if (roll <= critChance) {

    damage *= 2

    abilityText = `
🔥 قدرة مفعلة

⚡ ضربة حرجة

📖 ضاعف الضرر ×2`

} else if (roll <= 25) {

    damage = Math.floor(damage * 1.5)

    abilityText = `
👑 قدرة مفعلة

⚡ هاكي الملك

📖 زاد الضرر 50%`

} else if (roll <= 33) {

    damage += 1000

    abilityText = `
✨ قدرة مفعلة

⚡ استيقاظ

📖 زاد الضرر 1000`

} else if (roll <= 45) {

    damage *= 2

    abilityText = `
⚡ قدرة مفعلة

⚡ سرعة خارقة

📖 حصلت على هجمة إضافية`
}

const abilityRoll = Math.random() * 100

// شارينغان
if (
    me.specialAbilities?.includes("👁️ شارينغان") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage *= 2

    abilityText += `

👁️ شارينغان

💥 ضربة حرجة ×2`
}

// عين الصقر
if (
    me.specialAbilities?.includes("⚔️ عين الصقر") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.2)

    abilityText += `

⚔️ عين الصقر

🎯 +20% ضرر`
}

// سوسانو
if (
    me.specialAbilities?.includes("💀 سوسانو") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.1)

    abilityText += `

💀 سوسانو

⚔️ +10% ضرر`
}

// تنين الأساطير
if (
    me.specialAbilities?.includes("🐉 تنين الأساطير") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.1)

    abilityText += `

🐉 تنين الأساطير

👑 ضرر إضافي ضد الزعيم`
}

// قوة الكواكب
if (
    me.specialAbilities?.includes("☄️ قوة الكواكب") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.15)

    abilityText += `

☄️ قوة الكواكب

🌠 +15% ضرر`
}

// سيد المعارك
if (
    me.specialAbilities?.includes("⚔️ سيد المعارك") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.25)

    abilityText += `

⚔️ سيد المعارك

💥 +25% ضرر`
}

// قوة الشياطين
if (
    me.specialAbilities?.includes("👹 قوة الشياطين") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.2)

    abilityText += `

👹 قوة الشياطين

🔥 +20% ضرر`
}

// الحاكم المطلق
if (
    me.specialAbilities?.includes("🌟 الحاكم المطلق") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.5)

    abilityText += `

🌟 الحاكم المطلق

⚡ +50% ضرر`
}

if (Math.random() <= 0.15) {

    await safeSend(
        msg.key.remoteJid,
        {
            text: `👑 ${currentBoss.name}

✨ فعل القدرة الخاصة

⚡ ${currentBoss.ability.name}

📖 ${currentBoss.ability.description}`
        }
    )

    if (
        currentBoss.ability.effect === "heal"
    ) {
        currentBoss.hp += 5000
    }

    if (
        currentBoss.ability.effect === "bigHeal"
    ) {
        currentBoss.hp += 10000
    }

    if (
        currentBoss.hp >
        currentBoss.maxHp
    ) {
        currentBoss.hp =
        currentBoss.maxHp
    }

    if (
        currentBoss.ability.effect === "halfDamage"
    ) {
        damage =
        Math.floor(damage / 2)
    }

    if (
        currentBoss.ability.effect === "dodge"
    ) {
        damage = 0
    }

    if (
        currentBoss.ability.effect === "reduceDamage"
    ) {
        damage =
        Math.floor(damage * 0.7)
    }
}

if (!currentBoss || typeof currentBoss.hp !== 'number') {
    return safeSend(msg.key.remoteJid, {
        text: '❌ خطأ في بيانات الزعيم'
    })
}

if (!damage || isNaN(damage)) {
    damage = 0
}

const xpGain = Math.max(
    10,
    Math.floor(damage / 100)
)

me.xp = (me.xp || 0) + xpGain

currentBoss.hp = Math.max(
    0,
    (currentBoss.hp || 0) - damage
)

if ((me.lifestealBonus || 0) > 0) {

    const heal = Math.floor(
        damage * (me.lifestealBonus || 0) / 100
    )

    me.hp = Math.min(me.maxHp || 10000, me.hp + heal)

    abilityText += `

🩸 امتصاص الحياة

❤️ استعدت ${heal} HP`
}

if (currentBoss.hp < 0) {
    currentBoss.hp = 0
}

await Boss.updateOne(
    {},
    {
        $set: {
            hp: currentBoss.hp
        }
    }
)

me.bossDamage =
    (me.bossDamage || 0) + damage

await me.save()

// =========================
// 🧨 نهاية الزعيم
// =========================
if (currentBoss.hp <= 0) {

    if (currentBoss.finished) return
    currentBoss.finished = true

    console.log("BOSS DEAD")
    console.log("Starting reward distribution")

    try {

        await distributeBossRewards(
            sock,
            msg.key.remoteJid
        )

        await Boss.deleteMany({})

        currentBoss = null

        return safeSend(msg.key.remoteJid, {
            text: `👑 تم هزيمة الزعيم!`
        })

    } catch (e) {

        console.log("Boss reward error:", e)

        currentBoss = null

        return safeSend(msg.key.remoteJid, {
            text: "❌ حدث خطأ أثناء توزيع الجوائز"
        })
    }
}

return safeSend(
    msg.key.remoteJid,
    {
        text: `⚔️ هجوم على الزعيم

🧿 الشخصية:
${strongest.name}

💥 الضرر:
${damage}

⭐ الخبرة المكتسبة:
${xpGain}

${abilityText}

━━━━━━━━━━━━━━━━━━

👑 الزعيم:
${currentBoss.name}

❤️ المتبقي:
${currentBoss.hp}/${currentBoss.maxHp}`
    }
)
}
        
        if (text === '.زعيم') {

if (!currentBoss) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ لا يوجد زعيم عالمي حالياً'
    })
}

return sock.sendMessage(
    msg.key.remoteJid,
    {
        image: {
            url: currentBoss.image
        },

        caption: `👑 الزعيم العالمي

🧿 الاسم:
${currentBoss.name}

❤️ الصحة:
${currentBoss.hp}/${currentBoss.maxHp}

━━━━━━━━━━━━━━━━━━

✨ القدرة الخاصة:
${currentBoss.ability.name}

📖 الوصف:
${currentBoss.ability.description}

━━━━━━━━━━━━━━━━━━

⚔️ استخدم .هجوم لمهاجمة الزعيم

🏆 الجوائز:

🥇 الأول:
10000 مال
1000 XP
شخصية أسطورية

🥈 الثاني:
5000 مال
500 XP
30% أسطوري
50% ممتاز

🥉 الثالث وما بعده:
2500 مال
500 XP
شخصية ممتازة`
    }
)
        }
        // =========================
        // .اسحب
        // =========================

        if (text === '.اسحب') {

console.log('بدأ السحب')

let player = await Player.findOne({ userId })

console.log('تم جلب اللاعب')

console.log('نوع الشخصيات:', typeof characters)
console.log('عدد الشخصيات:', characters?.length)

if (!player) {

    player = new Player({
        userId,
        pulls: 5,
        lastReset: Date.now(),
        characters: [],
        hp: 10000,
        crit: 5,
        dodge: 3,
        xp: 0,
        level: 1,
        money: 0
    })
}

if (
    player.characters.length >=
    (player.maxCharacters || 30)
) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`❌ المخزون ممتلئ

📦 السعة:
${player.maxCharacters || 30}`
        }
    )
}

const cooldown = 30 * 60 * 1000

const currentPeriod =
    Math.floor(Date.now() / cooldown)

if (player.lastReset !== currentPeriod) {

    player.pulls = 5
    player.lastReset = currentPeriod

    await player.save()
}

if (player.pulls <= 0) {

    const remaining =
        cooldown - (Date.now() % cooldown)

    const minutes =
        Math.floor(
            remaining / (1000 * 60)
        )

    const seconds =
        Math.floor(
            (remaining % (1000 * 60)) / 1000
        )

    return sock.sendMessage(msg.key.remoteJid, {
        text:

`⏳ انتهت السحبات

🕒 الوقت المتبقي:

${minutes} دقيقة
${seconds} ثانية

🎁 تتجدد السحبات تلقائياً كل 30 دقيقة`
})
}

let luckBonus = 0

if ((player.level || 1) >= 10) {
    luckBonus = 3
}

let chance = Math.random() * 100

chance -= luckBonus

let rarity = 'عادي'

if (chance <= 5) {
    rarity = 'SSS'
} else if (chance <= 15) {
    rarity = 'اسطوري'
} else if (chance <= 40) {
    rarity = 'ممتاز'
}

const filteredCharacters =
    characters.filter(
        c => c.rarity === rarity
    )

if (!filteredCharacters.length) {

    return sock.sendMessage(msg.key.remoteJid, {
        text:

"❌ لا توجد شخصيات بهذا التصنيف: ${rarity}"
})
}

const randomCharacter =
    filteredCharacters[
        Math.floor(
            Math.random() *
            filteredCharacters.length
        )
    ]

player.characters.push(randomCharacter)

player.pulls -= 1

await player.save()

let imagePath = null

if (randomCharacter.rarity !== 'SSS') {
    imagePath = path.join(
        __dirname,
        randomCharacter.image
    )
}

if (randomCharacter.rarity === 'SSS') {

    return sock.sendMessage(msg.key.remoteJid, {
        image: {
            url: randomCharacter.image
        },
        caption:
`🌌 ═══════〔 إيقاظ أسطوري 〕═══════ 🌌

⚡ اهتزت الأبعاد!
🔥 طاقة هائلة تم اكتشافها!

━━━━━━━━━━━━━━

👑 ${randomCharacter.name}

🌟 التصنيف : SSS
⚔️ القوة : ${randomCharacter.power}

━━━━━━━━━━━━━━

🎊 مبارك!

لقد حصلت على إحدى أندر الشخصيات في اللعبة

🌌 الأنمي : ${randomCharacter.anime}

🏆 هذه الشخصية تمتلك قوة تتجاوز حدود الأساطير`
    })
}

if (!fs.existsSync(imagePath)) {

    return sock.sendMessage(msg.key.remoteJid, {
        text:

`❌ الصورة غير موجودة

الاسم: ${randomCharacter.name}
المسار: ${randomCharacter.image}`
})
}

return sock.sendMessage(msg.key.remoteJid, {
    image: fs.readFileSync(imagePath),

    caption:

`╭━━〔 ✦ 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑 𝐑𝐄𝐒𝐔𝐋𝐓 ✦ 〕━━╮

🧿 𝑵𝒂𝒎𝒆 ➤ ${randomCharacter.name}
🌟 𝑹𝒂𝒓𝒊𝒕𝒚 ➤ ${randomCharacter.rarity}
⚔️ 𝑷𝒐𝒘𝒆𝒓 ➤ ${randomCharacter.power}
🌌 𝑨𝒏𝒊𝒎𝒆 ➤ ${randomCharacter.anime}

🎟️ السحبات المتبقية ➤ ${player.pulls}/5

╰━━━━━━━━━━━━━━━━━━━━━━╯`
})
}

        // =========================
        // .شخصياتي
        // =========================


if (text === '.شخصياتي') {

    try {

        let player = await Player.findOne({ userId })

        if (!player) {
            player = await Player.create({
                userId,
                characters: []
            })
        }

        if (!player.characters || player.characters.length === 0) {
            return safeSend(msg.key.remoteJid, {
                text: '📭 لا توجد شخصيات لديك'
            })
        }

        let txt =
`👤 ━━〔 𝐘𝐎𝐔𝐑 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑𝐒 〕━━ 👤\n\n`

        player.characters.forEach((c, i) => {

            txt +=
`#${i + 1}
🧿 الاسم: ${c.name}
🌟 الندرة: ${c.rarity}
⚔️ القوة: ${c.power}
🌌 الأنمي: ${c.anime}

━━━━━━━━━━━━━━━\n`
        })

        return safeSend(msg.key.remoteJid, {
            text: txt
        })

    } catch (err) {
        console.log('my characters error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ في عرض الشخصيات'
        })
    }
}
        
// =========================
// .رصيدي
// =========================

if (text === '.رصيدي') {

    try {

        let player = await Player.findOne({ userId })

        if (!player) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك حساباً'
            })
        }

        return safeSend(msg.key.remoteJid, {
            text:

`╔════════════════════╗
💰 𝐏𝐑𝐎𝐅𝐈𝐋𝐄
╚════════════════════╝

💳 الرصيد:

${player.money || 0}

🎟️ السحبات:

${player.pulls || 0}

🎫 تذاكر المتجر:

${player.towerTickets || 0}

━━━━━━━━━━━━━━━━━━

🎖️ المستوى:

${player.level || 1}

⚔️ القتالات المتبقية:

${player.fights || 0}/5

╔════════════════════╗
🌟 𝐏𝐋𝐀𝐘𝐄𝐑 𝐈𝐍𝐅𝐎
╚════════════════════╝`
        })

    } catch (err) {

        console.log('Balance error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء جلب بياناتك'
        })
    }

}
        
// =========================
// .عرض
// =========================

if (text.startsWith('.عرض')) {

try {

    const args = text.split(' ')
    const number = Number(args[1]) - 1

    if (isNaN(number)) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ استخدم: .عرض رقم_الشخصية'
        })
    }

    let player = await Player.findOne({ userId })

    if (!player || !player.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا تملك شخصيات'
        })
    }

    const character = player.characters[number]

    if (!character) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ رقم الشخصية غير موجود'
        })
    }

    const captionSSS = `╔═══════════════════════╗
║ 👑 𝗦𝗦𝗦 • 𝗠𝗬𝗧𝗛𝗜𝗖 👑
╚═══════════════════════╝

⚜️ الاسم
➤ ${character.name}

🔥 الهيئة
➤ ${character.form || 'غير معروفة'}

💠 الندرة
➤ ${character.rarity}

⚔️ القوة
➤ ${character.power}

🌌 الأنمي
➤ ${character.anime}

✨ القدرة
➤ ${character.ability || 'لا توجد'}

━━━━━━━━━━━━━━━
🏆 شخصية أسطورية نادرة
━━━━━━━━━━━━━━━`

    const captionNormal = `╔════════════════════╗
🖼️ 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑
╚════════════════════╝

🧿 الاسم:
${character.name}

🌟 الندرة:
${character.rarity}

⚔️ القوة:
${character.power}

🌌 الأنمي:
${character.anime}

✨ القدرة:
${character.ability || 'لا توجد'}`

    // شخصيات SSS من رابط خارجي
    if (character.rarity === 'SSS') {

        return sock.sendMessage(msg.key.remoteJid, {
            image: {
                url: character.image
            },
            caption: captionSSS
        })

    }

    // الشخصيات العادية من ملفات البوت
    const imagePath = path.join(__dirname, character.image)

    if (!fs.existsSync(imagePath)) {
        return safeSend(msg.key.remoteJid, {
            text: `❌ صورة الشخصية غير موجودة

الاسم: ${character.name}
المسار: ${character.image}`
        })
    }

    return sock.sendMessage(msg.key.remoteJid, {
        image: fs.readFileSync(imagePath),
        caption: captionNormal
    })

} catch (err) {

    console.log('Show Character Error:', err)

    return safeSend(msg.key.remoteJid, {
        text: '❌ حدث خطأ أثناء عرض الشخصية'
    })
}

}
        
 // =========================
// .شراءمتجر
// =========================

if (text.startsWith('.شراءمتجر')) {

    try {

        const args = text.split(' ')
        const itemNumber = Number(args[1]) - 1

        const shop = await Shop.find()

        const item = shop[itemNumber]

        if (!item) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ العرض غير موجود'
            })
        }

        let player = await Player.findOne({ userId })

        if (!player) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك حساباً'
            })
        }

        player.money = player.money || 0
        player.characters = player.characters || []

        if (player.money < item.price) {

            return safeSend(msg.key.remoteJid, {
                text:
`❌ لا تملك مالاً كافياً

💰 المطلوب: ${item.price}
💳 رصيدك: ${player.money}`
            })
        }

      if (
    player.characters.length >=
    (player.maxCharacters || 30)
) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ وصلت للحد الأقصى (30 شخصية)'
            })
        }

        player.money -= item.price

        player.characters.push(item.character)

        await player.save()

        await Shop.findByIdAndDelete(item._id)

        return safeSend(msg.key.remoteJid, {
            text:

`╔════════════════════╗
        🏪 𝐒𝐇𝐎𝐏
╚════════════════════╝

✅ تم شراء الشخصية بنجاح

🧿 الاسم:
${item.character.name}

🌟 الندرة:
${item.character.rarity}

⚔️ القوة:
${item.character.power}

💰 السعر:
${item.price}

💳 رصيدك الحالي:
${player.money}

━━━━━━━━━━━━━━━━━━

🎉 تمت إضافة الشخصية إلى مجموعتك`
        })

    } catch (err) {

        console.log('Shop Buy Error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء الشراء'
        })
    }
}

        // =========================
        // .بيع
        // =========================

        if (text.startsWith('.بيع')) {

try {

    const args = text.split(' ').slice(1)

    if (!args.length) {

        return safeSend(msg.key.remoteJid, {
            text:

`❌ استخدم الأمر هكذا

.بيع 1

أو

.بيع 1 2 3 4`
})
}

    let player = await Player.findOne({ userId })

    if (!player) {

        return safeSend(msg.key.remoteJid, {
            text: '❌ لا تملك حساباً'
        })
    }

    player.characters = player.characters || []

    const indexes =
        [...new Set(
            args
                .map(x => Number(x) - 1)
                .filter(x => !isNaN(x))
        )]
        .sort((a, b) => b - a)

    let totalMoney = 0
    let soldCount = 0

    for (const index of indexes) {

        const character =
            player.characters[index]

        if (!character)
            continue

        const sellPrice = Math.max(
            100,
            Math.floor(character.power / 2)
        )

        totalMoney += sellPrice
        soldCount++

        player.characters.splice(index, 1)
    }

    if (soldCount === 0) {

        return safeSend(msg.key.remoteJid, {
            text: '❌ لم يتم العثور على شخصيات صالحة للبيع'
        })
    }

    player.money =
        (player.money || 0) + totalMoney

    await player.save()

    return safeSend(msg.key.remoteJid, {
        text:

`💰 ━━〔 𝐒𝐄𝐋𝐋 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 〕━━ 💰

✅ تم بيع ${soldCount} شخصية

💵 إجمالي الأرباح:
${totalMoney}

💳 رصيدك الحالي:
${player.money}`
})

} catch (err) {

    console.log('Sell error:', err)

    return safeSend(msg.key.remoteJid, {
        text: '❌ حدث خطأ أثناء البيع'
    })
}

}


// =========================
// .مزاد
// =========================

if (text.startsWith('.مزاد')) {

    try {

        const args = text.trim().split(' ')

const price = Number(args.pop())
const charPower = Number(args.pop())
const charName = args.slice(1).join(' ')

        if (!charName || isNaN(charPower) || isNaN(price)) {

            return safeSend(msg.key.remoteJid, {
                text:
`❌ استخدم الأمر هكذا

.مزاد اسم_الشخصية القوة السعر

مثال:
.مزاد Hashirama 2300 5000`
            })
        }

        let player = await Player.findOne({ userId })

        if (!player) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك حساباً'
            })
        }

        player.characters = player.characters || []

        const charIndex =
    player.characters.findIndex(c =>
        c.name.toLowerCase().trim() === charName.toLowerCase().trim() &&
        Number(c.power) === charPower
    )

        if (charIndex === -1) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ الشخصية غير موجودة لديك'
            })
        }

        const character =
            player.characters[charIndex]

        await Market.create({
            seller: userId,
            character,
            price
        })

        player.characters.splice(charIndex, 1)

        await player.save()

    return safeSend(msg.key.remoteJid, {
        text: `╔════════════════════╗
🏪 𝐀𝐔𝐂𝐓𝐈𝐎𝐍
╚════════════════════╝

✅ تم عرض الشخصية في السوق

🧿 الاسم :
${character.name}

🌟 الندرة :
${character.rarity}

⚔️ القوة :
${character.power}

💰 السعر :
${price}

━━━━━━━━━━━━━━━━━━

🛒 يمكن للاعبين الآن شراء الشخصية

💡 للعرض:
.السوق`
    })

} catch (err) {

        console.log('Auction error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء إنشاء المزاد'
        })
    }

} // <-- إغلاق if (text.startsWith('.مزاد'))

        // =========================
        // .السوق
        // =========================

        if (text === '.السوق') {

    try {

        const market = await Market.find()

        if (!market.length) {
            return safeSend(msg.key.remoteJid, {
                text:
`╭━━━〔 🏪 السوق العالمي 〕━━━╮

📭 لا توجد شخصيات معروضة حالياً

╰━━━━━━━━━━━━━━━━━━╯`
            })
        }

        let txt =
`╔══════════════╗
🏪 السوق العالمي
╚══════════════╝`

        market.forEach((item, i) => {

            txt +=
`╭─〔 #${i + 1} 〕─╮
🧿 الاسم : ${item.character.name}
🌟 الندرة : ${item.character.rarity}
⚔️ القوة : ${item.character.power}
💰 السعر : ${item.price}
╰──────────╯

`
        })

        txt +=
`━━━━━━━━━━━━━━━━━━
💡 للشراء:

.شراء رقم_العرض`

        return safeSend(msg.key.remoteJid, {
            text: txt
        })

    } catch (err) {

        console.log('Market error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ في عرض السوق'
        })
    }
}

        // =========================
        // .شراء
        // =========================

    if (text.startsWith('.شراء') && !text.startsWith('.شراءمتجر') && !text.startsWith('.شراءصندوق')) {
    try {
        const args = text.split(' ')
        const itemNumber = Number(args[1]) - 1

        const market = await Market.find()
        const item = market[itemNumber]

        if (!item || !item.character) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ العرض غير موجود'
            })
        }

        let player = await Player.findOne({ userId })
        if (!player) {
            player = new Player({
                userId,
                characters: [],
                money: 0
            })
        }

        player.characters = player.characters || []
        player.money = player.money || 0

        if (player.money < item.price) {
            return safeSend(msg.key.remoteJid, {
                text: `❌ لا تملك مالاً كافياً\n\n💰 المطلوب: ${item.price}\n💳 رصيدك: ${player.money}`
            })
        }

        if (player.characters.length >= (player.maxCharacters || 30)) {
            return safeSend(msg.key.remoteJid, {
                text: `❌ المخزون ممتلئ\n\n📦 السعة الحالية:\n${player.maxCharacters || 30}`
            })
        }

        player.money -= item.price
        player.characters.push(item.character)

        // تحويل المال للبائع
        const seller = await Player.findOne({ userId: item.seller })
        if (seller) {
            seller.money = (seller.money || 0) + item.price
            await seller.save()
        }

        await player.save()
        await Market.findByIdAndDelete(item._id)

        return safeSend(msg.key.remoteJid, {
            text: `╔════════════════════╗\n🛒 𝐏𝐔𝐑𝐂𝐇𝐀𝐒𝐄\n╚════════════════════╝\n\n✅ تم شراء الشخصية بنجاح\n\n🧿 الاسم :\n${item.character.name}\n\n🌟 الندرة :\n${item.character.rarity}\n\n⚔️ القوة :\n${item.character.power}\n\n💰 السعر :\n${item.price}\n\n💳 رصيدك الحالي :\n${player.money}\n\n━━━━━━━━━━━━━━━\n\n🎉 تمت إضافة الشخصية إلى مجموعتك`
        })

    } catch (err) {
        console.log('Buy error:', err)
        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء عملية الشراء'
        })
    }
}



// =========================
// .شراء
// =========================

if (text === '.متجر') {

    try {

        const shop = await Shop.find()

        if (!shop.length) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ لا توجد شخصيات في المتجر حالياً'
            })
        }

        let txt =
`╔════════════════════╗
        🏪 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑 𝐒𝐇𝐎𝐏
╚════════════════════╝

🎁 يتم تجديد المتجر كل ساعة

━━━━━━━━━━━━━━━━━━

`

        shop.forEach((item, i) => {

            txt +=
`╭────〔 ${i + 1} 〕────╮
🧿 الاسم : ${item.character.name}
🌟 الندرة : ${item.character.rarity}
⚔️ القوة : ${item.character.power}
🎭 الشكل : ${item.character.form || 'عادي'}
✨ القدرة : ${item.character.ability || 'لا يوجد'}
💰 السعر : ${item.price}
╰────────────────╯

`
        })

        txt +=
`━━━━━━━━━━━━━━━━━━

🛒 للشراء:

.شراءمتجر رقم_العرض

مثال:
.شراءمتجر 1`

        return safeSend(msg.key.remoteJid, { text: txt })

    } catch (err) {

        console.log('Shop error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء فتح المتجر'
        })
    }
}
        
// =========================
// .قتال_مجموع
// =========================


        if (text.startsWith('.قتال_مجموع')) {

try {
    
    
    const mentioned =
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;

    if (!mentioned || !mentioned[0]) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ استخدم منشن\n\nمثال:\n.قتال_مجموع @user'
        });
    }

    const targetId = mentioned[0];

    const me = await Player.findOne({ userId });
const enemy = await Player.findOne({ userId: targetId });

if (!me || !enemy) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ أحد اللاعبين لا يملك حساباً'
    });
}

me.rewardedLevels = me.rewardedLevels || [];
me.specialAbilities = me.specialAbilities || [];
    
    if (me.fights == null) me.fights = 5;
if (!me.lastFightReset) me.lastFightReset = Date.now();

const now = Date.now();
const fightCooldown = 30 * 60 * 1000;

if (now - me.lastFightReset >= fightCooldown) {
    me.fights = 5;
    me.lastFightReset = now;
    }

    if ((me.fights || 0) <= 0) {

        const remaining = fightCooldown - (now - me.lastFightReset);

        const minutes = Math.floor(remaining / (1000 * 60));

        return safeSend(msg.key.remoteJid, {
            text:
`❌ انتهت محاولات القتال

⚔️ المتبقي: 0/5

🕒 الوقت المتبقي: ${minutes} دقيقة

🔄 تتجدد المحاولات كل 30 دقيقة`
        });
    }

    if (!me.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا تملك شخصيات'
        });
    }

    if (!enemy.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ الخصم لا يملك شخصيات'
        });
    }

    let myPower =
        me.characters.reduce((sum, c) => sum + Number(c.power || 0), 0);

    let enemyPower =
        enemy.characters.reduce((sum, c) => sum + Number(c.power || 0), 0);

    let myAttack = myPower
let enemyAttack = enemyPower;

let myAbilityName = 'بدون';
let myAbilityDescription = 'لا يوجد';
let myAbilityTier = 'عادية';

let enemyAbilityName = 'بدون';
let enemyAbilityDescription = 'لا يوجد';
let enemyAbilityTier = 'عادية';

let reducedReward = false;

    const common = [
        ['🔥 غضب المحارب','يزيد القوة بنسبة 30%',() => { myAttack += Math.floor(myAttack * 0.30) }],
        ['💥 الضربة الحرجة','يزيد القوة بنسبة 50%',() => { myAttack += Math.floor(myAttack * 0.50) }],
        ['🛡️ درع الحماية','يقلل ضرر الخصم بنسبة 25%',() => { enemyAttack -= Math.floor(enemyAttack * 0.25) }],
        ['🔄 الكاونتر','يعكس 20% من قوة الخصم عليه',() => { enemyAttack -= Math.floor(enemyAttack * 0.20) }],
        ['🃏 نين متطور','يزيد القوة بنسبة 40%',() => { myAttack += Math.floor(myAttack * 0.40) }],
        ['🌊 تنفس الماء','يزيد القوة بنسبة 45%',() => { myAttack += Math.floor(myAttack * 0.45) }],
        ['🔵 طور الناسك','يزيد القوة بنسبة 35%',() => { myAttack += Math.floor(myAttack * 0.35) }]
    ];

    const rare = [
        ['🍈 أكل فاكهة شيطان','يزيد القوة بنسبة 50%',() => { myAttack += Math.floor(myAttack * 0.50) }],
        ['⚔️ بانكاي','يزيد القوة بنسبة 40%',() => { myAttack += Math.floor(myAttack * 0.40) }],
        ['⚔️ هاكي التصلب المتقدم','يزيد القوة بنسبة 55%',() => { myAttack += Math.floor(myAttack * 0.55) }],
        ['🟡 سوبر سايان','يزيد القوة بنسبة 60%',() => { myAttack += Math.floor(myAttack * 0.60) }],
        ['⚡ تنفس البرق','يزيد القوة بنسبة 70%',() => { myAttack += Math.floor(myAttack * 0.70) }],
        ['👁️ مانغيكيو شارينغان','يزيد القوة بنسبة 45%',() => { myAttack += Math.floor(myAttack * 0.45) }],
        ['👑 قوة الكوينشي','يزيد القوة بنسبة 50%',() => { myAttack += Math.floor(myAttack * 0.50) }],
        ['⚡ الغريزة الفائقة','تفادي',() => {
            if (Math.random() <= 0.30) enemyAttack = 0;
        }],
        ['🌪️ الاستبدال','تفادي',() => { enemyAttack = 0 }]
    ];

    const legendary = [
        ['🔴 سوبر سايان غود','يزيد القوة بنسبة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['🔥 تنفس الشمس','يزيد القوة بنسبة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['👑 هاكي الملوك','يضعف الخصم 25%',() => { enemyAttack -= Math.floor(enemyAttack * 0.25) }],
        ['🖤 أنتي ماجيك','يقلل الخصم 40%',() => { enemyAttack -= Math.floor(enemyAttack * 0.40) }],
        ['👁️ العين الشاملة','يقلل الخصم 30%',() => { enemyAttack -= Math.floor(enemyAttack * 0.30) }],
        ['🔥 أماتيراسو','يقلل الخصم 20%',() => { enemyAttack -= Math.floor(enemyAttack * 0.20) }],
        ['⚔️ سوسانو الكامل','يزيد القوة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['👑 ملك السحر','يزيد القوة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['👑 ملك اللعنات','يزيد القوة 100%',() => { myAttack += Math.floor(myAttack * 1.00) }],
        ['⚙️ جير 5','يزيد القوة 80%',() => { myAttack += Math.floor(myAttack * 0.80) }],
        ['♾️ اللانهاية','يقلل الخصم 40%',() => { enemyAttack -= Math.floor(enemyAttack * 0.40) }]
    ];

    const epic = [
        ['🐉 نيكا','يزيد القوة 100%',() => { myAttack += Math.floor(myAttack * 1.00) }],
        ['🌀 كسر الحدود','يزيد القوة 200%',() => { myAttack += Math.floor(myAttack * 2.00) }],
        ['🎲 الحظ المطلق','×2',() => { myAttack *= 2 }],
        ['🌟 قوة البطل المختار','×2',() => { myAttack *= 2 }],
        ['🌌 الصحوة الكاملة','×2.5',() => { myAttack *= 2.5 }],
        ['👊 البوابة الثامنة','+70%',() => {
            myAttack += Math.floor(myAttack * 0.70);
            reducedReward = true;
        }]
    ];

    const tierChance = Math.random() * 100;

let selectedPool;

if (tierChance <= 50) {
    selectedPool = common;
    myAbilityTier = 'عادية';
} else if (tierChance <= 80) {
    selectedPool = rare;
    myAbilityTier = 'نادرة';
} else if (tierChance <= 95) {
    selectedPool = legendary;
    myAbilityTier = 'أسطورية';
} else {
    selectedPool = epic;
    myAbilityTier = 'ملحمية';
}

    // قدرة اللاعب
    const myAbility =
        selectedPool[Math.floor(Math.random() * selectedPool.length)];

    myAbilityName = myAbility[0];
    myAbilityDescription = myAbility[1];
    

    myAbility[2]();

    // قدرة العدو
    const enemyTierChance = Math.random() * 100;

    let enemyPool;

    if (enemyTierChance <= 50) enemyPool = common;
    else if (enemyTierChance <= 80) enemyPool = rare;
    else if (enemyTierChance <= 95) enemyPool = legendary;
    else enemyPool = epic;

    const enemyAbility =
        enemyPool[Math.floor(Math.random() * enemyPool.length)];

    enemyAbilityName = enemyAbility[0];
    enemyAbilityDescription = enemyAbility[1];

    const oldMyAttack = myAttack;

    myAttack = enemyAttack;
    enemyAbility[2]();
    enemyAttack = myAttack;
    myAttack = oldMyAttack;

    const finalMyAttack = Math.floor(myAttack);
    const finalEnemyAttack = Math.floor(enemyAttack);

    let winner;
    let reward;
    let winnerId;

    if (finalMyAttack >= finalEnemyAttack) {
        winnerId = userId;
        winner = 'أنت';
        reward = Math.max(500, Math.floor(enemyPower / 10));
    } else {
        winnerId = targetId;
        winner = 'الخصم';
        reward = Math.max(500, Math.floor(myPower / 10));
    }

    me.money = (me.money || 0) + reward;
    me.xp = (me.xp || 0) + 100;

    let levelUpMessage = '';

while ((me.xp || 0) >= Math.floor(300 + (me.level * 150))) {

    const neededXp = Math.floor(300 + (me.level * 150));

    me.xp -= neededXp;
me.level += 1;

// المستوى الجديد
const currentLevel = me.level;

levelUpMessage += `🎉 وصلت إلى المستوى ${currentLevel}\n`;
levelUpMessage += `💰 حصلت على 500 مال\n`;

const ability = levelAbilities[currentLevel];

if (ability) {

    me.specialAbilities = me.specialAbilities || [];

    if (!me.specialAbilities.includes(ability.name)) {

        me.specialAbilities.push(ability.name);

        me.attackBonus = me.attackBonus || 0;
        me.defenseBonus = me.defenseBonus || 0;
        me.critBonus = me.critBonus || 0;
        me.dodgeBonus = me.dodgeBonus || 0;
        me.reflectBonus = me.reflectBonus || 0;
        me.lifestealBonus = me.lifestealBonus || 0;
        me.bossDamageBonus = me.bossDamageBonus || 0;

        switch (ability.type) {
            case "attack": me.attackBonus += ability.value; break;
            case "defense": me.defenseBonus += ability.value; break;
            case "crit": me.critBonus += ability.value; break;
            case "dodge": me.dodgeBonus += ability.value; break;
            case "reflect": me.reflectBonus += ability.value; break;
            case "lifesteal": me.lifestealBonus += ability.value; break;
            case "bossDamage": me.bossDamageBonus += ability.value; break;
        }

        levelUpMessage += `
✨ قدرة جديدة

${ability.name}

📜 ${ability.description}

📈 التأثير: +${ability.value}%
`;
    }
}

me.money += 500;


// 🟢 صندوق كل 10 مستويات (مرة واحدة فقط)
if (currentLevel % 10 === 0) {

    me.maxCharacters = (me.maxCharacters || 30) + 5;

    levelUpMessage += `
📦 زيادة المخزون

➕ +5 شخصيات

📦 السعة الجديدة:
${me.maxCharacters}
`;
}

    me.rewardedLevels ||= [];
me.boxes ||= {
    basic: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    sss_chance: 0,
    sss_high: 0
};

if (!me.rewardedLevels.includes(currentLevel)) {

    switch (currentLevel) {

        case 10:
            me.boxes.basic += 5;
            levelUpMessage += `🎁 حصلت على 5 صناديق عادية\n`;
            break;

        case 20:
            me.boxes.rare += 3;
            levelUpMessage += `🎁 حصلت على 3 صناديق نادرة\n`;
            break;

        case 30:
            me.boxes.rare += 5;
            levelUpMessage += `🎁 حصلت على 5 صناديق نادرة\n`;
            break;

        case 40:
            me.boxes.epic += 2;
            levelUpMessage += `🎁 حصلت على 2 صندوق ملحمي\n`;
            break;

        case 50:
            me.boxes.epic += 4;
            levelUpMessage += `🎁 حصلت على 4 صناديق ملحمية\n`;
            break;

        case 60:
            me.boxes.legendary += 1;
            levelUpMessage += `🎁 حصلت على صندوق أسطوري\n`;
            break;

        case 70:
            me.boxes.legendary += 2;
            levelUpMessage += `🎁 حصلت على 2 صندوق أسطوري\n`;
            break;

        case 80:
            me.boxes.legendary += 3;
            levelUpMessage += `🎁 حصلت على 3 صناديق أسطورية\n`;
            break;

        case 90:
            me.boxes.sss_chance += 1;
            levelUpMessage += `🎁 حصلت على صندوق فرصة SSS\n`;
            break;

        case 100:
            me.boxes.sss_high += 1;
            levelUpMessage += `👑 حصلت على صندوق SSS عالي\n`;
            break;
    }

    me.rewardedLevels.push(currentLevel);
}
    if (me.level >= 100) {
    me.level = 100;
    me.xp = 0;
    break;
    }
}

me.fights -= 1;
await me.save();

if (levelUpMessage) {
    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🎉 مبروك @${userId.split('@')[0]}

${levelUpMessage}`,
            mentions: [userId]
        }
    );
}

const battleMessage = `⚔️ ══〔 GRAND BATTLE〕══ ⚔️
👤 مجموع قوتك:
${myPower}

👥 مجموع قوة الخصم:
${enemyPower}

━━━━━━━━━━━━━━━━━━

✨ قدرتك:
${myAbilityName}

📖 الوصف:
${myAbilityDescription}

🏷️ التصنيف:
${myAbilityTier}

━━━━━━━━━━━━━━━━━━

✨ قدرة الخصم:
${enemyAbilityName}

📖 الوصف:
${enemyAbilityDescription}

🏷️ التصنيف:
${enemyAbilityTier}

━━━━━━━━━━━━━━━━━━

⚔️ قوتك النهائية:
${Math.floor(myAttack)}

🛡️ قوة الخصم النهائية:
${Math.floor(enemyAttack)}

━━━━━━━━━━━━━━━━━━

👑 الفائز:
@${winnerId.split('@')[0]}

💰 المكافأة:
${reward}

🎖️ المستوى:
${me.level}

⭐ الخبرة:
${me.xp}

⚔️ القتالات المتبقية:
${me.fights}/5`;

return safeSend(msg.key.remoteJid, {
    text: battleMessage,
    mentions: [winnerId || userId || targetId]
});

 } catch (err) {

        console.log(err);

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء القتال'
        });
    }

} // ← إغلاق if
        
        // =========================
        // .قتال
        // =========================

    
if (text.startsWith('.قتال')) {

    try {

        const args = text.trim().split(' ')

        const charPower = Number(args[args.length - 2])
        const charName = args.slice(1, -2).join(' ')

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

        if (!mentioned || !mentioned[0]) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ استخدم منشن\n\nمثال:\n.قتال Hashirama 2300 @user'
            })
        }

        const target = mentioned[0]

        const me = await Player.findOne({ userId })
        const enemy = await Player.findOne({ userId: target })

        if (!me) {
            return safeSend(msg.key.remoteJid, { text: '❌ لا تملك حساباً' })
        }

        if (!enemy) {
            return safeSend(msg.key.remoteJid, { text: '❌ الخصم لا يملك حساباً' })
        }

        // =====================
        // تجهيز البيانات
        // =====================

        me.abilities = me.abilities || []
        enemy.abilities = enemy.abilities || []

        const safeLevelAbilities = levelAbilities || {}

        function getLevelAbilities(level) {
            const result = []
            for (let lvl in safeLevelAbilities) {
                if (level >= Number(lvl)) {
                    result.push(safeLevelAbilities[lvl])
                }
            }
            return result
        }

        me.levelAbilities = getLevelAbilities(me.level || 1)
        enemy.levelAbilities = getLevelAbilities(enemy.level || 1)

        me.allAbilities = [...me.abilities, ...me.levelAbilities]
        enemy.allAbilities = [...enemy.abilities, ...enemy.levelAbilities]

        // =====================
        // نظام القتالات (Cooldown)
        // =====================

        const now = Date.now()
        const cooldown = 30 * 60 * 1000

        if (me.fights == null) me.fights = 5
        if (!me.lastFightReset) me.lastFightReset = now

        if (now - me.lastFightReset >= cooldown) {
            me.fights = 5
            me.lastFightReset = now
        }

        if (me.fights <= 0) {
            return safeSend(msg.key.remoteJid, {
                text: '⏳ انتهت القتالات اليومية (5/5)'
            })
        }

        me.characters = me.characters || []
        enemy.characters = enemy.characters || []

        const myCharacter = me.characters.find(c =>
    c.name?.toLowerCase().trim() === charName.toLowerCase().trim() &&
    Number(c.power) == Number(charPower)
)

        if (!myCharacter) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ الشخصية غير موجودة لديك'
            })
        }

        if (!enemy.characters.length) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ الخصم لا يملك شخصيات'
            })
        }

        // =====================
        // اختيار شخصية الخصم
        // =====================

        const sortedChars = [...enemy.characters].sort((a, b) => b.power - a.power)
        const chance = Math.random() * 100

        let enemyCharacter

        if (chance <= 30) {
            enemyCharacter = sortedChars[0]
        } else if (chance <= 70) {
            enemyCharacter = sortedChars[sortedChars.length - 1]
        } else {
            enemyCharacter = sortedChars[Math.floor(Math.random() * sortedChars.length)]
        }

        if (!enemyCharacter) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ لا يمكن اختيار شخصية للخصم'
            })
        }

        // =====================
        // حساب القوة
        // =====================

        let myAttack =
            myCharacter.power +
            (me.level || 1) * 5 +
            Math.floor(Math.random() * 300)

        let enemyAttack =
            enemyCharacter.power +
            (enemy.level || 1) * 5 +
            Math.floor(Math.random() * 300)

        let finalMyAttack = myAttack
        let finalEnemyAttack = enemyAttack

        let abilityMessage = ''

        // =====================
        // القدرات
        // =====================

        for (let ab of me.allAbilities || []) {

            if (!ab) continue

            if (ab.type === "attack") {
                finalMyAttack += finalMyAttack * (ab.value || 0) / 100
            }

            if (ab.type === "defense") {
                finalEnemyAttack -= finalEnemyAttack * (ab.value || 0) / 100
            }

            if (ab.type === "crit") {
                if (Math.random() * 100 < (ab.value || 0)) {
                    finalMyAttack *= 2
                    abilityMessage += `\n⚡ كريتيكال من ${ab.name || 'قدرة'}`
                }
            }

            if (ab.type === "dodge") {
                if (Math.random() * 100 < (ab.value || 0)) {
                    finalEnemyAttack = 0
                    abilityMessage += `\n💨 مراوغة من ${ab.name || 'قدرة'}`
                }
            }

            if (ab.type === "reflect") {
                const reflected = Math.floor(finalEnemyAttack * (ab.value || 0) / 100)
                finalMyAttack += reflected
                abilityMessage += `\n🔄 عكس ضرر من ${ab.name || 'قدرة'}`
            }

            if (ab.type === "lifesteal") {
                const heal = finalMyAttack * (ab.value || 0) / 100
                me.hp = (me.hp || 100) + heal
            }
        }

        // =====================
        // تحديد الفائز
        // =====================

        const rewards = {
            'عادي': 100,
            'ممتاز': 300,
            'اسطوري': 1000,
            'SSS': 3000
        }

        let winner
        let reward = 0

        if (finalMyAttack >= finalEnemyAttack) {

            winner = me.userId || userId

            reward = rewards[enemyCharacter.rarity] || 100

            me.money = (me.money || 0) + reward
            me.xp = (me.xp || 0) + 200

        } else {

            winner = enemy.userId

            reward = rewards[myCharacter.rarity] || 100

            enemy.money = (enemy.money || 0) + reward
        }

        // =====================
        // لفل أب
        // =====================

        while ((me.xp || 0) >= Math.floor(300 + ((me.level || 1) * 150))) {

            me.xp -= Math.floor(300 + ((me.level || 1) * 150))
            me.level = (me.level || 1) + 1

            if (me.level >= 100) {
                me.level = 100
                me.xp = 0
                break
            }

            me.money = (me.money || 0) + 500
        }

        me.fights = Math.max(0, (me.fights || 0) - 1)

        // =====================
        // حفظ البيانات
        // =====================

        await me.save()
        await enemy.save()

        // =====================
        // الرسالة النهائية
        // =====================

        const battleMessage = `
╔══════════════════════╗
        ⚔️ 𝐄𝐏𝐈𝐂 𝐁𝐀𝐓𝐓𝐋𝐄 ⚔️
╚══════════════════════╝

🛡️ 𝐘𝐎𝐔𝐑 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑

🧿 الاسم:
${myCharacter.name || 'غير معروف'}

⚡ القوة:
${myCharacter.power}

━━━━━━━━━━━━━━━━━━

🎯 𝐄𝐍𝐄𝐌𝐘 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑

🧿 الاسم:
${enemyCharacter.name || 'غير معروف'}

⚡ القوة:
${enemyCharacter.power}

━━━━━━━━━━━━━━━━━━

${abilityMessage ? `✨ القدرات:\n${abilityMessage}\n━━━━━━━━━━━━━━━━━━` : ''}

🏆 الفائز:
@${(winner || userId).split('@')[0]}

💰 المكافأة:
${reward}

⭐ الخبرة:
+200

🎟️ القتالات المتبقية:
${me.fights}/5

━━━━━━━━━━━━━━━━━━
🔥 نهاية القتال
`

        return safeSend(msg.key.remoteJid, {
            text: battleMessage,
            mentions: [me.userId, enemy.userId].filter(Boolean)
        })

    } catch (err) {
        console.log(err)
        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء القتال'
        })
    }
}
        

async function distributeBossRewards(sock, groupId) {

    const players = await Player.find({
        bossDamage: { $gt: 0 }
    })

    if (!players.length) return

    players.sort((a, b) =>
        (b.bossDamage || 0) - (a.bossDamage || 0)
    )

    const first = players[0]
    const second = players[1]

    if (first) {
        first.money = (first.money || 0) + 10000
        first.xp = (first.xp || 0) + 1000

        const legendaryChars = characters.filter(
    c => c.rarity === "اسطوري"
)

        if (legendaryChars.length) {
            const reward =
                legendaryChars[Math.floor(Math.random() * legendaryChars.length)]

            first.characters = first.characters || []
            first.characters.push(JSON.parse(JSON.stringify(reward)))
        }

        await first.save()
    }

    if (second) {
        second.money = (second.money || 0) + 5000
        second.xp = (second.xp || 0) + 500

        const roll = Math.random() * 100

        let reward = null

        if (roll <= 30) {
            const legendaryChars = characters.filter(
    c => c.rarity === "اسطوري"
)

            if (legendaryChars.length) {
                reward =
                    legendaryChars[Math.floor(Math.random() * legendaryChars.length)]
            }

        } else if (roll <= 80) {
            const epicChars = characters.filter(
    c => c.rarity === "ممتاز"
)

            if (epicChars.length) {
                reward =
                    epicChars[Math.floor(Math.random() * epicChars.length)]
            }
        }

        if (reward) {
            second.characters = second.characters || []
            second.characters.push(JSON.parse(JSON.stringify(reward)))
        }

        await second.save()
    }

    for (let i = 2; i < players.length; i++) {

        const player = players[i]

        player.money = (player.money || 0) + 2500
        player.xp = (player.xp || 0) + 500

        const epicChars = characters.filter(
    c => c.rarity === "ممتاز"
)

        if (epicChars.length) {
            const reward =
                epicChars[Math.floor(Math.random() * epicChars.length)]

            player.characters = player.characters || []
            player.characters.push(JSON.parse(JSON.stringify(reward)))
        }

        await player.save()
    }

    const rankingData = players.map(p => ({
        userId: p.userId,
        damage: p.bossDamage || 0
    }))

    await Player.updateMany(
    {},
    {
        $set: {
            bossDamage: 0
        }
    }
)

console.log("All boss damage reset")

    const mentions = players.map(p =>
        p.userId.includes("@")
            ? p.userId
            : p.userId + "@s.whatsapp.net"
    )

    
    let ranking = ''

    rankingData.forEach((p, i) => {
        ranking += `${i + 1}- @${p.userId.split('@')[0]}
💥 الضرر: ${p.damage}

`
    })

    console.log("BEFORE SEND MESSAGE")
console.log("groupId =", groupId)
console.log("mentions =", mentions)

await sock.sendMessage(groupId, {
    text: `🏆 اختبار رسالة الزعيم`
})

await sock.sendMessage(groupId, {
    text: `🏆 ═══〔 نتائج الزعيم العالمي 〕═══ 🏆

🥇 المركز الأول
@${players[0]?.userId.split('@')[0] || 'لا يوجد'}
🎁 10000 مال
🎁 1000 XP
🎁 شخصية أسطورية

━━━━━━━━━━━━━━━━━━

🥈 المركز الثاني
@${players[1]?.userId.split('@')[0] || 'لا يوجد'}
🎁 5000 مال
🎁 500 XP

━━━━━━━━━━━━━━━━━━

🥉 المركز الثالث وما بعده
🎁 2500 مال
🎁 500 XP
🎁 شخصية ممتازة

━━━━━━━━━━━━━━━━━━

📊 الترتيب النهائي

${ranking}

━━━━━━━━━━━━━━━━━━

🎁 تم توزيع الجوائز على الفائزين
⭐ شكراً لجميع المشاركين

⚔️ استعدوا للزعيم القادم!`,
    mentions
})

console.log("AFTER SEND MESSAGE")

} // إغلاق distributeBossRewards
}) // <-- هذا الإغلاق الصحيح والوحيد لـ messages.upsert (بعد نهاية كل الأوامر)
} // <-- هذا الإغلاق الصحيح لدالة startBot بالكامل

// 3. السطر الأخير والوحيد في نهاية الملف لتشغيل البوت
startBot().catch(console.error);
