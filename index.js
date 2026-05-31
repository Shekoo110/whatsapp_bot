const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')
const express = require("express")
const QRCode = require("qrcode")

const mongoose = require('mongoose')
const bosses = require('./bosses')
const Player = require('./models/Player')
const Market = require('./models/Market')
const Shop = require('./models/Shop')

const characters = require('./characters.json')
const allCharacters =
    require('./characters.json')
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
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

        money: 0
    }
}

// =========================
// متجر الشخصيات
// =========================

async function generateShop() {

    const shopItems = await Shop.find()

    if (shopItems.length > 0) {

        const age =
            Date.now() - shopItems[0].createdAt

        if (age < 24 * 60 * 60 * 1000)
            return
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

        const pool =
            characters.filter(
                c => c.rarity === rarity
            )

        if (!pool.length) continue

        const character =
            pool[
                Math.floor(
                    Math.random() * pool.length
                )
            ]

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

// =========================
// تشغيل البوت
// =========================

async function startBot() {

    const { state, saveCreds } =
        await useMultiFileAuthState('auth')

    const sock = makeWASocket({
        auth: state
    })
    const safeSend = async (jid, data) => {
    try {
        return await sock.sendMessage(jid, data)
    } catch (e) {
        console.log('Send error:', e)
    }
    }

    // ===== QR =====

    sock.ev.on('connection.update', async (update) => {

        const { connection, qr } = update

        if (qr) {

            qrCodeData =
            await QRCode.toDataURL(qr)

            console.log("QR READY")
        }

        if (connection === 'open') {

            console.log('البوت اشتغل')

            qrCodeData = ""
        }

        if (connection === 'close') {

            console.log('انقطع الاتصال... إعادة تشغيل')

            startBot()
        }

    })

    sock.ev.on('creds.update', saveCreds)

    // =========================
    // استقبال الرسائل
    // =========================

    sock.ev.on('messages.upsert', async ({ messages }) => {

    const msg = messages[0]

    console.log('CHAT ID:', msg.key.remoteJid)

    if (!msg.message) return

    // باقي الكود

        if (!msg.message || !msg.key.remoteJid) return

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text

        if (!text) return

        const userId =
            msg.key.participant ||
            msg.key.remoteJid

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
            text:

"⏳ انتظر ${left} ثانية قبل الهجوم مرة أخرى"
}
)
}

me.lastBossAttack = now

const strongest = me.characters.sort(
    (a, b) => b.power - a.power
)[0]

let damage = strongest.power

let abilityText = ""

const roll = Math.random() * 100

if (roll <= 15) {

    damage *= 2

    abilityText =

`🔥 قدرة مفعلة

⚡ ضربة حرجة

📖 ضاعف الضرر ×2`
}

else if (roll <= 25) {

    damage = Math.floor(
        damage * 1.5
    )

    abilityText =

`👑 قدرة مفعلة

⚡ هاكي الملك

📖 زاد الضرر 50%`
}

else if (roll <= 33) {

    damage += 1000

    abilityText =

`✨ قدرة مفعلة

⚡ استيقاظ

📖 زاد الضرر 1000`
}

else if (roll <= 45) {

    damage *= 2

    abilityText =

`⚡ قدرة مفعلة

⚡ سرعة خارقة

📖 حصلت على هجمة إضافية`
}

if (Math.random() <= 0.15) {

    await safeSend(
        msg.key.remoteJid,
        {
            text:

`👑 ${currentBoss.name}

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

currentBoss.hp -= damage

if (currentBoss.hp < 0)
currentBoss.hp = 0

if (currentBoss.hp <= 0) {

currentBoss.hp = 0

await distributeBossRewards(
    msg.key.remoteJid
)

currentBoss = null

return

}

me.bossDamage =
    (me.bossDamage || 0) + damage

await me.save()

if (currentBoss.hp <= 0) {

    currentBoss.hp = 0

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`🏆 تم هزيمة الزعيم!

👑 ${currentBoss.name}

💥 الضربة القاضية بواسطة:
${strongest.name}

🎁 سيتم توزيع الجوائز قريباً`
}
)
}

return safeSend(
    msg.key.remoteJid,
    {
        text:

`⚔️ هجوم على الزعيم

🧿 الشخصية:
${strongest.name}

💥 الضرر:
${damage}

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

        caption:

`👑 الزعيم العالمي

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

if (player.characters.length >= 30) {
    return sock.sendMessage(msg.key.remoteJid, {
        text: '❌ الحد الأقصى 30 شخصية'
    })
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

const imagePath =
    path.join(
        __dirname,
        randomCharacter.image
    )

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

━━━━━━━━━━━━━━━━━━

🎖️ المستوى:

${player.level || 1}

⚔️ القتالات المتبقية:

${player.dailyBattles || 0}/5

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

    const imagePath =
        path.join(__dirname, character.image)

    if (!fs.existsSync(imagePath)) {

        return safeSend(msg.key.remoteJid, {
            text:

`❌ صورة الشخصية غير موجودة

الاسم: ${character.name}
المسار: ${character.image}`
})
}

    return sock.sendMessage(msg.key.remoteJid, {
        image: fs.readFileSync(imagePath),

        caption:

`╔════════════════════╗
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

        if (player.characters.length >= 30) {

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

        const args = text.split(' ')

        const charName = args[1]
        const charPower = Number(args[2])
        const price = Number(args[3])

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
                c.name.toLowerCase() === charName.toLowerCase() &&
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
            text:

`╔════════════════════╗
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
}

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
╚══════════════╝

`

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

        if (text.startsWith('.شراء')) {

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
            text:

`❌ لا تملك مالاً كافياً

💰 المطلوب: ${item.price}
💳 رصيدك: ${player.money}`
})
}

    if (player.characters.length >= 30) {

        return safeSend(msg.key.remoteJid, {
            text: '❌ وصلت للحد الأقصى (30 شخصية)'
        })
    }

    player.money -= item.price

    player.characters.push(item.character)

    // تحويل المال للبائع
    const seller = await Player.findOne({
        userId: item.seller
    })

    if (seller) {

        seller.money =
            (seller.money || 0) + item.price

        await seller.save()
    }

    await player.save()

    await Market.findByIdAndDelete(item._id)

    return safeSend(msg.key.remoteJid, {
        text:

`╔════════════════════╗
🛒 𝐏𝐔𝐑𝐂𝐇𝐀𝐒𝐄
╚════════════════════╝

✅ تم شراء الشخصية بنجاح

🧿 الاسم :
${item.character.name}

🌟 الندرة :
${item.character.rarity}

⚔️ القوة :
${item.character.power}

💰 السعر :
${item.price}

💳 رصيدك الحالي :
${player.money}

━━━━━━━━━━━━━━━

🎉 تمت إضافة الشخصية إلى مجموعتك`
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

        await generateShop()

        const shop = await Shop.find()

        if (!shop.length) {

            return safeSend(
                msg.key.remoteJid,
                {
                    text: '❌ لا توجد شخصيات في المتجر حالياً'
                }
            )
        }

        let txt =
`╔════════════════════╗
        🏪 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑 𝐒𝐇𝐎𝐏
╚════════════════════╝

🎁 يتم تجديد المتجر كل 24 ساعة

━━━━━━━━━━━━━━━━━━

`

        shop.forEach((item, i) => {

            txt +=
`╭────〔 ${i + 1} 〕────╮
🧿 الاسم : ${item.character.name}
🌟 الندرة : ${item.character.rarity}
⚔️ القوة : ${item.character.power}
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

        return safeSend(
            msg.key.remoteJid,
            { text: txt }
        )

    } catch (err) {

        console.log('Shop error:', err)

        return safeSend(
            msg.key.remoteJid,
            {
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
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

    if (!mentioned || !mentioned[0]) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ استخدم منشن\n\nمثال:\n.قتال_مجموع @user'
        })
    }

    const targetId = mentioned[0]

    const me = await Player.findOne({ userId })
const enemy = await Player.findOne({ userId: targetId })

if (!me || !enemy) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ أحد اللاعبين لا يملك حساباً'
    })
}

if (me.fights == null) me.fights = 5
if (!me.lastFightReset) me.lastFightReset = Date.now()

await me.save()

const now = Date.now()
const fightCooldown = 30 * 60 * 1000

if (
    now - me.lastFightReset >= fightCooldown
) {

    me.fights = 5
    me.lastFightReset = now

    await me.save()
}

if ((me.fights || 0) <= 0) {

    const remaining =
        fightCooldown -
        (now - me.lastFightReset)

    const minutes =
        Math.floor(
            remaining / (1000 * 60)
        )

    return safeSend(msg.key.remoteJid, {
        text:
`❌ انتهت محاولات القتال

⚔️ المتبقي: 0/5

🕒 الوقت المتبقي:
${minutes} دقيقة

🔄 تتجدد المحاولات كل 30 دقيقة`
    })
}
    
    if (!me || !enemy) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ أحد اللاعبين لا يملك حساباً'
        })
    }

    if (!me.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا تملك شخصيات'
        })
    }

    if (!enemy.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ الخصم لا يملك شخصيات'
        })
    }

    let myPower =
        me.characters.reduce(
            (sum, c) => sum + Number(c.power || 0),
            0
        )

    let enemyPower =
        enemy.characters.reduce(
            (sum, c) => sum + Number(c.power || 0),
            0
        )

    let myAttack = myPower
    let enemyAttack = enemyPower

    let myAbilityName = 'بدون'
let myAbilityDescription = 'لا يوجد'
let myAbilityTier = 'عادية'

let enemyAbilityName = 'بدون'
let enemyAbilityDescription = 'لا يوجد'
let enemyAbilityTier = 'عادية'

    // =========================
// القدرات العادية 50%
// =========================
let reducedReward = false
    
const common = [

[
'🔥 غضب المحارب',
'يزيد القوة بنسبة 30%',
() => {
    myAttack += Math.floor(myAttack * 0.30)
}
],

[
'💥 الضربة الحرجة',
'يزيد القوة بنسبة 50%',
() => {
    myAttack += Math.floor(myAttack * 0.50)
}
],

[
'🛡️ درع الحماية',
'يقلل ضرر الخصم بنسبة 25%',
() => {
    enemyAttack -= Math.floor(enemyAttack * 0.25)
}
],

[
'🔄 الكاونتر',
'يعكس 20% من قوة الخصم عليه',
() => {
    enemyAttack -= Math.floor(enemyAttack * 0.20)
}
],

[
'🃏 نين متطور',
'يزيد القوة بنسبة 40%',
() => {
    myAttack += Math.floor(myAttack * 0.40)
}
],

[
'🌊 تنفس الماء',
'يزيد القوة بنسبة 45%',
() => {
    myAttack += Math.floor(myAttack * 0.45)
}
],

[
'🔵 طور الناسك',
'يزيد القوة بنسبة 35%',
() => {
    myAttack += Math.floor(myAttack * 0.35)
}
]

]

// =========================
// القدرات النادرة 30%
// =========================
const rare = [
[
'🍈 أكل فاكهة شيطان',
'يزيد القوة بنسبة 50%',
() => {
    myAttack += Math.floor(myAttack * 0.50)
}
],

[
'⚔️ بانكاي',
'يزيد القوة بنسبة 40%',
() => {
    myAttack += Math.floor(myAttack * 0.40)
}
],

[
'⚔️ هاكي التصلب المتقدم',
'يزيد القوة بنسبة 55%',
() => {
    myAttack += Math.floor(myAttack * 0.55)
}
],

[
'🟡 سوبر سايان',
'يزيد القوة بنسبة 60%',
() => {
    myAttack += Math.floor(myAttack * 0.60)
}
],

[
'⚡ تنفس البرق',
'يزيد القوة بنسبة 70%',
() => {
    myAttack += Math.floor(myAttack * 0.70)
}
],

[
'👁️ مانغيكيو شارينغان',
'يزيد القوة بنسبة 45%',
() => {
    myAttack += Math.floor(myAttack * 0.45)
}
],

[
'👑 قوة الكوينشي',
'يزيد القوة بنسبة 50%',
() => {
    myAttack += Math.floor(myAttack * 0.50)
}
],

[
'⚡ الغريزة الفائقة',
'فرصة 30% لتفادي الهجوم بالكامل',
() => {

    if (Math.random() <= 0.30) {
        enemyAttack = 0
    }

}
],

[
'🌪️ الاستبدال (ناروتو)',
'يتفادى هجوم الخصم بالكامل مرة واحدة',
() => {

    enemyAttack = 0

}
]

]

// =========================
// القدرات الأسطورية 15%
// =========================

const legendary = [

[
'🔴 سوبر سايان غود',
'يزيد القوة بنسبة 90%',
() => {
    myAttack += Math.floor(myAttack * 0.90)
}
],

[
'🔥 تنفس الشمس',
'يزيد القوة بنسبة 90%',
() => {
    myAttack += Math.floor(myAttack * 0.90)
}
],

[
'👑 هاكي الملوك',
'يضعف قوة الخصم بنسبة 25%',
() => {
    enemyAttack -= Math.floor(enemyAttack * 0.25)
}
],

[
'🖤 أنتي ماجيك',
'يقلل قوة الخصم بنسبة 40%',
() => {
    enemyAttack -= Math.floor(enemyAttack * 0.40)
}
],

[
'👁️ العين الشاملة',
'تكشف نقطة ضعف الخصم وتقلل قوته 30%',
() => {
    enemyAttack -= Math.floor(enemyAttack * 0.30)
}
],

[
'🔥 أماتيراسو',
'يحرق الخصم ويقلل قوته 20%',
() => {
    enemyAttack -= Math.floor(enemyAttack * 0.20)
}
],

[
'⚔️ سوسانو الكامل',
'يزيد القوة بنسبة 90%',
() => {
    myAttack += Math.floor(myAttack * 0.90)
}
],

[
'👑 ملك السحر',
'يزيد القوة بنسبة 90%',
() => {
    myAttack += Math.floor(myAttack * 0.90)
}
],

[
'👑 ملك اللعنات',
'يزيد القوة بنسبة 100%',
() => {
    myAttack += Math.floor(myAttack * 1.00)
}
],

[
'⚙️ جير 5',
'يزيد القوة بنسبة 80%',
() => {
    myAttack += Math.floor(myAttack * 0.80)
}
],

[
'♾️ اللانهاية',
'تقلل قوة الخصم بنسبة 40%',
() => {
    enemyAttack -= Math.floor(enemyAttack * 0.40)
}
]

]

// =========================
// القدرات الملحمية 5%
// =========================

const epic = [

[
'🐉 نيكا',
'يزيد القوة بنسبة 100%',
() => {
    myAttack += Math.floor(myAttack * 1.00)
}
],

[
'🌀 كسر الحدود',
'يزيد القوة بنسبة 200%',
() => {
    myAttack += Math.floor(myAttack * 2.00)
}
],

[
'🎲 الحظ المطلق',
'يضاعف القوة ×2',
() => {
    myAttack *= 2
}
],

[
'🌟 قوة البطل المختار',
'يضاعف القوة ×2',
() => {
    myAttack *= 2
}
],

[
'🌌 الصحوة الكاملة',
'يضاعف القوة ×2.5',
() => {
    myAttack *= 2.5
}
],

[
'👊 البوابة الثامنة',
'يزيد القوة 70% لكن تقل المكافأة 30%',
() => {
    myAttack += Math.floor(myAttack * 0.70)
    reducedReward = true
}
]

]

    const tierChance = Math.random() * 100

    let selectedPool

    if (tierChance <= 50) {
        selectedPool = common
        abilityTier = 'عادية'
    } else if (tierChance <= 80) {
        selectedPool = rare
        abilityTier = 'نادرة'
    } else if (tierChance <= 95) {
        selectedPool = legendary
        abilityTier = 'أسطورية'
    } else {
        selectedPool = epic
        abilityTier = 'ملحمية'
    }

    const ability =
    selectedPool[
        Math.floor(Math.random() * selectedPool.length)
    ]

myAbilityName = ability[0]
myAbilityDescription = ability[1]
myAbilityTier = abilityTier

ability[2]()

const enemyTierChance = Math.random() * 100

let enemyPool

if (enemyTierChance <= 50) {

    enemyPool = common
    enemyAbilityTier = 'عادية'

} else if (enemyTierChance <= 80) {

    enemyPool = rare
    enemyAbilityTier = 'نادرة'

} else if (enemyTierChance <= 95) {

    enemyPool = legendary
    enemyAbilityTier = 'أسطورية'

} else {

    enemyPool = epic
    enemyAbilityTier = 'ملحمية'
}

const enemyAbility =
    enemyPool[
        Math.floor(Math.random() * enemyPool.length)
    ]

enemyAbilityName = enemyAbility[0]
enemyAbilityDescription = enemyAbility[1]

const oldMyAttack = myAttack

myAttack = enemyAttack

enemyAbility[2]()

enemyAttack = myAttack

myAttack = oldMyAttack

let winner
let reward

    if (myAttack >= enemyAttack) {

    winner = 'أنت'

    reward =
        Math.max(
            500,
            Math.floor(enemyPower / 10)
        )

    if (reducedReward) {

        reward =
            Math.floor(reward * 0.70)

    }

    me.money =
        (me.money || 0) + reward

    me.xp =
        (me.xp || 0) + 100

} else {

    winner = 'الخصم'

    reward =
        Math.max(
            500,
            Math.floor(myPower / 10)
        )

    enemy.money =
        (enemy.money || 0) + reward

    await enemy.save()
}

    while (
    (me.xp || 0) >=
    (me.level || 1) * 500
) {
    me.xp -= (me.level || 1) * 500
    me.level += 1
}

me.fights -= 1

await me.save()

return safeSend(msg.key.remoteJid, {
        text:

`⚔️ ══〔 𝐆𝐑𝐀𝐍𝐃 𝐁𝐀𝐓𝐓𝐋𝐄 〕══ ⚔️

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

🏆 الفائز:
${winner}

💰 المكافأة:
${reward}

🎖️ المستوى:
${me.level}

⭐ الخبرة:
${me.xp}

⚔️ القتالات المتبقية:
${me.fights}/5`
})

} catch (err) {

    console.log(err)

    return safeSend(msg.key.remoteJid, {
        text: '❌ حدث خطأ أثناء القتال'
    })
}

}
        
        // =========================
        // .قتال
        // =========================

        if (text.startsWith('.قتال')) {

    try {

        const args = text.trim().split(' ')

const charPower = Number(args[args.length - 2])

const charName =
    args.slice(1, -2).join(' ')
        const mentioned =
            msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

        if (!mentioned || !mentioned[0]) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ استخدم منشن\n\nمثال:\n.قتال Hashirama 2300 @user'
            })
        }

        const target = mentioned[0]

        const me = await Player.findOne({ userId })
        const enemy = await Player.findOne({ userId: target })

        if (!me) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك حساباً'
            })
        }

        if (!enemy) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ الخصم لا يملك حساباً'
            })
        }

        // إعادة تعيين القتالات كل 24 ساعة
        const now = Date.now()
const cooldown = 30 * 60 * 1000

if (me.fights == null) me.fights = 5

if (!me.lastFightReset) {
    me.lastFightReset = now
}

if (now - me.lastFightReset >= cooldown) {
    me.fights = 5
    me.lastFightReset = now
    await me.save()
}

        if (me.fights <= 0)
            return safeSend(msg.key.remoteJid, {
                text: '⏳ انتهت القتالات اليومية (5/5)'
            })
        
        me.characters = me.characters || []
        enemy.characters = enemy.characters || []

        const myCharacter = me.characters.find(c =>
            c.name.toLowerCase() === charName.toLowerCase() &&
            Number(c.power) === charPower
        )

        if (!myCharacter) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ الشخصية غير موجودة لديك'
            })
        }

        if (enemy.characters.length === 0) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ الخصم لا يملك شخصيات'
            })
        }

        // اختيار شخصية الخصم
        const sortedChars =
            [...enemy.characters].sort((a, b) => b.power - a.power)

        const chance = Math.random() * 100

        let enemyCharacter

        if (chance <= 30) {

            // 30% أقوى شخصية
            enemyCharacter = sortedChars[0]

        } else if (chance <= 70) {

            // 40% أضعف شخصية
            enemyCharacter = sortedChars[sortedChars.length - 1]

        } else {

            // 30% عشوائي
            enemyCharacter =
                sortedChars[
                    Math.floor(Math.random() * sortedChars.length)
                ]
        }

        let myAttack =
    myCharacter.power +
    Math.floor(Math.random() * 300)

let enemyAttack =
    enemyCharacter.power +
    Math.floor(Math.random() * 300)

let abilityActivated = false
let abilityMessage = ''

let abilityChance = 50
let abilityBoost = 0.50

if (myCharacter.rarity === 'ممتاز') {
    abilityChance = 35
    abilityBoost = 0.35
}

if (myCharacter.rarity === 'اسطوري') {
    abilityChance = 20
    abilityBoost = 0.20
}

if (myCharacter.rarity === 'SSS') {
    abilityChance = 10
    abilityBoost = 0.10
}

if (
    myCharacter.ability &&
    Math.random() * 100 <= abilityChance
) {

    abilityActivated = true

    myAttack += Math.floor(
        myCharacter.power * abilityBoost
    )

    abilityMessage =
        `✨ تم تفعيل قدرة ${myCharacter.ability}`
}

        const rewards = {
            'عادي': 100,
            'ممتاز': 300,
            'اسطوري': 1000,
            'SSS': 3000
        }

        let winner
        let reward = 0

        

        if (myAttack >= enemyAttack) {

    winner = myCharacter.name

    reward =
        rewards[enemyCharacter.rarity] || 100

    me.money = (me.money || 0) + reward

    me.xp = (me.xp || 0) + 50

} else {

    winner = enemyCharacter.name

    reward =
        rewards[myCharacter.rarity] || 100

    enemy.money = (enemy.money || 0) + reward
}

while (me.xp >= me.level * 100) {

    me.xp -= me.level * 100

    me.level += 1
}

me.fights = Math.max(0, (me.fights || 0) - 1)

await me.save()

const updatedMe = await Player.findOne({ userId })

await enemy.save()
        const winnerCharacter =
    winner === myCharacter.name
        ? myCharacter
        : enemyCharacter

const battleMessage =
`╔══════════════════════╗
        ⚔️ 𝐄𝐏𝐈𝐂 𝐁𝐀𝐓𝐓𝐋𝐄 ⚔️
╚══════════════════════╝

🛡️ 𝐘𝐎𝐔𝐑 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑

🧿 الاسم:
${myCharacter.name}

⚡ القوة:
${myCharacter.power}

━━━━━━━━━━━━━━━━━━

🎯 𝐄𝐍𝐄𝐌𝐘 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑

🧿 الاسم:
${enemyCharacter.name}

⚡ القوة:
${enemyCharacter.power}

━━━━━━━━━━━━━━━━━━

${abilityActivated
? `✨ تم تفعيل قدرة ${myCharacter.ability} ✨

⚡ حصلت الشخصية على تعزيز قتالي

━━━━━━━━━━━━━━━━━━
`
: ''}

🏆 𝐖𝐈𝐍𝐍𝐄𝐑

👑 الفائز:
${winner}

💰 المكافأة:
${reward}

🎟️ القتالات المتبقية:
${updatedMe.fights}/5

━━━━━━━━━━━━━━━━━━

🛡️ جميع الشخصيات بقيت لدى أصحابها
❗ لا توجد خسارة شخصيات في هذا القتال

╔══════════════════════╗
        🔥 𝐁𝐀𝐓𝐓𝐋𝐄 𝐄𝐍𝐃 🔥
╚══════════════════════╝`

if (
    winnerCharacter.image &&
    fs.existsSync(winnerCharacter.image)
) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: fs.readFileSync(
                winnerCharacter.image
            ),
            caption: battleMessage
        }
    )
}

return safeSend(msg.key.remoteJid, {
    text: battleMessage
    })


    } catch (err) {

        console.log('Fight error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء القتال'
        })
    }
}

    })

}

startBot()
