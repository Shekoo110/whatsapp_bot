const questions = require('./questions')

let quizActive = false

let currentQuestion = null

let scoreboard = {}

let answeredUsers = new Set()

let usedQuestions = []

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
        questions.indexOf(randomQuestion)

    usedQuestions.push(originalIndex)

    return randomQuestion
}

module.exports = {
    getRandomQuestion,

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

        usedQuestions
    }
}
