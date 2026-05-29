const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')
const express = require("express")
const QRCode = require("qrcode")

// =========================
// ملفات اللعبة
// =========================

const characters =
require('./characters.json')

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
'لوفي','زورو','نامي','سانجي','يوسوب','تشوبر','روبين','فرانكي','بروك','جينبي',
'شانكس','إيس','سابو','لاو','ميهوك','دوفلامينغو','كايدو','بيغ مام','كروكودايل',
'سموكر','كيزارو','أوكيجي','أكاينو','باغي','بيرونا','هانكوك','ياماتو','كاتاكوري',
'كيد','كيلر','هوكينز','درايك','بوني','كوبي','غارب','سينغوكو','رايلي','وايتبيرد',
'ماركو','جوزو','فيستا','تيتيش','إنيل','لوتشي','كاكو','كاليفا','موريا','سيزار',
'فيغابانك','كينيمون','مومونوسكي','أودين','كوين','كينغ','جاك','أوروتشي','هيوري',
'ريبيكا','فيفي','كاروت','بيدرو','ألبيدا','كورينا','كاريبو','بيبو','شيراهوشي',
'أرلونغ','هاتشي','باولي','بيلاجيو','فوكسي',

'كونان','ران','كوغورو','هايبرا','أغاسا','هيجي','كايتو','سونوكو','ساتو','تاكاغي',
'تشيبا','ميغوري','جين','فودكا','فيرموث','بوربون','كير','شوكيتشي','ماري',
'ماسومي','أكاي','يوساكو','يوكو','ميتسوهيكو','غينتا','أيومي','سيرا','جودي',
'كاميل','أندريه','إيري','كازوها','موميجي','شينتشي','كيد','كورودا','واكاسا',
'روم','ري','أزوسا','سوبارو','أكيمي','أتسوشي','ماكوتو','يامامورا',

'غوكو','فيجيتا','غوهان','ترانكس','غوتين','بيكولو','فريزا','سيل','بوو','بيروس',
'ويس','برولي','جيرين','هيت','كابا','كايل','كاليفلا','زينو','باردوك','راديتز',
'نابا','يامشا','كريلين','تيان','تشاوزو','بولما','فيديل','بان','أووب','غوكوبلاك',
'زاماسو','كولر','تورليس','غوغيتا','فيجيتو','دابورا','كاي','شينرون',
'أندرويد17','أندرويد18','أندرويد16','باراغاس','باني','شيلا','جوتسو','بوراتا',
'كورين','ياجيروبي','مستر ساتان','أوولونغ','بوار','ديندي','ناميك','غينيو',
'ريكوم','جيص','برتر','غولدو','زاربون','دودوريا',

'إيتشيغو','روكيا','أوريهيمي','تشاد','أوريو','بياكويا','رينجي','توشيرو','أيزن',
'جين','إيكاكو','كينباتشي','ياتشيرو','أونوهانا','مايوري','نيمو','سويفون',
'يورويتشي','كيسكي','شينجي','غريمجو','أولكيورا','نيل','ستارك','هاليلار',
'باراغان','نويتورا','زوماري','يامي','بيبي','بازمبي','جوغرام','يهواتش',

'تانجيرو','نيزوكو','زينيتسو','إينوسكي','غيو','شينوبو','رينغوكو','أوزوي',
'ميتسوري','موشيرو','أوباناي','سانيمي','غيومي','كاغايا','أكازا','دوما',
'كوكوشيبو','موزان','روي','إنمو','هانتينغو','غيوكو','داكي','غيوتارو',
'كاناو','جينيا','ماكومو','سابيتو','يوشيرو','تامايو','أوي','موراتا',

'يوجي','ميغومي','نوبارا','غوجو','سوكونا','غيتو','يوتا','ماكي','توجي','نانامي',
'مي مي','تشوسو','ماهيتو','هانامي','داغون','إينوماكي','باندا','هاكاري',
'كاشيمو','هيغورو','كينجاكو','يوكي','تودو','ميوا','مايو','مومو',

'إيرين','ميكاسا','أرمين','ليفاي','هانجي','إروين','راينر','بيرتولت','آني',
'زيك','بيك','غابي','فالكو','جان','كوني','ساشا','هيستوريا','يمير','فلوك',

'ناتسو','لوسي','غراي','إيرزا','ويندي','جيلال','غاجيل','ليفي','ماكاروف',
'ميراجان','لاكسوس','جوبيا','كانا','فريد','بيكسلو','إلفمان','ليسانا',
'بانثرلي','شارلي','روغ','ستينغ','يوكينو','كاغورا','أولتير','زيريف',
'مافيس','أكنولوجيا',

