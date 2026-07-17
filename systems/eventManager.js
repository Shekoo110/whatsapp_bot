const Raid = require('../models/Raid')
const kingdoms = require('./raidKingdoms')

const RAID_GROUPS = [
    '120363020823525909@g.us',
    '120363400448225715@g.us',
    '120363116482407260@g.us'
]

// =========================
// حساب موعد الرايد القادم
// =========================

function getNextRaidTime() {

    const now = new Date()

    const next = new Date(now)

    next.setMinutes(0)
    next.setSeconds(0)
    next.setMilliseconds(0)

    const hour = now.getHours()

    if (hour % 2 === 0 && now.getMinutes() === 0) {

        next.setHours(hour + 2)

    } else {

        next.setHours(hour + (2 - (hour % 2)))

    }

    return next

}

// =========================
// الوقت المتبقي
// =========================

function getRemainingTime() {

    return getNextRaidTime() - new Date()

}
// =========================
// اختيار مملكة عشوائية
// =========================

function randomKingdom() {

    return kingdoms[
        Math.floor(
            Math.random() *
            kingdoms.length
        )
    ]

}

// =========================
// إنشاء الرايد
// =========================

async function createRaid() {

    const kingdom =
        randomKingdom()

    let raid =
        await Raid.findOne()

    if (!raid) {

        raid = new Raid()

    }

    raid.active = true

    raid.kingdom = kingdom.name

    raid.anime = kingdom.anime

    raid.bossName = kingdom.boss

    raid.maxHp = kingdom.hp

    raid.hp = kingdom.hp

    raid.phase2 = false

    raid.phase3 = false

    raid.damageMap = {}

    raid.totalDamage = 0

    raid.startedAt = Date.now()

    raid.bossAttack = 10000

    await raid.save()

    return {

        raid,

        kingdom

    }

}
const characters = require('../characters.json')

// =========================
// إعلان الرايد
// =========================

async function announceRaid(sock) {

    const { raid, kingdom } =
        await createRaid()

    const boss =
        characters.find(c =>
            c.name === raid.bossName
        )

    const image =
        boss?.image ||
        boss?.imageUrl ||
        null

    const caption =

`🚨 ═════〔 إنذار عالمي 〕═════ 🚨

🌍 ظهر زعيم جديد يهدد المملكة!

━━━━━━━━━━━━━━━━━━

🏰 المملكة
${raid.kingdom}

👹 الزعيم
${raid.bossName}

📺 الأنمي
${raid.anime}

❤️ HP
${raid.maxHp.toLocaleString()}

━━━━━━━━━━━━━━━━━━

🏆 مكافآت أول ثلاثة

🥇 الأول
💰 1,000,000
🎁 SSS Chance ×2
🌟 فرصة 30% لشخصية SSS

🥈 الثاني
💰 700,000
🎁 SSS Chance ×2
🌟 فرصة 30% لشخصية SSS

🥉 الثالث
💰 500,000
🎁 SSS Chance ×2
🌟 فرصة 30% لشخصية SSS

━━━━━━━━━━━━━━━━━━

🎖️ باقي المشاركين

💰 200,000 ~ 500,000

🎁 فرصة صندوق SSS Chance

🎁 فرصة صندوق SSS High

━━━━━━━━━━━━━━━━━━

⚔️ للدخول اكتب

غزو_رايد

⏳ مدة الغزو ساعتان.`

    for (const jid of RAID_GROUPS) {

        try {

            if (image) {

                await sock.sendMessage(
                    jid,
                    {
                        image: {
                            url: image
                        },
                        caption
                    }
                )

            } else {

                await sock.sendMessage(
                    jid,
                    {
                        text: caption
                    }
                )

            }

        } catch (err) {

            console.log(
                "Raid announce error:",
                err.message
            )

        }

    }

}
// =========================
// تشغيل مؤقت الرايد
// =========================

async function startRaidScheduler(sock) {

    while (true) {

        try {

            const next =
                getNextRaidTime()

            const wait =
                next.getTime() - Date.now()

            console.log(
                `📅 الرايد القادم: ${next.toLocaleString()}`
            )

            await new Promise(resolve =>
                setTimeout(resolve, wait)
            )

            // لا تبدأ رايد إذا يوجد واحد شغال
            const running =
                await Raid.findOne({
                    active: true
                })

            if (!running) {

                await announceRaid(sock)

                console.log(
                    "✅ تم بدء الرايد."
                )

            }

        } catch (err) {

            console.log(
                "Raid Scheduler Error:",
                err
            )

            // ينتظر 30 ثانية ثم يحاول مجدداً
            await new Promise(resolve =>
                setTimeout(resolve, 30000)
            )

        }

    }

}

module.exports = {

    startRaidScheduler,
    announceRaid

}
