const questions = require('./questions')

let quizActive = false

let currentQuestion = null

let scoreboard = {}

let answeredUsers = new Set()

let usedQuestions = []