'غون','كيلوا','كورابيكا','ليوريو','هيسوكا','إيلومي','كرولو','فيتان',
'فينكس','نوبوناغا','شالنارك','باكونودا','بيسكيت','كايت','ميرويم',
'نيفيربيتو','شايابوف','مونتوثيو',

'ناروتو','ساسكي','ساكورا','كاكاشي','إيتاتشي','مادارا','أوبيتو','هاشيراما',
'توبيراما','هيروزن','ميناتو','كوشينا','جيرايا','تسونادي','أوروتشيمارو',
'غارا','نيجي','روكلي','تينتن','شينو','كيبا','هيناتا','تيماري','كانكورو',
'ساي','ياماتو','كيلر بي','ديدارا','ساسوري','كيسامي','كونان','باين',
'ناغاتو','كاغويا','بوروتو','سارادا','ميتسوكي','كاواكي',

'ديكو','باكوغو','شوتو','أوراراكا','تسويو','مومو','كيريشيما','مينيتا',
'توكو يامي','دينكي','آيزاوا','أولمايت','شينسو','هوكس','إنديفور',
'توغا','شيغاراكي','ستين','ميريو','تاماكي','نيجيري',

'غينتوكي','شينباتشي','كاغورا','هاسيغاوا','تاكاسغي','كاتسورا','أوكيتا',
'هيجيكاتا','كوندو','أوتوسيه','ساداهارو','كاموي',

'سايتاما','جينوس','تاتسوماكي','بانغ','فوبوكي','جارو','سونيك','بوروس',
'كينغ','مومن رايدر',

'ميلوداس','بان','كينغ','ديان','إليزابيث','إيسكانور','ميرلين','غوثر',
'زيلدريس','إستا روزا','لودوشيل',

'ريمورو','شونا','شيون','بينيمارو','فيلدورا','ميلم','رافائيل',

'أكوا','ميغومين','داركنيس','كازوما',

'سوبارو','إيميليا','ريم','رام','بيتريس','أوتو','غارفيل','روزوال',
'جوليوس','راينهارد',

'إيسديث','تاتسومي','أكامي','ليون','شيل','بولات','كورومي','ناجيندا',

'ليلوك','سوزاكو','سي سي','كالن','شنيزل',

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

            let players = loadPlayers()

            if (!players[userId]) {

                players[userId] =
                createPlayer()
            }

            if (
                players[userId]
                .characters.length >= 30
            ) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ الحد الأقصى 30 شخصية'
                    }
                )
            }

            const now = Date.now()

            const cooldown =
            24 * 60 * 60 * 1000

            if (
                now -
                players[userId].lastReset
                >= cooldown
            ) {

                players[userId].pulls = 5

                players[userId].lastReset = now
            }

            if (
                players[userId].pulls <= 0
            ) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '⏳ انتهت السحبات اليومية'
                    }
                )
            }

            const chance =
            Math.random() * 100

            let rarity = 'عادي'

            if (chance <= 5) {

                rarity = 'SSS'
            }

            else if (chance <= 15) {

                rarity = 'أسطوري'
            }

            else if (chance <= 40) {

                rarity = 'نادر'
            }

            const filteredCharacters =

            characters.filter(
                c => c.rarity === rarity
            )

            const randomCharacter =

            filteredCharacters[
                Math.floor(
                    Math.random() *
                    filteredCharacters.length
                )
            ]

            players[userId]
            .characters.push(
                randomCharacter
            )

            players[userId].pulls -= 1

            savePlayers(players)

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    image:
                    fs.readFileSync(
                        randomCharacter.image
                    ),

                    caption:

`🎉 حصلت على شخصية

👤 ${randomCharacter.name}

⚡ ${randomCharacter.power}

💎 ${randomCharacter.rarity}

🔥 ${randomCharacter.ability}

🎟️ السحبات:
${players[userId].pulls}`
                }
            )
        }

        // =========================
        // .شخصياتي
        // =========================

        if (text === '.شخصياتي') {

            let players = loadPlayers()

            if (
                !players[userId]
                ||
                players[userId]
                .characters.length === 0
            ) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ لا تملك شخصيات'
                    }
                )
            }

            let list =
            '🎴 شخصياتك:\n\n'

            players[userId]
            .characters.forEach(c => {

                list +=

`👤 ${c.name}
⚡ ${c.power}
💎 ${c.rarity}

━━━━━━━━━━

`
            })

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: list
                }
            )
        }

        // =========================
        // .بيع
        // =========================

        if (text.startsWith('.بيع')) {

            const args =
            text.split(' ')

            const charName = args[1]
            const charPower =
            Number(args[2])

            let players = loadPlayers()

            const charIndex =

            players[userId]
            .characters.findIndex(

                c =>

                c.name === charName

                &&

                c.power === charPower
            )

            if (charIndex === -1) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ الشخصية غير موجودة'
                    }
                )
            }

            const soldCharacter =

            players[userId]
            .characters[charIndex]

            players[userId].money +=
            soldCharacter.power

            players[userId]
            .characters.splice(
                charIndex,
                1
            )

            savePlayers(players)

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:

