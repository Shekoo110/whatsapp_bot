const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const qrcode = require('qrcode-terminal')
const fs = require('fs')
const path = require('path')
const express = require("express")

// ===== تشغيل السيرفر لـ Render =====
const app = express()

app.get("/", (req, res) => {
    res.send("Bot is running")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running")
})

// ===== قائمة أسماء الأنمي =====
const animeNames = [
'لوفي','زورو','نامي','سانجي','يوسوب','تشوبر','روبين','فرانكي','بروك','جينبي',
'شانكس','ايس','سابو','لاو','ميهوك','دوفلامينغو','كايدو','بيغ مام','كروكودايل',
'سموكر','كيزارو','اوكيجي','اكاينو','باغي','بيرونا','هانكوك','ياماتو','كاتاكوري',
'كيد','كيلر','هوكينز','دريك','بوني','كوبي','غارب','سينغوكو','رايلي','ماركو',
'تيتش','اينيل','لوتشي','كاكو','كاليفا','موريا','سيزار','فيغابانك','كينيمون',
'مومونوسكي','أودين','كوين','كينغ','جاك','أوروتشي','هيوري','ريبيكا','فيفي',
'كاروت','بيدرو','ألبيدا','كورينا','كاريبو','بيبو','شيراهوشي','أرلونغ',
'كونان','ران','كوغورو','هايبرا','هيجي','كايتو','سونوكو','ساتو','تاكاغي',
'أكاي','شينتشي','غوكو','فيجيتا','غوهان','ترانكس','غوتين','بيكولو','فريزا',
'سيل','بوو','بيروس','ويس','برولي','جيرين','كريلين','بولما','بان',
'إيتشيغو','روكيا','أوريهيمي','تشاد','أوريو','بياكويا','رينجي','توشيرو',
'أيزن','زاراكي','يورويتشي','كيسكي','غريمجو','الكيورا',
'تانجيرو','نيزوكو','زينيتسو','إينوسكي','غيو','شينوبو','رينغوكو','أكازا',
'موزان','كاناو','يوجي','ميغومي','نوبارا','غوجو','سوكونا','غيتو','يوتا',
'ماكي','توجي','نانامي','ماهيتو','باندا','هاكاري','تودو',
'إيرين','ميكاسا','أرمين','ليفاي','هانجي','إيروين','راينر','آني','زيك',
'غابي','فالكو','جان','ساشا','هيستوريا',
'ناتسو','لوسي','غراي','إيرزا','ويندي','جيلال','غاجيل','ليفي','ماكاروف',
'ميراجين','لاكسوس','زيريف','اكنولوغيا',
'غون','كيلوا','كورابيكا','ليوريو','هيسوكا','إيلومي','كرولو','كايتو',
'ميرويم','بيتو',
'ناروتو','ساسكي','ساكورا','كاكاشي','إيتاتشي','مادارا','أوبيتو','هاشيراما',
'ميناتو','جيرايا','تسونادي','أوروتشيمارو','غارا','نيجي','لي','هيناتا',
'ساي','ديدارا','ساسوري','كيسامي','كونان','باين','ناجاتو','بوروتو',
'سارادا','ميتسوكي','كاواكي',
'ديكو','باكوغو','شوتو','أوراراكا','تسويو','مومو','كيريشيما','أولمايت',
'هوكس','إنديفور','توغا','شيغاراكي',
'جينتوكي','كاغورا','أوكيتا','هيجيكاتا',
'سايتاما','جينوس','تاتسوماكي','جارو',
'ميليوداس','بان','كينغ','ديان','إسكانور','ميرلين',
'ريمورو','شونا','شيون','بينيمارو',
'أنوس','أكوا','ميغومين','كازوما',
'سوبارو','إيميليا','ريم','رام','بيتريس',
'إيسديث','تاتسومي','أكامي',
'ليلوك','سوزاكو',
'تشويا','دازاي','رامبو',
'تاكيميتشي','مايكي','دراكن','باجي','تشيفويو','كازوتورا','كيساكي'
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
    sock.ev.on('connection.update', (update) => {

        const { connection, qr } = update

        if (qr) {
            qrcode.generate(qr, { small: true })
        }

        if (connection === 'open') {
            console.log('البوت اشتغل')
        }

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
