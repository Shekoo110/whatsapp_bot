let roundsCount = 0
const MAX_ROUNDS = 50
let lastMode = -1

let quizActive = false
let currentQuestion = null
let scoreboard = {}
let answeredUsers = new Set()

let usedQuestions = []
let usedImages = []
let usedRepeats = []

let playerProgress = {}
let questionSolved = false
let questionStartTime = 0

const repeatQuestions = [
    // ضع الأسماء هنا
]
function normalize(text) {
    return String(text)
        .toLowerCase()
        .replace(/[جغق]/g, 'ق')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/أ/g, 'ا')
        .replace(/إ/g, 'ا')
        .replace(/آ/g, 'ا')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        .replace(/[^\u0600-\u06FFa-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
}

function getRandomQuestion() {

    const availableQuestions =
        questions.filter(
            (_, index) =>
                !usedQuestions.includes(index)
        )

    if (!availableQuestions.length) {

        usedQuestions = []

        return getRandomQuestion()
    }

    const randomQuestion =
        availableQuestions[
            Math.floor(
                Math.random() *
                availableQuestions.length
            )
        ]

    const originalIndex =
        questions.indexOf(
            randomQuestion
        )

    usedQuestions.push(
        originalIndex
    )

    return randomQuestion
}
function getRandomRepeatQuestion() {

    const available =
        repeatQuestions.filter(
            name =>
                !usedRepeats.includes(name)
        )

    if (!available.length) {

        usedRepeats = []

        return getRandomRepeatQuestion()
    }

    const count =
        Math.min(
            Math.floor(Math.random() * 3) + 1,
            available.length
        )

    const selected =
        [...available]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)

    usedRepeats.push(...selected)

    return selected
}

function getRandomImageQuestion() {

    const available =
        imageQuestions.filter(
            (_, index) =>
                !usedImages.includes(index)
        )

    if (!available.length) {

        usedImages = []

        return getRandomImageQuestion()
    }

    const selected =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ]

    const originalIndex =
        imageQuestions.indexOf(
            selected
        )

    usedImages.push(
        originalIndex
    )

    return selected
}

async function startQuestion(
    sock,
    jid
) {

    if (roundsCount >= MAX_ROUNDS) {

        quizActive = false

roundsCount = 0
usedQuestions = []
usedImages = []
usedRepeats = []
scoreboard = {}
lastMode = -1

        await sock.sendMessage(
            jid,
            {
                text:

`🏆 انتهت المسابقة

📊 عدد الجولات: ${MAX_ROUNDS}

🎉 شكراً للجميع`
            }
        )

        return
    }

    answeredUsers.clear()

    playerProgress = {}

    questionSolved = false

    questionStartTime = Date.now()

    roundsCount++

    let mode

do {

    mode =
        Math.floor(Math.random() * 3)

} while (mode === lastMode)

lastMode = mode
    // سؤال
    if (mode === 0) {

        currentQuestion =
            getRandomQuestion()

        return await sock.sendMessage(
            jid,
            {
                text:

`🎯 سؤال جديد

❓ ${currentQuestion.question}`
            }
        )
    }

    // كتابة
    if (mode === 1) {

        const answers =
            getRandomRepeatQuestion()

        currentQuestion = {
            type: 'repeat',
            answers
        }

        return await sock.sendMessage(
            jid,
            {
                text:

`✍️ اكتب التالي:

${answers.join(' - ')}`
            }
        )
    }

    // صورة
    const imageQuestion =
        getRandomImageQuestion()

    currentQuestion = {
        type: 'image',
        answers:
            imageQuestion.answers
    }

    return await sock.sendMessage(
        jid,
        {
            image: {
                url:
                    imageQuestion.image
            },
            caption:
                '🖼️ من هذه الشخصية؟'
        }
    )
}

function checkAnswer(
    userId,
    answer
) {

    if (!currentQuestion)
        return false

    if (questionSolved)
        return false

    const normalizedAnswer =
        normalize(answer)

    if (!playerProgress[userId]) {

        playerProgress[userId] = {
            text: ''
        }
    }

    // تجميع جميع رسائل اللاعب
    playerProgress[userId].text +=
        ' ' + normalizedAnswer

    const fullText =
        playerProgress[userId].text

    const uniqueAnswers =
        [
            ...new Set(
                currentQuestion.answers.map(
                    a => normalize(a)
                )
            )
        ]

    let matchedCount = 0

    for (const correct of uniqueAnswers) {

        if (
            fullText.includes(correct)
        ) {
            matchedCount++
        }
    }

    const required =
        currentQuestion.required ||
        (
            currentQuestion.type ===
            'multi'
                ? Math.min(
                    3,
                    uniqueAnswers.length
                )
                : 1
        )

    if (
        matchedCount >= required
    ) {

        if (
            !scoreboard[userId]
        ) {
            scoreboard[userId] = 0
        }

        scoreboard[userId] += 1

        questionSolved = true

        delete playerProgress[userId]

        return true
    }

    return false
}

module.exports = {

    getRandomQuestion,
    getRandomRepeatQuestion,
    getRandomImageQuestion,

    startQuestion,

    checkAnswer,

    quizData: {
        get quizActive() {
            return quizActive
        },

        set quizActive(value) {
            quizActive = value
        },

        get roundsCount() {
            return roundsCount
        },

        set roundsCount(value) {
            roundsCount = value
        },

        get questionStartTime() {
            return questionStartTime
        },

        get currentQuestion() {
            return currentQuestion
        },

        set currentQuestion(value) {
            currentQuestion = value
        },

        scoreboard,

        answeredUsers,

        usedQuestions,

        usedImages,

        usedRepeats,

        playerProgress
    }
}

