const questions = require("./questions")
const imageQuestions = require("./imageQuestions")

const MAX_PLAYERS = 8
const MIN_PLAYERS = 3

const HEARTS = [
    "❤️",
    "🩷",
    "🧡",
    "💛",
    "💚",
    "🩵",
    "💙",
    "💜",
    "🖤",
    "🩶",
    "🤍",
    "🤎"
]

const heartRooms = {}

function getRoom(jid) {

    if (!heartRooms[jid]) {

        heartRooms[jid] = {

    active: false,

    started: false,

    players: [],

    hearts: {},

    currentQuestion: null,

    currentAttacker: null,

    rounds: 0,

    usedQuestions: [],

    usedImages: [],

    usedRepeats: [],

    eliminatedOrder: [],

    answered: false

}

    }

    return heartRooms[jid]

}
function normalize(text) {
    return String(text)
        .toLowerCase()
        .replace(/[جغق]/g, "ق")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .replace(/أ|إ|آ/g, "ا")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/[^\u0600-\u06FFa-z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim()
}
function getRandomQuestion(room) {

    const available = questions.filter(
        (_, index) =>
            !room.usedQuestions.includes(index)
    )

    if (!available.length) {

        room.usedQuestions = []

        return getRandomQuestion(room)

    }

    const question =
        available[
            Math.floor(Math.random() * available.length)
        ]

    room.usedQuestions.push(
        questions.indexOf(question)
    )

    return question

}
function getRandomImageQuestion(room) {

    const available = imageQuestions.filter(
        (_, index) =>
            !room.usedImages.includes(index)
    )

    if (!available.length) {

        room.usedImages = []

        return getRandomImageQuestion(room)

    }

    const question =
        available[
            Math.floor(Math.random() * available.length)
        ]

    room.usedImages.push(
        imageQuestions.indexOf(question)
    )

    return question

}
async function createHeartEvent(sock, msg) {

    const room = getRoom(msg.key.remoteJid)

    if (room.active) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "❌ توجد فعالية قلوب بالفعل."
            }
        )

    }

    room.active = true
