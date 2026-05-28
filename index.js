const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')
const express = require("express")
const QRCode = require("qrcode")

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

// ===== قائمة أسماء الأنمي =====
const animeNames = [
'لوفي','زورو','نامي','سانجي','يوسوب','تشوبر','روبين','فرانكي','بروك','جينبي',
'شانكس','ايس','سابو','لاو','ميهوك','دوفلامينغو','كايدو','بيغ مام','كروكودايل',
'سموكر','كيزارو','اوكيجي','اكاينو','باغي','بيرونا','هانكوك','ياماتو','كاتاكوري',
'كونان','ران','كوغورو','هايبرا','هيجي','كايتو','غوكو','فيجيتا','غوهان',
'إيتشيغو','روكيا','أيزن','تانجيرو','نيزوكو','زينيتسو','يوجي','غوجو','سوكونا',
'إيرين','ميكاسا','ليفاي','ناتسو','لوسي','غراي','إيرزا','غون','كيلوا',
'كورابيكا','ناروتو','ساسكي','كاكاشي','إيتاتشي','مادارا','ديكو','باكوغو',
'جينتوكي','سايتاما','جينوس','ميليوداس','ريمورو','أكوا','ميغومين',
'سوبارو','ريم','رام','ليلوك','مايكي','دراكن','باجي','دازاي'
]

// ===== عدد الأسماء =====
let namesCount = 1

// ===== تشغيل البوت =====
async function startBot() {

    const { state, saveCreds } =
        await useMultiFileAuthState('auth')

    const sock = makeWASocket({
        auth: state
    })

    // ===== QR =====
    sock.ev.on('connection.update', async (update) => {

        const { connection, qr } = update

        // إنشاء QR داخل الموقع
        if (qr) {

            qrCodeData = await QRCode.toDataURL(qr)

            console.log("QR READY")
        }

        // عند الاتصال
        if (connection === 'open') {

            console.log('البوت اشتغل')

            qrCodeData = ""
        }

        // إعادة التشغيل إذا انقطع
        if (connection === 'close') {

            console.log('انقطع الاتصال... إعادة تشغيل')

            startBot()
        }

    })

    sock.ev.on('creds.update', saveCreds)

    // ===== استقبال الرسائل =====
    sock.ev.on('messages.upsert', async ({ messages }) => {

        const msg = messages[0]

        if (!msg.message || !msg.key.remoteJid) return

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text

        if (!text) return

        // =========================
        // أمر .صوره
        // =========================
        if (text === '.صوره') {

            const folderPath = './images'

            const files = fs.readdirSync(folderPath)

            if (files.length === 0) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    { text: 'لا توجد صور' }
                )
            }

            const randomImage =
                files[Math.floor(Math.random() * files.length)]

            const imagePath =
                path.join(folderPath, randomImage)

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    image: fs.readFileSync(imagePath)
                }
            )
        }

        // =========================
        // أمر .صوت
        // =========================
        if (text === '.صوت') {

            const folderPath = './audio'

            const files = fs.readdirSync(folderPath)

            if (files.length === 0) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    { text: 'لا توجد صوتيات' }
                )
            }

            const randomAudio =
                files[Math.floor(Math.random() * files.length)]

            const audioPath =
                path.join(folderPath, randomAudio)

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    audio: fs.readFileSync(audioPath),
                    mimetype: 'audio/mpeg',
                    ptt: false
                }
            )
        }

        // =========================
        // أمر .اصوات
        // =========================
        if (text === '.اصوات') {

            const folderPath = './sounds'

            const files = fs.readdirSync(folderPath)

            if (files.length === 0) {

                return sock.sendMessage(
                    msg.key.remoteJid,
                    { text: 'لا توجد اصوات' }
                )
            }

            const randomAudio =
                files[Math.floor(Math.random() * files.length)]

            const audioPath =
                path.join(folderPath, randomAudio)

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    audio: fs.readFileSync(audioPath),
                    mimetype: 'audio/mpeg',
                    ptt: false
                }
            )
        }

        // =========================
        // أمر .اسم
        // =========================
        if (text === '.اسم') {

            namesCount = 1

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: '*تم تغيير .كت إلى اسم واحد*'
                }
            )
        }

        // =========================
        // أمر .اسمين
        // =========================
        if (text === '.اسمين') {

            namesCount = 2

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: '*تم تغيير .كت إلى اسمين*'
                }
            )
        }

        // =========================
        // أمر .ثلاث
        // =========================
        if (text === '.ثلاث') {

            namesCount = 3

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: '*تم تغيير .كت إلى 3 أسماء*'
                }
            )
        }

        // =========================
        // أمر .كت
        // =========================
        if (text === '.كت') {

            const shuffled =
                animeNames.sort(() => 0.5 - Math.random())

            const names =
                shuffled.slice(0, namesCount)

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: `*${names.join('* , *')}*`
                }
            )
        }

    })

}

startBot()