`💰 تم البيع

👤 ${soldCharacter.name}

⚡ ${soldCharacter.power}

🪙 مالك:
${players[userId].money}`
                }
            )
        }

        // =========================
        // .مزاد
        // =========================

        if (text.startsWith('.مزاد')) {

            const args =
            text.split(' ')

            const charName = args[1]
            const charPower =
            Number(args[2])

            const price =
            Number(args[3])

            let players = loadPlayers()
            let market = loadMarket()

            const charIndex =

            players[userId]
            .characters.findIndex(

                c =>

                c.name === charName

                &&

                c.power === charPower
            )

            if (charIndex === -1) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ الشخصية غير موجودة'
                    }
                )
            }

            const character =

            players[userId]
            .characters[charIndex]

            market.push({

                seller: userId,

                character,

                price
            })

            players[userId]
            .characters.splice(
                charIndex,
                1
            )

            savePlayers(players)
            saveMarket(market)

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:

`🏪 تم وضع الشخصية في السوق

👤 ${character.name}

⚡ ${character.power}

💰 السعر:
${price}`
                }
            )
        }

        // =========================
        // .السوق
        // =========================

        if (text === '.السوق') {

            let market = loadMarket()

            if (market.length === 0) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ السوق فارغ'
                    }
                )
            }

            let marketText =
            '🏪 السوق:\n\n'

            market.forEach(
                (item, index) => {

                    marketText +=

`${index + 1}️⃣

👤 ${item.character.name}

⚡ ${item.character.power}

💰 ${item.price}

━━━━━━━━━━

`
                }
            )

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: marketText
                }
            )
        }

        // =========================
        // .شراء
        // =========================

        if (text.startsWith('.شراء')) {

            const args =
            text.split(' ')

            const itemNumber =
            Number(args[1]) - 1

            let players = loadPlayers()
            let market = loadMarket()

            const item =
            market[itemNumber]

            if (!item) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ العنصر غير موجود'
                    }
                )
            }

            if (!players[userId]) {

                players[userId] =
                createPlayer()
            }

            if (
                players[userId].money
                < item.price
            ) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ لا تملك مال كافي'
                    }
                )
            }

            players[userId].money -=
            item.price

            players[item.seller].money +=
            item.price

            players[userId]
            .characters.push(
                item.character
            )

            market.splice(itemNumber, 1)

            savePlayers(players)
            saveMarket(market)

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:

`✅ تم شراء الشخصية

👤 ${item.character.name}

⚡ ${item.character.power}`
                }
            )
        }

        // =========================
        // .قتال
        // =========================

        if (text.startsWith('.قتال')) {

            const args =
            text.split(' ')

            const charName =
            args[1]

            const charPower =
            Number(args[2])

            const target =
            msg.message.extendedTextMessage
            ?.contextInfo?.participant

            if (!target) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ قم بالرد على الشخص'
                    }
                )
            }

            let players = loadPlayers()

            if (!players[target]) {

                players[target] =
                createPlayer()
            }

            const myCharacter =

            players[userId]
            .characters.find(

                c =>

                c.name === charName

                &&

                c.power === charPower
            )

            if (!myCharacter) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '❌ الشخصية غير موجودة'
                    }
                )
            }

            let attack =

            myCharacter.power +

            Math.floor(
                Math.random() * 200
            )

            const dodgeChance =
            Math.random() * 100

            if (
                dodgeChance <=
                players[target].dodge
            ) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
                        '💨 الخصم تفادى الهجوم'
                    }
                )
            }

            const critChance =
            Math.random() * 100

            if (
                critChance <=
                players[userId].crit
            ) {

                attack *= 2
            }

            const damage =
            Math.floor(
                attack -
                (players[target].hp / 100)
            )

            players[target].hp -= damage

            if (
                players[target].hp <= 0
            ) {

                players[target].hp = 10000

                players[userId].money += 500

                players[userId].xp += 100
            }

            savePlayers(players)

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:

`⚔️ نتيجة القتال

👤 ${myCharacter.name}

⚡ القوة:
${myCharacter.power}

💥 الضرر:
${damage}

❤️ HP الخصم:
${players[target].hp}`
                }
            )
        }

    })

}

startBot()