room.started = false
room.players = []
room.hearts = {}
room.currentQuestion = null
room.currentAttacker = null
room.rounds = 0
room.usedQuestions = []
room.usedImages = []
room.usedRepeats = []
room.eliminatedOrder = []
room.answered = false

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`❤️ تم إنشاء فعالية القلوب

👥 الحد الأدنى:
${MIN_PLAYERS}

👥 الحد الأقصى:
${MAX_PLAYERS}

اكتب:

.تسجيل_قلوب`
        }
    )

}
async function joinHeartEvent(sock, msg, userId) {

    const room = getRoom(msg.key.remoteJid)

    if (!room.active)
        return

    if (room.started) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "❌ بدأت الفعالية."
            }
        )

    }

    if (room.players.includes(userId)) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "❌ أنت مسجل بالفعل."
            }
        )

    }

    if (room.players.length >= MAX_PLAYERS) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "❌ اكتمل التسجيل."
            }
        )

    }

    room.players.push(userId)

    room.hearts[userId] = {
        icon: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        hp: 3
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`✅ تم تسجيلك.

👥 عدد اللاعبين:

${room.players.length}/${MAX_PLAYERS}`,
            mentions: [userId]
        }
    )

}
async function startHeartEvent(sock, jid) {

    const room = getRoom(jid)

    if (!room.active)
        return

    if (room.started)
        return

    if (room.players.length < MIN_PLAYERS) {

        return sock.sendMessage(jid, {
            text:
`❌ لا يمكن بدء الفعالية.

الحد الأدنى:
${MIN_PLAYERS} لاعبين.`
        })

    }

    room.started = true

    await sock.sendMessage(jid, {
        text:
`❤️ بدأت فعالية القلوب!

👥 عدد المشاركين:
${room.players.length}

استعدوا لأول سؤال...`
    })

    setTimeout(() => {
        sendHeartQuestion(sock, jid)
    }, 2000)

}
async function sendHeartQuestion(sock, jid) {

    const room = getRoom(jid)

    room.currentAttacker = null
    room.currentQuestion = null
    room.answered = false

    const mode = Math.floor(Math.random() * 2)

    if (mode === 0) {

        const question = getRandomQuestion(room)

        room.currentQuestion = {
            type: "text",
            answers: [
                normalize(question.answer)
            ]
        }

        return sock.sendMessage(jid, {
            text:
`🎯 سؤال جديد

❓ ${question.question}`
        })

    }

    const image = getRandomImageQuestion(room)

    room.currentQuestion = {
        type: "image",
        answers: image.answers.map(a => normalize(a))
    }

    return sock.sendMessage(jid, {
        image: {
            url: image.image
        }
    })

}
async function checkHeartAnswer(sock, jid, userId, text) {

    const room = getRoom(jid)

    if (!room.started)
        return false

    if (room.answered)
        return false

    if (!room.currentQuestion)
        return false

    const answer = normalize(text)

    const correct =
        room.currentQuestion.answers.some(
            a => normalize(a) === answer
        )

    if (!correct)
        return false

    room.currentAttacker = userId
    room.answered = true

    await sock.sendMessage(
        jid,
        {
            text:
`✅ @${userId.split("@")[0]} أجاب أولاً!

❤️ اختر اللاعب الذي تريد إنقاص قلبه.

اكتب:

.نقص رقم`,
            mentions: [userId]
        }
    )

    await showHearts(sock, jid)

    return true

}
async function showHearts(sock, jid) {

    const room = getRoom(jid)

    let text = "❤️ القلوب\n\n"

for (let i = 0; i < room.players.length; i++) {

    const id = room.players[i]
    const data = room.hearts[id]

    if (!data || data.hp <= 0) {

        text += `${i + 1}- 💀 تم الإقصاء\n\n`
        continue

    }

    text += `${i + 1}- ${data.icon.repeat(data.hp)}\n\n`

    }

    text +=
`🎯 @${room.currentAttacker.split("@")[0]} أجاب أولاً.

اكتب:

.نقص رقم`

    await sock.sendMessage(
        jid,
        {
            text,
            mentions: [room.currentAttacker]
        }
    )

}
async function damagePlayer(sock, jid, attackerId, targetIndex) {

    const room = getRoom(jid)

    if (!room.started)
        return

    if (room.currentAttacker !== attackerId)
        return

    // الرقم الذي يكتبه اللاعب يبدأ من 1
    const target = room.players[targetIndex - 1]

    if (!target)
        return

    // لا يستطيع ضرب نفسه
    if (target === attackerId) {
        return sock.sendMessage(jid, {
            text: "❌ لا يمكنك اختيار نفسك."
        })
    }

    // إذا كان مقصى بالفعل
    if (
        !room.hearts[target] ||
        room.hearts[target].hp <= 0
    ) {
        return sock.sendMessage(jid, {
            text: "❌ هذا اللاعب مقصى بالفعل."
        })
    }

    // إنقاص قلب
    room.hearts[target].hp--

    room.currentAttacker = null
    room.answered = false

    // إذا خرج اللاعب
    if (room.hearts[target].hp <= 0) {

        room.hearts[target].hp = 0

        if (!room.eliminatedOrder.includes(target)) {
            room.eliminatedOrder.push(target)
        }

        await sock.sendMessage(
            jid,
            {
                text:
`💀 @${attackerId.split("@")[0]}
أقصى
@${target.split("@")[0]}`,
                mentions: [
                    attackerId,
                    target
                ]
            }
        )

        await showHearts(sock, jid)

    }

    // اللاعبين الأحياء
    const alivePlayers =
        room.players.filter(
            id =>
                room.hearts[id] &&
                room.hearts[id].hp > 0
        )

    // نهاية اللعبة
    if (alivePlayers.length <= 3) {

        const ranking = [
            ...alivePlayers.sort(
                (a, b) => room.hearts[b].hp - room.hearts[a].hp
            ),
            ...[...room.eliminatedOrder].reverse()
        ]

        const first = ranking[0]
        const second = ranking[1]
        const third = ranking[2]

        const text =
`🏆 انتهت فعالية القلوب

🥇 @${first?.split("@")[0] || "-"}

🥈 @${second?.split("@")[0] || "-"}

🥉 @${third?.split("@")[0] || "-"}`

        await sock.sendMessage(
            jid,
            {
                text,
                mentions: [first, second, third].filter(Boolean)
            }
        )

        room.active = false
        room.started = false
        room.players = []
        room.hearts = {}
        room.currentQuestion = null
        room.currentAttacker = null
        room.usedQuestions = []
        room.usedImages = []
        room.usedRepeats = []
        room.eliminatedOrder = []
        room.answered = false

        return

    }

    // السؤال التالي
    setTimeout(async () => {
        await sendHeartQuestion(sock, jid)
    }, 2000)

}
module.exports = {
    getRoom,
    createHeartEvent,
    joinHeartEvent,
    getRandomQuestion,
    getRandomImageQuestion,
    normalize,
    HEARTS,
    MAX_PLAYERS,
  startHeartEvent,
sendHeartQuestion,
  checkHeartAnswer,
  showHearts,
  damagePlayer,
    MIN_PLAYERS
}
