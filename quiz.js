const questions = require('./questions')

let quizActive = false

let currentQuestion = null

let scoreboard = {}

let answeredUsers = new Set()

let usedQuestions = []

let playerProgress = {}

let questionSolved = false

function normalize(text) {

return String(text)
    .toLowerCase()

    .replace(/غ/g, 'ج')
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

async function startQuestion(
sock,
jid
) {

answeredUsers.clear()

playerProgress = {}

questionSolved = false

currentQuestion =
    getRandomQuestion()

await sock.sendMessage(
    jid,
    {
        text:

`🎯 سؤال جديد

❓ ${currentQuestion.question}

🏆 أول من يكمل الإجابة يحصل على نقطة`
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

const words =
    String(answer)
        .split(/\s+/)
        .map(normalize)

if (!playerProgress[userId]) {

    playerProgress[userId] =
        new Set()
}

for (const word of words) {

    const correct =
        currentQuestion.answers.find(
            answer =>
                normalize(answer) ===
                word
        )

    if (correct) {

        playerProgress[userId].add(
            normalize(correct)
        )
    }
}

const required =
    currentQuestion.required || 1

if (
    playerProgress[userId].size >=
    required
) {

    if (!scoreboard[userId]) {

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

startQuestion,

checkAnswer,

quizData: {

    get quizActive() {
        return quizActive
    },

    set quizActive(value) {
        quizActive = value
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

    playerProgress
}

}
