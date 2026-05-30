const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')
const express = require("express")
const QRCode = require("qrcode")

const mongoose = require('mongoose')

const Player = require('./models/Player')
const Market = require('./models/Market')

const characters = require('./characters.json')

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

function saveMarket(data) {

    fs.writeFileSync(
        marketFile,
        JSON.stringify(data, null, 2)
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

    const now = Date.now()
    const cooldown = 24 * 60 * 60 * 1000

    if (now - player.lastReset >= cooldown) {
        player.pulls = 5
        player.lastReset = now
    }

    if (player.pulls <= 0) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '⏳ انتهت السحبات اليومية'
        })
    }

    const chance = Math.random() * 100

    let rarity = 'عادي'

    if (chance <= 5) {
        rarity = 'SSS'
    } else if (chance <= 15) {
        rarity = 'اسطوري'
    } else if (chance <= 40) {
        rarity = 'ممتاز'
    }

    const filteredCharacters =
        characters.filter(c => c.rarity === rarity)

    if (!filteredCharacters.length) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: `❌ لا توجد شخصيات بهذا التصنيف: ${rarity}`
        })
    }

    const randomCharacter =
        filteredCharacters[
            Math.floor(Math.random() * filteredCharacters.length)
        ]

    player.characters.push(randomCharacter)
    player.pulls -= 1

    await player.save()

    const imagePath =
        path.join(__dirname, randomCharacter.image)

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
        // .بيع
        // =========================

        if (text.startsWith('.بيع')) {

    try {

        const args = text.split(' ')

        const charName = args[1]
        const charPower = Number(args[2])

        if (!charName || isNaN(charPower)) {

            return safeSend(msg.key.remoteJid, {
                text:
`❌ استخدم الأمر هكذا

.بيع اسم_الشخصية القوة

مثال:
.بيع لوفي 1500`
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

        const character = player.characters[charIndex]

        const sellPrice = Math.max(
            100,
            Math.floor(character.power / 2)
        )

        player.money = (player.money || 0) + sellPrice

        player.characters.splice(charIndex, 1)

        await player.save()

        return safeSend(msg.key.remoteJid, {
            text:

`💰 ━━〔 𝐒𝐄𝐋𝐋 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 〕━━ 💰

🧿 الاسم: ${character.name}

🌟 الندرة: ${character.rarity}

⚔️ القوة: ${character.power}

💵 سعر البيع: ${sellPrice}

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

        const character = player.characters[charIndex]

        await Market.create({
            seller: userId,
            character,
            price
        })

        player.characters.splice(charIndex, 1)

        await player.save()

        return safeSend(msg.key.remoteJid, {
            text:

`

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

        let players = safeLoadPlayers()
        let market = safeLoadMarket()

        const args = text.split(' ')
        const itemNumber = Number(args[1]) - 1

        const item = market[itemNumber]

        if (!item || !item.character) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ العنصر غير موجود'
            })
        }

        if (!players[userId]) {
            players[userId] = createPlayer()
        }

        players[userId].characters = players[userId].characters || []
        players[userId].money = players[userId].money || 0

        if (players[userId].money < item.price) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك مال كافي'
            })
        }

        // 💰 خصم المال
        players[userId].money -= item.price

        // 👤 إضافة الشخصية
        players[userId].characters.push(item.character)

        // 🗑️ حذف من السوق
        market.splice(itemNumber, 1)

        safeSavePlayers(players)
        safeSaveMarket(market)

        return safeSend(msg.key.remoteJid, {
            text:
`✅ تم الشراء بنجاح

🧿 الاسم: ${item.character.name}
⚡ القوة: ${item.character.power}
💰 السعر: ${item.price}`
        })

    } catch (err) {

        console.log('Buy error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء عملية الشراء'
        })
    }
}

        // =========================
        // .قتال
        // =========================

        if (text.startsWith('.قتال')) {

    try {

        const args = text.split(' ')

        const charName = args[1]
        const charPower = Number(args[2])

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
        const cooldown = 24 * 60 * 60 * 1000

        if (!me.dailyBattles) me.dailyBattles = 5
        if (!me.lastBattleReset) me.lastBattleReset = now

        if (now - me.lastBattleReset >= cooldown) {
            me.dailyBattles = 5
            me.lastBattleReset = now
        }

        if (me.dailyBattles <= 0) {
            return safeSend(msg.key.remoteJid, {
                text: '⏳ انتهت القتالات اليومية (5/5)'
            })
        }

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

        const myAttack =
            myCharacter.power +
            Math.floor(Math.random() * 300)

        const enemyAttack =
            enemyCharacter.power +
            Math.floor(Math.random() * 300)

        const rewards = {
            'عادي': 100,
            'ممتاز': 300,
            'اسطوري': 1000,
            'SSS': 3000
        }

        let winner
        let reward = 0

        me.dailyBattles -= 1

        if (myAttack >= enemyAttack) {

            winner = myCharacter.name

            reward =
                rewards[enemyCharacter.rarity] || 100

            me.money = (me.money || 0) + reward

        } else {

            winner = enemyCharacter.name

            reward =
                rewards[myCharacter.rarity] || 100

            enemy.money = (enemy.money || 0) + reward
        }

        await me.save()
        await enemy.save()

        return safeSend(msg.key.remoteJid, {
            text:
`⚔️ ━━〔 𝐁𝐀𝐓𝐓𝐋𝐄 〕━━ ⚔️

🧿 شخصيتك:
${myCharacter.name}

⚡ القوة:
${myCharacter.power}

━━━━━━━━━━━━━━━

🎯 شخصية الخصم:
${enemyCharacter.name}

⚡ القوة:
${enemyCharacter.power}

━━━━━━━━━━━━━━━

🏆 الفائز:
${winner}

💰 الجائزة:
${reward}

🎟️ القتالات المتبقية:
${me.dailyBattles}/5

❗ لم يتم حذف أي شخصية`
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
