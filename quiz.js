const questions =
    require('./questions')

const imageQuestions =
    require('./imageQuestions')

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

usedQuestions.length = 0
usedImages.length = 0
usedRepeats.length = 0

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

${answers.map(a => `*${a}*`).join(' - ')}`
            }
        )
    }

    // صورة
const imageQuestion =
    getRandomImageQuestion()

console.log(
    'IMAGE QUESTION:',
    imageQuestion
)

currentQuestion = {
    type: 'image',
    answers: imageQuestion.answers
}

return await sock.sendMessage(
    jid,
    {
        image: {
            url: imageQuestion.image
        },
        caption: '🖼️ من هذه الشخصية؟'
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

    if (currentQuestion.type === 'repeat') {

    const normalizedText =
    normalize(fullText)

const allFound =
    uniqueAnswers.every(
        answer =>
            normalizedText.includes(
                normalize(answer)
            )
    )

    if (allFound) {

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

    let matchedCount = 0

for (const correct of uniqueAnswers) {

    const regex =
        new RegExp(
            `(^|\\s)${correct}(\\s|$)`
        )

    if (
        regex.test(fullText)
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

