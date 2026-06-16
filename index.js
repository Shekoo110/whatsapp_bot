const fs = require('fs')

const allowedGroups = [

'120363020823525909@g.us',

'120363400448225715@g.us'

]

const disabledGroups = new Set()

const kingdomStages = [

{
    name: "🏰 بوابة المملكة",
    power: 4500,
    reward: 100000
},

{
    name: "⚔️ حرس العاصمة",
    power: 5000,
    reward: 120000
},

{
    name: "🛡️ الفرسان الملكيون",
    power: 5500,
    reward: 140000
},

{
    name: "👑 قاعة العرش",
    power: 6000,
    reward: 160000
},

{
    name: "🏹 أبراج المراقبة",
    power: 6500,
    reward: 180000
},

{
    name: "🔥 ساحة الحرب الكبرى",
    power: 7000,
    reward: 200000
},

{
    name: "🌑 الحصن المظلم",
    power: 7500,
    reward: 240000
},

{
    name: "⚜️ مقر النبلاء",
    power: 8000,
    reward: 260000
},

{
    name: "🐉 التنين الحارس",
    power: 8500,
    reward: 280000
},

{
    name: "👑 العرش الإمبراطوري",
    power: 9000,
    reward: 320000
}

]


process.on('uncaughtException', err => {
    console.error('UNCAUGHT:')
    console.error(err)
})

process.on('unhandledRejection', err => {
    console.error('REJECTION:')
    console.error(err)
})

const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')


const ffmpeg =
    require('fluent-ffmpeg')

const ffmpegPath =
    require('ffmpeg-static')

ffmpeg.setFfmpegPath(
    ffmpegPath
)
const pkg = require('./package.json')

console.log(
  'PACKAGE JSON BAILEYS:',
  pkg.dependencies['@whiskeysockets/baileys']
)

console.log(
  'BAILEYS VERSION:',
  require('@whiskeysockets/baileys/package.json').version
)
const {
    Sticker,
    StickerTypes
} = require(
    'wa-sticker-formatter'
)

const {
    downloadMediaMessage
} = require(
    '@whiskeysockets/baileys'
)

const {
    startQuestion,
    checkAnswer,
    quizData
} = require('./quiz')
const path = require('path')
const ownerId = "175114725408817"

function isOwner(msg) {
    const sender =
        (msg.key.participant || msg.key.remoteJid).split("@")[0]

    return sender === ownerId
}
const startAutoEvents =
    require('./autoEvents')
const axios = require('axios')
const eventManager =
    require('./eventManager')
const pendingSwaps = new Map()
const Waifu = require('./models/Waifu')
const {
    checkRespawn
} = require(
    './systems/beastManager'
)
const { calculateDamageAdvanced } = require('./utils/pvp')
const express = require("express")
const restoreAniListImages =
    require('./restoreAniListImages')
const QRCode = require("qrcode")
const cooldowns = new Map()
const urAbilities =
    require('./urAbilities')
const cheerio = require("cheerio");

console.log("cheerio loaded OK");
const WaifuTrade =
    require('./models/WaifuTrade')
console.log('Bot starting...')
const importGamesWaifus =
    require('./importGamesWaifus')
const mongoose = require('mongoose')
const lastRolls = new Map()
const PvP = require('./models/PvP')
const Player = require('./models/Player')
const Beast =
require('./database/Beast')
const beasts =
require('./systems/beasts')

const { playerAbilities } = require('./systems/playerAbilities')
const {
    getKuramaAbility,
    getJuubiAbility
} = require('./systems/beastAbilities')

const beastRewards =
require(
    './systems/beastRewards'
)
const bossAbilities = require('./bossAbilities')


const WaifuPlayer =
    require('./models/WaifuPlayer')

const bosses = require('./bosses')
const xo =
    require('./xo')
const characters = require('./characters.json')
const { GoogleGenAI } =
require("@google/genai")

const ai =
new GoogleGenAI({
    apiKey:
    process.env.GEMINI_API_KEY
})

function normalizeName(name) {

    return name
        .toLowerCase()
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/[قغج]/g, 'ق')
        .replace(/[ؤئ]/g, 'ء')
        .replace(/\s+/g, '')
        .trim()
}

async function askGemini(prompt) {

    try {

        const response =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            })

        console.log(
            "Gemini Response:",
            response.text
        )

        return (
            response.text || ""
        ).trim()

    } catch (err) {

        console.log(
            "Gemini Error:",
            err
        )

        return "❌ خطأ"
    }
}

const BEAST_GROUPS = [
    '120363400448225715@g.us',
    '120363020823525909@g.us'
]
const guessCharacters =
    require('./guessCharacters')

global.guessGame = {
    active: false,
    character: null,
    questions: 0,
    maxQuestions: 30,
    startedAt: 0,
    players: {},
    groupId: null
}

const getRank = require('./utils/rank')
const { getSkillDamage } = require('./utils/skills')
const Boss = require('./models/Boss')
const { getTotalStats } = require('./utils/stats')
const { generateEquipmentShop } = require('./utils/shop')

const royaleDrops = [

    {
        name: "🩸 صندوق دم",
        type: "hp",
        value: 3000
    },

    {
        name: "🧪 صندوق مسموم",
        type: "damage",
        value: 2000 - 5000
    },

    {
        name: "💉 إحياء",
        type: "revive"
    },

    {
        name: "❤️ إحياء 50%",
        type: "reviveHalf"
    },

    {
        name: "⚔️ سلاح +1000",
        type: "atk",
        value: 1000
    },

    {
        name: "🔥 سلاح +1500",
        type: "atk",
        value: 1500
    },

    {
        name: "🎯 قناص",
        type: "sniper"
    },
    
    {
    name: "🛡️ درع",
    type: "shield"
}
]
function getNextRoyalePlayer() {

    const alive =
        global.battleRoyale.players.filter(
            p => p.alive
        )

    if (alive.length <= 1) {
        return null
    }

    const currentIndex =
        alive.findIndex(
            p =>
                p.userId ===
                global.battleRoyale.currentTurn
        )

    if (currentIndex === -1) {
        return alive[0]
    }

    return alive[
        (currentIndex + 1) %
        alive.length
    ]
}
function getAliveRoyalePlayers() {

    return global.battleRoyale.players.filter(
        p => p.alive
    )
}

// ======================================
// BATTLE ROYALE
// ======================================

global.battleRoyale = {

    active: false,

    started: false,

    players: [],

    currentTurn: null,

    currentDrop: null,

    turnCount: 0,

    rankings: []
}
if (!global.shopStarted) {

    global.shopStarted = true

    const Player = require('./models/Player')

    setInterval(async () => {

        const shopItems = generateEquipmentShop()

        await Player.updateMany({}, {
            $set: {
                "shop.items": shopItems,
                "shop.lastRefresh": Date.now()
            }
        })

        console.log("🏪 Shop refreshed")

    }, 24 * 60 * 60 * 1000) // كل 24 ساعة
}
const {
    giveReward
} = require('./eventRewards')

const abilityIcons = {
    attack: "⚔️",
    defense: "🛡️",
    crit: "🎯",
    dodge: "💨",
    reflect: "🪞",
    lifesteal: "🩸",
    bossDamage: "👑",
    freeze: "❄️",
    stun: "💫",
    ultimate: "🌟"
}
const Market = require('./models/Market')
const Shop = require('./models/Shop')
// require / imports هنا

console.log("MONGO =", process.env.MONGO_URI)

if (!process.env.MONGO_URI) {
    console.log("❌ MONGO_URI is missing in Render!")
}
// 👇 هنا مباشرة


async function generateCharacterShop() {

    const rarities = [
        { name: 'عادي', chance: 50 },
        { name: 'ممتاز', chance: 30 },
        { name: 'اسطوري', chance: 15 },
        { name: 'SSS', chance: 5 }
    ]

    function getRandomRarity() {

        let rand = Math.random() * 100
        let sum = 0

        for (const r of rarities) {
            sum += r.chance

            if (rand <= sum) {
                return r.name
            }
        }

        return 'عادي'
    }

    const allCharacters = characters

const oldShop = await Shop.findOne()

if (oldShop) {

    const age =
        Date.now() - oldShop.createdAt

    if (age < 60 * 60 * 1000) {
        return await Shop.find()
    }
}

    let shopItems = []

    for (let i = 0; i < 5; i++) {

        const rarity = getRandomRarity()

        const pool = allCharacters.filter(
            c => c.rarity === rarity
        )

        if (!pool.length) continue

        const character =
            pool[Math.floor(Math.random() * pool.length)]

        const priceMultiplier = {
            'عادي': 1000,
            'ممتاز': 3000,
            'اسطوري': 8000,
            'SSS': 20000
        }

        const price =
            priceMultiplier[rarity] +
            Math.floor(Math.random() * 1000)

        shopItems.push({
            character,
            price
        })
    }

    await Shop.deleteMany({})
    await Shop.insertMany(shopItems)

    return shopItems
}

generateCharacterShop().catch(console.error)

setInterval(async () => {
    try {
        await generateCharacterShop()
        console.log('✅ Shop refreshed')
    } catch (err) {
        console.log('❌ Shop refresh error:', err)
    }
}, 60 * 60 * 1000)


const ABILITY_CHANCE = 30
const levelAbilities = {

5: {
    name: "👁️ شارينغان",
    type: "crit",
    value: 5,
    description: "5% ضربة حرجة إضافية"
},

10: {
    name: "🛡️ صلابة الحديد",
    type: "defense",
    value: 5,
    description: "تقليل الضرر 5%"
},

15: {
    name: "⚔️ عين الصقر",
    type: "crit",
    value: 5,
    description: "زيادة فرصة الضربة الحرجة"
},

20: {
    name: "🔥 لهب التنين",
    type: "reflect",
    value: 5,
    description: "إرجاع 5% من الضرر"
},

25: {
    name: "🌑 رينيغان",
    type: "lifesteal",
    value: 5,
    description: "استعادة 5% من الضرر"
},

30: {
    name: "💀 سوسانو",
    type: "attack",
    value: 10,
    description: "زيادة الهجوم 10%"
},

35: {
    name: "🦅 غرائز المقاتل",
    type: "dodge",
    value: 10,
    description: "زيادة المراوغة 10%"
},

40: {
    name: "👑 هاكي الملك",
    type: "stun",
    value: 5,
    description: "5% شل الخصم"
},

45: {
    name: "🐉 تنين الأساطير",
    type: "bossDamage",
    value: 10,
    description: "ضرر إضافي ضد الزعيم"
},

50: {
    name: "☄️ قوة الكواكب",
    type: "attack",
    value: 15,
    description: "زيادة الهجوم 15%"
},

55: {
    name: "❄️ تجميد الزمن",
    type: "freeze",
    value: 5,
    description: "5% تجميد الخصم"
},

60: {
    name: "⚔️ سيد المعارك",
    type: "crit",
    value: 10,
    description: "10% ضربة حرجة"
},

65: {
    name: "🛡️ درع العمالقة",
    type: "defense",
    value: 10,
    description: "تقليل الضرر 10%"
},

70: {
    name: "🌋 غضب البركان",
    type: "reflect",
    value: 10,
    description: "عكس 10% من الضرر"
},

75: {
    name: "👹 قوة الشياطين",
    type: "attack",
    value: 20,
    description: "زيادة الهجوم 20%"
},

80: {
    name: "🌌 بوابة الأبعاد",
    type: "dodge",
    value: 15,
    description: "15% مراوغة"
},

85: {
    name: "🌩️ سيد العواصف",
    type: "reflect",
    value: 15,
    description: "يعكس 15% من الضرر على الخصم"
},

90: {
    name: "💎 الجسد الماسي",
    type: "defense",
    value: 15,
    description: "تقليل الضرر 15%"
},

95: {
    name: "🔥 ملك الجحيم",
    type: "lifesteal",
    value: 15,
    description: "استعادة 15% من الضرر"
},

100: {
    name: "🌟 الحاكم المطلق",
    type: "ultimate",
    value: 25,
    description: "زيادة جميع الإحصائيات 25%"
}

}

const towerFloors = [
    { floor: 1, power: 100, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 2, power: 200, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 3, power: 300, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 4, power: 400, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },

    { floor: 5, power: 500, image: "https://i.ibb.co/S7MYnHwK/d3e32f445a48b03ce66a6a0263c82209.jpg" },

    { floor: 6, power: 600, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 7, power: 700, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 8, power: 800, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 9, power: 900, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },

    { floor: 10, power: 1000, image: "https://i.ibb.co/wZSxYGwB/daaf196974a336df16b38316cf1a92fe.jpg" },

    { floor: 11, power: 1100, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 12, power: 1200, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 13, power: 1300, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 14, power: 1400, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },

    { floor: 15, power: 1500, image: "https://i.ibb.co/Kx32GkHX/12293457284af38fb6b88758031744fb.jpg" },

    { floor: 16, power: 1600, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 17, power: 1700, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 18, power: 1800, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 19, power: 1900, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },

    { floor: 20, power: 2500, image: "https://i.ibb.co/wZSxYGwB/daaf196974a336df16b38316cf1a92fe.jpg" },

    { floor: 21, power: 2100, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 22, power: 2200, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 23, power: 2300, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 24, power: 2400, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },

    { floor: 25, power: 3500, image: "https://i.ibb.co/G3NnF7YC/46d1f696c88e983ee8524cc2b4b117b4.jpg" },

    { floor: 26, power: 2600, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 27, power: 2700, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 28, power: 2800, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },
    { floor: 29, power: 2900, image: "https://i.ibb.co/Fkrdc9TV/what-is-an-underground-prison-cell-called-1.jpg" },

    { floor: 30, power: 5000, image: "https://i.ibb.co/JRK1vHjm/e06dcfcff98f3cc474e6c330375386c6.jpg" }
];

function getTowerReward(floor) {

    switch (floor) {

        case 1:
            return { draws: 1, xp: 100 }

        case 2:
            return { draws: 1, xp: 100 }

        case 3:
            return { draws: 1, xp: 100 }

        case 4:
            return { draws: 1, xp: 100 }

        case 5:
            return {
                money: 500,
                xp: 500,
                box: 'basic'
            }

        case 6:
            return { draws: 1, xp: 150 }

        case 7:
            return { draws: 1, xp: 150 }

        case 8:
            return { draws: 1, xp: 150 }

        case 9:
            return { draws: 1, xp: 150 }

        case 10:
            return {
                money: 1000,
                xp: 1000,
                box: 'rare'
            }

        case 11:
            return { draws: 1, xp: 200 }

        case 12:
            return { draws: 1, xp: 200 }

        case 13:
            return { draws: 1, xp: 200 }

        case 14:
            return { draws: 1, xp: 200 }

        case 15:
            return {
                money: 1500,
                xp: 2000,
                box: 'epic'
            }

        case 16:
            return { draws: 1, xp: 300 }

        case 17:
            return { draws: 1, xp: 300 }

        case 18:
            return { draws: 1, xp: 300 }

        case 19:
            return { draws: 1, xp: 300 }

        case 20:
            return {
                money: 2000,
                xp: 3000,
                box: 'legendary'
            }

        case 21:
            return { draws: 1, xp: 400 }

        case 22:
            return { draws: 1, xp: 400 }

        case 23:
            return { draws: 1, xp: 400 }

        case 24:
            return { draws: 1, xp: 400 }

        case 25:
            return {
                money: 3000,
                xp: 5000,
                box: 'sss_chance'
            }

        case 26:
            return { draws: 1, xp: 500 }

        case 27:
            return { draws: 1, xp: 500 }

        case 28:
            return { draws: 1, xp: 500 }

        case 29:
            return { draws: 1, xp: 500 }

        case 30:
            return {
                money: 4000,
                xp: 10000,
                box: 'sss_high',
                title: '👑 ملك الأبطال'
            }

        default:
            return null
    }
}

function getRandomCharacterByRarity(rarity) {

    const list = characters.filter(
        c => c.rarity === rarity
    )

    if (!list.length) return null

    return list[
        Math.floor(
            Math.random() * list.length
        )
    ]
}

function getRandomCharacterByBox(boxType) {

    let pool = []

    switch (boxType) {

        case 'basic':
            pool = characters.filter(
                c => c.rarity === 'عادي' || c.rarity === 'ممتاز'
            )
            break

        case 'rare':
            pool = characters.filter(
                c =>
                    c.rarity === 'عادي' ||
                    c.rarity === 'ممتاز' ||
                    c.rarity === 'اسطوري'
            )
            break

        case 'epic':
            pool = characters.filter(
                c =>
                    c.rarity === 'ممتاز' ||
                    c.rarity === 'اسطوري'
            )
            break

        case 'legendary':
            pool = characters.filter(
                c => c.rarity === 'اسطوري'
            )
            break

        case 'sss_chance':

            if (Math.random() < 0.05) {
                pool = characters.filter(
                    c => c.rarity === 'SSS'
                )
            } else {
                pool = characters.filter(
                    c => c.rarity === 'اسطوري'
                )
            }

            break

        case 'sss_high':

            if (Math.random() < 0.30) {
                pool = characters.filter(
                    c => c.rarity === 'SSS'
                )
            } else {
                pool = characters.filter(
                    c => c.rarity === 'اسطوري'
                )
            }

            break
    }

    return pool[
        Math.floor(Math.random() * pool.length)
    ]
}

const importWaifus =
require('./importWaifus')

async function setupBeasts() {

    const kurama =
        await Beast.findOne({
            name: 'كوراما'
        })

    if (!kurama) {

        await Beast.create({
            name: 'كوراما',
            hp: 3000000,
            maxHp: 3000000
        })
    }

    const juubi =
        await Beast.findOne({
            name: 'الجوبي'
        })

    if (!juubi) {

        await Beast.create({
            name: 'الجوبي',
            hp: 3000000,
            maxHp: 3000000
        })
    }
}

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log('✅ MongoDB Connected')

    const player =
    
    console.log(
        '✅ Beasts Loaded'
    )
    await checkRespawn()

setInterval(
    checkRespawn,
    60000
)

console.log(
    '✅ Beast Respawn System Started'
)

    currentBoss =
        await Boss.findOne({})

    console.log(
        'Loaded Boss Full:',
        JSON.stringify(currentBoss, null, 2)
    )

    if (currentBoss) {

        console.log(
            'Boss loaded:',
            currentBoss.name
        )

        console.log(
            'Boss finished:',
            currentBoss.finished
        )

        console.log(
            'Boss respawnAt:',
            currentBoss.respawnAt
        )
    }

    try {

        await mongoose.connection.db
            .collection('waifus')
            .dropIndex('anilistId_1')

        console.log(
            'anilistId index deleted'
        )

    } catch (err) {

        console.log(
            'index not found'
        )
    }

    const totalWaifus =
        await Waifu.countDocuments()

    console.log(
        'TOTAL WAIFUS:',
        totalWaifus
    )

})
.catch(err =>
    console.log(
        'MongoDB Error:',
        err
    )
)


const safeLoadPlayers = () => {
    try {
        let players = loadPlayers()
        return players || {}
    } catch (e) {
        return {}
    }
}

const safeSavePlayers = (players) => {
    try {
        savePlayers(players)
    } catch (e) {
        console.log('Save error players')
    }
}

const safeLoadMarket = () => {
    try {
        let market = loadMarket()
        return market || []
    } catch (e) {
        return []
    }
}

const safeSaveMarket = (market) => {
    try {
        saveMarket(market)
    } catch (e) {
        console.log('Save error market')
    }
}


// =========================
// ملفات اللعبة
// =========================

const playersFile =
'./players.json'

const marketFile =
'./market.json'

// ===== تشغيل السيرفر =====

const app = express()

app.get('/health', (req, res) => {

    res.status(200).send('OK')
})

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
        money: 0,

        towerFloor: 1,
        usedCharacters: [],
        towerCompleted: false,

        attackBonus: 0,
        defenseBonus: 0,

        critBonus: 0,
        dodgeBonus: 0,
        reflectBonus: 0,
        lifestealBonus: 0,
        bossDamageBonus: 0,

        specialAbilities: [],

        hpBonus: 0,

        maxCharacters: 30,

        title: null
    }
}


// =========================
// متجر الشخصيات
// =========================

async function generateCharacterShop() {

    const shopItems = await Shop.find()

    // ⏳ إذا المتجر موجود ومضى أقل من ساعة، لا تعيد التوليد
    if (shopItems.length > 0) {

    const firstItem = shopItems[0]

    if (firstItem?.createdAt) {

        const age =
            Date.now() -
            new Date(firstItem.createdAt).getTime()

        if (age < 60 * 60 * 1000) return
    }
}

    await Shop.deleteMany({})

    for (let i = 0; i < 10; i++) {

        let rarity = 'عادي'

        const chance = Math.random() * 100

        if (chance <= 10)
            rarity = 'SSS'
        else if (chance <= 20)
            rarity = 'اسطوري'
        else if (chance <= 40)
            rarity = 'ممتاز'

        const pool = characters.filter(
            c => c.rarity === rarity
        )

        if (!pool.length) continue

        const character =
            pool[Math.floor(Math.random() * pool.length)]

        let price = character.power * 2

        if (rarity === 'ممتاز')
            price = character.power * 3

        if (rarity === 'اسطوري')
            price = character.power * 5

        if (rarity === 'SSS')
            price = character.power * 8

        await Shop.create({
            character,
            price
        })
    }
}



async function startBrawl(
    sock,
    jid,
    player1,
    player2
) {

    const team1 =
        player1.pvpTeam.map(
            i => player1.characters[i]
        )

    const team2 =
        player2.pvpTeam.map(
            i => player2.characters[i]
        )
    if (
    team1.length !== 3 ||
    team2.length !== 3
) {
    return sock.sendMessage(
        jid,
        {
            text:
            '❌ أحد اللاعبين لا يملك تشكيلة كاملة'
        }
    )
}

    let wins1 = 0
    let wins2 = 0

    await sock.sendMessage(
    jid,
    {
        text:
`🥊 ═══════〔 بداية المضاربة 〕═══════ 🥊

@${player1.userId.split('@')[0]}
🆚
@${player2.userId.split('@')[0]}`,
        mentions: [
            player1.userId,
            player2.userId
        ]
    }
)

await new Promise(
    r => setTimeout(r, 2000)
)

    for (
        let round = 0;
        round < 3;
        round++
    ) {

        const char1 =
    team1[round]

const char2 =
    team2[round]

if (!char1 || !char2) {
    continue
}

        let dmg1 =
    char1.power || 0

let dmg2 =
    char2.power || 0

let roundLog = ''

        // =========================
// PLAYER 1 ABILITIES
// =========================

for (const ability of char1.urAbilities || []) {

    if (
    ability.type === 'attack' ||
    ability.type === 'bossDamage'
) {

    dmg1 = Math.floor(
        dmg1 *
        (1 + ability.value / 100)
    )

    roundLog += `

🔥 ${ability.name}

⚔️ +${ability.value}% قوة`
}

    if (
    ability.type === 'critRate' &&
    Math.random() * 100 <=
    ability.value
) {

    dmg1 *= 2

    roundLog += `

🎯 ${ability.name}

💥 ضربة حرجة ×2`
}

    if (
    ability.type === 'lifesteal'
) {

    const bonus =
        Math.floor(
            dmg1 *
            ability.value / 200
        )

    dmg1 += bonus

    roundLog += `

💀 ${ability.name}

🩸 امتص ${bonus} قوة إضافية`
}
    if (
    ability.type === 'shield'
) {

    dmg2 = Math.floor(
        dmg2 *
        (
            1 -
            ability.value / 100
        )
    )

    roundLog += `

🛡️ ${ability.name}

📉 خفض ضرر الخصم ${ability.value}%`
}

    if (
    ability.type === 'reflect'
) {

    const reflected =
        Math.floor(
            dmg2 *
            ability.value / 100
        )

    dmg1 += reflected

    roundLog += `

🪞 ${ability.name}

💥 عكس ${reflected} ضرر`
}

    if (
    ability.type === 'dodge' &&
    Math.random() * 100 <=
    ability.value
) {

    dmg2 = 0

    roundLog += `

👻 ${ability.name}

💨 تفادى الهجمة بالكامل`
}
}

// =========================
// PLAYER 2 ABILITIES
// =========================

for (const ability of char2.urAbilities || []) {

    if (
    ability.type === 'attack' ||
    ability.type === 'bossDamage'
) {

    dmg2 = Math.floor(
        dmg2 *
        (1 + ability.value / 100)
    )

    roundLog += `

🔥 ${ability.name}

⚔️ +${ability.value}% قوة`
}

    if (
    ability.type === 'critRate' &&
    Math.random() * 100 <=
    ability.value
) {

    dmg2 *= 2

    roundLog += `

🎯 ${ability.name}

💥 ضربة حرجة ×2`
}

    if (
    ability.type === 'lifesteal'
) {

    const bonus =
        Math.floor(
            dmg2 *
            ability.value / 200
        )

    dmg2 += bonus

    roundLog += `

💀 ${ability.name}

🩸 امتص ${bonus} قوة إضافية`
}

    if (
    ability.type === 'shield'
) {

    dmg1 = Math.floor(
        dmg1 *
        (
            1 -
            ability.value / 100
        )
    )

    roundLog += `

🛡️ ${ability.name}

📉 خفض ضرر الخصم ${ability.value}%`
}

    if (
    ability.type === 'reflect'
) {

    const reflected =
        Math.floor(
            dmg1 *
            ability.value / 100
        )

    dmg2 += reflected

    roundLog += `

🪞 ${ability.name}

💥 عكس ${reflected} ضرر`
}

    if (
    ability.type === 'dodge' &&
    Math.random() * 100 <=
    ability.value
) {

    dmg2 = 0

    roundLog += `

👻 ${ability.name}

💨 تفادى الهجمة بالكامل`
}
}

        if (dmg1 > dmg2) {

    wins1++

    await sock.sendMessage(
        jid,
        {
            text:
`🥊 الجولة ${round + 1}

👑 ${char1.name}
⚔️ ${dmg1}

🆚

👑 ${char2.name}
⚔️ ${dmg2}

🏆 الفائز:
${char1.name}

${roundLog}

━━━━━━━━━━━━━━━`
        }
    )

    await new Promise(
        r => setTimeout(r, 2500)
    )

} else if (dmg2 > dmg1) {

    wins2++

    await sock.sendMessage(
        jid,
        {
            text:
`🥊 الجولة ${round + 1}

👑 ${char1.name}
⚔️ ${dmg1}

🆚

👑 ${char2.name}
⚔️ ${dmg2}

🏆 الفائز:
${char2.name}

${roundLog}

━━━━━━━━━━━━━━━`
        }
    )

    await new Promise(
        r => setTimeout(r, 2500)
    )
}
       } // ← هذا القوس يغلق for 

    let winner = null

    if (wins1 > wins2) {

    winner = player1

    player1.brawlWins++
    player2.brawlLosses++

    player1.money =
        (player1.money || 0) + 50000

    player1.xp =
        (player1.xp || 0) + 100

} else if (wins2 > wins1) {

    winner = player2

    player2.brawlWins++
    player1.brawlLosses++

    player2.money =
        (player2.money || 0) + 50000

    player2.xp =
        (player2.xp || 0) + 100
}

    player1.brawlFights =
        Math.max(
            0,
            (player1.brawlFights || 0) - 1
        )

    player2.brawlFights =
        Math.max(
            0,
            (player2.brawlFights || 0) - 1
        )

    await player1.save()
    await player2.save()

await sock.sendMessage(
    jid,
    {
        text:

winner ?

`👑 الفائز النهائي

@${winner.userId.split('@')[0]}

🏆 النتيجة:
${wins1} - ${wins2}

💰 المكافأة:
50,000 مال

⭐ الخبرة:
100 XP`

:

`⚖️ انتهت المضاربة بالتعادل

🏆 النتيجة:
${wins1} - ${wins2}

🚫 لا توجد مكافآت`,

        mentions:
        winner
        ? [winner.userId]
        : []
    }
)

return
}

async function spawnBoss(sock, groupId) {

    console.log('🔥 SPAWN BOSS CALLED')
    console.trace()

    const randomAbilities = []

    while (randomAbilities.length < 3) {

        const ability =
            bossAbilities[
                Math.floor(
                    Math.random() *
                    bossAbilities.length
                )
            ]

        if (
            !randomAbilities.find(
                a => a.name === ability.name
            )
        ) {
            randomAbilities.push(ability)
        }
    }

    currentBoss = {
    ...bosses[Math.floor(Math.random() * bosses.length)],

    abilities: randomAbilities,

    enraged: false,
    turnCounter: 0,
    activeFollowers: [],
    groupAttackCount: 0,

    finished: false,
    killer: null,
    respawnAt: null
}

    await Boss.deleteMany({})
    await Boss.create(currentBoss)
    console.log("Boss saved to MongoDB")

    console.log("Created Boss:", currentBoss.finished)

    const players = await Player.find({})

for (const player of players) {

const totalPower =  
    (player.characters || []).reduce(  
        (sum, c) => sum + (c.power || 0),  
        0  
    )  

let hp =  
    30000 + Math.floor(totalPower / 3)  

if (hp > 100000)  
    hp = 100000  

player.bossMaxHp = hp  
player.bossHp = hp  

player.bossDead = false  
player.bossRespawn = null  

await player.save()

}


    if (sock.user) {
    await sock.sendMessage(groupId, {
        text:`╔═════ ✦ 👑 ✦ ═════╗

🌍 ⚠️  ظهر زعيم عالمي جديد  ⚠️ 🌍

╚═════ ✦ 👑 ✦ ═════╝

👹 الزعيم:
『 ${currentBoss.name} 』

❤️ الصحة:
${currentBoss.hp}/${currentBoss.maxHp}

⚔️ قوة الهجوم:
${currentBoss.attack || 0}

👥 عدد الأتباع:
${currentBoss.followers?.length || 0}

✨ القدرات:

${
    currentBoss.abilities?.length
        ? currentBoss.abilities
            .map(a => `• ${a.name}`)
            .join('\n')
        : '• لا توجد قدرات'
}


━━━━━━━━━━━━━━━

⚔️ استعدوا للمعركة!
🔥 اجمعوا أقوى شخصياتكم
🏆 الجوائز بانتظار الأبطال

━━━━━━━━━━━━━━━

📜 الأوامر:

👑 .زعيم
↳ عرض معلومات الزعيم

🗡️ .هجوم
↳ مهاجمة الزعيم

━━━━━━━━━━━━━━━

💀 من سيوجه الضربة القاضية؟
🌟 ومن سيتصدر قائمة الضرر؟

🚨 المعركة بدأت الآن!`
})
}
}


// =========================
// تشغيل البوت
// =========================
            

let pairingRequested = false
let currentBoss = null
let beastInterval = null
let bossInterval = null
const GROUP_ID = "120363020823525909@g.us"

async function startBot() {
console.log('🚀 START BOT', Date.now())
    console.log("START BOT")

    if (!fs.existsSync('./auth')) {
        fs.mkdirSync('./auth', { recursive: true })
    }

    const { state, saveCreds } =
        await useMultiFileAuthState('auth')
    
console.log('AUTH EXISTS:',
    fs.existsSync('./auth')
)

if (fs.existsSync('./auth')) {
    console.log(
        'AUTH FILES:',
        fs.readdirSync('./auth')
    )
}

console.log(
    'REGISTERED:',
    state.creds.registered
)

console.log(
    'ME:',
    state.creds.me
)
    const { version } =
    await fetchLatestBaileysVersion()

const sock = makeWASocket({
    version,
    auth: state,

    printQRInTerminal: false,

    browser: [
        'Ubuntu',
        'Chrome',
        '22.04'
    ],

    markOnlineOnConnect: false,

    syncFullHistory: false
})

if (!state.creds.registered) {

    setTimeout(async () => {

        try {

            const code =
                await sock.requestPairingCode(
                    "201105749333"
                )

            console.log(
                "PAIRING CODE:",
                code
            )

        } catch (e) {

            console.log(
                "PAIRING ERROR:",
                e
            )
        }

    }, 10000)
}

sock.ev.on('creds.update', async () => {
    console.log('🔥 CREDS UPDATE')

    await saveCreds()

    console.log(
        'FILES NOW:',
        fs.readdirSync('./auth')
    )

    setTimeout(() => {
        console.log(
            'FILES AFTER 10s:',
            fs.readdirSync('./auth')
        )
    }, 10000)
})
console.log("REGISTERED =", state.creds.registered)
const BEAST_GROUPS = [
    '120363400448225715@g.us',
    '120363020823525909@g.us'
]

let lastKuramaRespawn = 0
let lastJuubiRespawn = 0
    
if (false) {
if (!beastInterval) {

    console.log('✅ Beast Interval Started')

    beastInterval = setInterval(async () => {

        try {

            const kurama = await Beast.findOne({
                name: 'كوراما'
            })

            if (
                kurama &&
                kurama.hp === kurama.maxHp &&
                kurama.lastKilledAt &&
                kurama.lastKilledAt.getTime() > lastKuramaRespawn
            ) {

                lastKuramaRespawn =
                    kurama.lastKilledAt.getTime()

                for (const groupId of BEAST_GROUPS) {

                    try {

                        if (!sock?.user)
                            continue

                        await sock.sendMessage(
                            groupId,
                            {
                                image: {
                                    url: kurama.image
                                },
                                caption:
`🦊 استيقظ كوراما!

🔥 الوحش العالمي عاد للحياة

❤️ HP:
${kurama.maxHp.toLocaleString()}

⚔️ استخدم:

.اقضي

للهجوم عليه`
                            }
                        )

                    } catch (err) {

                        console.log(
                            'Kurama Send Error:',
                            err
                        )
                    }
                }
            }

            const juubi =
                await Beast.findOne({
                    name: 'الجوبي'
                })

            if (
                juubi &&
                juubi.hp === juubi.maxHp &&
                juubi.lastKilledAt &&
                juubi.lastKilledAt.getTime() > lastJuubiRespawn
            ) {

                lastJuubiRespawn =
                    juubi.lastKilledAt.getTime()

                for (const groupId of BEAST_GROUPS) {

                    try {

                        if (!sock?.user)
                            continue

                        await sock.sendMessage(
                            groupId,
                            {
                                image: {
                                    url: juubi.image
                                },
                                caption:
`🌌 استيقظ الجوبي!

☠️ أقوى وحش عالمي عاد للحياة

❤️ HP:
${juubi.maxHp.toLocaleString()}

⚔️ استخدم:

.اباده

للهجوم عليه`
                            }
                        )

                    } catch (err) {

                        console.log(
                            'Juubi Send Error:',
                            err
                        )
                    }
                }
            }

        } catch (err) {

            console.log(
                'Beast Announce Error:',
                err
            )
        }

    }, 60000)
}
}
    console.log("SOCKET CREATED")

    



        /*
if (
    connection === 'connecting' &&
    !state.creds.registered &&
    !pairingRequested
) {
    pairingRequested = true

    setTimeout(async () => {
        try {

            const code =
                await sock.requestPairingCode(
                    '966562875546'
                )

            console.log(
                'PAIRING:',
                code
            )

        } catch (e) {

            console.log(
                'PAIRING ERROR:',
                e
            )

            pairingRequested = false
        }
    }, 10000)
}
*/

        

    async function videoToSticker(
    input,
    output
) {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            ffmpeg(input)

            .outputOptions([
                '-vcodec libwebp',
                '-vf scale=512:512:force_original_aspect_ratio=decrease,fps=15',
                '-loop 0',
                '-preset default',
                '-an',
                '-vsync 0',
                '-s 512:512'
            ])

            .save(output)

            .on(
                'end',
                resolve
            )

            .on('error', (err) => {
    console.log('FFMPEG ERROR FULL:')
    console.error(err)
    reject(err)
})
        }
    )
}
    
    // =========================
    // Shop (مرة واحدة فقط)
    // =========================
    if (!global.shopStarted) {
        global.shopStarted = true

        await generateShop()

        setInterval(async () => {
            await generateShop()
            console.log("🏪 Shop refreshed")
        }, 60 * 60 * 1000)
    }

 

    // =========================
    // safeSend
    // =========================
    const safeSend = async (jid, data) => {
        try {
            return await sock.sendMessage(jid, data)
        } catch (e) {
            console.log('Send error:', e)
        }
    }

    // =========================
    // CONNECTION
    // =========================
   

console.log("BEFORE CONNECTION UPDATE")

sock.ev.on('connection.update', async (update) => {

    console.log("CONNECTION UPDATE:", update)

    const connection = update.connection
    const qr = update.qr

    if (qr) {

    console.log(
        'NEW QR GENERATED',
        Date.now()
    )

    qrCodeData =
        await QRCode.toDataURL(qr)

    console.log('QR UPDATED')
}

console.log(
    'IS NEW LOGIN:',
    update.isNewLogin
)

    console.log("registered =", state.creds.registered)
    console.log("connection =", connection)

    // ✅ عرض QR فقط
    if (qr) {
        console.log("📱 QR CODE:", qr)
    }

    // ✅ حالة الاتصال
    if (connection === 'open') {
qrCodeData = ""
    console.log("✅ BOT CONNECTED")
console.log(
    'AUTH FILES OPEN:',
    fs.readdirSync('./auth')
)
        if (!currentBoss) {

            console.log("👑 لا يوجد زعيم محفوظ")

            await spawnBoss(sock, GROUP_ID)

            currentBoss = await Boss.findOne()
        }

        if (currentBoss) {

            currentBoss.finished =
                currentBoss.finished ?? false

            currentBoss.killer =
                currentBoss.killer ?? null

            if (
                currentBoss.finished &&
                !currentBoss.respawnAt
            ) {

                await Boss.deleteMany({})

                currentBoss = null

                await spawnBoss(
                    sock,
                    GROUP_ID
                )

                currentBoss =
                    await Boss.findOne()
            }
        }
    }


    const savedBoss = await Boss.findOne()

    console.log(
        'Loaded Boss:',
        JSON.stringify(savedBoss, null, 2)
    )

    currentBoss = savedBoss

    // ✅ لازم يكون داخل startBot
    if (!bossInterval) {

    bossInterval = setInterval(async () => {

        try {

            console.log(
                'Boss Check:',
                currentBoss?.finished,
                currentBoss?.respawnAt
            )

            if (
                currentBoss &&
                currentBoss.finished &&
                currentBoss.respawnAt &&
                currentBoss.respawnAt <= Date.now()
            ) {

                console.log('👑 إعادة إنشاء الزعيم')

                await Boss.deleteMany({})

                currentBoss = null

                await spawnBoss(sock, GROUP_ID)

                currentBoss = await Boss.findOne()
            }

        } catch (err) {

            console.log(
                'Boss Respawn Error:',
                err
            )
        }

    }, 60000)

    }
    

    console.log('البوت اشتغل')

    if (!global.eventsStarted) {

        global.eventsStarted = true

        startAutoEvents(sock)

        console.log(
            '✅ Auto Events Started'
        )
    }

    if (currentBoss) {

        console.log(
            '✅ تم استعادة الزعيم المحفوظ'
        )

    } else {

        await spawnBoss(
            sock,
            GROUP_ID
        )
    }




    if (connection === 'close') {
qrCodeData = ""
    console.log(
        '❌ CONNECTION CLOSED'
    )
console.log(
    'LAST DISCONNECT:',
    update.lastDisconnect?.error?.output?.statusCode
)
    console.dir(
        update?.lastDisconnect,
        { depth: 20 }
    )

    try {

        console.log(
            'ERROR JSON:',
            JSON.stringify(
                update?.lastDisconnect?.error,
                null,
                2
            )
        )

    } catch {}

    console.log(
        'registered =',
        state.creds.registered
    )

    console.log('انقطع الاتصال')

const shouldReconnect =
    state.creds.registered

if (shouldReconnect) {

    console.log(
        '🔄 RECONNECTING IN 5s'
    )

    setTimeout(() => {
        startBot()
    }, 5000)

    return

} else {

    console.log(
        'بانتظار إكمال الربط...'
    )
}
}
})

let lastBossHour = -1

setInterval(async () => {

    const now = new Date()

    if (
        now.getMinutes() === 0 &&
        now.getHours() !== lastBossHour &&
        !currentBoss
    ) {

        lastBossHour = now.getHours()

        await spawnBoss(
            sock,
            GROUP_ID
        )

        console.log(
            '👑 تم إنشاء زعيم جديد'
        )
    }

}, 60000)


    function getStrongestCharacter(
    player
) {

    if (
        !player.characters ||
        !player.characters.length
    ) {
        return null
    }

    return player.characters.reduce(
        (a, b) =>
            a.power > b.power
                ? a
                : b
    )
}

function getRandomPlayerAbility() {

    const total =
        playerAbilities.reduce(
            (sum, a) =>
                sum + a.chance,
            0
        )

    let roll =
        Math.random() * total

    for (const ability of playerAbilities) {

        roll -= ability.chance

        if (roll <= 0)
            return ability
    }

    return playerAbilities[0]
}

    // =========================
// الرسائل
// =========================
sock.ev.on('messages.upsert', async ({ messages }) => {

    const msg = messages[0]
    if (!msg?.message) return

  //  console.log(JSON.stringify(msg, null, 2))
    console.log("participant:", msg.key.participant)
    console.log("remoteJid:", msg.key.remoteJid)

    const text =
msg.message.conversation ||
msg.message.extendedTextMessage?.text

if (!text) return

const userId =
msg.key.participant ||
msg.key.remoteJid

if (
    disabledGroups.has(
        msg.key.remoteJid
    )
) {

    if (
        text !== '.تشغيل' ||
        userId.split('@')[0] !== ownerId
    ) {
        return
    }
}

if (msg.key.fromMe) return

const groupData =
eventManager.getGroupData(
msg.key.remoteJid
)

if (
groupData.eventRunning &&
groupData.currentEvent &&
text.trim() ===
groupData.currentEvent.command
) {

const joined =
    eventManager.joinEvent(
        msg.key.remoteJid,
        userId
    )

if (!joined)
    return

if (joined < 5) {

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`✅ انضممت للحدث

👥 المشاركون:
${joined}/5`
}
)

    return
}

const eventName =
    groupData.currentEvent.name

const winners =
    eventManager.finishEvent(
        msg.key.remoteJid
    )

let result =

`🏆 انتهى الحدث

🎯 ${eventName}

الفائزون:

`

for (const id of winners) {

    const reward =
        await giveReward(id)

    result +=

`👑 @${id.split('@')[0]}
🎁 ${reward}

`
}

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text: result,
        mentions: winners
    }
)

return

}

    // =========================
// 🧠 QUIZ SYSTEM
// =========================

if (
    quizData.quizActive &&
    text !== '.انهاء_مسابقة'
) {

    const isCorrect =
    checkAnswer(userId, text)

if (isCorrect) {

    const seconds =
        (
            Date.now() -
            quizData.questionStartTime
        ) / 1000

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🎉 إجابة صحيحة!

🏆 الفائز: @${userId.split('@')[0]}

⏱️ الوقت: ${seconds.toFixed(1)} ثانية

⭐ +1 نقطة`,
            mentions: [userId]
        },
        {
            quoted: msg
        }
    )

    setTimeout(() => {

        if (quizData.quizActive) {

            startQuestion(
                sock,
                msg.key.remoteJid
            )
        }

    }, 2000)
}

return
}

// =========================
// cooldown
// =========================

const key = userId + '_global'
const now = Date.now()

if (
    cooldowns.has(key) &&
    now - cooldowns.get(key) < 2000
) {
    return
}

cooldowns.set(key, now)


    // =========================
    // الأوامر العادية هنا
    // =========================

if (text === '.ايقاف') {

    if (
        userId.split('@')[0] !==
        ownerId
    ) {
        return
    }

    if (
        !allowedGroups.includes(
            msg.key.remoteJid
        )
    ) {
        return
    }

    disabledGroups.add(
        msg.key.remoteJid
    )

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
'🔴 تم إيقاف البوت مؤقتاً في هذا القروب'
        }
    )
}

if (text === '.تشغيل') {

    if (
        userId.split('@')[0] !==
        ownerId
    ) {
        return
    }

    if (
        !allowedGroups.includes(
            msg.key.remoteJid
        )
    ) {
        return
    }

    disabledGroups.delete(
        msg.key.remoteJid
    )

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
'🟢 تم تشغيل البوت مجدداً في هذا القروب'
        }
    )
}
    
    if (text === '.اصلاح_الالقاب') {

    const players = await Player.find({})

    let fixed = 0

    for (const player of players) {

        if (!player.titles)
            player.titles = []

        const titlesToAdd = [
            '🌌 حاكم الأكوان',
            '👑 ملك الأبطال'
        ]

        for (const title of titlesToAdd) {

            if (
                !player.titles.includes(
                    title
                )
            ) {

                player.titles.push(
                    title
                )

                fixed++
            }
        }

        await player.save()
    }

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`✅ تم استرجاع الألقاب القديمة

🏆 الألقاب المضافة:
🌌 حاكم الأكوان
👑 ملك الأبطال

👥 عدد الإضافات:
${fixed}`
        }
    )
}

if (text === '.اصلاح_ex') {

const player =
    await Player.findOne({
        userId
    })

if (!player) {

    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ لا يوجد حساب'
        }
    )
}

let fixed = 0

for (const char of player.characters) {

    if (
        char.evolutionLevel === 6
    ) {

        if (
            char.power < 25000
        ) {

            char.power = 25000
            fixed++
        }

        if (!char.urAbilities)
            char.urAbilities = []

        const availableAbilities =
            urAbilities.filter(
                a =>
                !char.urAbilities.some(
                    owned =>
                    owned.name === a.name
                )
            )

        if (
            availableAbilities.length > 0 &&
            char.urAbilities.length < 2
        ) {

            const exAbility =
                availableAbilities[
                    Math.floor(
                        Math.random() *
                        availableAbilities.length
                    )
                ]

            char.urAbilities.push(
                exAbility
            )
        }
    }
}

player.markModified(
    'characters'
)

await player.save()

return safeSend(
    msg.key.remoteJid,
    {
        text:

`✅ تم إصلاح شخصيات EX

⚔️ الشخصيات التي تم رفع قوتها:
${fixed}

👑 جميع شخصيات EX أصبحت بقوة 25000

🔥 وتم منح قدرة إضافية للشخصيات الناقصة`
}
)
}
    
if (text === '.المملكة') {

    const player =
        await Player.findOne({ userId })

    if (!player) {

        return safeSend(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد حساب'
            }
        )
    }

    const today =
new Date().toLocaleDateString(
    'en-CA',
    {
        timeZone:
        'Asia/Riyadh'
    }
)

    if (
        !player.kingdomRaid ||
        player.kingdomRaid.lastReset !== today
    ) {

        player.kingdomRaid = {
            stage: 0,
            usedCharacters: [],
            lastReset: today
        }

        await player.save()
    }

    const currentStage =
        player.kingdomRaid.stage

    if (currentStage >= 10) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:

`👑 ═════〔 المملكة 〕═════ 👑

🏆 تم احتلال المملكة بالكامل

💰 جميع الجوائز تم استلامها

⏳ يتجدد الغزو عند 12:00 ليلاً`
            }
        )
    }

    const stage =
        kingdomStages[currentStage]

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`👑 ═════〔 غزو المملكة 〕═════ 👑

📍 المرحلة الحالية:
${currentStage + 1}/10

${stage.name}

⚔️ القوة المطلوبة:
${stage.power}

💰 مكافأة المرحلة:
${stage.reward.toLocaleString()}

🔒 الشخصيات المستنزفة:
${player.kingdomRaid.usedCharacters.length}

📝 للدخول:

.غزو رقم_الشخصية`
        }
    )
}

    
if (text.startsWith('.غزو ')) {

    const player =
        await Player.findOne({ userId })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد حساب'
            }
        )
    }

    const today =
new Date().toLocaleDateString(
    'en-CA',
    {
        timeZone:
        'Asia/Riyadh'
    }
)

    if (
        !player.kingdomRaid ||
        player.kingdomRaid.lastReset !== today
    ) {

        player.kingdomRaid = {
            stage: 0,
            usedCharacters: [],
            lastReset: today
        }
    }

    const args =
        text.split(' ')

    const index =
        parseInt(args[1]) - 1

    if (isNaN(index)) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
'❌ مثال:\n.غزو 1'
            }
        )
    }

    const char =
        player.characters[index]

    if (!char) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
'❌ الشخصية غير موجودة'
            }
        )
    }

    if (
        player.kingdomRaid.usedCharacters.includes(
            char.name
        )
    ) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:

`🔒 ${char.name}

تم استنزاف هذه الشخصية اليوم

⏳ تعود عند إعادة تعيين الغزو`
            }
        )
    }

    const current =
        player.kingdomRaid.stage

    if (current >= 10) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
'🏆 أكملت الغزو اليومي'
            }
        )
    }

    const stage =
        kingdomStages[current]

    if (char.power < stage.power) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:

`❌ فشل الاقتحام

👑 ${char.name}

⚔️ القوة:
${char.power}

🏰 المطلوب:
${stage.power}

💡 الشخصية لم تُستهلك`
            }
        )
    }

    player.money += stage.reward

    player.kingdomRaid.usedCharacters.push(
        char.name
    )

    player.kingdomRaid.stage++

    player.markModified(
        'kingdomRaid'
    )

    await player.save()

    if (
        player.kingdomRaid.stage >= 10
    ) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:

`👑 تم فتح العرش الإمبراطوري

🏆 اكتمل غزو المملكة

💰 إجمالي الأرباح:
2,000,000

⏳ يتجدد عند 12:00 ليلاً`
            }
        )
    }

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`${stage.name}

⚔️ ${char.name}

✅ نجح الاقتحام

💰 +${stage.reward.toLocaleString()}

🔒 تم استنزاف الشخصية

📍 التقدم:
${player.kingdomRaid.stage}/10`
        }
    )
}
    
if (text === '.س') {

    try {

        const quoted =
            msg.message
            ?.extendedTextMessage
            ?.contextInfo

        if (
            !quoted ||
            !quoted.quotedMessage
        ) {
            return safeSend(
                msg.key.remoteJid,
                {
                    text:
'❌ قم بالرد على صورة أو GIF أو فيديو'
                }
            )
        }

        const quotedMsg =
            quoted.quotedMessage

        const buffer =
            await downloadMediaMessage(
                {
                    message:
                    quotedMsg
                },
                'buffer',
                {},
                {
                    logger:
                    console,

                    reuploadRequest:
                    sock.updateMediaMessage
                }
            )

        // صورة
        if (
            quotedMsg.imageMessage
        ) {

            const sticker =
                new Sticker(
                    buffer,
                    {
                        pack:
'❖ 𝑵𝒂𝒎𝒊𝒊 𝑺𝒘𝒂𝒏 ❖',

                        author:
'.',

                        type:
                        StickerTypes.FULL,

                        quality:
                        100
                    }
                )

            const webp =
                await sticker.toBuffer()

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    sticker:
                    webp
                }
            )
        }

        // فيديو / GIF
        if (
    quotedMsg.videoMessage
) {

    const input =
`./tmp_${Date.now()}.mp4`

    const output =
`./tmp_${Date.now()}.webp`

    await fs.promises.writeFile(
        input,
        buffer
    )

    await videoToSticker(
        input,
        output
    )

    const webp =
        await fs.promises.readFile(
            output
        )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            sticker: webp
        }
    )

    await fs.promises.unlink(
        input
    )

    await fs.promises.unlink(
        output
    )

    return
}

        return safeSend(
            msg.key.remoteJid,
            {
                text:
'❌ الوسائط غير مدعومة'
            }
        )

    } catch (err) {

    console.log('STICKER ERROR FULL:')
    console.error(err)

    return safeSend(
        msg.key.remoteJid,
        {
            text:
'❌ فشل إنشاء الستيكر'
        }
    )
}
}
                    
    
if (text.startsWith('.دمج')) {

    const player =
        await Player.findOne({
            userId
        })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يوجد حساب'
            }
        )
    }

    const args =
        text.split(' ')

    if (args.length !== 6) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:

`❌ الاستخدام الصحيح

.دمج 1 2 3 4 5`
            }
        )
    }

    const a =
        parseInt(args[1]) - 1

    const b =
        parseInt(args[2]) - 1

    const c =
        parseInt(args[3]) - 1

    const d =
        parseInt(args[4]) - 1

    const e =
        parseInt(args[5]) - 1

    const unique =
        new Set([a, b, c, d, e])

    if (unique.size !== 5) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يمكن تكرار نفس الشخصية'
            }
        )
    }

    const selected = [
        player.characters[a],
        player.characters[b],
        player.characters[c],
        player.characters[d],
        player.characters[e]
    ]

    for (const char of selected) {

        if (!char) {
            return safeSend(
                msg.key.remoteJid,
                {
                    text:
                    '❌ إحدى الشخصيات غير موجودة'
                }
            )
        }

        if (
            char.rarity !== 'اسطوري'
        ) {
            return safeSend(
                msg.key.remoteJid,
                {
                    text:
                    '❌ يجب أن تكون جميع الشخصيات من رتبة اسطوري'
                }
            )
        }
    }

    const sssPool =
        characters.filter(
            c =>
            c.rarity === 'SSS'
        )

    if (!sssPool.length) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا توجد شخصيات SSS'
            }
        )
    }

    const reward =
        JSON.parse(
            JSON.stringify(
                sssPool[
                    Math.floor(
                        Math.random() *
                        sssPool.length
                    )
                ]
            )
        )

    const indexes =
        [a, b, c, d, e]
        .sort((x, y) => y - x)

    for (const i of indexes) {
        player.characters.splice(
            i,
            1
        )
    }

    player.characters.push(
        reward
    )

    player.markModified(
        'characters'
    )

    await player.save()

    return safeSend(
        msg.key.remoteJid,
        {
            image: {
                url:
                reward.image
            },

            caption:

`✨ ═══════〔 الدمج 〕═══════ ✨

🔥 تم دمج 5 شخصيات اسطورية

🎁 حصلت على:

👑 ${reward.name}

🌟 ${reward.rarity}

⚔️ القوة:
${reward.power}

🎉 مبروك!`
        }
    )
}
    
if (text === '.مضارباتي') {

    const player =
        await Player.findOne({
            userId
        })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يوجد حساب'
            }
        )
    }

    const hour =
        60 * 60 * 1000

    const currentPeriod =
        Math.floor(
            Date.now() / hour
        )

    if (
        player.lastBrawlReset !==
        currentPeriod
    ) {

        player.brawlFights = 5

        player.lastBrawlReset =
            currentPeriod

        await player.save()
    }

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`🥊 ═══════〔 المضاربات 〕═══════ 🥊

⚔️ المتبقي:
${player.brawlFights}/5

🏆 الانتصارات:
${player.brawlWins || 0}

💀 الخسائر:
${player.brawlLosses || 0}`
        }
    )
}

    
if (text.startsWith('.تشكيلة')) {

    const player =
        await Player.findOne({
            userId
        })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد حساب'
            }
        )
    }

    const args =
        text.split(' ')

    if (args.length < 4) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:

`❌ الاستخدام الصحيح

.تشكيلة 1 2 3`
            }
        )
    }

    const indexes = [
        parseInt(args[1]) - 1,
        parseInt(args[2]) - 1,
        parseInt(args[3]) - 1
    ]

    if (
        indexes.some(
            i => isNaN(i)
        )
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ أرقام غير صحيحة'
            }
        )
    }

    if (
        new Set(indexes).size !== 3
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يمكن تكرار نفس الشخصية'
            }
        )
    }

    const selected = []

    for (const i of indexes) {

        const char =
            player.characters[i]

        if (!char) {

            return safeSend(
                msg.key.remoteJid,
                {
                    text:
`❌ الشخصية رقم ${i + 1} غير موجودة`
                }
            )
        }

        selected.push(i)
    }

    player.pvpTeam = selected

    await player.save()

    const names =
        selected.map(
            i =>
                `👑 ${player.characters[i].name}`
        )

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`🥊 ═══════〔 تم حفظ التشكيلة 〕═══════ 🥊

${names.join('\n')}

🔥 أصبحت جاهزاً للمضاربات`
        }
    )
}

    if (text === '.تشكيلتي') {

    const player =
        await Player.findOne({
            userId
        })

    if (
        !player ||
        !player.pvpTeam ||
        !player.pvpTeam.length
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لم تقم بتحديد تشكيلة بعد'
            }
        )
    }

    let result =
`🥊 ═══════〔 تشكيلتك القتالية 〕═══════ 🥊

`

    player.pvpTeam.forEach(
        (index, i) => {

            const char =
                player.characters[index]

            if (!char) return

            const evoRanks = [
                "SSS",
                "SSS+",
                "SSS++",
                "UR I",
                "UR II",
                "UR III",
                "EX"
            ]

            let rank =
                char.rarity

            if (
                char.evolutionLevel > 0
            ) {
                rank =
                    evoRanks[
                        char.evolutionLevel
                    ]
            }

            let abilities = ''

            if (
                char.urAbilities &&
                char.urAbilities.length
            ) {

                abilities =
                    '\n🔥 القدرات:\n' +
                    char.urAbilities
                    .map(a => `• ${a.name}`)
                    .join('\n')
            }

            result +=
`〔${i + 1}〕 ${char.name}

🌟 ${rank}
⚔️ القوة: ${char.power}
${abilities}

━━━━━━━━━━━━━━━

`
        }
    )

    return safeSend(
        msg.key.remoteJid,
        {
            text: result
        }
    )
}

    if (text.startsWith('.مضاربة')) {

    const mentioned =
        msg.message?.extendedTextMessage
        ?.contextInfo?.mentionedJid?.[0]

    if (!mentioned) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ قم بعمل منشن للشخص'
            }
        )
    }

    if (mentioned === userId) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يمكنك مضاربة نفسك'
            }
        )
    }

    const player =
        await Player.findOne({
            userId
        })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يوجد حساب'
            }
        )
    }

    if (
        !player.pvpTeam ||
        player.pvpTeam.length !== 3
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
`❌ يجب تحديد تشكيلة أولاً

.تشكيلة 1 2 3`
            }
        )
    }

    // تجديد المحاولات كل ساعة

    const hour =
        60 * 60 * 1000

    const currentPeriod =
        Math.floor(
            Date.now() / hour
        )

    if (
        player.lastBrawlReset !==
        currentPeriod
    ) {

        player.brawlFights = 5
        player.lastBrawlReset =
            currentPeriod

        await player.save()
    }

    if (
        player.brawlFights <= 0
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ انتهت محاولات المضاربة لهذا الساعة'
            }
        )
    }

    const target =
        await Player.findOne({
            userId: mentioned
        })

    if (!target) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ الخصم لا يملك حساباً'
            }
        )
    }

    if (
        !target.pvpTeam ||
        target.pvpTeam.length !== 3
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ الخصم لم يحدد تشكيلة'
            }
        )
    }

    target.pendingBrawl = {
        challenger: userId,
        createdAt: Date.now()
    }

    await target.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`🥊 تم إرسال طلب مضاربة

🎯 إلى:
@${mentioned.split('@')[0]}

⌛ بانتظار القبول

استخدم:

.قبول مضاربة
أو
.رفض مضاربة`,

            mentions: [mentioned]
        }
    )
}
    if (text === '.رفض مضاربة') {

    const player =
        await Player.findOne({
            userId
        })

    if (
        !player ||
        !player.pendingBrawl
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يوجد طلب مضاربة'
            }
        )
    }

    player.pendingBrawl = null

    await player.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ تم رفض المضاربة'
        }
    )
}
    
if (text === '.قبول مضاربة') {

    const player =
        await Player.findOne({
            userId
        })

    if (
        !player ||
        !player.pendingBrawl
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يوجد طلب مضاربة'
            }
        )
    }
    const age =
    Date.now() -
    player.pendingBrawl.createdAt

if (age > 5 * 60 * 1000) {

    player.pendingBrawl = null

    await player.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ انتهت صلاحية طلب المضاربة'
        }
    )
}

    const challenger =
        await Player.findOne({
            userId:
            player.pendingBrawl.challenger
        })

    if (!challenger) {

        player.pendingBrawl = null

        await player.save()

        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ صاحب المضاربة غير موجود'
            }
        )
    }

    // التحقق من التشكيلة

    if (
        !player.pvpTeam ||
        player.pvpTeam.length !== 3
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ قم بتحديد تشكيلتك أولاً\n\n.تشكيلة 1 2 3'
            }
        )
    }

    if (
        !challenger.pvpTeam ||
        challenger.pvpTeam.length !== 3
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ الخصم لا يملك تشكيلة مكتملة'
            }
        )
    }
    // المضاربات المتبقية

    if ((player.brawlFights || 0) <= 0) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ انتهت مضارباتك لهذه الساعة'
            }
        )
    }

    if ((challenger.brawlFights || 0) <= 0) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ الخصم لا يملك مضاربات متبقية'
            }
        )
    }

    player.brawlFights -= 1
    challenger.brawlFights -= 1

    player.pendingBrawl = null

    await player.save()
    await challenger.save()

    await startBrawl(
        sock,
        msg.key.remoteJid,
        challenger,
        player
    )
}
            

    if (text.startsWith('.مضاربة')) {

    const mentioned =
        msg.message?.extendedTextMessage
        ?.contextInfo?.mentionedJid?.[0]

    if (!mentioned) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ قم بعمل منشن للشخص'
            }
        )
    }

    if (mentioned === userId) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يمكنك مضاربة نفسك'
            }
        )
    }

    const player =
        await Player.findOne({
            userId
        })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يوجد حساب'
            }
        )
    }
        if (player.pendingBrawl) {

    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ لديك طلب مضاربة معلق'
        }
    )
}

    if (
        !player.pvpTeam ||
        player.pvpTeam.length !== 3
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:

`❌ يجب اختيار تشكيلة أولاً

.تشكيلة 1 2 3`
            }
        )
    }

    const hour =
        60 * 60 * 1000

    const currentPeriod =
        Math.floor(
            Date.now() / hour
        )

    if (
        player.lastBrawlReset !==
        currentPeriod
    ) {

        player.brawlFights = 5

        player.lastBrawlReset =
            currentPeriod

        await player.save()
    }

    if (
        player.brawlFights <= 0
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
`❌ انتهت المضاربات

⏳ تتجدد 5 مضاربات كل ساعة`
            }
        )
    }

    const target =
        await Player.findOne({
            userId: mentioned
        })

    if (!target) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ الخصم لا يملك حساباً'
            }
        )
    }

    if (
        !target.pvpTeam ||
        target.pvpTeam.length !== 3
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ الخصم لم يحدد تشكيلة'
            }
        )
    }

    if (
        target.pendingBrawl
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لدى هذا اللاعب طلب مضاربة آخر'
            }
        )
    }

    target.pendingBrawl = {

        challenger: userId,

        createdAt:
            Date.now()
    }

    await target.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`🥊 ═══════〔 طلب مضاربة 〕═══════ 🥊

🎯 المرسل:
@${userId.split('@')[0]}

⚔️ يريد مضاربتك

✅ .قبول مضاربة
❌ .رفض مضاربة`,

            mentions: [
                userId
            ]
        }
    )
}
    

if (text.startsWith('.ترتيب ')) {

    const player =
        await Player.findOne({
            userId
        })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد حساب'
            }
        )
    }

    const args =
        text.split(' ')

    const from =
        parseInt(args[1]) - 1

    const to =
        parseInt(args[2]) - 1

    if (
        isNaN(from) ||
        isNaN(to)
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
`❌ الاستخدام

.ترتيب 5 1`
            }
        )
    }

    if (
        !player.characters[from] ||
        to < 0 ||
        to >= player.characters.length
    ) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ رقم غير صحيح'
            }
        )
    }

    const char =
        player.characters.splice(
            from,
            1
        )[0]

    player.characters.splice(
        to,
        0,
        char
    )

    player.markModified(
        'characters'
    )

    await player.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`✅ تم ترتيب الشخصيات

👑 ${char.name}

📍 أصبح في المركز ${to + 1}`
        }
    )
}

    if (text === '.حول الكل') {

    const player =
        await Player.findOne({
            userId
        })

    if (!player) {
        return safeSend(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد حساب'
            }
        )
    }

    if (!player.shards) {
        player.shards = new Map()
    }

    let converted = []
    let totalShards = 0

    const keep = []
    const count = {}

    for (const char of player.characters) {

        if (char.rarity !== 'SSS') {
            keep.push(char)
            continue
        }

        if (
            (char.evolutionLevel || 0) > 0
        ) {
            keep.push(char)
            continue
        }

        count[char.name] =
            (count[char.name] || 0) + 1

        if (count[char.name] === 1) {

            keep.push(char)

        } else {

            const current =
                player.shards.get(
                    char.name
                ) || 0

            player.shards.set(
                char.name,
                current + 1
            )

            converted.push(
                `👑 ${char.name} +1`
            )

            totalShards++
        }
    }

    if (!totalShards) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
`❌ لا توجد شخصيات مكررة قابلة للتحويل`
            }
        )
    }

    player.characters = keep

    player.markModified(
        'characters'
    )

    await player.save()

    return safeSend(
    msg.key.remoteJid,
    {
        text:
`💎 ═══════〔 تحويل المكررات 〕═══════ 💎

${converted.join('\n')}

━━━━━━━━━━━━━━━

🔄 عدد الشخصيات المحولة:
${totalShards}

🧩 إجمالي الشظايا:
${totalShards}

📦 السعة المستخدمة:
${player.characters.length}/${player.maxCharacters || 30}

🏆 تم تنظيف جميع النسخ المكررة بنجاح`
    }
)
    }

if (text.startsWith('.حول ')) {

try {

    const player =
    await Player.findOne({
        userId
    })

if (!player) {
    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ لا يوجد حساب'
        }
    )
}

if (!player.shards) {
    player.shards = new Map()
}

    const args =
        text.split(' ')

    const index =
        parseInt(args[1]) - 1

    if (isNaN(index)) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
`❌ الاستخدام الصحيح

.حول 1`
            }
        )
    }

    const char =
        player.characters[index]

    if (!char) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ الشخصية غير موجودة'
            }
        )
    }

    if (char.rarity !== 'SSS') {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ فقط شخصيات SSS يمكن تحويلها'
            }
        )
    }

    console.log(
    'Character:',
    char
)

console.log(
    'Shards:',
    player.shards
)

console.log(
    'Character Name:',
    char.name
)
    const copies =
        player.characters.filter(
            c => c.name === char.name
        )

    if (copies.length <= 1) {
        return safeSend(
            msg.key.remoteJid,
            {
                text:
`❌ لا يمكن تحويل آخر نسخة

👑 ${char.name}`
            }
        )
    }

    player.characters.splice(
        index,
        1
    )

    const shardKey =
    char.name
        .replaceAll('.', '_')

const currentShards =
    player.shards.get(
        shardKey
    ) || 0

player.shards.set(
    shardKey,
    currentShards + 1
)

player.markModified(
    'shards'
)

player.markModified(
    'characters'
)

await player.save()

    return safeSend(
    msg.key.remoteJid,
    {
        text:
`💎 تم التحويل

👑 ${char.name}

🧩 الشظايا:
${currentShards + 1}`
    }
)

} catch (err) {

    console.log(
        'CONVERT ERROR:',
        err
    )

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`❌ حدث خطأ أثناء التحويل

${err.message}`
        }
    )
}
}
    
    
if (text.startsWith('.تطوير')) {

const player =
    await Player.findOne({
        userId
    })

if (!player) {
    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ لا يوجد حساب'
        }
    )
}

const args =
    text.split(' ')

const index =
    parseInt(args[1]) - 1

if (isNaN(index)) {
    return safeSend(
        msg.key.remoteJid,
        {
            text:

`❌ الاستخدام الصحيح

.تطوير 1`
}
)
}

const char =
    player.characters[index]

if (!char) {
    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ الشخصية غير موجودة'
        }
    )
}
const alreadyEvolved =
    player.characters.find(
        c =>
            c.name === char.name &&
            (c.evolutionLevel || 0) > 0 &&
            c !== char
    )

if (alreadyEvolved) {

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`❌ ${char.name}

يوجد لديك نسخة أخرى مطورة من هذه الشخصية بالفعل

👑 لا يمكن تطوير أكثر من نسخة واحدة من نفس الشخصية

💎 استخدم المكررات للشظايا عبر:
.حول رقم_الشخصية`
        }
    )
}
    
    if (char.evolutionLevel === undefined)
    char.evolutionLevel = 0

if (!char.urAbilities)
    char.urAbilities = []

    
const ranks = [
    "SSS",
    "SSS+",
    "SSS++",
    "UR I",
    "UR II",
    "UR III",
    "EX"
]

const powers = [
    7000,
    10000,
    13000,
    16000,
    19000,
    22000,
    25000
]

const costs = [
    1000000,
    1500000,
    2000000,
    2500000,
    3000000,
    3500000
]

if (char.rarity !== 'SSS') {

    return safeSend(
        msg.key.remoteJid,
        {
            text:
            '❌ فقط شخصيات SSS يمكن تطويرها'
        }
    )
}

if (!player.shards) {
    player.shards = new Map()
}
    const shardKey =
    char.name.replaceAll('.', '_')

const currentLevel =
    char.evolutionLevel || 0

if (currentLevel >= 6) {

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`👑 ${char.name}

🌌 وصلت الشخصية إلى رتبة EX بالفعل`
        }
    )
}

const shards =
    player.shards.get(
        shardKey
    ) || 0
if (shards < 2) {

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`❌ لا تملك شظايا كافية

🧩 ${char.name}

📦 ${shards}/2`
        }
    )
}

const cost =
    costs[currentLevel]

if (player.money < cost) {

    return safeSend(
        msg.key.remoteJid,
        {
            text:

`❌ تحتاج

💰 ${cost.toLocaleString()}`
        }
    )
}

player.money -= cost

player.shards.set(
    shardKey,
    shards - 2
)

player.markModified(
    'shards'
)

const oldLevel =
    currentLevel

char.evolutionLevel++

const newLevel =
    char.evolutionLevel

if (!char.evolutionType) {

    if (char.power >= 6600) {

        char.evolutionType = 'fixed'

    } else if (char.power >= 5400) {

        char.evolutionType = 'medium'

    } else {

        char.evolutionType = 'low'

    }

}

if (char.evolutionType === 'fixed') {

    char.power = powers[newLevel]

} else if (
    char.evolutionType === 'medium'
) {

    char.power += 2500

} else {

    char.power += 2000

}
const availableAbilities =
    urAbilities.filter(
        a =>
        !char.urAbilities.some(
            owned =>
            owned.name === a.name
        )
    )

let randomAbility = null
let exAbility = null
if (availableAbilities.length) {

    const totalChance =
        availableAbilities.reduce(
            (sum, ability) =>
                sum + ability.chance,
            0
        )

    let roll =
        Math.random() *
        totalChance

    for (
    const ability
    of availableAbilities
) {

    roll -= ability.chance

    if (roll <= 0) {

        randomAbility =
            ability

        break
    }
}
}
if (randomAbility) {

    char.urAbilities.push(
        randomAbility
    )
}

if (newLevel === 6) {

    const availableAbilities =
        urAbilities.filter(
            a =>
            !char.urAbilities.some(
                owned =>
                owned.name === a.name
            )
        )

    if (availableAbilities.length) {

        exAbility =
            availableAbilities[
                Math.floor(
                    Math.random() *
                    availableAbilities.length
                )
            ]

        char.urAbilities.push(
            exAbility
        )
    }
}

player.markModified(
    'characters'
)

await player.save()

const oldRank =
    ranks[oldLevel]

const newRank =
    ranks[newLevel]

if (newLevel === 6) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: char.image
            },

            caption:

`╔═══━━━✦❖✦━━━═══╗
      🌌 𝗘𝗫 𝗔𝗪𝗔𝗞𝗘𝗡𝗜𝗡𝗚 🌌
╚═══━━━✦❖✦━━━═══╝

🌑 انكسرت القيود القديمة
☄️ تمزقت الأبعاد
🌠 تحررت القوة الكامنة

👑 ${char.name}

╭━━〔 🌟 التطور النهائي 🌟 〕━━╮
┃ ${oldRank} ➜ EX
╰━━━━━━━━━━━━━━━━━━━━━━╯

⚔️ القوة القتالية
┗➤ ${char.power.toLocaleString()}

💰 التكلفة
┗➤ ${cost.toLocaleString()}

🧩 الشظايا المستهلكة
┗➤ 2

${exAbility ? `╭━━〔 🔥 قدرة جديدة 🔥 〕━━╮
┃ ${exAbility.name}
┃
┃ 📈 ${exAbility.description}
╰━━━━━━━━━━━━━━━━━━━━━━╯

` : ''}

🏆 تم بلوغ أعلى رتبة ممكنة

✨ أصبحت الشخصية الآن ضمن
👑 نخبة شخصيات EX الأسطورية 👑

╔═══━━━✦❖✦━━━═══╗
      🌠 𝗟𝗘𝗚𝗘𝗡𝗗 𝗔𝗦𝗖𝗘𝗡𝗦𝗜𝗢𝗡 🌠
╚═══━━━✦❖✦━━━═══╝`
        }
    )
}

return safeSend(
    msg.key.remoteJid,
    {
        text:

`🌌 ═══════〔 EVOLUTION 〕═══════ 🌌

👑 ${char.name}

🌟 ${oldRank}
⬇️
🌟 ${newRank}

⚔️ القوة:
${char.power}

${randomAbility ? `🔥 القدرة الجديدة

${randomAbility.name}

📈 ${randomAbility.description}` : ''}

💰 تم خصم:
${cost.toLocaleString()}

🧩 تم استهلاك:
2 شظايا`
    }
)
}
    
if (text === '.شظايا') {

    const player =
        await Player.findOne({
            userId
        })

    if (!player)
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                '❌ لا يوجد حساب'
            }
        )

    const shards =
        player.shards || new Map()

    if (
        !shards ||
        shards.size === 0
    ) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                '📭 لا تملك أي شظايا'
            }
        )
    }

    let msgText =
`🧩 ━━〔 شظايا الشخصيات 〕━━ 🧩\n\n`

    for (
    const [name, amount]
    of shards.entries()
) {

    const displayName =
        name.replaceAll('_', ' ')

    msgText +=
`👑 ${displayName}

📦 ${amount}/2

`
}
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: msgText
        }
    )
}

    

            if (text === '.اقضي') {

const player =
    await Player.findOne({ userId })

if (!player) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ ليس لديك حساب'
        }
    )
}

// ⬇️ أضفه هنا
if (
    player.bossDead &&
    player.bossRespawn
) {

    if (
        Date.now() <
        new Date(
            player.bossRespawn
        ).getTime()
    ) {

        const remaining =
            Math.ceil(
                (
                    new Date(
                        player.bossRespawn
                    ).getTime()
                    - Date.now()
                ) / 60000
            )

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`☠️ أنت ميت حالياً

⏳ المتبقي:
${remaining} دقيقة`
            }
        )
    }

    player.bossDead = false
    player.hp = player.maxHp

    await player.save()
}
// ⬆️ إلى هنا

if (
    !player.characters ||
    !player.characters.length
) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ لا تملك شخصيات'
        }
    )
}

           if (!player.bossHp || player.bossMaxHp !== 60000) {

    player.bossHp = 60000
    player.bossMaxHp = 60000

    await player.save()
}     
const cooldownKey =
    `${userId}_kurama`

const lastUse =
    cooldowns.get(cooldownKey)

if (
    lastUse &&
    Date.now() - lastUse < 30000
) {

    const remaining =
        Math.ceil(
            (30000 -
            (Date.now() - lastUse))
            / 1000
        )

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`⏳ انتظر ${remaining} ثانية قبل استخدام .اقضي مرة أخرى`
        }
    )
}

cooldowns.set(
    cooldownKey,
    Date.now()
)
                

const target =
    await Beast.findOne({
        name: 'كوراما',
        hp: { $gt: 0 }
    })

if (!target) {

    const deadKurama =
        await Beast.findOne({
            name: 'كوراما'
        })

    let respawnText = ''

    if (
    deadKurama &&
    deadKurama.respawnAt
) {
    respawnText =
`\n\n⏳ العودة:
${deadKurama.respawnAt.toLocaleString()}`
}

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`❌ كوراما غير متاح حالياً${respawnText}`
}
)
}

const strongest =
    player.characters.sort(
        (a, b) => b.power - a.power
    )[0]

let damage =
    Math.floor(strongest.power * 2)

// قدرة لاعب عشوائية
const ability =
    playerAbilities[
        Math.floor(Math.random() * playerAbilities.length)
    ]

let abilityText = ''

if (ability.type === 'damage') {
    damage += ability.multiplier
        ? Math.floor(damage * (ability.multiplier - 1))
        : 0

    abilityText = `⚡ قدرة اللاعب: ${ability.name}`
}

if (ability.type === 'lifesteal') {
    const heal = ability.value || 0
    player.hp = (player.hp || 0) + heal
    abilityText = `🩸 ${ability.name} (+${heal})`
}

if (ability.type === 'buffDamage') {
    damage += Math.floor(damage * (ability.value / 100))
    abilityText = `💢 ${ability.name}`
}

if (ability.type === 'extraDamage') {
    damage += ability.value
    abilityText = `☄️ ${ability.name}`
}

target.hp =
    Math.max(
        0,
        target.hp - damage
    )

if (!target.rankings) {
    target.rankings = new Map()
}

const oldDamage =
    target.rankings.get(userId) || 0

target.rankings.set(
    userId,
    oldDamage + damage
)
                target.attackCounter =
    (target.attackCounter || 0) + 1

let result =

`🦊 هجوم على كوراما

${abilityText}

🔥 كرة البيجو العملاقة

⚔️ الشخصية:
${strongest.name}

💥 الضرر:
${damage.toLocaleString()}

👹 الوحش:
كوراما

❤️ المتبقي:
${target.hp.toLocaleString()}/${target.maxHp.toLocaleString()}`
if (target.attackCounter >= 3) {

    target.attackCounter = 0

    const beastAbility =
        getKuramaAbility()

    let raidText =
`🦊 كوراما غضب!

🔥 القدرة:
${beastAbility.name}

`

    const mentions = []

    for (
        const [participantId]
        of target.rankings.entries()
    ) {

        const p =
            await Player.findOne({
                userId: participantId
            })

        if (!p) continue

        mentions.push(
            participantId
        )

        let beastDamage = 0

        if (
            beastAbility.type === 'damage'
        ) {

            beastDamage =
                beastAbility.value

        } else if (
            beastAbility.type === 'extraDamage'
        ) {

            beastDamage =
                beastAbility.value

        } else {

            beastDamage = 3000
        }

        beastDamage -= Math.floor(
            beastDamage *
            ((p.defense || 0) / 100)
        )

        beastDamage =
            Math.max(
                1,
                beastDamage
            )

        p.bossHp =
    Math.max(
        0,
        (p.bossHp || 60000) - beastDamage
    )

        if (p.bossHp <= 0) {

    p.bossHp = 0
    p.bossDead = true

    p.bossRespawn =
        new Date(
            Date.now() +
            10 * 60 * 1000
        )

    raidText +=

`☠️ @${participantId.split('@')[0]}

تم القضاء عليه

⏳ سيعود بعد 10 دقائق

❤️ 0/${p.bossMaxHp.toLocaleString()}

`

} else {

    raidText +=

`⚔️ @${participantId.split('@')[0]}

💥 -${beastDamage.toLocaleString()}

❤️ ${p.bossHp.toLocaleString()}/${p.bossMaxHp.toLocaleString()}

`
}

        await p.save()
    }

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: target.image
            },
            caption: raidText,
            mentions
        }
    )
}

                
                if (target.hp <= 0) {

    target.hp = 0
                    target.attackCounter = 0

    target.lastKilledAt =
        new Date()

    const respawn =
        new Date()

    respawn.setHours(
        respawn.getHours() + 2
    )

    target.respawnAt =
        respawn

    const ranking =
    Array.from(
        target.rankings.entries()
    )
    .sort(
        (a, b) =>
            b[1] - a[1]
    )

let rewardMsg =

`\n\n━━━━━━━━━━━━━━
🏆 تم القضاء على كوراما
━━━━━━━━━━━━━━

🥇 أفضل المقاتلين

`

const mentions = []

for (
    let i = 0;
    i < ranking.length;
    i++
) {

        const [
            playerId,
            totalDamage
        ] = ranking[i]

        const p =
            await Player.findOne({
                userId: playerId
            })

        if (!p) continue

        const reward =
            target.eggCarrier
                ? beastRewards.getEggCarrierReward(i + 1)
                : beastRewards.getNormalReward(i + 1)

        p.money =
            (p.money || 0)
            + (reward.money || 0)

        p.xp =
            (p.xp || 0)
            + (reward.xp || 0)

        p.eggTickets =
            (p.eggTickets || 0)
            + (reward.tickets || 0)

        p.beastEggs =
            (p.beastEggs || 0)
            + (reward.egg || 0)

        await p.save()

        mentions.push(playerId)

        if (i < 3) {

            const medal =
                i === 0
                ? '🥇'
                : i === 1
                ? '🥈'
                : '🥉'

            rewardMsg +=

`${medal} @${playerId.split('@')[0]}

💥 الضرر:
${totalDamage.toLocaleString()}

💰 ${reward.money || 0}
⭐ ${reward.xp || 0}
🎟️ ${reward.tickets || 0}
🥚 ${reward.egg || 0}

`
}
}

    rewardMsg +=

`━━━━━━━━━━━━━━

⏳ سيعود بعد ساعتين`

target.rankings = new Map()

await target.save()

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: rewardMsg,
            mentions
        }
    )

    result += rewardMsg
}

await target.save()

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text: result
    }
)

}

    
    if (text === '.اباده') {

const player =
    await Player.findOne({ userId })

if (!player) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ ليس لديك حساب'
        }
    )
}

if (
    player.bossDead &&
    player.bossRespawn
) {

    if (
        Date.now() <
        new Date(
            player.bossRespawn
        ).getTime()
    ) {

        const remaining =
            Math.ceil(
                (
                    new Date(
                        player.bossRespawn
                    ).getTime()
                    - Date.now()
                ) / 60000
            )

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`☠️ أنت ميت حالياً

⏳ المتبقي:
${remaining} دقيقة`
            }
        )
    }

    player.bossDead = false
player.bossHp = 60000
player.bossMaxHp = 60000

await player.save()
}

if (
    !player.characters ||
    !player.characters.length
) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ لا تملك شخصيات'
        }
    )
}
        if (!player.bossHp || !player.bossMaxHp) {

    player.bossHp = 60000
    player.bossMaxHp = 60000
    player.bossDead = false

    await player.save()
}

        const cooldownKey =
    `${userId}_juubi`

const lastUse =
    cooldowns.get(cooldownKey)

if (
    lastUse &&
    Date.now() - lastUse < 30000
) {

    const remaining =
        Math.ceil(
            (30000 -
            (Date.now() - lastUse))
            / 1000
        )

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`⏳ انتظر ${remaining} ثانية قبل استخدام .اباده مرة أخرى`
        }
    )
}

cooldowns.set(
    cooldownKey,
    Date.now()
)

const target =
    await Beast.findOne({
        name: 'الجوبي',
        hp: { $gt: 0 }
    })

if (!target) {

    let respawnText = ''

    const deadJuubi =
        await Beast.findOne({
            name: 'الجوبي'
        })

    if (
    deadJuubi &&
    deadJuubi.respawnAt
) {
    respawnText =
`\n\n⏳ يعود في:
${deadJuubi.respawnAt.toLocaleString()}`
}

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`❌ الجوبي غير متاح حالياً${respawnText}`
}
)
}

const strongest =
    player.characters.sort(
        (a, b) => b.power - a.power
    )[0]

let damage =
    Math.floor(strongest.power * 5)

const ability =
    playerAbilities[
        Math.floor(Math.random() * playerAbilities.length)
    ]

let abilityText = ''

if (ability.type === 'damage') {
    damage += ability.multiplier
        ? Math.floor(damage * (ability.multiplier - 1))
        : 0

    abilityText = `⚡ قدرة اللاعب: ${ability.name}`
}

if (ability.type === 'lifesteal') {
    const heal = ability.value || 0
    player.hp = (player.hp || 0) + heal
    abilityText = `🩸 ${ability.name} (+${heal})`
}

if (ability.type === 'buffDamage') {
    damage += Math.floor(damage * (ability.value / 100))
    abilityText = `💢 ${ability.name}`
}

if (ability.type === 'extraDamage') {
    damage += ability.value
    abilityText = `☄️ ${ability.name}`
}

target.hp =
    Math.max(
        0,
        target.hp - damage
    )

if (!target.rankings) {
    target.rankings = new Map()
}

const oldDamage =
    target.rankings.get(userId) || 0

target.rankings.set(
    userId,
    oldDamage + damage
)
target.attackCounter =
    (target.attackCounter || 0) + 1

let result =

`🌌 هجوم على الجوبي

☠️ قنبلة العشرة ذيول

⚔️ الشخصية:
${strongest.name}

💥 الضرر:
${damage.toLocaleString()}

👹 الوحش:
الجوبي

❤️ المتبقي:
${target.hp.toLocaleString()}/${target.maxHp.toLocaleString()}`

if (target.attackCounter >= 3) {

    target.attackCounter = 0

    const beastAbility =
        getJuubiAbility()

    let raidText =

`🌌 الجوبي أطلق قدرة جماعية!

☠️ ${beastAbility.name}

`

    const mentions = []

    for (
        const [participantId]
        of target.rankings.entries()
    ) {

        const p =
            await Player.findOne({
                userId: participantId
            })

        if (!p) continue

        mentions.push(participantId)

        let beastDamage =
            beastAbility.value || 5000

        beastDamage -= Math.floor(
            beastDamage *
            ((p.defense || 0) / 100)
        )

        beastDamage =
            Math.max(
                1,
                beastDamage
            )

        p.bossHp =
    Math.max(
        0,
        (p.bossHp || 60000) - beastDamage
    )

        if (p.bossHp <= 0) {

            p.bossHp = 0

            p.bossDead = true

            p.bossRespawn =
                new Date(
                    Date.now() +
                    10 * 60 * 1000
                )

            raidText +=

`☠️ @${participantId.split('@')[0]}

تم القضاء عليه

⏳ سيعود بعد 10 دقائق

❤️ 0/${p.bossMaxHp.toLocaleString()}

`
        } else {

            raidText +=

`⚔️ @${participantId.split('@')[0]}

💥 -${beastDamage.toLocaleString()}

❤️ ${p.bossHp.toLocaleString()}/${p.bossMaxHp.toLocaleString()}

`
        }

        await p.save()
    }

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: target.image
            },
            caption: raidText,
            mentions
        }
    )
}
        
        if (target.hp <= 0) {

    target.hp = 0
            
target.attackCounter = 0
    target.lastKilledAt =
        new Date()

    const respawn =
        new Date()

    respawn.setHours(
        respawn.getHours() + 2
    )

    target.respawnAt =
        respawn

    const ranking =
    Array.from(
        target.rankings.entries()
    ).sort(
        (a, b) => b[1] - a[1]
    )

    let rewardMsg =

`\n\n━━━━━━━━━━━━━━
🌌 تم إبادة الجوبي
━━━━━━━━━━━━━━

👑 أساطير المعركة

`

const mentions = []

for (
    let i = 0;
    i < ranking.length;
    i++
) {

        const [
            playerId,
            totalDamage
        ] = ranking[i]

        const p =
            await Player.findOne({
                userId: playerId
            })

        if (!p) continue

        const reward =
            target.eggCarrier
                ? beastRewards.getEggCarrierReward(i + 1)
                : beastRewards.getNormalReward(i + 1)

        p.money =
            (p.money || 0)
            + (reward.money || 0)

        p.xp =
            (p.xp || 0)
            + (reward.xp || 0)

        p.eggTickets =
            (p.eggTickets || 0)
            + (reward.tickets || 0)

        p.beastEggs =
            (p.beastEggs || 0)
            + (reward.egg || 0)

        await p.save()

        mentions.push(playerId)

        if (i < 3) {

            const medal =
                i === 0
                    ? '🥇'
                    : i === 1
                    ? '🥈'
                    : '🥉'

            rewardMsg +=

`${medal} @${playerId.split('@')[0]}

💥 الضرر:
${totalDamage.toLocaleString()}

💰 ${reward.money || 0}
⭐ ${reward.xp || 0}
🎟️ ${reward.tickets || 0}
🥚 ${reward.egg || 0}

`
}
}

    rewardMsg +=

`━━━━━━━━━━━━━━

⏳ سيعود بعد ساعتين

☠️ انتهت المعركة الكبرى`

    target.rankings =
        new Map()

    await target.save()

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: rewardMsg,
            mentions
        }
    )

    result += rewardMsg
}

await target.save()

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text: result
    }
)

}
    
    

    if (text === '.وحشي') {

    const player =
        await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ ليس لديك حساب'
            }
        )
    }

    if (!player.equippedBeast) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد وحش مجهز'
            }
        )
    }

    const beasts =
        require('./systems/beasts')

    const beast =
        beasts.find(
            b =>
            b.id === player.equippedBeast
        )

    if (!beast) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ الوحش غير موجود'
            }
        )
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`👹 الوحش المجهز

🏷️ الاسم:
${beast.name}

⭐ الندرة:
${beast.rarity}

⚔️ الهجوم:
${beast.attack || 0}

🛡️ الدفاع:
${beast.defense || 0}

❤️ HP:
${beast.hp || 0}

🎯 كريت:
${beast.crit || 0}

💨 تفادي:
${beast.dodge || 0}

🪞 انعكاس:
${beast.reflect || 0}`
        }
    )
}

    if (text === '.وحوشي') {

    const player =
        await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ ليس لديك حساب'
            }
        )
    }

    if (
        !player.ownedBeasts ||
        player.ownedBeasts.length === 0
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ لا تملك أي وحوش'
            }
        )
    }

    const beasts =
        require('./systems/beasts')

    let result =
`👹 وحوشك

━━━━━━━━━━

`

    for (const beastId of player.ownedBeasts) {

        const beast =
            beasts.find(
                b => b.id === beastId
            )

        if (!beast) continue

        const equipped =
            player.equippedBeast === beast.id
                ? ' ✅ مجهز'
                : ''

        result +=
`🦴 ${beast.name}
⭐ ${beast.rarity}${equipped}

`
    }

    result +=
`━━━━━━━━━━

📦 العدد:
${player.ownedBeasts.length}`

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: result
        }
    )
}

    if (text.startsWith('.تجهيز_وحش ')) {

    const player =
        await Player.findOne({ userId })

    if (!player) return

    const beastName =
        text.replace(
            '.تجهيز_وحش ',
            ''
        ).trim()

    const beasts =
        require('./systems/beasts')

    const beast =
        beasts.find(
            b =>
                b.name === beastName
        )

    if (!beast) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ هذا الوحش غير موجود'
            }
        )
    }

    if (
        !player.ownedBeasts.includes(
            beast.id
        )
    ) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ لا تملك هذا الوحش'
            }
        )
    }

    player.equippedBeast =
        beast.id

    await player.save()

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`✅ تم تجهيز

👹 ${beast.name}`
        }
    )
    }

    if (text === '.فقس_بيضة') {

    const player =
        await Player.findOne({ userId })

    if (!player) return

    if (
        (player.beastEggs || 0)
        <= 0
    ) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ لا تملك أي بيضة'
            }
        )
    }

    const beasts =
        require('./systems/beasts')

    const roll =
        Math.random() * 100

    let pool =

        roll <= 1
        ? beasts.filter(
            b => b.rarity === 'cosmic'
        )

        : roll <= 10
        ? beasts.filter(
            b => b.rarity === 'epic'
        )

        : roll <= 40
        ? beasts.filter(
            b => b.rarity === 'legendary'
        )

        : beasts.filter(
            b => b.rarity === 'rare'
        )

    const beast =
        pool[
            Math.floor(
                Math.random()
                * pool.length
            )
        ]

    player.beastEggs--

    player.beastEggsOpened =
        (player.beastEggsOpened || 0)
        + 1

    if (
        !player.ownedBeasts.includes(
            beast.id
        )
    ) {

        player.ownedBeasts.push(
            beast.id
        )

        player.beastCollection =
            (player.beastCollection || 0)
            + 1
    }

    await player.save()

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`🥚 تم فقس البيضة

👹 الوحش:
${beast.name}

⭐ الندرة:
${beast.rarity}

📚 المجموعة:
${player.beastCollection}`
        }
    )
}
if (text === '.متجر_البيض') {

    const player =
        await Player.findOne({ userId })

    if (!player) return

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`🐾 متجر الوحوش

━━━━━━━━━━━━━━

🎟️ تذاكرك:
${player.eggTickets || 0}

━━━━━━━━━━━━━━

🐾 شكاكو       300 تذكرة
🐾 ماتاتابي    300 تذكرة
🐾 إيسوبو      350 تذكرة

🐾 سون غوكو    500 تذكرة
🐾 كوكو        500 تذكرة
🐾 سايكن       500 تذكرة

🐾 تشومي       700 تذكرة
🐾 غيوكي       800 تذكرة

🐾 كوراما      1500 تذكرة

━━━━━━━━━━━━━━

🌌 الجوبي

لا يباع في المتجر

🏆 مكافأة جمع
جميع الوحوش التسعة

━━━━━━━━━━━━━━

للشراء:

.شراء_وحش اسم_الوحش

مثال:

.شراء_وحش كوراما`
        }
    )
}
        if (text.startsWith('.شراء_وحش ')) {

const player =
    await Player.findOne({ userId })

if (!player) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ لم يتم العثور على حسابك'
        }
    )
}

const beastName =
    text.replace(
        '.شراء_وحش ',
        ''
    ).trim()

const prices = {

    'شكاكو': 300,
    'ماتاتابي': 300,
    'إيسوبو': 350,

    'سون غوكو': 500,
    'كوكو': 500,
    'سايكن': 500,

    'تشومي': 700,
    'غيوكي': 800,

    'كوراما': 1500
}

const beasts =
    require('./systems/beasts')

const beast =
    beasts.find(
        b => b.name === beastName
    )

if (!beast) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

'❌ الوحش غير موجود في المتجر'
}
)
}

if (beast.id === 'juubi') {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`🌌 الجوبي لا يباع في المتجر

🏆 احصل عليه عبر
جمع جميع الوحوش التسعة`
}
)
}

const price =
    prices[beastName]

if (!price) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

'❌ هذا الوحش غير متاح للشراء'
}
)
}

if (
    player.ownedBeasts.includes(
        beast.id
    )
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`❌ تملك ${beast.name} بالفعل`
        }
    )
}

if (
    (player.eggTickets || 0)
    < price
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`❌ لا تملك تذاكر كافية

🎟️ المطلوب:
${price}

🎫 تذاكرك:
${player.eggTickets || 0}`
}
)
}

player.eggTickets -= price

player.ownedBeasts.push(
    beast.id
)

player.beastCollection =
    (player.beastCollection || 0) + 1

// مكافأة الجوبي عند جمع الجميع
const requiredBeasts = [
    'shukaku',
    'matatabi',
    'isobu',
    'son_goku',
    'kokuo',
    'saiken',
    'chomei',
    'gyuki',
    'kurama'
]

const completed =
    requiredBeasts.every(
        id =>
            player.ownedBeasts.includes(id)
    )

let rewardText = ''

if (
    completed &&
    !player.ownedBeasts.includes('juubi')
) {

    player.ownedBeasts.push(
        'juubi'
    )

    rewardText =

`\n\n🌌 إنجاز مكتمل

🏆 جمعت جميع الوحوش

👑 حصلت على الجوبي!`
}

await player.save()

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`🎉 تم شراء الوحش بنجاح

🐾 الوحش:
${beast.name}

🎟️ السعر:
${price} تذكرة

🎫 التذاكر المتبقية:
${player.eggTickets}

📚 عدد الوحوش:
${player.ownedBeasts.length}${rewardText}`
}
)
}

    

    
if (text === '.الوحوش') {

    const beasts =
        await Beast.find()

    let msgText =
`👹 الوحوش الحالية

`

    for (const beast of beasts) {

        msgText +=
`🔥 ${beast.name}

❤️ HP:
${beast.hp.toLocaleString()}/${beast.maxHp.toLocaleString()}

━━━━━━━━━━

`
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: msgText
        }
    )
}

    
if (text === '.اصلاح_المخزون') {

    const players = await Player.find({})

    let fixed = 0

    for (const player of players) {

        const expected =
            30 +
            (Math.floor(player.level / 10) * 5) +
            10

        player.maxCharacters = expected

        await player.save()

        fixed++
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`✅ تم إصلاح ${fixed} لاعب

📦 تم إعادة حساب المخزون حسب:
• المستوى
• إنهاء البرج مرتين`
        }
    )
}
    

if (text === '.تخمين') {

    if (global.guessGame.active) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ توجد لعبة تخمين نشطة بالفعل'
            }
        )
    }

    const character =
        guessCharacters[
            Math.floor(
                Math.random() *
                guessCharacters.length
            )
        ]

    global.guessGame = {
        active: true,
        character,
        questions: 0,
        maxQuestions: 30,
        startedAt: Date.now(),
        players: {},
        groupId: msg.key.remoteJid
    }

    return safeSend(
    msg.key.remoteJid,
    {
        text:
`🎭 بدأت لعبة التخمين

❓ الحد الأقصى:
30 سؤال

🎯 لكل لاعب:
3 محاولات

❓ اسأل أي سؤال عن الشخصية

🏆 للتخمين اكتب:

.الاجابة ناروتو

⏰ بعد انتهاء 30 سؤال
تبدأ مرحلة التخمين لمدة دقيقتين`
    }
)
}

    if (text === '.حالة_التخمين') {

    if (!global.guessGame.active) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا توجد لعبة نشطة'
            }
        )
    }

    const tries =
        3 -
        (
            global.guessGame
            .players[userId] || 0
        )

    const left =
        Math.max(
            0,
            120 -
            Math.floor(
                (
                    Date.now() -
                    global.guessGame.startedAt
                ) / 1000
            )
        )

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`🎭 لعبة التخمين

❓ الأسئلة:
${global.guessGame.questions}/${global.guessGame.maxQuestions}

🎯 محاولاتك:
${tries}/3

⏳ المتبقي:
${left} ثانية`
        }
    )
}

if (text === '.انهاء_تخمين') {

    if (!global.guessGame.active) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ لا توجد لعبة نشطة'
            }
        )
    }

    const answer =
        global.guessGame.character

    global.guessGame.active = false

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`🛑 تم إنهاء اللعبة

🎭 الشخصية:

${answer.name}

📺 ${answer.anime}`
        }
    )
}

    if (
    global.guessGame?.active &&
    text.endsWith('؟')
) {

    if (
    global.guessGame.questions >=
    global.guessGame.maxQuestions
) {

    if (!global.guessGame.guessPhase) {

        global.guessGame.guessPhase = true

        await safeSend(
            msg.key.remoteJid,
            {
                text:
`⏰ انتهت الأسئلة الـ 30

🏆 بدأت مرحلة التخمين

اكتب:

.الاجابة اسم_الشخصية

⏳ لديكم دقيقتان`
            }
        )

        setTimeout(async () => {

            if (
                !global.guessGame.active
            ) return

            const answer =
                global.guessGame.character

            await safeSend(
                global.guessGame.groupId,
                {
                    text:
`⏰ انتهت مدة التخمين

🎭 الشخصية:

${answer.name}

📺 الأنمي:

${answer.anime}`
                }
            )

            global.guessGame.active = false

        }, 2 * 60 * 1000)
    }

    return
}

    global.guessGame.questions++

    const character =
        global.guessGame.character

        const animeMatch =
    text.match(/هل الانمي هو (.+)\?/i)

if (animeMatch) {

    const animeGuess =
        animeMatch[1].trim()

    const correct =
        animeGuess.toLowerCase() ===
        character.anime.toLowerCase()

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`❓ السؤال رقم ${global.guessGame.questions}

🤖 ${correct ? "نعم" : "لا"}`
        }
    )
}

    const answer =
    await askGemini(

`أنت حكم لعبة تخمين شخصيات أنمي.

الشخصية: ${character.name}
الأنمي: ${character.anime}

سؤال اللاعب:
${text}

إذا كان السؤال عن الأنمي نفسه فاعتمد على قيمة الأنمي المذكورة أعلاه فقط.

أمثلة:

إذا كان الأنمي Dragon Ball
وسأل اللاعب:
هل الأنمي هو Dragon Ball؟
الإجابة: نعم

إذا كان الأنمي Naruto
وسأل اللاعب:
هل الأنمي هو Dragon Ball؟
الإجابة: لا

أجب فقط بإحدى الكلمات التالية:
نعم
لا
غير معروف

ممنوع أي شرح إضافي.`
)

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`❓ السؤال رقم ${global.guessGame.questions}

🤖 ${answer}`
        }
    )
}

    if (
    global.guessGame?.active &&
    text.startsWith('.الاجابة ')
) {

    const character =
        global.guessGame.character

    const guesses =
        character.aliases || [
            character.name
        ]

    const playerAttempts =
        global.guessGame.players[
            userId
        ] || 0

    if (playerAttempts >= 3) {
        return
    }

    const normalizedInput =
    normalizeName(
        text
            .replace('.الاجابة ', '')
            .trim()
    )

    const correct =
        guesses.some(
            alias =>
                normalizeName(alias) ===
                normalizedInput
        )

    if (correct) {

        global.guessGame.active = false

        return safeSend(
            msg.key.remoteJid,
            {
                text:
`🏆 فاز اللاعب

@${userId.split('@')[0]}

🎭 الشخصية:

${character.name}

📺 الأنمي:

${character.anime}`,
                mentions: [userId]
            }
        )
    }

    global.guessGame.players[
        userId
    ] = playerAttempts + 1

    const left =
        3 -
        global.guessGame.players[
            userId
        ]

    if (left <= 0) {

        return safeSend(
            msg.key.remoteJid,
            {
                text:
`❌ تخمين خاطئ

🚫 انتهت محاولاتك`
            }
        )
    }

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`❌ تخمين خاطئ

🎯 المتبقي:
${left}/3`
        }
    )
}
    
    
if (text === '.بدء_رويال') {

    if (!isOwner(msg)) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ هذا الأمر للمطور فقط'
            }
        )
    }

    if (global.battleRoyale.active) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '⚠️ يوجد رويال مفتوح بالفعل'
            }
        )
    }

    global.battleRoyale = {
        active: true,
        started: false,

        players: [],

        currentTurn: null,

        currentDrop: null,

        turnCount: 0,

        rankings: []
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🏆 تم فتح التسجيل في الباتل رويال

اكتب:

.دخول

للانضمام إلى الحدث

بعد الدخول اختر تشكيلتك:

.تشكيلة_رويال 1 2 3`
        }
    )
}

    if (text.startsWith('.تشكيلة_رويال')) {

    if (!global.battleRoyale?.active) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد باتل رويال مفتوح'
            }
        )
    }

    if (global.battleRoyale.started) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ بدأ الحدث بالفعل'
            }
        )
    }

    const royalePlayer =
        global.battleRoyale.players.find(
            p => p.userId === userId
        )

    if (!royalePlayer) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ يجب التسجيل أولاً عبر .دخول'
            }
        )
    }

    const player =
        await Player.findOne({ userId })

    if (
        !player ||
        !player.characters ||
        player.characters.length < 3
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ تحتاج 3 شخصيات على الأقل'
            }
        )
    }

    const args =
        text.split(' ').slice(1)

    if (args.length !== 3) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ مثال:\n.تشكيلة_رويال 1 2 3'
            }
        )
    }

    const indexes =
        args.map(x => Number(x) - 1)

    if (
        indexes.some(
            i =>
                isNaN(i) ||
                i < 0 ||
                i >= player.characters.length
        )
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ أرقام شخصيات غير صحيحة'
            }
        )
    }

    if (
        new Set(indexes).size !== 3
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ لا يمكن تكرار نفس الشخصية'
            }
        )
    }

    const selected =
        indexes.map(
            i => player.characters[i]
        )

    const avgPower =
        Math.floor(
            selected.reduce(
                (a, b) =>
                    a + (b.power || 0),
                0
            ) / 3
        )

    royalePlayer.team =
        JSON.parse(
            JSON.stringify(selected)
        )

    royalePlayer.avgPower =
        avgPower

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`✅ تم حفظ تشكيلتك

1️⃣ ${selected[0].name}
2️⃣ ${selected[1].name}
3️⃣ ${selected[2].name}

⚔️ متوسط القوة:
${avgPower}`
        }
    )
}
    if (text === '.حصول') {

    if (!global.battleRoyale?.started) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد باتل رويال نشط'
            }
        )
    }

    const player =
        global.battleRoyale.players.find(
            p =>
                p.userId === userId &&
                p.alive
        )

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ أنت لست مشاركاً أو تم إقصاؤك'
            }
        )
    }

    const drop =
        global.battleRoyale.currentDrop

    if (!drop) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد دروب جوي حالياً'
            }
        )
    }

    let rewardText = ''

    switch (drop.type) {

        case 'hp':

            player.hp += drop.value

            rewardText =
                `❤️ +${drop.value} HP`

            break

        case 'damage':

            player.hp -= drop.value

            if (player.hp < 0)
                player.hp = 0

            rewardText =
                `☠️ خسرت ${drop.value} HP`

            break

        case 'atk':

            player.attackBonus +=
                drop.value

            rewardText =
                `⚔️ +${drop.value} ضرر`

            break

        case 'revive':

            player.revive = true

            rewardText =
                '💉 حصلت على إحياء واحد'

            break

        case 'reviveHalf':
            
            player.shield = true

            player.reviveHalf = true

            rewardText =
                '❤️ حصلت على إحياء 50%'

            break

        case 'sniper':

            player.sniper = true

            rewardText =
                '🎯 الضربة القادمة ×2'

            break
    }

    global.battleRoyale.currentDrop =
        null

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🎁 @${userId.split('@')[0]}

حصل على:

${drop.name}

${rewardText}`
        ,
            mentions: [userId]
        }
    )
}
if (text.startsWith('.ذكاء')) {

    const question =
        text.replace(
            '.ذكاء',
            ''
        ).trim()

    if (!question) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                '❌ اكتب سؤالاً'
            }
        )
    }

    const answer =
        await askGemini(question)

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: answer
        }
    )
}
    
    if (text === '.فحصxp') {

    const me = await Player.findOne({ userId })

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`Level: ${me.level}
XP: ${me.xp}`
        }
    )
    }

    if (text === '.دخول') {

    if (!global.battleRoyale.active) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد رويال مفتوح'
            }
        )
    }

    if (global.battleRoyale.started) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ بدأ الحدث بالفعل'
            }
        )
    }

    const exists =
        global.battleRoyale.players.find(
            p => p.userId === userId
        )

    if (exists) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '⚠️ أنت مسجل بالفعل'
            }
        )
    }

    global.battleRoyale.players.push({

    userId,

    team: [],

    avgPower: 0,

    hp: 30000,

    maxHp: 30000,

    alive: true,

    attackBonus: 0,

    shield: false,

    sniper: false,

    revive: false,

    reviveHalf: false,

    poison: 0,

    attacksReceived: 0,

    eliminatedAt: null
})

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`✅ تم تسجيلك في الباتل رويال

عدد المشاركين:
${global.battleRoyale.players.length}`
        }
    )
}

if (text === '.خروج_رويال') {

    if (!global.battleRoyale?.active) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد رويال مفتوح'
            }
        )
    }

    if (global.battleRoyale.started) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ لا يمكن الخروج بعد بدء الحدث'
            }
        )
    }

    const index =
        global.battleRoyale.players.findIndex(
            p => p.userId === userId
        )

    if (index === -1) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ أنت غير مسجل في الحدث'
            }
        )
    }

    global.battleRoyale.players.splice(
        index,
        1
    )

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🚪 تم خروجك من الباتل رويال

👥 المتبقون:
${global.battleRoyale.players.length}`
        }
    )
}
        


if (text === '.رويال') {

    if (!global.battleRoyale.active) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا يوجد رويال حالياً'
        })
    }

    const message = `
🏆 حالة الرويال: جاري

👥 عدد المشاركين: 14
💚 عدد الأحياء: 6

📦 الدروب الحالي:
🩸 صندوق دم
`

    return sock.sendMessage(msg.key.remoteJid, {
        text: message
    })
}
    if (text === '.رويال_تفاصيل') {

    let txt = `
🏆 〔 BATTLE ROYALE 〕

📊 الحالة:
${global.battleRoyale.started ? 'بدأت' : 'التسجيل مفتوح'}

👥 المشاركون:
${global.battleRoyale.players.length}

━━━━━━━━━━━━━━
`

    global.battleRoyale.players.forEach((p, i) => {

        txt += `
${i + 1}️⃣ ${p.alive ? '🟢' : '🔴'}

⚔️ القوة:
${p.avgPower || 0}

❤️ HP:
${p.hp || 30000}

━━━━━━━━━━━━━━
`
    })

    return sock.sendMessage(msg.key.remoteJid, {
        text: txt
    })
}
    
    if (text === '.انطلاق_رويال') {


        if (global.battleRoyale.players.length < 3) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ يجب وجود 3 لاعبين على الأقل'
        }
    )
}
    if (!isOwner(msg)) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ للمطور فقط'
            }
        )
    }

    if (!global.battleRoyale.active) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد رويال'
            }
        )
    }

    if (global.battleRoyale.started) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '⚠️ الرويال بدأ بالفعل'
            }
        )
    }

    const readyPlayers =
        global.battleRoyale.players.filter(
            p =>
                p.team &&
                p.team.length === 3
        )

    if (readyPlayers.length < 2) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
'❌ يجب وجود لاعبين اثنين على الأقل مع تشكيلات'
            }
        )
    }

    global.battleRoyale.players =
        readyPlayers

    global.battleRoyale.started = true

    

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🔥 بدأت معركة الباتل رويال

👥 المشاركون:
${readyPlayers.length}

🎯 أول دور تم اختياره

اكتب:

.متبقي

لمشاهدة الأحياء`
        }
    )
}
    

    
if (text === '.اقصاء') {

if (!global.battleRoyale?.started) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ لا يوجد باتل رويال نشط'
        }
    )
}

if (global.battleRoyale.currentTurn) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '⚔️ الأدوار بدأت بالفعل'
        }
    )
}

const alive =
    global.battleRoyale.players.filter(
        p => p.alive
    )

if (alive.length <= 1) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '🏆 انتهى الباتل رويال'
        }
    )
}

const current =
    alive[
        Math.floor(
            Math.random() *
            alive.length
        )
    ]

global.battleRoyale.currentTurn =
    current.userId

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`🎯 تم اختيار أول لاعب

@${current.userId.split('@')[0]}

اكتب:

.اضرب رقم`,
        mentions: [current.userId]
    }
)
}

    
    
        if (text.startsWith('.اضرب')) {

    if (!global.battleRoyale?.started) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ لا يوجد باتل رويال نشط' }
        )
    }

    const current = global.battleRoyale.players.find(
        p => p.userId === global.battleRoyale.currentTurn
    )

    if (!current) {
        global.battleRoyale.currentTurn = null

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ خطأ في الدور، أعد تشغيل الباتل رويال'
            }
        )
    }

    const attacker = global.battleRoyale.players.find(
        p =>
            p.userId === userId &&
            p.alive
    )

    if (!attacker) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ أنت لست مشاركاً في الرويال'
            }
        )
    }

    if (current.userId !== userId) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ ليس دورك'
        }
    )
}

    const alive =
        global.battleRoyale.players.filter(
            p =>
                p.alive &&
                p.userId !== attacker.userId
        )

    const num =
        parseInt(text.split(' ')[1])

    if (
        isNaN(num) ||
        num < 1 ||
        num > alive.length
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `❌ اختر رقماً بين 1 و ${alive.length}`
            }
        )
    }

    const target = alive[num - 1]

    let damage =
        attacker.avgPower +
        attacker.attackBonus +
        Math.floor(Math.random() * 2000)

    if (attacker.sniper) {
        damage *= 2
        attacker.sniper = false
    }

    if (target.shield) {
        damage = Math.floor(damage * 0.7)
        target.shield = false
    }

    target.hp -= damage

    global.battleRoyale.turnCount++

if (
    global.battleRoyale.turnCount % 3 === 0
) {

    const drop =
        royaleDrops[
            Math.floor(
                Math.random() *
                royaleDrops.length
            )
        ]

    global.battleRoyale.currentDrop = drop

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🎁 تم إسقاط دروب جوي!

${drop.name}

أول شخص يكتب:

.حصول

سيحصل عليه`
        }
    )
}

    let txt =
`⚔️ @${attacker.userId.split('@')[0]}

هاجم

🎯 @${target.userId.split('@')[0]}

💥 الضرر:
${damage}

❤️ المتبقي:
${Math.max(0, target.hp)}
`

    if (target.poison) {

    const poisonDamage = 2000

    target.hp -= poisonDamage

    txt +=
`\n☠️ ضرر السم:
${poisonDamage}`

    target.poison = false
}

if (target.hp <= 0) {

    if (target.revive) {

        target.revive = false
        target.hp = 30000

        txt += `\n💉 تم إحياء الهدف`

    } else if (target.reviveHalf) {

        target.reviveHalf = false
        target.hp = 15000

        txt += `\n💉 عاد بنصف الدم`

    } else {

    target.hp = 0

    target.alive = false

    target.eliminatedAt =
        Date.now()

    global.battleRoyale.rankings.push({
        userId: target.userId
    })

    if (
        global.battleRoyale.currentTurn ===
        target.userId
    ) {
        global.battleRoyale.currentTurn = null
    }

    txt +=
`\n☠️ تم إقصاؤه من الرويال`
}
}
const survivors =
    global.battleRoyale.players.filter(
        p => p.alive
    )

if (survivors.length === 1) {

    const winner = survivors[0]

    global.battleRoyale.rankings.push({
        userId: winner.userId
    })

    const top3 =
        [...global.battleRoyale.rankings]
            .reverse()
            .slice(0, 3)

    for (let i = 0; i < top3.length; i++) {

        const player =
            await Player.findOne({
                userId: top3[i].userId
            })

        if (!player) continue

        if (i === 0) {

            player.money += 500000
            player.xp += 100000
            player.boxes.sss_high += 1

        } else if (i === 1) {

            player.money += 250000
            player.xp += 50000
            player.boxes.sss_chance += 1

        } else if (i === 2) {

            player.money += 100000
            player.xp += 25000
            player.boxes.legendary += 1
        }

        await player.save()
    }

    txt +=
`\n\n🏆 الفائز:

@${winner.userId.split('@')[0]}

🎁 تم توزيع الجوائز تلقائياً`

    global.battleRoyale.started = false
    global.battleRoyale.active = false

} else {

    
const alivePlayers =
    global.battleRoyale.players.filter(
        p => p.alive
    )

if (alivePlayers.length > 1) {

    let nextPlayer

    do {

        nextPlayer =
            alivePlayers[
                Math.floor(
                    Math.random() *
                    alivePlayers.length
                )
            ]

    } while (
        nextPlayer.userId ===
        attacker.userId
    )

    global.battleRoyale.currentTurn =
        nextPlayer.userId

    txt +=

`\n\n🎯 الدور الآن على:

@${nextPlayer.userId.split('@')[0]}`
}
}
   
const mentions = [
    attacker.userId,
    target.userId
]

if (global.battleRoyale.currentTurn) {
    mentions.push(
        global.battleRoyale.currentTurn
    )
}

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text: txt,
        mentions
    }
)
}

    if (text === '.نتائج_رويال') {

    if (!global.battleRoyale) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا توجد بيانات رويال'
            }
        )
    }

    const rankings =
        global.battleRoyale.rankings || []

    if (!rankings.length) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا توجد نتائج حالياً'
            }
        )
    }

    let txt =
`🏆 ═══〔 نتائج الباتل رويال 〕═══ 🏆

`

    const medals = [
        '🥇',
        '🥈',
        '🥉'
    ]

    rankings
        .slice(0, 10)
        .forEach((p, i) => {

            const medal =
                medals[i] ||
                `#${i + 1}`

            txt +=
`${medal} @${p.userId.split('@')[0]}

`
        })

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: txt,
            mentions:
                rankings
                    .slice(0, 10)
                    .map(
                        p => p.userId
                    )
        }
    )
}
if (text === '.انهاء_رويال') {

    if (!isOwner(msg)) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ للمطور فقط' }
        )
    }

    global.battleRoyale.active = false
    global.battleRoyale.started = false
    global.battleRoyale.players = []
    global.battleRoyale.currentTurn = null
    global.battleRoyale.rankings = []

    return sock.sendMessage(
        msg.key.remoteJid,
        { text: '🏁 تم إنهاء الباتل رويال' }
    )
}
    

    if (text === '.متبقي') {

    if (!global.battleRoyale?.started) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا يوجد باتل رويال نشط'
        })
    }

    const alive = global.battleRoyale.players.filter(p => p.alive)

    if (!alive.length) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا يوجد لاعبين أحياء'
        })
    }

    let txt = `🏹 اللاعبين المتبقين

━━━━━━━━━━━━━━

`

    const sorted = [...alive].sort((a, b) => b.hp - a.hp)

    sorted.forEach((p, i) => {

        txt += `${i + 1}️⃣ @${p.userId.split('@')[0]}

❤️ ${p.hp}

⚔️ ${(p.avgPower || 0) + (p.attackBonus || 0)}

━━━━━━━━━━━━━━
`
    })

    txt += `\n👥 العدد المتبقي: ${alive.length}`

    return sock.sendMessage(msg.key.remoteJid, {
        text: txt,
        mentions: alive.map(p => p.userId)
    })
}
    
    if (text === '.ايدي') {

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`📌 ID:

${msg.key.remoteJid}`
        }
    )
}
    
if (text === '.بدا_مسابقة') {

    if (quizData.quizActive) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ توجد مسابقة شغالة بالفعل'
        })
    }

    quizData.quizActive = true

    quizData.roundsCount = 0
quizData.currentQuestion = null

    // 🔥 تصفير النقاط بطريقة آمنة
    for (const key in quizData.scoreboard) {
        delete quizData.scoreboard[key]
    }

    // 🧹 تنظيف بيانات اللعب
    quizData.usedQuestions.length = 0

for (const key in quizData.playerProgress) {
    delete quizData.playerProgress[key]
}

    // ⚠️ مهم جدًا (لو موجود في الملف)
    if (typeof questionSolved !== 'undefined') {
        questionSolved = false
    }

    await sock.sendMessage(msg.key.remoteJid, {
        text: '🎮 تم بدء المسابقة'
    })

    await startQuestion(sock, msg.key.remoteJid)
}

    if (text === '.انهاء_مسابقة') {

    if (!quizData.quizActive) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا توجد مسابقة حالياً'
        })
    }

    // 🔥 هنا تضيفها مباشرة
    quizData.quizActive = false
    quizData.currentQuestion = null
    questionSolved = true

    let result = '🏆 نتائج المسابقة\n\n'

    const ranking = Object.entries(quizData.scoreboard)
        .sort((a, b) => b[1] - a[1])

    if (ranking.length === 0) {
        result += '❌ لا يوجد فائزون'
    } else {
        ranking.forEach(([id, points], index) => {
            result +=
`${index + 1}- @${id.split('@')[0]}
⭐ النقاط: ${points}

`
        })
    }

    await sock.sendMessage(msg.key.remoteJid, {
        text: result,
        mentions: ranking.map(x => x[0])
    })

    quizData.usedQuestions.length = 0
    quizData.playerProgress = {}

    if (quizData.answeredUsers) {
        quizData.answeredUsers.clear()
    }
}
    if (
text.startsWith('.xo ')
) {

const target =
    msg.message
        ?.extendedTextMessage
        ?.contextInfo
        ?.mentionedJid?.[0]

if (!target) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ قم بمنشن اللاعب'
        }
    )
}

if (
    xo.getGame(
        msg.key.remoteJid
    )
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ توجد لعبة حالياً'
        }
    )
}

global.pendingXO =
    global.pendingXO || {}

global.pendingXO[
    msg.key.remoteJid
] = {

    playerX:
        userId,

    playerO:
        target
}

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`🎮 تحدي XO

@${target.split('@')[0]}

اكتب:

.موافق

لبدء المباراة`,
mentions: [target]
}
)

return

}

if (
text === '.موافق'
) {

global.pendingXO =
    global.pendingXO || {}

const pending =
    global.pendingXO[
        msg.key.remoteJid
    ]

if (!pending)
    return

if (
    pending.playerO !==
    userId
)
    return

xo.createGame(
    msg.key.remoteJid,
    pending.playerX,
    pending.playerO
)

const game =
    xo.getGame(
        msg.key.remoteJid
    )

delete global.pendingXO[
    msg.key.remoteJid
]

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`🎮 بدأت المباراة

❌ @${game.playerX.split('@')[0]}
⭕ @${game.playerO.split('@')[0]}

الدور:
@${game.turn.split('@')[0]}

${xo.renderBoard(
game.board
)}`,
mentions: [
game.playerX,
game.playerO,
game.turn
]
}
)

return

}

    const game =
xo.getGame(
msg.key.remoteJid
)

if (
game &&
/^[1-9]$/.test(text)
) {

if (
    game.turn !== userId
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ ليس دورك'
        }
    )
}

const index =
    Number(text) - 1

if (
    game.board[index] === '❌' ||
    game.board[index] === '⭕'
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ هذه الخانة مستخدمة'
        }
    )
}

const symbol =
    userId === game.playerX
        ? '❌'
        : '⭕'

game.board[index] =
    symbol

const winner =
    xo.checkWinner(
        game.board
    )

if (winner) {

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`🏆 الفائز

@${userId.split('@')[0]}

${xo.renderBoard(
game.board
)}`,
mentions: [
userId
]
}
)

    xo.deleteGame(
        msg.key.remoteJid
    )

    return
}

if (
    xo.isDraw(
        game.board
    )
) {

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`🤝 تعادل

${xo.renderBoard(
game.board
)}`
}
)

    xo.deleteGame(
        msg.key.remoteJid
    )

    return
}

game.turn =
    game.turn ===
    game.playerX
        ? game.playerO
        : game.playerX

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`${xo.renderBoard(
game.board
)}

🎯 الدور:

@${game.turn.split('@')[0]}`,
mentions: [
game.turn
]
}
)

return

}
    
        if (text === '.صوره') {

    try {

        console.log('📸 IMAGE COMMAND START')

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

        console.log('📸 SENDING:', imagePath)

await sock.sendMessage(
    msg.key.remoteJid,
    {
        image: {
            url: imagePath
        }
    }
)

console.log('📸 IMAGE SENT')

    } catch (err) {

        console.log(
            '📸 IMAGE ERROR:',
            err
        )
    }
}

    if (text.startsWith('.زواج ')) {

const userId =
    msg.key.participant ||
    msg.key.remoteJid

const number =
    parseInt(text.split(' ')[1])

if (isNaN(number)) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ مثال:\n.زواج 1'
        }
    )
}

let player =
    await WaifuPlayer.findOne({
        userId
    })

if (!player) {

    player =
        await WaifuPlayer.create({
            userId
        })
}

player.wives =
    player.wives || []

if (player.wives.length >= 4) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '💍 الحد الأقصى 4 زوجات'
        }
    )
}

const waifus =
    await Waifu.find({
        claimedBy: userId
    })

const waifu =
    waifus[number - 1]

if (!waifu) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ وايفو غير موجودة'
        }
    )
}

if (
    player.wives.includes(
        waifu._id.toString()
    )
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '💍 هذه زوجتك بالفعل'
        }
    )
}

player.wives.push(
    waifu._id.toString()
)

await player.save()

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`💍 تم الزواج من

👸 ${waifu.name}`
}
)
}
if (text === '.زوجاتي') {

const userId =
    msg.key.participant ||
    msg.key.remoteJid

const player =
    await WaifuPlayer.findOne({
        userId
    })

if (
    !player ||
    !player.wives ||
    !player.wives.length
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '💔 لا تملك أي زوجة'
        }
    )
}

const wives =
    await Waifu.find({
        _id: {
            $in: player.wives
        }
    })

let message =

`💍 زوجاتك (${wives.length}/4)

`

wives.forEach(
    (wife, index) => {

        message +=

`${index + 1}. ${wife.name}
📺 ${wife.anime}
⭐ ${wife.rarity}

`
}
)

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text: message
    }
)

}
    if (text.startsWith('.طلاق ')) {

const userId =
    msg.key.participant ||
    msg.key.remoteJid

const number =
    parseInt(text.split(' ')[1])

const player =
    await WaifuPlayer.findOne({
        userId
    })

if (
    !player ||
    !player.wives ||
    !player.wives.length
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '💔 لا تملك أي زوجة'
        }
    )
}

const wifeId =
    player.wives[number - 1]

if (!wifeId) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ رقم غير موجود'
        }
    )
}

const wife =
    await Waifu.findById(
        wifeId
    )

player.wives.splice(
    number - 1,
    1
)

await player.save()

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`💔 تم الطلاق

👸 ${wife?.name || 'وايفو'}`
}
)
}
    
    if (text === '.الترتيب') {

if (!isOwner(msg)) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ هذا الأمر للمطور فقط' }
        )
    }
        
let metadata

try {

    metadata =
        await sock.groupMetadata(
            msg.key.remoteJid
        )

} catch (e) {

    console.log(
        'groupMetadata error:',
        e
    )

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '❌ تعذر جلب بيانات المجموعة'
        }
    )
}

const participants =
    metadata.participants.map(
        p => p.id
    )

const players =
    await Player.find({
        userId: {
            $in: participants
        }
    })

const ranking = players.map(player => {

    const totalPower =
        (player.characters || [])
            .reduce(
                (sum, c) =>
                    sum + (c.power || 0),
                0
            )

    return {
        userId: player.userId,
        power: totalPower
    }
})

ranking.sort(
    (a, b) =>
        b.power - a.power
)

const top15 =
    ranking.slice(0, 15)

let textRank =

`🏆 ═════〔 ترتيب القوة 〕═════ 🏆

`

top15.forEach((p, i) => {

    const rank =
        i === 0 ? '🥇' :
        i === 1 ? '🥈' :
        i === 2 ? '🥉' :
        `${i + 1}️⃣`

    textRank +=

`${rank} @${p.userId.split('@')[0]}
⚡ ${p.power.toLocaleString()}

`
})

textRank +=

`━━━━━━━━━━━━━━

👑 يعتمد الترتيب على
مجموع قوة جميع الشخصيات`

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text: textRank,
        mentions: top15.map(
            p => p.userId
        )
    }
)

}
    if (text === ".card") {

    const buffer =
    await generateCard(1)

    if (!buffer) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "❌ لم يتم العثور على الشخصية"
            }
        )
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: buffer,
            caption: "🎴 Cid Kagenou"
        }
    )
    }


if (text === '.جوائز_الترتيب') {

    if (!isOwner(msg)) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ هذا الأمر للمطور فقط' }
        )
    }

    await distributeRankingRewards(
        sock,
        msg.key.remoteJid
    )
}

    if (text.startsWith('.تبادل')) {

    const target =
        msg.message?.extendedTextMessage
            ?.contextInfo
            ?.mentionedJid?.[0]

    if (!target) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ منشن اللاعب الذي تريد التبادل معه'
            }
        )
    }

    if (target === userId) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ لا يمكنك التبادل مع نفسك'
            }
        )
    }

    const existing =
    await WaifuTrade.findOne({
        $or: [
            { user1: userId },
            { user2: userId },
            { user1: target },
            { user2: target }
        ]
    })

    if (existing) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ أحد اللاعبين لديه تبادل مفتوح بالفعل'
            }
        )
    }

    await WaifuTrade.create({

        user1: sender,
        user2: target

    })

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🤝 تم إنشاء طلب تبادل

👤 الطرف الأول:
${sender.split('@')[0]}

👤 الطرف الثاني:
${target.split('@')[0]}

للإكمال اكتب:

.قبول`
        }
    )
}

    if (text.startsWith('.كاكيرا ')) {

    const trade =
    await WaifuTrade.findOne({
        $or: [
            { user1: userId },
            { user2: userId }
        ]
    })

    if (!trade) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ أنت لست داخل تبادل'
            }
        )
    }

    const amount =
        parseInt(
            text.split(' ')[1]
        )

    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ مبلغ غير صالح'
            }
        )
    }

    const player =
        await WaifuPlayer.findOne({
            userId: sender
        })

    if (!player) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ اللاعب غير موجود'
            }
        )
    }

    if (player.kakera < amount) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    `❌ لا تملك ${amount} كاكيرا`
            }
        )
    }

    if (trade.user1 === sender) {

        trade.kakera1 = amount
        trade.ready1 = false

    } else {

        trade.kakera2 = amount
        trade.ready2 = false
    }

    await trade.save()

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                `💎 تم إضافة ${amount} كاكيرا إلى التبادل`
        }
    )
}
if (text === '.اقبل') {

    const trade =
        await WaifuTrade.findOne({
            user2: userId
        })

    if (!trade) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ لا يوجد طلب تبادل بانتظارك'
            }
        )
    }

    trade.accepted = true

    await trade.save()

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`✅ تم قبول التبادل

الآن كل لاعب يختار الوايفو التي يريد عرضها:

.اعرض رقم_الوايفو

مثال:
.اعرض 3`
        }
    )
}

if (text === '.update waifus images') {

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: '⏳ بدأ تحديث الصور...'
        }
    )

    const updated =
        await updateAnimeImages(319)

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`✅ تم الانتهاء

🖼️ الصور المحدثة: ${updated}`
        }
    )
}
    
    

if (text === '.رول') {

    const sender =
        msg.key.participant ||
        msg.key.remoteJid

    const waifus =
    await Waifu.find({
        image: {
            $nin: [null, '']
        }
    })
    if (!waifus.length) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا توجد شخصيات.'
            }
        )
    }

    const waifu =
        waifus[
            Math.floor(
                Math.random() *
                waifus.length
            )
        ]

    lastRolls.set(
        sender,
        waifu._id.toString()
    )

    if (!waifu.image) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`🎲 سحبت وايفو جديدة!

👸 ${waifu.name}

📺 ${waifu.anime}

⭐ ${waifu.rarity}

💎 القيمة: ${waifu.value}

⚠️ لا توجد صورة لهذه الوايفو`
            }
        )
    }

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: waifu.image
            },

            caption:
`🎲 سحبت وايفو جديدة!

👸 ${waifu.name}

📺 ${waifu.anime}

⭐ ${waifu.rarity}

💎 القيمة: ${waifu.value}`
        }
    )
}

    if (text === '.مطالبة') {

    const waifuId =
        lastRolls.get(userId)

    if (!waifuId) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ اسحب وايفو أولاً'
            }
        )
    }

    const waifu =
        await Waifu.findById(
            waifuId
        )

    if (!waifu) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ لم يتم العثور على الوايفو'
            }
        )
    }

    if (waifu.claimedBy) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ هذه الوايفو مملوكة بالفعل'
            }
        )
    }

    waifu.claimedBy = userId
waifu.claimedAt = new Date()
waifu.claims += 1

await waifu.save()

lastRolls.delete(userId)

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text:
`🎉 تمت المطالبة بنجاح

👸 ${waifu.name}
📺 ${waifu.anime}`
    }
)
}

    if (text === '.مجموعتي') {

const waifus =
    await Waifu.find({
        claimedBy: userId
    })

if (!waifus.length) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ لا تملك أي وايفو'
        }
    )
}

let message =

`📚 مجموعتك

━━━━━━━━━━━━

`

waifus.forEach(
    (waifu, index) => {

        message +=

`${index + 1}. ${waifu.name}
📺 ${waifu.anime}
⭐ ${waifu.rarity}

`
}
)

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text: message
    }
)

}

    if (text.startsWith('.اعرض ')) {

const trade =
    await WaifuTrade.findOne({
        $or: [
            { user1: userId },
            { user2: userId }
        ]
    })

if (!trade) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ أنت لست داخل تبادل'
        }
    )
}

if (!trade.accepted) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ يجب قبول التبادل أولاً'
        }
    )
}

const number =
    parseInt(
        text.split(' ')[1]
    )

if (isNaN(number)) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ اختر رقمًا صحيحًا'
        }
    )
}

const waifus =
    await Waifu.find({
        claimedBy: userId
    })

const waifu =
    waifus[number - 1]

if (!waifu) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ رقم غير موجود'
        }
    )
}

if (trade.user1 === userId) {

    trade.waifu1 =
        waifu._id

    trade.ready1 = false

} else {

    trade.waifu2 =
        waifu._id

    trade.ready2 = false
}

await trade.save()

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`✅ تم عرض

👸 ${waifu.name}
📺 ${waifu.anime}

اكتب:
.جاهز`
}
)
}
    if (text === '.جاهز') {

const trade =
    await WaifuTrade.findOne({
        $or: [
            { user1: userId },
            { user2: userId }
        ]
    })

if (!trade) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ أنت لست داخل تبادل'
        }
    )
}

if (!trade.accepted) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ لم يتم قبول التبادل بعد'
        }
    )
}
if (trade.user1 === userId) {

    if (!trade.waifu1) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ اعرض وايفو أولاً'
            }
        )
    }

    trade.ready1 = true

} else {

    if (!trade.waifu2) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ اعرض وايفو أولاً'
            }
        )
    }

    trade.ready2 = true
}

await trade.save()

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`✅ تم تسجيل جاهزيتك

👤 الطرف الأول:
${trade.ready1 ? '✅' : '❌'}

👤 الطرف الثاني:
${trade.ready2 ? '✅' : '❌'}

إذا أصبح الطرفان جاهزين استخدم:
.تأكيد`
}
)
}

if (text === '.تأكيد') {

const trade =
    await WaifuTrade.findOne({
        $or: [
            { user1: userId },
            { user2: userId }
        ]
    })

if (!trade) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ لا يوجد تبادل نشط'
        }
    )
}

if (!trade.accepted) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ لم يتم قبول التبادل بعد'
        }
    )
}

if (
    !trade.ready1 ||
    !trade.ready2
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ يجب أن يكون الطرفان جاهزين'
        }
    )
}

const waifu1 =
await Waifu.findById(
trade.waifu1
)

const waifu2 =
await Waifu.findById(
trade.waifu2
)

if (!waifu1 || !waifu2) {

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text:
            '❌ تعذر العثور على الوايفوهات'
    }
)

}

const player1 =
await WaifuPlayer.findOne({
userId: trade.user1
})

const player2 =
await WaifuPlayer.findOne({
userId: trade.user2
})

if (!player1 || !player2) {

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text:
            '❌ تعذر العثور على اللاعبين'
    }
)

}

if (
player1.kakera < trade.kakera1 ||
player2.kakera < trade.kakera2
) {

return sock.sendMessage(
    msg.key.remoteJid,
    {
        text:
            '❌ أحد اللاعبين لا يملك الكاكيرا المطلوبة'
    }
)

}

waifu1.claimedBy =
trade.user2

waifu2.claimedBy =
trade.user1

player1.kakera -=
trade.kakera1

player2.kakera +=
trade.kakera1

player2.kakera -=
trade.kakera2

player1.kakera +=
trade.kakera2

await waifu1.save()
await waifu2.save()

await player1.save()
await player2.save()

await WaifuTrade.deleteOne({
_id: trade._id
})

await sock.sendMessage(
msg.key.remoteJid,
{
text:
`🎉 تم التبادل بنجاح

💎 كاكيرا الطرف الأول:
${trade.kakera1}

💎 كاكيرا الطرف الثاني:
${trade.kakera2}

✅ تم نقل الوايفوهات والكاكيرا`
}
)

waifu1.claimedBy =
    trade.user2

waifu2.claimedBy =
    trade.user1

await waifu1.save()
await waifu2.save()

await WaifuTrade.deleteOne({
    _id: trade._id
})

await sock.sendMessage(
    msg.key.remoteJid,
    {
        text:

`🎉 تم التبادل بنجاح

👤 ${trade.user1.split('@')[0]}
⇄
👤 ${trade.user2.split('@')[0]}

تم نقل الملكية بنجاح`
}
)
}

    if (text === '.الغاء') {

    const trade =
        await WaifuTrade.findOne({
            $or: [
                { user1: userId },
                { user2: userId }
            ]
        })

    if (!trade) return

    await WaifuTrade.deleteOne({
        _id: trade._id
    })

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ تم إلغاء التبادل'
        }
    )
}

    if (text.startsWith('.اعرضوايفو ')) {

    const userId =
        msg.key.participant ||
        msg.key.remoteJid

    const number =
        parseInt(
            text.split(' ')[1]
        )

    if (isNaN(number)) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ مثال:\n.اعرضوايفو 1'
            }
        )
    }

    const waifus =
        await Waifu.find({
            claimedBy: userId
        })

    const waifu =
        waifus[number - 1]

    if (!waifu) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ لا توجد وايفو بهذا الرقم'
            }
        )
    }

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: waifu.image
            },

            caption:
`👸 ${waifu.name}

📺 ${waifu.anime}

⭐ ${waifu.rarity}

💎 القيمة: ${waifu.value}`
        }
    )
}
    
    if (text.startsWith('.تحدي')) {

    const target =
        msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]

    if (!target) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ مثال: .تحدي @user'
        })
    }

    if (target === userId) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا يمكنك تحدي نفسك'
        })
    }

    const targetPlayer =
        await Player.findOne({ userId: target })

    if (!targetPlayer) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ اللاعب لا يملك حساباً'
        })
    }

    const oldFight = await PvP.findOne({
        active: true,
        $or: [
            { player1: userId },
            { player2: userId },
            { player1: target },
            { player2: target }
        ]
    })

    if (oldFight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ أحد اللاعبين داخل قتال بالفعل'
        })
    }

    const player1Data = await Player.findOne({ userId })
const player2Data = await Player.findOne({ userId: target })

if (!player1Data || !player2Data) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ خطأ في بيانات اللاعبين'
    })
}

function getGroupHP(player) {

    if (!player.characters?.length)
        return 1000

    const totalPower =
        player.characters.reduce(
            (total, char) =>
                total + Number(char.power || 0),
            0
        )

    return Math.floor(totalPower / 3)
}

const hp1 = getGroupHP(player1Data)
const hp2 = getGroupHP(player2Data)

await PvP.create({
    player1: userId,
    player2: target,
    turn: target,
    active: false,

    hp1,
    hp2,

    turnCount: 0,

    skillTurn1: -99,
    skillTurn2: -99,

    ultimateTurn1: -99,
    ultimateTurn2: -99
})

    return safeSend(msg.key.remoteJid, {
        text:
`⚔️ تحدي جديد

@${target.split('@')[0]}

تمت دعوتك للقتال

اكتب:

.قبول

أو

.رفض`,
        mentions: [target]
    })
    }
    if (text === '.رفض') {

    const fight = await PvP.findOne({
        player2: userId,
        active: false
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا يوجد تحدي بانتظار رفضه'
        })
    }

    await PvP.deleteOne({
        _id: fight._id
    })

    return safeSend(msg.key.remoteJid, {
        text: 'تم رفض التحدي'
    })
    }

    
if (text === '.ريست_تحدي') {

    if (!isOwner(msg)) {
        return safeSend(
            msg.key.remoteJid,
            {
                text: '❌ للمطور فقط'
            }
        )
    }

    const result =
        await PvP.deleteMany({})

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`✅ تم تصفير جميع التحديات

🗑️ المحذوف:
${result.deletedCount}`
        }
    )
}
    

    if (text === '.قبول') {

    const fight = await PvP.findOne({
        player2: userId,
        active: false
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا يوجد تحدي بانتظار قبولك'
        })
    }

    const player1Data =
        await Player.findOne({ userId: fight.player1 })

    const player2Data =
        await Player.findOne({ userId: fight.player2 })
const stats1 =
    getTotalStats(player1Data)

const stats2 =
    getTotalStats(player2Data)

fight.shield1 = stats1.shield
fight.shield2 = stats2.shield
    const team1 = [...player1Data.characters]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

const team2 = [...player2Data.characters]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

console.log("team1 before save =", team1)
console.log("team2 before save =", team2)

fight.team1 = team1
fight.team2 = team2

console.log("fight.team1 before save =", fight.team1)
console.log("fight.team2 before save =", fight.team2)

fight.active = true

const firstTurn =
    Math.random() < 0.5
        ? fight.player1
        : fight.player2

fight.turn = firstTurn

await fight.save()

console.log("saved")

const testFight = await PvP.findById(fight._id)

console.log("DB team1 =", testFight.team1)
console.log("DB team2 =", testFight.team2)

const checkFight = await PvP.findById(fight._id)

console.log("fight =", JSON.stringify(checkFight))
        
const team1Names = team1
    .map(c => `• ${c.name}`)
    .join('\n')

const team2Names = team2
    .map(c => `• ${c.name}`)
    .join('\n')
    
        return safeSend(msg.key.remoteJid, {
    text:
`⚔️ بدأ القتال!

👤 فريق اللاعب الأول:
${team1Names}

👤 فريق اللاعب الثاني:
${team2Names}

❤️ اللاعب الأول: ${fight.hp1}
❤️ اللاعب الثاني: ${fight.hp2}

🎯 الدور الآن:

@${firstTurn.split('@')[0]}

الأوامر المتاحة:

.هجوم الخصم
.مهارة
.ألتميت`,
    mentions: [
        fight.player1,
        fight.player2,
        firstTurn
    ]
})
    }

if (text === '.مهارة') {

const fight = await PvP.findOne({  
    active: true,  
    $or: [  
        { player1: userId },  
        { player2: userId }  
    ]  
})  

if (!fight) {  
    return safeSend(msg.key.remoteJid, {  
        text: '❌ أنت لست داخل قتال'  
    })  
}  

if (fight.turn !== userId) {  
return safeSend(msg.key.remoteJid, {  
    text: '❌ ليس دورك'  
})

}

let attacker

if (userId === fight.player1) {

attacker =  
    fight.team1[  
        Math.floor(  
            Math.random() *  
            fight.team1.length  
        )  
    ]

} else {

attacker =  
    fight.team2[  
        Math.floor(  
            Math.random() *  
            fight.team2.length  
        )  
    ]

}
const playerData =
await Player.findOne({ userId })

    const lastSkill =
    userId === fight.player1
        ? fight.skillTurn1
        : fight.skillTurn2

if (fight.turnCount - lastSkill < 2) {

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`⏳ لا يمكنك استخدام المهارة الآن

تحتاج انتظار جولتين`
        }
    )
}
    if (userId === fight.player1) {
    fight.skillTurn1 = fight.turnCount
} else {
    fight.skillTurn2 = fight.turnCount
}

const attackerStats =
getTotalStats(playerData)

const opponentData =
await Player.findOne({
userId:



    
fight.player1 === userId
? fight.player2
: fight.player1
})

const opponentStats =
getTotalStats(opponentData)

attackerStats.power =
attacker.power

attackerStats.level =
playerData.level

opponentStats.level =
opponentData.level

const result =
calculateDamageAdvanced(
attackerStats,
opponentStats
)

let damage = result.damage

damage = Math.floor(
damage * 1.5
)

const isCrit = result.crit

const dodged = result.dodge

let critMessage = ''

if (isCrit) {
critMessage =
'\n💢 ضربة كريتيكال!'
}
if (dodged) {

fight.turn =
    userId === fight.player1
        ? fight.player2
        : fight.player1

fight.lastMove = new Date()

fight.turnCount = (fight.turnCount || 0) + 1

await fight.save()

return safeSend(msg.key.remoteJid, {  
    text:

`💨 تم تفادي المهارة!

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
mentions: [fight.turn]
})
}
let absorbed = 0
if (userId === fight.player1) {

if (fight.shield2 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield2  
    )  

    fight.shield2 -= absorbed  
    damage -= absorbed  
}

} else {

if (fight.shield1 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield1  
    )  

    fight.shield1 -= absorbed  
    damage -= absorbed  
}

}

if (userId === fight.player1) {

fight.hp2 -= damage

} else {

fight.hp1 -= damage

}

let heal = 0

if (
attackerStats.lifesteal > 0 &&
damage > 0
) {

heal = Math.floor(  
    damage *  
    attackerStats.lifesteal /  
    100  
)

if (userId === fight.player1) {

fight.hp1 += heal  

} else {  

    fight.hp2 += heal  
}

}

fight.turn =  
userId === fight.player1  
    ? fight.player2  
    : fight.player1

fight.lastMove = new Date()

if (fight.hp1 <= 0 || fight.hp2 <= 0) {  

const winner =  
    fight.hp1 > 0  
        ? fight.player1  
        : fight.player2  

const loser =  
    winner === fight.player1  
        ? fight.player2  
        : fight.player1  

const winnerData =  
    await Player.findOne({  
        userId: winner  
    })  

const loserData =  
    await Player.findOne({  
        userId: loser  
    })  

const moneyReward =  
    Math.floor(  
        500 + Math.random() * 500  
    )  

const xpReward =  
    Math.floor(  
        200 + Math.random() * 300  
    )  

winnerData.money += moneyReward  
winnerData.xp += xpReward  

let boxReward = ''  

const randomBox = Math.random()  

if (randomBox < 0.60) {  

    winnerData.boxes.basic += 1  
    boxReward = '📦 صندوق عادي'

} else if (randomBox < 0.90) {

winnerData.boxes.rare += 1  
    boxReward = '🎁 صندوق نادر'  

} else {  

    winnerData.boxes.epic += 1  
    boxReward = '✨ صندوق ملحمي'  
}  

winnerData.wins += 1  
winnerData.mmr += 20  

loserData.losses += 1  

loserData.mmr =  
    Math.max(  
        0,  
        loserData.mmr - 10  
    )  

winnerData.rank =  
    getRank(winnerData.mmr)  

loserData.rank =  
    getRank(loserData.mmr)  

await winnerData.save()  
await loserData.save()  

await PvP.deleteOne({  
    _id: fight._id  
})  

return safeSend(msg.key.remoteJid, {  
    text:

`🏆 انتهى القتال

👑 الفائز:
@${winner.split('@')[0]}

💰 الفلوس:
+${moneyReward}

⭐ الخبرة:
+${xpReward}

🏅 MMR:
+20

${boxReward}`,
mentions: [winner]
})
}

await fight.save()

playerData.skillCooldown = Date.now() + 10000
await playerData.save()

let shieldMessage = ''

if (absorbed > 0) {
    shieldMessage = `\n🛡️ امتص الدرع: ${absorbed}`
}

let healMessage = ''

if (heal > 0) {
    healMessage = `\n❤️‍🩹 استعاد: ${heal}`
}

return safeSend(msg.key.remoteJid, {
    text:
`✨ ${attacker.name} استخدم مهارة!

💥 الضرر: ${damage}${critMessage}${shieldMessage}${healMessage}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🛡️ ${fight.shield1 || 0}
🛡️ ${fight.shield2 || 0}

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
    mentions: [fight.turn]
})
}

if (text === '.الدم') {

    const players = await Player.find({
        bossHits: { $gt: 0 }
    })

    if (!players.length) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا يوجد مشاركون حالياً'
            }
        )
    }

    players.sort(
        (a, b) =>
            (b.bossHp || 0) -
            (a.bossHp || 0)
    )

    const mentions =
        players.map(
            p => p.userId
        )

    const hpList =
        players.map((p, i) => {

            const hp =
                p.bossHp || 0

            const maxHp =
                p.bossMaxHp || 0

            const status =
                p.bossDead
                ? '💀 ميت'
                : '❤️ حي'

            return `${i + 1}️⃣ @${p.userId.split('@')[0]}

${status}
❤️ ${hp}/${maxHp}`
        }).join('\n\n━━━━━━━━━━━━━━\n\n')

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🏥 ═════〔 حالة المقاتلين 〕═════ 🏥

📊 الترتيب حسب HP الحالي

━━━━━━━━━━━━━━

${hpList}

━━━━━━━━━━━━━━

⚔️ المشاركون: ${players.length}`,
            mentions
        }
    )
}

if (text === '.ألتميت') {
const fight = await PvP.findOne({  
    active: true,  
    $or: [  
        { player1: userId },  
        { player2: userId }  
    ]  
})  

if (!fight) {  
    return safeSend(msg.key.remoteJid, {  
        text: '❌ أنت لست داخل قتال'  
    })  
}  

if (fight.turn !== userId) {  
return safeSend(msg.key.remoteJid, {  
    text: '❌ ليس دورك'  
})

}
    let dotDamage = 0
    if (fight.burn.player1 > 0 && userId === fight.player1) {
    dotDamage += 150
    fight.burn.player1--
}

if (fight.burn.player2 > 0 && userId === fight.player2) {
    dotDamage += 150
    fight.burn.player2--
}

if (fight.poison.player1 > 0 && userId === fight.player1) {
    dotDamage += 100
    fight.poison.player1--
}

if (fight.poison.player2 > 0 && userId === fight.player2) {
    dotDamage += 100
    fight.poison.player2--
}

let attacker

if (userId === fight.player1) {

attacker =  
    fight.team1[  
        Math.floor(  
            Math.random() *  
            fight.team1.length  
        )  
    ]

} else {

attacker =  
    fight.team2[  
        Math.floor(  
            Math.random() *  
            fight.team2.length  
        )  
    ]

}
const lastUltimate =
    userId === fight.player1
        ? fight.ultimateTurn1
        : fight.ultimateTurn2
if ((fight.turnCount || 0) - lastUltimate < 5) {
    

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`⏳ لا يمكنك استخدام الألتميت الآن

تحتاج انتظار 5 جولات`
        }
    )
}
    if (userId === fight.player1) {
    fight.ultimateTurn1 = fight.turnCount
} else {
    fight.ultimateTurn2 = fight.turnCount
}
const attackerStats =
getTotalStats(playerData)

const opponentData =
await Player.findOne({
userId:
fight.player1 === userId
? fight.player2
: fight.player1
})

const opponentStats =
getTotalStats(opponentData)

attackerStats.power =
attacker.power

attackerStats.level =
playerData.level

opponentStats.level =
opponentData.level

const result =
calculateDamageAdvanced(
attackerStats,
opponentStats
)

let damage = result.damage
    damage += dotDamage

damage = Math.floor(
    damage * 2.5
)

const isCrit = result.crit

const dodged = result.dodge

let critMessage = ''

if (isCrit) {
critMessage =
'\n💢 ضربة كريتيكال!'
}
if (dodged) {

fight.turn =
    userId === fight.player1
        ? fight.player2
        : fight.player1

fight.lastMove = new Date()

fight.turnCount = (fight.turnCount || 0) + 1

await fight.save()

return safeSend(msg.key.remoteJid, {  
    text:

`💨 تم تفادي المهارة!

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
mentions: [fight.turn]
})
}
let absorbed = 0
if (userId === fight.player1) {

if (fight.shield2 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield2  
    )  

    fight.shield2 -= absorbed  
    damage -= absorbed  
}

} else {

if (fight.shield1 > 0) {  

    absorbed = Math.min(  
        damage,  
        fight.shield1  
    )  

    fight.shield1 -= absorbed  
    damage -= absorbed  
}

}

if (userId === fight.player1) {

fight.hp2 -= damage

} else {

fight.hp1 -= damage

}

let heal = 0

if (
attackerStats.lifesteal > 0 &&
damage > 0
) {

heal = Math.floor(  
    damage *  
    attackerStats.lifesteal /  
    100  
)

if (userId === fight.player1) {

fight.hp1 += heal  

} else {  

    fight.hp2 += heal  
}

}

fight.turn =  
userId === fight.player1  
    ? fight.player2  
    : fight.player1

fight.lastMove = new Date()

if (fight.hp1 <= 0 || fight.hp2 <= 0) {  

const winner =  
    fight.hp1 > 0  
        ? fight.player1  
        : fight.player2  

const loser =  
    winner === fight.player1  
        ? fight.player2  
        : fight.player1  

const winnerData =  
    await Player.findOne({  
        userId: winner  
    })  

const loserData =  
    await Player.findOne({  
        userId: loser  
    })  

const moneyReward =  
    Math.floor(  
        500 + Math.random() * 500  
    )  

const xpReward =  
    Math.floor(  
        200 + Math.random() * 300  
    )  

winnerData.money += moneyReward  
winnerData.xp += xpReward  

let boxReward = ''  

const randomBox = Math.random()  

if (randomBox < 0.60) {  

    winnerData.boxes.basic += 1  
    boxReward = '📦 صندوق عادي'

} else if (randomBox < 0.90) {

winnerData.boxes.rare += 1  
    boxReward = '🎁 صندوق نادر'  

} else {  

    winnerData.boxes.epic += 1  
    boxReward = '✨ صندوق ملحمي'  
}  

winnerData.wins += 1  
winnerData.mmr += 20  

loserData.losses += 1  

loserData.mmr =  
    Math.max(  
        0,  
        loserData.mmr - 10  
    )  

winnerData.rank =  
    getRank(winnerData.mmr)  

loserData.rank =  
    getRank(loserData.mmr)  

await winnerData.save()  
await loserData.save()  

await PvP.deleteOne({  
    _id: fight._id  
})  

return safeSend(msg.key.remoteJid, {  
    text:

`🏆 انتهى القتال

👑 الفائز:
@${winner.split('@')[0]}

💰 الفلوس:
+${moneyReward}

⭐ الخبرة:
+${xpReward}

🏅 MMR:
+20

${boxReward}`,
mentions: [winner]
})
}

await fight.save()

playerData.ultimateCooldown = Date.now() + 30000
await playerData.save()

let shieldMessage = ''

if (absorbed > 0) {
    shieldMessage = `\n🛡️ امتص الدرع: ${absorbed}`
}

let healMessage = ''

if (heal > 0) {
    healMessage = `\n❤️‍🩹 استعاد: ${heal}`
}

return safeSend(msg.key.remoteJid, {
    text:
`🌌 ${attacker.name} أطلق الألتميت!

💥 الضرر: ${damage}${critMessage}${shieldMessage}${healMessage}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🛡️ ${fight.shield1 || 0}
🛡️ ${fight.shield2 || 0}

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
    mentions: [fight.turn]
})
}


        if (text.startsWith('.بدل ')) {

    const target =
        msg.message?.extendedTextMessage
            ?.contextInfo
            ?.mentionedJid?.[0]

    if (!target) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ منشن اللاعب'
            }
        )
    }

    const args =
        text.split(' ')

    const myNumber =
        parseInt(args[1])

    const hisNumber =
        parseInt(args[2])

    if (
        isNaN(myNumber) ||
        isNaN(hisNumber)
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ مثال:\n.بدل 1 30 @اللاعب'
            }
        )
    }

    const me =
        await Player.findOne({
            userId
        })

    const other =
        await Player.findOne({
            userId: target
        })

    if (!me) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ بياناتك غير موجودة'
            }
        )
    }

    if (!other) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ اللاعب غير موجود'
            }
        )
    }

    const myChar =
        me.characters[myNumber - 1]

    const hisChar =
        other.characters[hisNumber - 1]

    if (!myChar) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ شخصيتك غير موجودة'
            }
        )
    }

    if (!hisChar) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ شخصية اللاعب غير موجودة'
            }
        )
    }

    pendingSwaps.set(
        target,
        {
            from: userId,
            to: target,
            myNumber,
            hisNumber
        }
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🔄 طلب تبديل

👤 @${userId.split('@')[0]}
🎁 ${myChar.name}

🔁 مقابل

👤 @${target.split('@')[0]}
🎁 ${hisChar.name}

اكتب:
.قبول_بدل

أو

.رفض_بدل`,
            mentions: [
                userId,
                target
            ]
        }
    )
}
        

if (text === '.قبول_بدل') {

    const request =
        pendingSwaps.get(userId)

    if (!request) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ لا يوجد طلب'
            }
        )
    }

    const player1 =
        await Player.findOne({
            userId: request.from
        })

    const player2 =
        await Player.findOne({
            userId: request.to
        })

    const char1 =
        player1.characters[
            request.myNumber - 1
        ]

    const char2 =
        player2.characters[
            request.hisNumber - 1
        ]

    if (!char1 || !char2) {

        pendingSwaps.delete(
            userId
        )

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
                    '❌ إحدى الشخصيات غير موجودة'
            }
        )
    }

    player1.characters[
        request.myNumber - 1
    ] = char2

    player2.characters[
        request.hisNumber - 1
    ] = char1

    await player1.save()
    await player2.save()

    pendingSwaps.delete(
        userId
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`✅ تم التبديل بنجاح

${char1.name}
↔
${char2.name}`
        }
    )
}

    if (text === '.رفض_بدل') {

    const request =
        pendingSwaps.get(userId)

    if (!request) return

    pendingSwaps.delete(
        userId
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
                '❌ تم رفض التبديل'
        }
    )
    }
    
if (text === '.مساهمات') {

    const players =
        await Player.find({})
            .sort({ totalBossDamage: -1 })
            .limit(10)

    const me =
        await Player.findOne({ userId })

    let leaderboard =
`🏆 أفضل المقاتلين ضد جميع الزعماء

━━━━━━━━━━

`

    for (
        let i = 0;
        i < players.length;
        i++
    ) {

        const player =
            players[i]

        const medal =
            i === 0 ? '🥇' :
            i === 1 ? '🥈' :
            i === 2 ? '🥉' :
            `#${i + 1}`

        leaderboard +=
`${medal}

💥 ${(player.totalBossDamage || 0).toLocaleString()} ضرر

⚔️ ${(player.bossHits || 0).toLocaleString()} هجمة

━━━━━━━━━━

`
    }

    leaderboard +=
`📊 مساهمتك

💥 ${(me?.totalBossDamage || 0).toLocaleString()} ضرر

⚔️ ${(me?.bossHits || 0).toLocaleString()} هجمة`

    return safeSend(
        msg.key.remoteJid,
        {
            text: leaderboard
        }
    )
}

if (text === '.هجوم الخصم') {

    const fight = await PvP.findOne({
        active: true,
        $or: [
            { player1: userId },
            { player2: userId }
        ]
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ أنت لست داخل قتال'
        })
    }

    const now = Date.now()

    if (
        fight.lastMove &&
        now - new Date(fight.lastMove).getTime() >
        10 * 60 * 1000
    ) {

        await PvP.deleteOne({
            _id: fight._id
        })

        return safeSend(msg.key.remoteJid, {
            text: '⌛ انتهت المعركة بسبب الخمول'
        })
    }

    if (fight.turn !== userId) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ ليس دورك'
        })
    }
    
    let dotDamage = 0
    if (fight.burn.player1 > 0 && userId === fight.player1) {
    dotDamage += 150
    fight.burn.player1--
}

if (fight.burn.player2 > 0 && userId === fight.player2) {
    dotDamage += 150
    fight.burn.player2--
}

if (fight.poison.player1 > 0 && userId === fight.player1) {
    dotDamage += 100
    fight.poison.player1--
}

if (fight.poison.player2 > 0 && userId === fight.player2) {
    dotDamage += 100
    fight.poison.player2--
}
    console.log("fight.team1 =", fight.team1)
console.log("fight.team2 =", fight.team2)
console.log("fight =", JSON.stringify(fight))
if (
    !fight.team1 ||
    !fight.team2 ||
    !fight.team1.length ||
    !fight.team2.length
) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ بيانات القتال تالفة، أعد إنشاء التحدي'
    })
}
    let attacker

    if (userId === fight.player1) {

        attacker =
            fight.team1[
                Math.floor(
                    Math.random() *
                    fight.team1.length
                )
            ]

    } else {

        attacker =
            fight.team2[
                Math.floor(
                    Math.random() *
                    fight.team2.length
                )
            ]
    }

    const playerData =
    await Player.findOne({ userId })

const attackerStats =
    getTotalStats(playerData)

const opponentData =
    await Player.findOne({
        userId:
            fight.player1 === userId
                ? fight.player2
                : fight.player1
    })

const opponentStats =
    getTotalStats(opponentData)

attackerStats.power =
    attacker.power

attackerStats.level =
    playerData.level

opponentStats.level =
    opponentData.level

const result =
    calculateDamageAdvanced(
        attackerStats,
        opponentStats
    )

let damage = result.damage
    damage += dotDamage

const isCrit = result.crit

const dodged = result.dodge
let critMessage = ''

if (isCrit) {
    critMessage =
        '\n💢 ضربة كريتيكال!'
}
    
    if (dodged) {

    fight.turn =
        userId === fight.player1
            ? fight.player2
            : fight.player1

    fight.lastMove = new Date()

    await fight.save()

    return safeSend(msg.key.remoteJid, {
        text:
`💨 تم تفادي الهجوم!

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
        mentions: [fight.turn]
    })
    }


    // Accuracy
    if (
        attackerStats.accuracy > 0 &&
        Math.random() * 100 >
        attackerStats.accuracy
    ) {

        fight.turn =
            userId === fight.player1
                ? fight.player2
                : fight.player1

        fight.lastMove = new Date()

        await fight.save()

        return safeSend(msg.key.remoteJid, {
            text:
`🎯 أخطأت الضربة

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
            mentions: [fight.turn]
        })
    }

    // Dodge
    if (
        opponentStats.dodge > 0 &&
        Math.random() * 100 <
        opponentStats.dodge
    ) {

        fight.turn =
            userId === fight.player1
                ? fight.player2
                : fight.player1

        fight.lastMove = new Date()

        await fight.save()

        return safeSend(msg.key.remoteJid, {
            text:
`🏃 تم تفادي الهجوم

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
            mentions: [fight.turn]
        })
    }

    

    let critical = false

    if (
        attackerStats.critRate > 0 &&
        Math.random() * 100 <
        attackerStats.critRate
    ) {

        critical = true

        damage = Math.floor(
            damage *
            (
                1 +
                attackerStats.critDamage / 100
            )
        )
    }

    // Shield
    let absorbed = 0

if (userId === fight.player1) {

    if (fight.shield2 > 0) {

        absorbed = Math.min(
            damage,
            fight.shield2
        )

        fight.shield2 -= absorbed
        damage -= absorbed
    }

} else {

    if (fight.shield1 > 0) {

        absorbed = Math.min(
            damage,
            fight.shield1
        )

        fight.shield1 -= absorbed
        damage -= absorbed
    }
}
    if (userId === fight.player1) {

        fight.hp2 -= damage

    } else {

        fight.hp1 -= damage
    }
    fight.hp1 = Math.max(0, fight.hp1)
fight.hp2 = Math.max(0, fight.hp2)

    // Lifesteal
    let heal = 0

    if (
        attackerStats.lifesteal > 0 &&
        damage > 0
    ) {

        heal = Math.floor(
            damage *
            attackerStats.lifesteal /
            100
        )

        if (userId === fight.player1) {

            fight.hp1 += heal

        } else {

            fight.hp2 += heal
        }
    }

    fight.turn =
        userId === fight.player1
            ? fight.player2
            : fight.player1

    fight.lastMove = new Date()

    if (fight.hp1 <= 0 || fight.hp2 <= 0) {

const winner =
    fight.hp1 > 0
        ? fight.player1
        : fight.player2

const loser =
    winner === fight.player1
        ? fight.player2
        : fight.player1

const winnerData =
    await Player.findOne({
        userId: winner
    })

const loserData =
    await Player.findOne({
        userId: loser
    })

const moneyReward =
    Math.floor(
        500 + Math.random() * 500
    )

const xpReward =
    Math.floor(
        200 + Math.random() * 300
    )

winnerData.money += moneyReward
winnerData.xp += xpReward

winnerData.wins += 1
winnerData.mmr += 20
        let boxReward = ''

const randomBox = Math.random()

if (randomBox < 0.60) {

    winnerData.boxes.basic += 1
    boxReward = '📦 صندوق عادي'

} else if (randomBox < 0.90) {

    winnerData.boxes.rare += 1
    boxReward = '🎁 صندوق نادر'

} else {

    winnerData.boxes.epic += 1
    boxReward = '✨ صندوق ملحمي'
}

loserData.losses += 1

loserData.mmr =
    Math.max(
        0,
        loserData.mmr - 10
    )

winnerData.rank =
    getRank(winnerData.mmr)

loserData.rank =
    getRank(loserData.mmr)

await winnerData.save()
await loserData.save()

await PvP.deleteOne({
    _id: fight._id
})

return safeSend(msg.key.remoteJid, {
    text:
`🏆 انتهى القتال

👑 الفائز:
@${winner.split('@')[0]}

💰 الفلوس:
+${moneyReward}

⭐ الخبرة:
+${xpReward}

🏅 MMR:
+20

${boxReward}`,
    mentions: [winner]
})
    }

    await fight.save()

    return safeSend(msg.key.remoteJid, {
        text:
`⚔️ ${attacker.name} هاجم

${critical ? '💥 ضربة حرجة!' : ''}

💥 الضرر: ${damage}
${critMessage}
${absorbed > 0 ? `🛡️ امتص الدرع: ${absorbed}\n` : ''}${heal > 0 ? `❤️‍🩹 امتصاص حياة: +${heal}\n` : ''}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🛡️ ${fight.shield1}
🛡️ ${fight.shield2}

🎯 الدور الآن:
@${fight.turn.split('@')[0]}`,
        mentions: [fight.turn]
    })
}


    if (text === '.مهارة') {

    const fight = await PvP.findOne({
        active: true,
        $or: [
            { player1: userId },
            { player2: userId }
        ]
    })

    if (!fight) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ أنت لست داخل قتال'
        })
    }

    if (fight.turn !== userId) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ ليس دورك'
        })
    }

    const playerData =
    await Player.findOne({ userId })

const stats =
    getTotalStats(playerData)

const damage =
    Math.floor(stats.attack * 1.5 * (0.8 + Math.random() * 0.4))

    if (userId === fight.player1) {

        fight.hp2 -= damage
        fight.turn = fight.player2
        

    } else {

        fight.hp1 -= damage
        fight.turn = fight.player1
    }
await fight.save()
    if (fight.hp1 <= 0 || fight.hp2 <= 0) {

        const winner =
            fight.hp1 > 0
                ? fight.player1
                : fight.player2

        await PvP.deleteOne({
            _id: fight._id
        })

        return safeSend(msg.key.remoteJid, {
            text:
`🏆 انتهى القتال

الفائز:
@${winner.split('@')[0]}`,
            mentions: [winner]
        })
    }

    await fight.save()

    return safeSend(msg.key.remoteJid, {
        text:
`🔥 مهارة خاصة

💥 الضرر:
${damage}

❤️ ${fight.hp1}
💙 ${fight.hp2}

🎯 الدور الآن:

@${fight.turn.split('@')[0]}`,
        mentions: [fight.turn]
    })
    }

        if (text === '.البرج') {

    let player =
        await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا تملك حساباً'
            }
        )
    }

let needSave = false

if (player.attackBonus === undefined) {
    player.attackBonus = 0
    needSave = true
}

if (player.defenseBonus === undefined) {
    player.defenseBonus = 0
    needSave = true
}

if (player.hpBonus === undefined) {
    player.hpBonus = 0
    needSave = true
}

if (player.speedBonus === undefined) {
    player.speedBonus = 0
    needSave = true
}

if (needSave) await player.save()
            
    if (player.towerCompleted) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `👑 لقد أكملت برج الأبطال

🏆 الألقاب:

${player.titles?.length
? player.titles.join('\n')
: 'لا يوجد'}

🏰 الطابق: 30/30

⚔️ هجوم إضافي: ${player.attackBonus || 0}%
🛡️ دفاع إضافي: ${player.defenseBonus || 0}%
❤️ صحة إضافية: ${player.hpBonus || 0}%
⚡ سرعة إضافية: ${player.speedBonus || 0}%`
        }
    )
}

    const floor = towerFloors.find(
        f => f.floor === player.towerFloor
    )

    if (!floor) return

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: floor.image
            },
            caption: `🏰 برج الأبطال

📍 الطابق الحالي: ${floor.floor}/30

⚔️ القوة المطلوبة:
${floor.power}

👥 الشخصيات المستخدمة:
${player.usedCharacters?.length || 0}/30

🏆 اللقب النهائي:
⚜️ سيد العروش

استعمل:
.طابق ${player.towerFloor} رقم_الشخصية`
        }
    )
}
        if (text === '.resetall') {

  try {

    await Player.updateMany(
      {},
      {
        $set: {
          level: 1,
          xp: 0,
          attackBonus: 0,
          defenseBonus: 0,
          critBonus: 0,
          dodgeBonus: 0,
          reflectBonus: 0,
          lifestealBonus: 0,
          bossDamageBonus: 0,
          specialAbilities: [],
          bonusAppliedLevels: []
        }
      }
    )

    return sock.sendMessage(msg.key.remoteJid, {
      text: '✅ تم تصفير جميع اللاعبين إلى لفل 1'
    })

  } catch (err) {
    console.log(err)

    return sock.sendMessage(msg.key.remoteJid, {
      text: '❌ حدث خطأ أثناء التصفير'
    })
  }
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

                if (text.startsWith('.سوق المعدات')) {
            const player = await Player.findOne({ userId })
            if (!player) return

            const DAY = 24 * 60 * 60 * 1000

            // يتجدد المتجر فقط إذا مر 24 ساعة أو كان فارغاً
            const needRefresh =
                !player.shop.lastRefresh ||
                Date.now() - player.shop.lastRefresh >= DAY ||
                !player.shop.items.length

            if (needRefresh) {
                const { generateEquipmentShop } =
require('./utils/shop')
                const shopItems = generateEquipmentShop()

                player.shop.items = shopItems
                player.shop.lastRefresh = Date.now()

                await player.save()
            }

            let shopText = `🏪 *سوق المعدات للمقاتلين* 🏪\n\n`

            // عرض المنتجات الموجودة في المتجر
            player.shop.items.forEach((item, i) => {
                shopText += `*#${i + 1}* 🗡️ *الاسم:* ${item.name}\n⭐ *الندرة:* ${item.rarity}\n💰 *السعر:* ${item.price} عملة\n━━━━━━━━━━━━━━━\n`
            })

            // حساب الوقت المتبقي للتجديد القادم (الجزء الخاص بك)
            const nextRefresh = Math.max(0, DAY - (Date.now() - player.shop.lastRefresh))
            const hours = Math.floor(nextRefresh / 3600000)

            shopText += `\n🕒 *التجديد بعد:* ${hours} ساعة`

            return sock.sendMessage(msg.key.remoteJid, { text: shopText })
        }

        if (text.startsWith('.شراء_معدات')) {

    const num = parseInt(text.split(' ')[1]) - 1

    const player = await Player.findOne({ userId })

    const item = player.shop.items[num]

    if (!item) return

    if (player.money < item.price) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ ما عندك فلوس كافية'
        })
    }

    player.money -= item.price

    player.inventory.push(item)

    await player.save()

    return sock.sendMessage(msg.key.remoteJid, {
        text: `✅ تم شراء ${item.name}`
    })
}

        if (text === '.تركيب') {

    const player = await Player.findOne({ userId })

    if (!player || !player.inventory.length) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا يوجد معدات'
        })
    }

    let textMsg = `⚔️ اختر رقم لتجهيز المعدة:\n\n`

    player.inventory.forEach((item, i) => {

        textMsg += `#${i + 1}
🗡️ ${item.name}
🎚️ ${item.type}
⭐ ${item.rarity}

━━━━━━━━━━━\n`
    })

    textMsg += `\n📌 الاستخدام:
.لبس رقم نوع

مثال:
.لبس 1 weapon`

    return sock.sendMessage(msg.key.remoteJid, {
        text: textMsg
    })
}

        if (text.startsWith('.لبس')) {

    const args = text.split(' ')
    const index = parseInt(args[1]) - 1
    const type = args[2] // weapon / armor / accessory

    const player = await Player.findOne({ userId })

    if (!player) return

    const item = player.inventory[index]

    if (!item) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ رقم غير صحيح'
        })
    }

    if (item.type !== type) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: `❌ هذه ليست ${type}`
        })
    }

    // تركيب القطعة
    player.equipment[type] = item

    await player.save()

    return sock.sendMessage(msg.key.remoteJid, {
        text: `✅ تم تجهيز ${item.name} في ${type}`
    })
}


if (text.startsWith('.قتال pvp')) {

    const attacker = await Player.findOne({ userId })
    const defenderJid = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]

    if (!attacker) {
        return safeSend(msg.key.remoteJid, { text: '❌ لا تملك حساب' })
    }

    if (!defenderJid) {
        return safeSend(msg.key.remoteJid, { text: '❌ مثال: .قتال pvp @user' })
    }

    const defender = await Player.findOne({ userId: defenderJid })

    if (!defender) {
        return safeSend(msg.key.remoteJid, { text: '❌ اللاعب غير موجود' })
    }

    if (attacker.userId === defender.userId) {
        return safeSend(msg.key.remoteJid, { text: '❌ لا يمكنك قتال نفسك' })
    }

    // =========================
    // ⏳ COOLDOWN
    // =========================
    const now = Date.now()

if (attacker.lastPvP && now - attacker.lastPvP < 30000) {
    return safeSend(msg.key.remoteJid, {
        text: '⏳ انتظر 30 ثانية'
    })
}

attacker.lastPvP = now
await attacker.save()

    // =========================
    // 🧠 STATS + EQUIPMENT
    // =========================
    const aEq = attacker.equipment || {}
    const dEq = defender.equipment || {}

    const aStats = {
        hp: attacker.hp,
        attack: (attacker.attack || 500) + (aEq.weapon?.attack || 0),
        crit: (attacker.crit || 5) + (aEq.accessory?.crit || 0),
        dodge: (attacker.dodge || 3) + (aEq.accessory?.dodge || 0),
        burn: 0,
        bleed: 0,
        stun: 0
    }

    const dStats = {
        hp: defender.hp,
        attack: (defender.attack || 500) + (dEq.weapon?.attack || 0),
        crit: (defender.crit || 5) + (dEq.accessory?.crit || 0),
        dodge: (defender.dodge || 3) + (dEq.accessory?.dodge || 0),
        burn: 0,
        bleed: 0,
        stun: 0
    }

    let aHP = aStats.hp
    let dHP = dStats.hp

    let log =
`⚔️ PvP بدأ!

🥊 @${attacker.userId.split('@')[0]}
VS
🥊 @${defender.userId.split('@')[0]}

━━━━━━━━━━━━━━
`

    let turn = 1
let turnAttacker = true

function getSkill() {
    const r = Math.random()
    if (r > 0.85) return "ultimate"
    if (r > 0.55) return "skill"
    return "normal"
}

function applyStatus(target, skill) {

    if (skill === "skill") {
        if (Math.random() < 0.3) target.burn = 2
    }

    if (skill === "ultimate") {
        if (Math.random() < 0.3) target.stun = 1
        if (Math.random() < 0.2) target.bleed = 3
    }
}

const MAX_TURNS = 50

while (
    aHP > 0 &&
    dHP > 0 &&
    turn <= MAX_TURNS
) {

    log += `\n🔁 الدور ${turn}\n`



    // =========================
    // ⚔️ FIGHT LOOP
    // =========================
    

        log += `\n🔁 الدور ${turn}\n`

        let atk = turnAttacker ? aStats : dStats
        let def = turnAttacker ? dStats : aStats

        let defHP = turnAttacker ? dHP : aHP

        // 🔥 status damage

if (atk.burn > 0) {
    defHP -= 80
    atk.burn--
    log += `🔥 حرق -80 HP\n`
}

if (atk.bleed > 0) {
    defHP -= 120
    atk.bleed--
    log += `🩸 نزيف -120 HP\n`
}

if (defHP <= 0) {
    if (turnAttacker) dHP = 0
    else aHP = 0
    break
}

if (atk.stun > 0) {
    atk.stun--
    log += `💫 مذهول - خسر دوره\n`
    turnAttacker = !turnAttacker
    turn++
    continue
}

        // 🛡️ dodge
        if (Math.random() * 100 < def.dodge) {
            log += `💨 تفادى الضربة!\n`
        } else {

            let skill = getSkill()

            let damage = atk.attack

            if (skill === "skill") damage *= 1.5
            if (skill === "ultimate") damage *= 2.5

            // crit
            if (Math.random() * 100 < atk.crit) {
                damage *= 2
                log += `🔥 CRIT!\n`
            }

            defHP -= Math.floor(damage)

            applyStatus(def, skill)

            log += `⚔️ ${skill.toUpperCase()} - ${Math.floor(damage)} dmg\n`
        }

        if (turnAttacker) dHP = defHP
        else aHP = defHP
        log += `
❤️ ${attacker.userId.split('@')[0]}: ${Math.max(0, aHP)} HP
💙 ${defender.userId.split('@')[0]}: ${Math.max(0, dHP)} HP
`

        turnAttacker = !turnAttacker
        turn++
    }

    // =========================
    // 🏆 RESULT
    // =========================
    const winner = aHP > 0 ? attacker : defender
    const loser = aHP > 0 ? defender : attacker

    winner.wins = (winner.wins || 0) + 1
    loser.losses = (loser.losses || 0) + 1

    winner.mmr += 25
    loser.mmr = Math.max(0, loser.mmr - 15)

    attacker.rank = getRank(attacker.mmr)
    defender.rank = getRank(defender.mmr)

    await attacker.save()
    await defender.save()

    return safeSend(msg.key.remoteJid, {
    text: `${log}

━━━━━━━━━━━━━━━━━━

🏆 الفائز:
@${winner.userId.split('@')[0]}

📊 النتائج:

🥇 @${attacker.userId.split('@')[0]}
${attacker.rank} (${attacker.mmr})

🥈 @${defender.userId.split('@')[0]}
${defender.rank} (${defender.mmr})`,

    mentions: [
        attacker.userId,
        defender.userId
    ]
})
}

        if (text.startsWith('.اشرح pvp')) {

    const explanation =
`⚔️ شرح نظام PvP (المطور)

━━━━━━━━━━━━━━━
🧠 1) نظام القتال
━━━━━━━━━━━━━━━
• القتال يعتمد على نظام أدوار (Turn-Based)
• كل لاعب يهاجم بالتناوب
• القتال يستمر حتى ينتهي HP أحد اللاعبين

━━━━━━━━━━━━━━━
🔥 2) المهارات (Skills)
━━━━━━━━━━━━━━━
يوجد 3 أنواع:

• NORMAL → ضربة عادية
• SKILL → ضرر أقوى + احتمال تأثير
• ULTIMATE → ضرر عالي + تأثيرات قوية

━━━━━━━━━━━━━━━
💥 3) الضرر (Damage System)
━━━━━━━━━━━━━━━
• يعتمد على Attack الأساسي
• يتم ضربه في:
  - Skill multiplier
  - Critical Hit (ضربة حرجة)
  - معدات اللاعب

━━━━━━━━━━━━━━━
🔥 4) الضربة الحرجة (Critical)
━━━━━━━━━━━━━━━
• احتمال بنسبة crit%
• تضاعف الضرر ×2

━━━━━━━━━━━━━━━
💨 5) التفادي (Dodge)
━━━━━━━━━━━━━━━
• احتمال dodge%
• إذا نجح:
  ❌ لا يتم استقبال أي ضرر

━━━━━━━━━━━━━━━
🩸 6) حالات القتال (Status Effects)
━━━━━━━━━━━━━━━
• BURN → ضرر كل دور
• BLEED → نزيف لعدة أدوار
• STUN → فقدان دور كامل

━━━━━━━━━━━━━━━
🛡️ 7) المعدات (Equipment System)
━━━━━━━━━━━━━━━
• Weapon → يزيد Attack
• Armor → يزيد HP / تقليل ضرر
• Accessory → يزيد Crit / Dodge

━━━━━━━━━━━━━━━
📊 8) نظام الرانك (Rank System)
━━━━━━━━━━━━━━━
يعتمد على MMR:

• برونزي
• فضي
• ذهبي
• بلاتيني
• ماستر
• أسطوري

كل قتال:
✔ يزيد أو ينقص MMR

━━━━━━━━━━━━━━━
🏆 9) المكافآت
━━━━━━━━━━━━━━━
الفائز يحصل على:
• 💰 فلوس
• ⭐ XP
• 📦 صناديق حسب الرانك

━━━━━━━━━━━━━━━
⚔️ الخلاصة
━━━━━━━━━━━━━━━
PvP الآن = نظام RPG كامل داخل البوت
(مهارات + معدات + حالات + رانك + مكافآت)

🔥 مستعد للتطوير القادم`;

    return safeSend(msg.key.remoteJid, {
        text: explanation
    });
}
        
        
        if (text === '.بروفايل') {

try {

    console.time('PROFILE')

    let player = await Player.findOne({ userId })

if (!player) {
    player = await Player.create({
        userId
    })
}

// 👇 هنا تضيفه مباشرة
const unlockedAbilities = Object.keys(levelAbilities)
    .filter(lvl => player.level >= Number(lvl))
    .map(lvl => levelAbilities[lvl])
const abilitiesText = unlockedAbilities.length > 0
    ? unlockedAbilities.map(a => {
        const icon = abilityIcons[a.type] || "✨"

        return `${icon} ${a.name}
⚡ النوع: ${a.type}
📊 القوة: ${a.value}%
📝 ${a.description}`
    }).join('\n\n')
    : "لا توجد قدرات بعد"
// بعدها يكمل الكود الطبيعي
const characters = Array.isArray(player.characters)
    ? player.characters
    : []

    let strongest = null

    for (const char of characters) {

        if (
            !strongest ||
            Number(char.power || 0) >
            Number(strongest.power || 0)
        ) {
            strongest = char
        }
    }

    console.timeLog(
        'PROFILE',
        'PLAYER LOADED'
    )

    let profilePic = null

    try {

        profilePic = await Promise.race([
            sock.profilePictureUrl(
                userId,
                'image'
            ),
            new Promise(resolve =>
                setTimeout(
                    () => resolve(null),
                    5000
                )
            )
        ])

    } catch (e) {

        profilePic = null
    }

    console.timeLog(
        'PROFILE',
        'PHOTO CHECKED'
    )

    const profileText =

`👤 الملف الشخصي

🎖️ الألقاب:

${player.titles?.length
? player.titles.join('\n')
: 'لا يوجد'}

⭐ المستوى:
${player.level || 1}

✨ الخبرة:
${player.xp || 0}

💰 المال:
${player.money || 0}

🎟️ السحبات:
${player.pulls || 0}

🎫 تذاكر المتجر:
${player.towerTickets || 0}

❤️ HP:
${player.hp || 10000}

━━━━━━━━━━━━━━

✨ تأثير القدرات (الإجمالي):

⚔️ هجوم:
+${player.attackBonus || 0}%

🛡️ دفاع:
+${player.defenseBonus || 0}%

🎯 كريت:
+${player.critBonus || 0}%

💨 مراوغة:
+${player.dodgeBonus || 0}%

🪞 عكس الضرر:
+${player.reflectBonus || 0}%

🩸 امتصاص الحياة:
+${player.lifestealBonus || 0}%

💖 HP:
+${player.hpBonus || 0}%

👑 ضرر الزعيم:
+${player.bossDamageBonus || 0}%

━━━━━━━━━━━━━━

🏰 الطابق الحالي:
${player.towerFloor || 1}/30

📦 المخزون:
${player.characters.length}/${player.maxCharacters || 30}

👑 ضرر الزعيم:
${player.bossDamage || 0}

🎖️ القدرات المكتسبة

${abilitiesText}

━━━━━━━━━━━━━━

🏆 أقوى شخصية

🧿 الاسم:
${strongest ? strongest.name : 'لا يوجد'}

🌟 الندرة:
${strongest ? strongest.rarity : '-'}

⚔️ القوة:
${strongest ? strongest.power : '-'}`

    if (profilePic) {

        try {

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    image: {
                        url: profilePic
                    },
                    caption: profileText
                }
            )

            console.timeEnd('PROFILE')
            return

        } catch (e) {

            console.log(
                'PROFILE IMAGE ERROR:',
                e
            )
        }
    }

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: profileText
        }
    )

    console.timeEnd('PROFILE')

} catch (err) {

    console.log(
        'PROFILE ERROR:',
        err
    )

    return await sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
            '❌ حدث خطأ أثناء فتح البروفايل'
        }
    )
}

}
        
if (text === '.قدراتي') {

    const me = await Player.findOne({ userId })
    if (!me.specialAbilities) me.specialAbilities = []

for (let i = 5; i <= me.level; i += 5) {
  const ability = levelAbilities[i]

  if (ability && !me.specialAbilities.includes(ability.name)) {
    me.specialAbilities.push(ability.name)
  }
}
if (!me.claimedLevelRewards) me.claimedLevelRewards = []

for (let i = 5; i <= me.level; i += 5) {
  if (me.claimedLevelRewards.includes(i)) continue

  switch (i) {
    case 10:
      me.boxes.basic += 5
      break

    case 20:
      me.boxes.rare += 3
      break

    case 30:
      me.boxes.rare += 5
      break
  }

  me.money = (me.money || 0) + 500

  me.claimedLevelRewards.push(i)
}

await me.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text:
`✨ قدراتك

${me.specialAbilities.join('\n') || 'لا توجد قدرات'}

📊 عدد القدرات:
${me.specialAbilities.length}`
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

        if (text.startsWith('.فتحبكج ')) {

    let player = await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ لا يوجد حساب' }
        )
    }

    const boxType =
        text.replace('.فتحبكج ', '')
            .trim()
            .toLowerCase()

    if (
        !player.boxes ||
        !player.boxes[boxType] ||
        player.boxes[boxType] <= 0
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا تملك هذا البكج'
            }
        )
    }

    let rarity
    const chance = Math.random() * 100

    switch (boxType) {

        case 'basic':
            rarity =
                chance <= 20
                    ? 'ممتاز'
                    : 'عادي'
            break

        case 'rare':
            if (chance <= 5)
                rarity = 'اسطوري'
            else if (chance <= 50)
                rarity = 'ممتاز'
            else
                rarity = 'عادي'
            break

        case 'epic':
            rarity =
                chance <= 25
                    ? 'اسطوري'
                    : 'ممتاز'
            break

        case 'legendary':
            rarity = 'اسطوري'
            break

        case 'sss_chance':
            rarity =
                chance <= 5
                    ? 'SSS'
                    : 'اسطوري'
            break

        case 'sss_high':
            rarity =
                chance <= 30
                    ? 'SSS'
                    : 'اسطوري'
            break

        default:
            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: '❌ نوع البكج غير معروف'
                }
            )
    }

    const list =
        characters.filter(
            c => c.rarity === rarity
        )

    if (!list.length) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `❌ لا توجد شخصيات ${rarity}`
            }
        )
    }

    const character =
        list[
            Math.floor(
                Math.random() * list.length
            )
        ]

    player.boxes[boxType]--

    player.characters.push(character)

    await player.save()

    const imagePath =
        path.join(
            __dirname,
            character.image
        )

    if (!fs.existsSync(imagePath)) {

        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`🎁 تم فتح البكج

🧿 ${character.name}
🌟 ${character.rarity}
⚔️ ${character.power}

❌ صورة الشخصية غير موجودة`
            }
        )
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: fs.readFileSync(imagePath),

            caption:
`🎁 ═══〔 تم فتح البكج 〕═══

🧿 الاسم: ${character.name}

🌟 الندرة: ${character.rarity}

⚔️ القوة: ${character.power}

🌌 الأنمي: ${character.anime}

📦 البكج: ${boxType}

🎉 تمت إضافة الشخصية إلى مخزونك`
        }
    )
        }

        if (text.startsWith('.فتح ')) {

    let player = await Player.findOne({ userId })

    if (!player)
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: '❌ لا يوجد حساب' }
        )

    const boxType =
        text.split(' ')[1]

    if (
        !player.boxes ||
        !player.boxes[boxType] ||
        player.boxes[boxType] <= 0
    ) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا تملك هذا الصندوق'
            }
        )
    }

    const character =
        getRandomCharacterByBox(boxType)

    player.boxes[boxType]--

const alreadyOwned =
    player.characters.some(
        c =>
            c.name === character.name &&
            c.form === character.form
    )

if (alreadyOwned) {

    const compensation =
        Math.floor(character.power * 2)

    player.money += compensation

    await player.save()

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`♻️ حصلت على شخصية مكررة

🧿 ${character.name}

💰 تم تحويلها إلى

${compensation} مال`
        }
    )
}

player.characters.push(character)

await player.save()

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🎁 تم فتح الصندوق!

🧿 الشخصية:
${character.name}

🌟 الندرة:
${character.rarity}

⚔️ القوة:
${character.power}

🌌 الأنمي:
${character.anime}`
        }
    )
}

if (text === '.ريست_البرج_للجميع') {

    await Player.updateMany(
        {},
        {
            $set: {
                towerFloor: 1,
                usedCharacters: [],
                towerCompleted: false,

                attackBonus: 0,
                defenseBonus: 0,
                hpBonus: 0,
                speedBonus: 0
            },

            $unset: {
                usedCharacter: "",
                towerCharacters: "",
                usedTowerCharacters: ""
            }
        }
    )

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:

`🔄 تم إعادة تعيين البرج لجميع اللاعبين

✅ الطابق عاد إلى 1
✅ تم فتح جميع الشخصيات
✅ تم مسح الشخصيات المستخدمة
✅ تم حذف أي بيانات برج قديمة
✅ تم حذف مكافآت البرج
✅ تم الاحتفاظ بالألقاب
✅ تم الاحتفاظ بزيادة المخزون (+5)`
        }
    )
}
    
if (text.startsWith('.طابق')) {

    let player = await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ لا تملك حساباً'
        })
    }

    if (player.towerCompleted) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '👑 لقد أكملت البرج بالفعل'
        })
    }

    const args = text.trim().split(/\s+/)

    if (args.length < 3) {
        return sock.sendMessage(msg.key.remoteJid, {
            text:
`❌ استخدم:

.طابق رقم_الطابق رقم_الشخصية

مثال:
.طابق 1 1`
        })
    }

    const floorNumber = Number(args[1])
    const charNumber = Number(args[2]) - 1

    if (
        isNaN(floorNumber) ||
        isNaN(charNumber)
    ) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ يجب إدخال أرقام صحيحة'
        })
    }

    if (floorNumber !== player.towerFloor) {
        return sock.sendMessage(msg.key.remoteJid, {
            text:
`❌ الطابق الحالي لديك هو ${player.towerFloor}`
        })
    }

    const floor = towerFloors.find(
        f => f.floor === floorNumber
    )

    if (!floor) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ هذا الطابق غير موجود'
        })
    }

    const character =
        player.characters?.[charNumber]

    if (!character) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '❌ الشخصية غير موجودة'
        })
    }

    if (
        player.usedCharacters?.includes(
            character.name
        )
    ) {
        return sock.sendMessage(msg.key.remoteJid, {
            text:
'❌ هذه الشخصية استعملتها سابقاً في البرج'
        })
    }

    const finalPower = Math.floor(
        character.power *
        (
            1 +
            (player.attackBonus || 0) / 100
        )
    )

    if (finalPower < floor.power) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text:
`❌ فشل الطابق ${floor.floor}

⚔️ قوة الشخصية:
${finalPower}

🏰 المطلوب:
${floor.power}`
            }
        )
    }

    player.usedCharacters.push(
        character.name
    )

    const reward =
        getTowerReward(floor.floor)

    player.towerFloor++

    if (reward.money)
        player.money += reward.money

    if (reward.draws)
    player.towerTickets =
        (player.towerTickets || 0) +
        reward.draws

    if (reward.box) {

        if (!player.boxes) {
            player.boxes = {}
        }

        player.boxes[reward.box] =
            (player.boxes[reward.box] || 0) + 1
    }

    player.attackBonus =
        (player.attackBonus || 0) + 5

    if (floor.floor === 30) {

    player.towerCompleted = true

    if (!player.titles)
        player.titles = []

    if (
        !player.titles.includes(
            '⚜️ سيد العروش'
        )
    ) {
        player.titles.push(
            '⚜️ سيد العروش'
        )
    }

    player.attackBonus += 10
    player.maxCharacters += 5
}

    await player.save()

    let rewardText = ''

    if (reward.money)
        rewardText +=
`💰 المال: +${reward.money}\n`

    if (reward.xp)
        rewardText +=
`⭐ الخبرة: +${reward.xp}\n`

    if (reward.draws)
    rewardText +=
`🎫 تذاكر المتجر: +${reward.draws}\n`
    if (reward.box)
        rewardText +=
`🎁 الصندوق: ${reward.box}\n`

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: floor.image
            },
            caption:

`🏆 تم اجتياز الطابق ${floor.floor}

🧿 الشخصية المستخدمة:
${character.name}

⚔️ القوة النهائية:
${finalPower}

━━━━━━━━━━━━━━

🎁 الجوائز

${rewardText}

📈 المكافآت الدائمة

⚔️ هجوم: ${player.attackBonus}%
🛡️ دفاع: ${player.defenseBonus}%
❤️ HP: ${player.hpBonus}%
💨 سرعة: ${player.speedBonus}%

━━━━━━━━━━━━━━

🏰 الطابق التالي:
${player.towerFloor}`
        }
    )
}

        if (text === '.متجرالتذاكر') {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🛒 ═══〔 متجر التذاكر 〕═══

📦 Basic Box
🎫 السعر: 5 تذاكر متجر

📦 Rare Box
🎫 السعر: 10 تذاكر متجر

📦 Epic Box
🎫 السعر: 20 تذكرة متجر

📦 Legendary Box
🎫 السعر: 35 تذكرة متجر

📦 SSS Chance Box
🎫 السعر: 60 تذكرة متجر

📦 SSS High Box
🎫 السعر: 100 تذكرة متجر
━━━━━━━━━━━━━━

🌟 شخصية ممتازة عشوائية
🎫 السعر: 15 تذكرة متجر

👑 شخصية أسطورية عشوائية
🎫 السعر: 40 تذكرة متجر

🔥 شخصية SSS عشوائية
🎫 السعر: 150 تذكرة متجر

━━━━━━━━━━━━━━

🛍️ الشراء:

.شراء basic
.شراء rare
.شراء epic
.شراء legendary
.شراء ssschance
.شراء ssshigh

.شراء ممتاز
.شراء اسطوري
.شراء sss`
        }
    )
        }

    if (text === '.ريست_البرج') {

    let player =
        await Player.findOne({ userId })

    if (!player) {
        return sock.sendMessage(
            msg.key.remoteJid,
            {
                text: '❌ لا تملك حساباً'
            }
        )
    }

    player.towerFloor = 1

    player.usedCharacters = []

    player.towerCompleted = false

    // يبقى اللقب محفوظاً
    // player.title = null

    player.attackBonus = 0
    player.defenseBonus = 0
    player.hpBonus = 0
    player.speedBonus = 0

    

    await player.save()

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🔄 تم إعادة تعيين البرج

🏰 الطابق الحالي: 1

📉 تم حذف جميع مكافآت البرج:
⚔️ الهجوم
🛡️ الدفاع
❤️ الصحة
⚡ السرعة

👑 تم الاحتفاظ باللقب:
${player.title || 'لا يوجد'}

يمكنك بدء البرج من جديد.`
        }
    )
    }

        if (text.startsWith('.شراءصندوق ')) {

let player = await Player.findOne({ userId })

if (!player) {
    return sock.sendMessage(msg.key.remoteJid, {
        text: '❌ لم يتم العثور على حسابك'
    })
}

if (!player.boxes) {
    player.boxes = {}
}

if (!player.towerTickets) {
    player.towerTickets = 0
}

const args = text.split(' ')
const item = args[1]?.toLowerCase()

if (!item) {
    return sock.sendMessage(msg.key.remoteJid, {
        text: '❌ اكتب اسم الصندوق'
    })
}

const prices = {
    basic: 5,
    rare: 10,
    epic: 20,
    legendary: 35,
    ssschance: 60,
    ssshigh: 100
}

const names = {
    basic: '📦 Basic',
    rare: '📦 Rare',
    epic: '📦 Epic',
    legendary: '📦 Legendary',
    ssschance: '📦 SSS Chance',
    ssshigh: '📦 SSS High'
}

if (!prices[item]) {
    return sock.sendMessage(msg.key.remoteJid, {
        text:
`❌ الصندوق غير موجود

📦 basic
📦 rare
📦 epic
📦 legendary
📦 ssschance
📦 ssshigh`
})
}

if (player.towerTickets < prices[item]) {
    return sock.sendMessage(msg.key.remoteJid, {
        text:

`❌ ليس لديك تذاكر متجر كافية

🎫 المطلوب: ${prices[item]}
🎫 لديك: ${player.towerTickets}`
})
}

player.towerTickets -= prices[item]

player.boxes[item] =
    (player.boxes[item] || 0) + 1

await player.save()

return sock.sendMessage(msg.key.remoteJid, {
    text:

`✅ تم شراء الصندوق بنجاح

${names[item]}

🎫 السعر: ${prices[item]} تذكرة متجر
🎫 المتبقي: ${player.towerTickets}

📦 عدد هذا الصندوق:
${player.boxes[item]}`
})
}

        if (text === '.صناديقي') {

    let player = await Player.findOne({ userId })

    if (!player) {
        player = await Player.create({ userId })
    }

    if (!player.boxes) {
        player.boxes = {
            basic: 0,
            rare: 0,
            epic: 0,
            legendary: 0,
            sss_chance: 0,
            sss_high: 0
        }
    }

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`🎁 ════〔 صناديقك 〕════

📦 Basic: ${player.boxes.basic || 0}

📦 Rare: ${player.boxes.rare || 0}

📦 Epic: ${player.boxes.epic || 0}

📦 Legendary: ${player.boxes.legendary || 0}

📦 SSS Chance: ${player.boxes.sss_chance || 0}

📦 SSS High: ${player.boxes.sss_high || 0}`
        }
    )
        }

        if (text === '.بوس') {

    if (!currentBoss) {
        return sock.sendMessage(msg.key.remoteJid, {
            text: '⏳ لا يوجد زعيم حالياً'
        })
    }

    return sock.sendMessage(msg.key.remoteJid, {
        text: `🔥 الزعيم الحالي:

👑 ${currentBoss.name}

💀 استخدم .زعيم لمواجهته`
    })
}
        
if (text === '.جوائز') {

return safeSend(msg.key.remoteJid, {
    text:

`🏆 جوائز الزعيم العالمي 🏆

🥇 المركز الأول

💰 10000 مال
⭐ 1000 XP
👑 شخصية أسطورية عشوائية

━━━━━━━━━━━━━━━━━━

🥈 المركز الثاني

💰 5000 مال
⭐ 500 XP

🎲 30% شخصية أسطورية
🎲 50% شخصية ممتازة

━━━━━━━━━━━━━━━━━━

🥉 المركز الثالث

💰 2500 مال
⭐ 500 XP
✨ شخصية ممتازة عشوائية

━━━━━━━━━━━━━━━━━━

⚔️ يتم تحديد الفائزين حسب
إجمالي الضرر المسبب للزعيم

📊 استخدم .زعيم لمعرفة الزعيم الحالي`
})

}
        
        if (text === '.هجوم') {

if (!currentBoss) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ لا يوجد زعيم حالياً'
    })
}

if (currentBoss.hp <= 0) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ تم هزيمة الزعيم بالفعل'
    })
}

const me = await Player.findOne({ userId })

if (!me) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ لا تملك حساباً، أنشئ حساب أولاً'
    })
}


if (!me || !me.characters.length) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ لا تملك شخصيات'
    })
}
            // =========================
// BOSS HP SYSTEM
// =========================

if (me.bossDead) {

    const respawn = me.bossRespawn
        ? new Date(me.bossRespawn).getTime()
        : 0

    if (Date.now() >= respawn) {

        me.bossDead = false
        me.bossHp = Math.floor(me.bossMaxHp / 2)
        me.bossRespawn = null

        await me.save()

    } else {

        const left = Math.ceil((respawn - Date.now()) / 60000)

        return safeSend(msg.key.remoteJid, {
            text: `💀 أنت ميت\n\n⏳ العودة بعد ${left} دقيقة`
        })
    }
}

const bossNow = Date.now()

if (
    me.lastBossAttack &&
    bossNow - me.lastBossAttack < 30000
) {

    const left = Math.ceil(
        (30000 - (bossNow - me.lastBossAttack))
        / 1000
    )

    return safeSend(
        msg.key.remoteJid,
        {
            text: `⏳ انتظر ${left} ثانية قبل الهجوم مرة أخرى`
        }
    )
}

me.lastBossAttack = bossNow
            

await Player.updateOne(
    { _id: me._id },
    {
        $set: {
            lastBossAttack: bossNow
        }
    }
)
            console.log(
    "Cooldown saved:",
    bossNow
)

const strongest = me.characters.sort(
    (a, b) => b.power - a.power
)[0]

let damage = strongest.power

if (
    strongest.rarity === 'UR' &&
    strongest.urAbility
) {

    const ability =
        strongest.urAbility

    // ضرر إضافي
    if (
        ability.type === 'bossDamage'
    ) {

        damage = Math.floor(
            damage *
            (1 + ability.value / 100)
        )
    }

    if (
        ability.type === 'attack'
    ) {

        damage = Math.floor(
            damage *
            (1 + ability.value / 100)
        )
    }

    // ضربة حرجة
    if (
        ability.type === 'critRate'
    ) {

        if (
            Math.random() * 100 <=
            ability.value
        ) {

            damage *= 2
        }
    }

    // ضرر حرج إضافي
    if (
        ability.type === 'critDamage'
    ) {

        if (
            Math.random() * 100 <= 20
        ) {

            damage = Math.floor(
                damage *
                (
                    1 +
                    ability.value / 100
                )
            )
        }
    }

    // امتصاص حياة
    if (
        ability.type === 'lifesteal'
    ) {

        const heal =
            Math.floor(
                damage *
                ability.value / 100
            )

        me.hp = Math.min(
            me.maxHp || 10000,
            (me.hp || 10000) + heal
        )
    }

    // مراوغة
    if (
        ability.type === 'dodge'
    ) {

        me.urDodge =
            ability.value
    }

    // عكس ضرر
    if (
        ability.type === 'reflect'
    ) {

        me.urReflect =
            ability.value
    }

    // درع
    if (
        ability.type === 'shield'
    ) {

        me.urShield =
            ability.value
    }
}

// بونص الهجوم
damage = Math.floor(
    damage * (1 + (me.attackBonus || 0) / 100)
)

// بونص ضرر الزعيم
damage = Math.floor(
    damage * (1 + (me.bossDamageBonus || 0) / 100)
)

const critChance = 15 + (me.critBonus || 0)

const roll = Math.random() * 100

let abilityText = ""

if (roll <= critChance) {

    damage *= 2

    abilityText = `
🔥 قدرة مفعلة

⚡ ضربة حرجة

📖 ضاعف الضرر ×2`

} else if (roll <= 25) {

    damage = Math.floor(damage * 1.5)

    abilityText = `
👑 قدرة مفعلة

⚡ هاكي الملك

📖 زاد الضرر 50%`

} else if (roll <= 33) {

    damage += 1000

    abilityText = `
✨ قدرة مفعلة

⚡ استيقاظ

📖 زاد الضرر 1000`

} else if (roll <= 45) {

    damage *= 2

    abilityText = `
⚡ قدرة مفعلة

⚡ سرعة خارقة

📖 حصلت على هجمة إضافية`
}

const abilityRoll = Math.random() * 100

// شارينغان
if (
    me.specialAbilities?.includes("👁️ شارينغان") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage *= 2

    abilityText += `

👁️ شارينغان

💥 ضربة حرجة ×2`
}

// عين الصقر
if (
    me.specialAbilities?.includes("⚔️ عين الصقر") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.2)

    abilityText += `

⚔️ عين الصقر

🎯 +20% ضرر`
}

// سوسانو
if (
    me.specialAbilities?.includes("💀 سوسانو") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.1)

    abilityText += `

💀 سوسانو

⚔️ +10% ضرر`
}

// تنين الأساطير
if (
    me.specialAbilities?.includes("🐉 تنين الأساطير") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.1)

    abilityText += `

🐉 تنين الأساطير

👑 ضرر إضافي ضد الزعيم`
}

// قوة الكواكب
if (
    me.specialAbilities?.includes("☄️ قوة الكواكب") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.15)

    abilityText += `

☄️ قوة الكواكب

🌠 +15% ضرر`
}

// سيد المعارك
if (
    me.specialAbilities?.includes("⚔️ سيد المعارك") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.25)

    abilityText += `

⚔️ سيد المعارك

💥 +25% ضرر`
}

// قوة الشياطين
if (
    me.specialAbilities?.includes("👹 قوة الشياطين") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.2)

    abilityText += `

👹 قوة الشياطين

🔥 +20% ضرر`
}

// الحاكم المطلق
if (
    me.specialAbilities?.includes("🌟 الحاكم المطلق") &&
    abilityRoll <= ABILITY_CHANCE
) {
    damage = Math.floor(damage * 1.5)

    abilityText += `

🌟 الحاكم المطلق

⚡ +50% ضرر`
}

            currentBoss.turnCounter =
    (currentBoss.turnCounter || 0) + 1

if (
    currentBoss.turnCounter % 4 === 0 &&
    Math.random() <= 0.60
) {
    if (
    !currentBoss.abilities ||
    !currentBoss.abilities.length
) {
    return
    }

    const ability =
        currentBoss.abilities[
            Math.floor(
                Math.random() *
                currentBoss.abilities.length
            )
        ]

    await safeSend(
        msg.key.remoteJid,
        {
            text: `👑 ${currentBoss.name}

✨ فعل القدرة الخاصة

⚡ ${ability.name}

📖 ${ability.description}`
        }
    )

    if (ability.effect === "heal") {
        currentBoss.hp += 5000
    }

    if (ability.effect === "bigHeal") {
        currentBoss.hp += 10000
    }

    if (
        currentBoss.hp >
        currentBoss.maxHp
    ) {
        currentBoss.hp =
            currentBoss.maxHp
    }

    if (ability.effect === "halfDamage") {
        damage =
            Math.floor(damage / 2)
    }

    if (ability.effect === "dodge") {
        damage = 0
    }

    if (ability.effect === "reduceDamage") {
        damage =
            Math.floor(damage * 0.7)
    }
if (ability.effect === "megaAttack") {

    const extraDamage = 5000

    me.bossHp = Math.max(
        0,
        (me.bossHp || me.bossMaxHp) -
        extraDamage
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `💀 ضربة الإبادة

👑 ${currentBoss.name}

💥 ألحق بك ${extraDamage} ضرر إضافي!`
        }
    )
}

if (ability.effect === "lifesteal") {

    const healAmount = 8000

    currentBoss.hp = Math.min(
        currentBoss.maxHp,
        currentBoss.hp + healAmount
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🩸 امتصاص الحياة

👑 ${currentBoss.name}

❤️ استعاد ${healAmount} HP`
        }
    )
}

if (ability.effect === "summon") {

    if (
        !currentBoss.activeFollowers ||
        currentBoss.activeFollowers.length === 0
    ) {

        currentBoss.activeFollowers =
            JSON.parse(
                JSON.stringify(
                    currentBoss.followers || []
                )
            )

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `👥 استدعاء الأتباع

👑 ${currentBoss.name}

⚔️ استدعى جميع أتباعه إلى المعركة!`
            }
        )
    }
}


if (ability.effect === "storm") {

    const stormDamage = 3000

    me.bossHp = Math.max(
        0,
        (me.bossHp || me.bossMaxHp) -
        stormDamage
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🌪️ عاصفة الدمار

👑 ${currentBoss.name}

💥 أصابتك العاصفة

❤️ -${stormDamage} HP`
        }
    )
}

if (ability.effect === "curse") {

    damage =
        Math.floor(damage * 0.5)

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `☠️ اللعنة المظلمة

👑 ${currentBoss.name}

📉 تم تخفيض ضررك 50%`
        }
    )
}

if (ability.effect === "reflect") {

    const reflected =
        Math.floor(damage * 0.30)

    me.bossHp = Math.max(
        0,
        (me.bossHp || me.bossMaxHp) -
        reflected
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🪞 انعكاس الضرر

👑 ${currentBoss.name}

💥 ارتد إليك ${reflected} ضرر`
        }
    )
}

if (ability.effect === "burn") {

    const burnDamage = 2000

    me.bossHp = Math.max(
        0,
        (me.bossHp || me.bossMaxHp) -
        burnDamage
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🔥 لهيب الجحيم

👑 ${currentBoss.name}

❤️ -${burnDamage} HP`
        }
    )
}

if (ability.effect === "lightning") {

    const lightningDamage = 4000

    me.bossHp = Math.max(
        0,
        (me.bossHp || me.bossMaxHp) -
        lightningDamage
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `⚡ صاعقة الدمار

👑 ${currentBoss.name}

💥 أصابتك صاعقة مدمرة

❤️ -${lightningDamage} HP`
        }
    )
}

if (ability.effect === "freeze") {

    damage =
        Math.floor(damage * 0.75)

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `❄️ تجميد الزمن

👑 ${currentBoss.name}

📉 تم تخفيض ضررك 25%`
        }
    )
}

if (ability.effect === "rage") {

    currentBoss.attack =
        Math.floor(
            (currentBoss.attack || 3000) * 1.25
        )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `😡 غضب الإمبراطور

👑 ${currentBoss.name}

⚔️ زادت قوة هجومه 25%`
        }
    )
}

if (ability.effect === "doubleAttack") {

    damage =
        Math.floor(damage * 0.5)

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `👁️ عين الخراب

👑 ${currentBoss.name}

🛡️ خفضت ضررك 50%`
        }
    )
}

if (ability.effect === "worldEclipse") {

    damage =
        Math.floor(damage * 0.6)

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🌑 كسوف العالم

👑 ${currentBoss.name}

📉 انخفض الضرر 40%`
        }
    )
}

if (ability.effect === "demonPower") {

    currentBoss.attack =
        Math.floor(
            (currentBoss.attack || 3000) * 1.5
        )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `👹 قوة الشياطين

👑 ${currentBoss.name}

🔥 زادت قوة هجومه 50%`
        }
    )
}

if (ability.effect === "volcano") {

    const volcanoDamage = 6000

    me.bossHp = Math.max(
        0,
        (me.bossHp || me.bossMaxHp) -
        volcanoDamage
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🌋 ثوران الجحيم

👑 ${currentBoss.name}

💥 انفجار مدمر

❤️ -${volcanoDamage} HP`
        }
    )
}

if (ability.effect === "dimensionCollapse") {

    const collapseDamage = 10000

    me.bossHp = Math.max(
        0,
        (me.bossHp || me.bossMaxHp) -
        collapseDamage
    )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🌌 انهيار الأبعاد

👑 ${currentBoss.name}

☠️ قدرة أسطورية أصابتك

❤️ -${collapseDamage} HP`
        }
    )
}
    
}

if (!currentBoss || typeof currentBoss.hp !== 'number') {
    return safeSend(msg.key.remoteJid, {
        text: '❌ خطأ في بيانات الزعيم'
    })
}

if (!damage || isNaN(damage)) {
    damage = 0
}

const xpGain = Math.max(
    10,
    Math.floor(damage / 100)
)

me.xp = (me.xp || 0) + xpGain

if (
    currentBoss.activeFollowers &&
    currentBoss.activeFollowers.length > 0
) {

    const follower =
        currentBoss.activeFollowers[0]
    
if (
    follower.ability === "dodge" &&
    Math.random() <= 0.20
) {

    damage = 0

    abilityText += `

🌀 ${follower.name}

💨 تفادى الهجمة بالكامل`
}
    if (
    follower.ability === "healBoss" &&
    Math.random() <= 0.20
) {

    currentBoss.hp =
        Math.min(
            currentBoss.maxHp,
            currentBoss.hp + 3000
        )

    abilityText += `

❤️ ${follower.name}

✨ عالج الزعيم

+3000 HP`
}
if (
    follower.ability === "reflect" &&
    Math.random() <= 0.20
) {

    const reflectDamage =
        Math.floor(damage * 0.30)

    me.bossHp =
        Math.max(
            0,
            (me.bossHp || me.bossMaxHp) -
            reflectDamage
        )

    abilityText += `

⚫ ${follower.name}

💥 عكس الضرر

❤️ -${reflectDamage} HP`
}
    if (
    follower.ability === "bonusDamage" &&
    Math.random() <= 0.20
) {

    const bonusDamage = 1500

    me.bossHp =
        Math.max(
            0,
            (me.bossHp || me.bossMaxHp) -
            bonusDamage
        )

    abilityText += `

⚔️ ${follower.name}

💥 هجوم إضافي

❤️ -${bonusDamage} HP`
}
    
    if (
    follower.ability === "critical" &&
    Math.random() <= 0.20
) {

    const criticalDamage = 3000

    me.bossHp =
        Math.max(
            0,
            (me.bossHp || me.bossMaxHp) -
            criticalDamage
        )

    abilityText += `

🎯 ${follower.name}

💥 ضربة حرجة

❤️ -${criticalDamage} HP`
}
    follower.hp -= damage

    if (follower.hp <= 0) {

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                image: {
                    url: follower.image
                },
                caption: `💀 تم القضاء على التابع

⚔️ ${follower.name}

🎉 أصبح الطريق إلى الزعيم أقرب!`
            }
        )
const dropRoll =
    Math.random() * 100

if (dropRoll <= 20) {

    me.money =
        (me.money || 0) + 1000

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `💰 ${follower.name}

🎁 أسقط 1000 مال`
        }
    )
}

else if (dropRoll <= 35) {

    me.xp =
        (me.xp || 0) + 500

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `⭐ ${follower.name}

🎁 أسقط 500 XP`
        }
    )
}
        await me.save()
        currentBoss.activeFollowers.shift()

        if (
            currentBoss.activeFollowers.length === 0
        ) {

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: `✅ تم القضاء على جميع الأتباع

👑 يمكنكم مهاجمة الزعيم مباشرة الآن!`
                }
            )
        }
    }

    await me.save()

    return safeSend(
        msg.key.remoteJid,
        {
            text: `⚔️ هجوم على تابع

👥 التابع:
${follower.name}

💥 الضرر:
${damage}

❤️ المتبقي:
${Math.max(0, follower.hp)}`
        }
    )
}
            
            currentBoss.hp = Math.max(
    0,
    (currentBoss.hp || 0) - damage
)

await Boss.updateOne(
    {},
    {
        $set: {
            hp: currentBoss.hp,
            attack: currentBoss.attack,
            enraged: currentBoss.enraged,
            activeFollowers: currentBoss.activeFollowers,
            groupAttackCount: currentBoss.groupAttackCount,
            killer: currentBoss.killer,
            finished: currentBoss.finished
        }
    }
)

if (
    !currentBoss.enraged &&
    currentBoss.hp <= currentBoss.maxHp / 2
) {

    currentBoss.enraged = true

    currentBoss.attack =
        Math.floor(
            (currentBoss.attack || 3000) * 1.5
        )

    currentBoss.activeFollowers =
        JSON.parse(
            JSON.stringify(
                currentBoss.followers || []
            )
        )

    await Boss.updateOne(
    {},
    {
        $set: {
            hp: currentBoss.hp,
            attack: currentBoss.attack,
            enraged: currentBoss.enraged,
            activeFollowers: currentBoss.activeFollowers
        }
    }
)

await sock.sendMessage(
    msg.key.remoteJid,
    {
        image: {
            url: currentBoss.image
        },

        caption: `😡 ${currentBoss.name}

دخل حالة الغضب!

👥 استدعى أتباعه:

${currentBoss.activeFollowers
.map(f => `⚔️ ${f.name}`)
.join('\n')}

🔥 الضرر زاد 50%

⚔️ احذروا... الزعيم أصبح أخطر!`
    }
)
}

if ((me.lifestealBonus || 0) > 0) {

    const heal = Math.floor(
        damage * (me.lifestealBonus || 0) / 100
    )

    me.hp = Math.min(me.maxHp || 10000, me.hp + heal)

    abilityText += `

🩸 امتصاص الحياة

❤️ استعدت ${heal} HP`
}

if (currentBoss.hp <= 0) {

    currentBoss.hp = 0

    if (!currentBoss.killer) {
        currentBoss.killer = userId
    }
}

await Boss.updateOne(
    {},
    {
        $set: {
            hp: currentBoss.hp,
            finished: currentBoss.finished,
            killer: currentBoss.killer
        }
    }
)
me.bossDamage =
    (me.bossDamage || 0) + damage

me.totalBossDamage =
    (me.totalBossDamage || 0) + damage

me.bossHits =
    (me.bossHits || 0) + 1
            
            currentBoss.groupAttackCount =
    (currentBoss.groupAttackCount || 0) + 1
            if (currentBoss.groupAttackCount >= 15) {

    currentBoss.groupAttackCount = 0

    const players =
    await Player.find({
        bossDead: { $ne: true },
        bossHits: { $gt: 0 }
    })

    const raidDamage =
        Math.floor(
            (currentBoss.attack || 3000) * 1.5
        )

    for (const p of players) {

    const newHp =
        Math.max(
            0,
            (p.bossHp || p.bossMaxHp) - raidDamage
        )

    await Player.updateOne(
        { _id: p._id },
        {
            $set: {
                bossHp: newHp,
                bossDead: newHp <= 0,
                bossRespawn:
                    newHp <= 0
                    ? new Date(Date.now() + 10 * 60 * 1000)
                    : p.bossRespawn
            }
        }
    )
}
const mentions =
    players.map(p => p.userId)

const mentionText =
    players
        .map(
            p => `@${p.userId.split('@')[0]}`
        )
        .join('\n')
        

    await sock.sendMessage(
    msg.key.remoteJid,
    {
        image: {
            url: currentBoss.image
        },

        caption: `🌋 ${currentBoss.name}

💥 أطلق ضربة جماعية

⚔️ أصاب ${players.length} مقاتل

❤️ الضرر: ${raidDamage}

🎯 المستهدفون:
${mentionText}`,

        mentions
    }
)
            
            if (Math.random() <= 0.85) {

    const bossDamage =
        currentBoss.attack || 3000

                // درع UR
if (me.urShield) {

    bossDamage =
        Math.floor(
            bossDamage *
            (
                1 -
                me.urShield / 100
            )
        )
}

// مراوغة UR
if (
    me.urDodge &&
    Math.random() * 100 <=
    me.urDodge
) {

    bossDamage = 0
}

    me.bossHp =
        Math.max(
            0,
            (me.bossHp || me.bossMaxHp) -
            bossDamage
        )

                // عكس ضرر UR
if (
    me.urReflect &&
    bossDamage > 0
) {

    const reflected =
        Math.floor(
            bossDamage *
            me.urReflect / 100
        )

    currentBoss.hp =
        Math.max(
            0,
            currentBoss.hp -
            reflected
        )
}

    if (me.bossHp <= 0) {

    me.bossHp = 0
    me.bossDead = true

    me.bossRespawn =
        new Date(
            Date.now() + 10 * 60 * 1000
        )

    await sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: currentBoss.image
            },

            caption: `💀 ${currentBoss.name} قضى عليك

⏳ ستعود بعد 10 دقائق

❤️ ستعود بنصف HP`
        }
    )

} else {

    const attacks = [
        "🔥 انفجار الجحيم",
        "⚡ صاعقة الدمار",
        "💀 قبضة الموت",
        "🌪️ الإعصار الأسود"
    ]

    const attackName =
    attacks[Math.floor(Math.random() * attacks.length)]

console.log("userId =", userId)

await sock.sendMessage(
    msg.key.remoteJid,
    {
        image: {
            url: currentBoss.image
        },
        caption: `👑 ${currentBoss.name}

${attackName}

🎯 استهدف:
@${userId.split('@')[0]}

💥 الضرر:
${bossDamage}

❤️ HP:
${me.bossHp}/${me.bossMaxHp}`,
        mentions: [userId]
    }
)

await me.save()

} // نهاية else

} // نهاية if (Math.random() <= 0.35)

} // نهاية if (currentBoss.groupAttackCount >= 15)

await me.save()

if (!currentBoss) {

    console.log("No current boss")

    return
}

console.log(
    "Boss HP:",
    currentBoss.hp,
    "Finished:",
    currentBoss.finished
)

// =========================
// 🧨 نهاية الزعيم
// =========================

if (currentBoss.hp <= 0) {

    if (currentBoss.finished) return

    currentBoss.finished = true

    console.log("BOSS DEAD")
    console.log("Starting reward distribution")

    try {
        await distributeBossRewards(
            sock,
            msg.key.remoteJid
        )

        currentBoss.hp = 0
currentBoss.finished = true

const nextHour =
    new Date()

nextHour.setMinutes(0)
nextHour.setSeconds(0)
nextHour.setMilliseconds(0)

nextHour.setHours(
    nextHour.getHours() + 1
)

currentBoss.respawnAt =
    nextHour.getTime()

console.log(
    'RESPAWN SET:',
    currentBoss.respawnAt
)

await Boss.updateOne(
    {},
    {
        $set: {
            hp: 0,
            finished: true,
            respawnAt: currentBoss.respawnAt
        }
    }
)

console.log(
    'RESPAWN AT:',
    new Date(currentBoss.respawnAt)
)

const savedBoss =
    await Boss.findOne()

console.log(
    'DB RESPAWN:',
    savedBoss?.respawnAt
)

currentBoss.finished = true

        return safeSend(msg.key.remoteJid, {
            text: `👑 تم هزيمة الزعيم!`
        })

    } catch (e) {

        console.log("Boss reward error:", e)

        currentBoss = null

        return safeSend(msg.key.remoteJid, {
            text: "❌ حدث خطأ أثناء توزيع الجوائز"
        })
    }
}
        
        const attackCaption = `⚔️ هجوم على الزعيم

🧿 الشخصية:
${strongest.name}

💥 الضرر:
${damage}

⭐ الخبرة المكتسبة:
${xpGain}

${abilityText}

━━━━━━━━━━━━━━━━━━

👑 الزعيم:
${currentBoss.name}

❤️ المتبقي:
${currentBoss.hp}/${currentBoss.maxHp}`

if (strongest.rarity === 'SSS') {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: strongest.image
            },

            caption: attackCaption
        }
    )
}

if (
    strongest.image.startsWith("http://") ||
    strongest.image.startsWith("https://")
) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            image: {
                url: strongest.image
            },
            caption: attackCaption
        }
    )
}

const imagePath =
    path.join(__dirname, strongest.image)

if (!fs.existsSync(imagePath)) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `❌ صورة الشخصية غير موجودة:

${strongest.name}`
        }
    )
}

return sock.sendMessage(
    msg.key.remoteJid,
    {
        image: fs.readFileSync(imagePath),
        caption: attackCaption
    }
)
        }
        
        if (text === '.زعيم') {

if (!currentBoss) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ لا يوجد زعيم عالمي حالياً'
    })
}

return sock.sendMessage(
    msg.key.remoteJid,
    {
        image: {
            url: currentBoss.image
        },

        caption: `👑 الزعيم العالمي

🧿 الاسم:
${currentBoss.name}

❤️ الصحة:
${currentBoss.hp}/${currentBoss.maxHp}

${currentBoss.activeFollowers?.length
? `

👥 الأتباع الأحياء:

${currentBoss.activeFollowers
.map(f =>
`⚔️ ${f.name}
❤️ ${f.hp} HP`
)
.join('\n\n')}`
: '\n✅ لا يوجد أتباع أحياء'}

━━━━━━━━━━━━━━━━━━

✨ القدرة الخاصة:
${currentBoss.ability.name}

📖 الوصف:
${currentBoss.ability.description}


━━━━━━━━━━━━━━━━━━

⚔️ استخدم .هجوم لمهاجمة الزعيم

🏆 الجوائز:

🥇 الأول:
10000 مال
1000 XP
شخصية أسطورية

🥈 الثاني:
5000 مال
500 XP
30% أسطوري
50% ممتاز

🥉 الثالث وما بعده:
2500 مال
500 XP
شخصية ممتازة`
    }
)
        }
        // =========================
        // .اسحب
        // =========================

        if (text === '.اسحب') {

console.log('بدأ السحب')

let player = await Player.findOne({ userId })

console.log('تم جلب اللاعب')

console.log('نوع الشخصيات:', typeof characters)
console.log('عدد الشخصيات:', characters?.length)

if (!player) {

    player = new Player({
        userId,
        pulls: 5,
        lastReset: Date.now(),
        characters: [],
        hp: 10000,
        crit: 5,
        dodge: 3,
        xp: 0,
        level: 1,
        money: 0
    })
}

if (
    player.characters.length >=
    (player.maxCharacters || 30)
) {
    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`❌ المخزون ممتلئ

📦 السعة:
${player.maxCharacters || 30}`
        }
    )
}

const cooldown = 30 * 60 * 1000

const currentPeriod =
    Math.floor(Date.now() / cooldown)

if (player.lastReset !== currentPeriod) {

    player.pulls = 5
    player.lastReset = currentPeriod

    await player.save()
}

if (player.pulls <= 0) {

    const remaining =
        cooldown - (Date.now() % cooldown)

    const minutes =
        Math.floor(
            remaining / (1000 * 60)
        )

    const seconds =
        Math.floor(
            (remaining % (1000 * 60)) / 1000
        )

    return sock.sendMessage(msg.key.remoteJid, {
        text:

`⏳ انتهت السحبات

🕒 الوقت المتبقي:

${minutes} دقيقة
${seconds} ثانية

🎁 تتجدد السحبات تلقائياً كل 30 دقيقة`
})
}

let luckBonus = 0

if ((player.level || 1) >= 10) {
    luckBonus = 3
}

let chance = Math.random() * 100

chance -= luckBonus

let rarity = 'عادي'

if (chance <= 5) {
    rarity = 'SSS'
} else if (chance <= 15) {
    rarity = 'اسطوري'
} else if (chance <= 40) {
    rarity = 'ممتاز'
}

const filteredCharacters =
    characters.filter(
        c => c.rarity === rarity
    )

if (!filteredCharacters.length) {

    return sock.sendMessage(
        msg.key.remoteJid,
        {
            text:
`❌ لا توجد شخصيات بهذا التصنيف: ${rarity}`
        }
    )
}

const randomCharacter =
    filteredCharacters[
        Math.floor(
            Math.random() *
            filteredCharacters.length
        )
    ]


// غير مكرر أو ليس SSS
player.characters.push({
    ...randomCharacter,
    originalPower:
        randomCharacter.power,
    evolutionLevel: 0,
    urAbilities: []
})

player.pulls -= 1

await player.save()

let imagePath = null

if (randomCharacter.rarity !== 'SSS') {
    imagePath = path.join(
        __dirname,
        randomCharacter.image
    )
}

if (randomCharacter.rarity === 'SSS') {

    return sock.sendMessage(msg.key.remoteJid, {
        image: {
            url: randomCharacter.image
        },
        caption:
`🌌 ═══════〔 إيقاظ أسطوري 〕═══════ 🌌

⚡ اهتزت الأبعاد!
🔥 طاقة هائلة تم اكتشافها!

━━━━━━━━━━━━━━

👑 ${randomCharacter.name}

🌟 التصنيف : SSS
⚔️ القوة : ${randomCharacter.power}

━━━━━━━━━━━━━━

🎊 مبارك!

لقد حصلت على إحدى أندر الشخصيات في اللعبة

🌌 الأنمي : ${randomCharacter.anime}

🏆 هذه الشخصية تمتلك قوة تتجاوز حدود الأساطير`
    })
}

if (!fs.existsSync(imagePath)) {

    return sock.sendMessage(msg.key.remoteJid, {
        text:

`❌ الصورة غير موجودة

الاسم: ${randomCharacter.name}
المسار: ${randomCharacter.image}`
})
}

return sock.sendMessage(msg.key.remoteJid, {
    image: fs.readFileSync(imagePath),

    caption:

`╭━━〔 ✦ 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑 𝐑𝐄𝐒𝐔𝐋𝐓 ✦ 〕━━╮

🧿 𝑵𝒂𝒎𝒆 ➤ ${randomCharacter.name}
🌟 𝑹𝒂𝒓𝒊𝒕𝒚 ➤ ${randomCharacter.rarity}
⚔️ 𝑷𝒐𝒘𝒆𝒓 ➤ ${randomCharacter.power}
🌌 𝑨𝒏𝒊𝒎𝒆 ➤ ${randomCharacter.anime}

🎟️ السحبات المتبقية ➤ ${player.pulls}/5

╰━━━━━━━━━━━━━━━━━━━━━━╯`
})
}

        // =========================
        // .شخصياتي
        // =========================

if (text === '.شخصياتي') {

    try {

        let player =
            await Player.findOne({
                userId
            })

        if (!player) {

            player =
                await Player.create({
                    userId,
                    characters: []
                })
        }

        if (
            !player.characters ||
            player.characters.length === 0
        ) {

            return safeSend(
                msg.key.remoteJid,
                {
                    text:
                    '📭 لا توجد شخصيات لديك'
                }
            )
        }

        const evolutionRanks = [
            "SSS",
            "SSS+",
            "SSS++",
            "UR I",
            "UR II",
            "UR III",
            "EX"
        ]

        let txt =
`👤 ━━〔 شخصياتك 〕━━ 👤

`

player.characters.forEach((c, i) => {

    const rank =
        c.evolutionLevel > 0
            ? [
                "SSS",
                "SSS+",
                "SSS++",
                "UR I",
                "UR II",
                "UR III",
                "EX"
            ][c.evolutionLevel]
            : c.rarity

    txt +=
`〔${i + 1}〕 ${c.name}
⚔️ ${c.power} │ 🌟 ${rank}

━━━━━━━━━━━━━━━

`
})

txt +=
`📦 إجمالي الشخصيات: ${player.characters.length}/${player.maxCharacters}`

        return safeSend(
            msg.key.remoteJid,
            {
                text: txt
            }
        )

    } catch (err) {

        console.log(
            'my characters error:',
            err
        )

        return safeSend(
            msg.key.remoteJid,
            {
                text:
                '❌ حدث خطأ في عرض الشخصيات'
            }
        )
    }
}


                    

        
// =========================
// .رصيدي
// =========================

if (text === '.رصيدي') {

    try {

        let player = await Player.findOne({ userId })

        if (!player) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك حساباً'
            })
        }

        return safeSend(msg.key.remoteJid, {
            text:

`╔════════════════════╗
💰 𝐏𝐑𝐎𝐅𝐈𝐋𝐄
╚════════════════════╝

💳 الرصيد:

${player.money || 0}

🎟️ السحبات:

${player.pulls || 0}

🎫 تذاكر المتجر:

${player.towerTickets || 0}

🥚 تذاكر البيض:

${player.eggTickets || 0}

📦 البيوض:

${player.beastEggs || 0}

━━━━━━━━━━━━━━━━━━

🎖️ المستوى:

${player.level || 1}

⚔️ القتالات المتبقية:

${player.fights || 0}/5

╔════════════════════╗
🌟 𝐏𝐋𝐀𝐘𝐄𝐑 𝐈𝐍𝐅𝐎
╚════════════════════╝`
        })

    } catch (err) {

        console.log('Balance error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء جلب بياناتك'
        })
    }

}
        
// =========================
// .عرض
// =========================

if (text.startsWith('.عرض')) {

try {

    const args = text.split(' ')
    const number = Number(args[1]) - 1

    if (isNaN(number)) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ استخدم: .عرض رقم_الشخصية'
        })
    }

    let player = await Player.findOne({ userId })

    if (!player || !player.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا تملك شخصيات'
        })
    }

    const character = player.characters[number]

    if (!character) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ رقم الشخصية غير موجود'
        })
    }

    const captionSSS = `╔═══════════════════════╗
║ 👑 𝗦𝗦𝗦 • 𝗠𝗬𝗧𝗛𝗜𝗖 👑
╚═══════════════════════╝

⚜️ الاسم
➤ ${character.name}

🔥 الهيئة
➤ ${character.form || 'غير معروفة'}

💠 الندرة
➤ ${character.rarity}

⚔️ القوة
➤ ${character.power}

🌌 الأنمي
➤ ${character.anime}

✨ القدرة
➤ ${character.ability || 'لا توجد'}

━━━━━━━━━━━━━━━
🏆 شخصية أسطورية نادرة
━━━━━━━━━━━━━━━`

    const captionNormal = `╔════════════════════╗
🖼️ 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑
╚════════════════════╝

🧿 الاسم:
${character.name}

🌟 الندرة:
${character.rarity}

⚔️ القوة:
${character.power}

🌌 الأنمي:
${character.anime}

✨ القدرة:
${character.ability || 'لا توجد'}`

    // شخصيات SSS من رابط خارجي
    if (character.rarity === 'SSS') {

        return sock.sendMessage(msg.key.remoteJid, {
            image: {
                url: character.image
            },
            caption: captionSSS
        })

    }

    // الشخصيات العادية من ملفات البوت
    const imagePath = path.join(__dirname, character.image)

    if (!fs.existsSync(imagePath)) {
        return safeSend(msg.key.remoteJid, {
            text: `❌ صورة الشخصية غير موجودة

الاسم: ${character.name}
المسار: ${character.image}`
        })
    }

    return sock.sendMessage(msg.key.remoteJid, {
        image: fs.readFileSync(imagePath),
        caption: captionNormal
    })

} catch (err) {

    console.log('Show Character Error:', err)

    return safeSend(msg.key.remoteJid, {
        text: '❌ حدث خطأ أثناء عرض الشخصية'
    })
}

}
        
 // =========================
// .شراءمتجر
// =========================

if (text.startsWith('.شراءمتجر')) {

    try {

        const args = text.split(' ')
        const itemNumber = Number(args[1]) - 1

        const shop = await Shop.find()

        const item = shop[itemNumber]

        if (!item) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ العرض غير موجود'
            })
        }

        let player = await Player.findOne({ userId })

        if (!player) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك حساباً'
            })
        }

        player.money = player.money || 0
        player.characters = player.characters || []

        if (player.money < item.price) {

            return safeSend(msg.key.remoteJid, {
                text:
`❌ لا تملك مالاً كافياً

💰 المطلوب: ${item.price}
💳 رصيدك: ${player.money}`
            })
        }

      if (
    player.characters.length >=
    (player.maxCharacters || 30)
) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ وصلت للحد الأقصى (30 شخصية)'
            })
        }

        player.money -= item.price

        player.characters.push(item.character)

        await player.save()

        await Shop.findByIdAndDelete(item._id)

        return safeSend(msg.key.remoteJid, {
            text:

`╔════════════════════╗
        🏪 𝐒𝐇𝐎𝐏
╚════════════════════╝

✅ تم شراء الشخصية بنجاح

🧿 الاسم:
${item.character.name}

🌟 الندرة:
${item.character.rarity}

⚔️ القوة:
${item.character.power}

💰 السعر:
${item.price}

💳 رصيدك الحالي:
${player.money}

━━━━━━━━━━━━━━━━━━

🎉 تمت إضافة الشخصية إلى مجموعتك`
        })

    } catch (err) {

        console.log('Shop Buy Error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء الشراء'
        })
    }
}

        // =========================
        // .بيع
        // =========================

        if (text.startsWith('.بيع')) {

try {

    const args = text.split(' ').slice(1)

    if (!args.length) {

        return safeSend(msg.key.remoteJid, {
            text:

`❌ استخدم الأمر هكذا

.بيع 1

أو

.بيع 1 2 3 4`
})
}

    let player = await Player.findOne({ userId })

    if (!player) {

        return safeSend(msg.key.remoteJid, {
            text: '❌ لا تملك حساباً'
        })
    }

    player.characters = player.characters || []

    const indexes =
        [...new Set(
            args
                .map(x => Number(x) - 1)
                .filter(x => !isNaN(x))
        )]
        .sort((a, b) => b - a)

    let totalMoney = 0
    let soldCount = 0

    for (const index of indexes) {

        const character =
            player.characters[index]

        if (!character)
            continue

        const sellPrice = Math.max(
            100,
            Math.floor(character.power / 2)
        )

        totalMoney += sellPrice
        soldCount++

        player.characters.splice(index, 1)
    }

    if (soldCount === 0) {

        return safeSend(msg.key.remoteJid, {
            text: '❌ لم يتم العثور على شخصيات صالحة للبيع'
        })
    }

    player.money =
        (player.money || 0) + totalMoney

    await player.save()

    return safeSend(msg.key.remoteJid, {
        text:

`💰 ━━〔 𝐒𝐄𝐋𝐋 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 〕━━ 💰

✅ تم بيع ${soldCount} شخصية

💵 إجمالي الأرباح:
${totalMoney}

💳 رصيدك الحالي:
${player.money}`
})

} catch (err) {

    console.log('Sell error:', err)

    return safeSend(msg.key.remoteJid, {
        text: '❌ حدث خطأ أثناء البيع'
    })
}

}


// =========================
// .مزاد
// =========================

if (text.startsWith('.مزاد')) {

    try {

        const args = text.trim().split(' ')

const price = Number(args.pop())
const charPower = Number(args.pop())
const charName = args.slice(1).join(' ')

        if (!charName || isNaN(charPower) || isNaN(price)) {

            return safeSend(msg.key.remoteJid, {
                text:
`❌ استخدم الأمر هكذا

.مزاد اسم_الشخصية القوة السعر

مثال:
.مزاد Hashirama 2300 5000`
            })
        }

        let player = await Player.findOne({ userId })

        if (!player) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ لا تملك حساباً'
            })
        }

        player.characters = player.characters || []

        const charIndex =
    player.characters.findIndex(c =>
        c.name.toLowerCase().trim() === charName.toLowerCase().trim() &&
        Number(c.power) === charPower
    )

        if (charIndex === -1) {

            return safeSend(msg.key.remoteJid, {
                text: '❌ الشخصية غير موجودة لديك'
            })
        }

        const character =
            player.characters[charIndex]

        await Market.create({
            seller: userId,
            character,
            price
        })

        player.characters.splice(charIndex, 1)

        await player.save()

    return safeSend(msg.key.remoteJid, {
        text: `╔════════════════════╗
🏪 𝐀𝐔𝐂𝐓𝐈𝐎𝐍
╚════════════════════╝

✅ تم عرض الشخصية في السوق

🧿 الاسم :
${character.name}

🌟 الندرة :
${character.rarity}

⚔️ القوة :
${character.power}

💰 السعر :
${price}

━━━━━━━━━━━━━━━━━━

🛒 يمكن للاعبين الآن شراء الشخصية

💡 للعرض:
.السوق`
    })

} catch (err) {

        console.log('Auction error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء إنشاء المزاد'
        })
    }

} // <-- إغلاق if (text.startsWith('.مزاد'))

        // =========================
        // .السوق
        // =========================

        if (text === '.السوق') {

    try {

        const market = await Market.find()

        if (!market.length) {
            return safeSend(msg.key.remoteJid, {
                text:
`╭━━━〔 🏪 السوق العالمي 〕━━━╮

📭 لا توجد شخصيات معروضة حالياً

╰━━━━━━━━━━━━━━━━━━╯`
            })
        }

        let txt =
`╔══════════════╗
🏪 السوق العالمي
╚══════════════╝`

        market.forEach((item, i) => {

            txt +=
`╭─〔 #${i + 1} 〕─╮
🧿 الاسم : ${item.character.name}
🌟 الندرة : ${item.character.rarity}
⚔️ القوة : ${item.character.power}
💰 السعر : ${item.price}
╰──────────╯

`
        })

        txt +=
`━━━━━━━━━━━━━━━━━━
💡 للشراء:

.شراء رقم_العرض`

        return safeSend(msg.key.remoteJid, {
            text: txt
        })

    } catch (err) {

        console.log('Market error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ في عرض السوق'
        })
    }
}

        // =========================
        // .شراء
        // =========================

    if (text.startsWith('.شراء') && !text.startsWith('.شراءمتجر') && !text.startsWith('.شراءصندوق')) {
    try {
        const args = text.split(' ')
        const itemNumber = Number(args[1]) - 1

        const market = await Market.find()
        const item = market[itemNumber]

        if (!item || !item.character) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ العرض غير موجود'
            })
        }

        let player = await Player.findOne({ userId })
        if (!player) {
            player = new Player({
                userId,
                characters: [],
                money: 0
            })
        }

        player.characters = player.characters || []
        player.money = player.money || 0

        if (player.money < item.price) {
            return safeSend(msg.key.remoteJid, {
                text: `❌ لا تملك مالاً كافياً\n\n💰 المطلوب: ${item.price}\n💳 رصيدك: ${player.money}`
            })
        }

        if (player.characters.length >= (player.maxCharacters || 30)) {
            return safeSend(msg.key.remoteJid, {
                text: `❌ المخزون ممتلئ\n\n📦 السعة الحالية:\n${player.maxCharacters || 30}`
            })
        }

        player.money -= item.price
        player.characters.push(item.character)

        // تحويل المال للبائع
        const seller = await Player.findOne({ userId: item.seller })
        if (seller) {
            seller.money = (seller.money || 0) + item.price
            await seller.save()
        }

        await player.save()
        await Market.findByIdAndDelete(item._id)

        return safeSend(msg.key.remoteJid, {
            text: `╔════════════════════╗\n🛒 𝐏𝐔𝐑𝐂𝐇𝐀𝐒𝐄\n╚════════════════════╝\n\n✅ تم شراء الشخصية بنجاح\n\n🧿 الاسم :\n${item.character.name}\n\n🌟 الندرة :\n${item.character.rarity}\n\n⚔️ القوة :\n${item.character.power}\n\n💰 السعر :\n${item.price}\n\n💳 رصيدك الحالي :\n${player.money}\n\n━━━━━━━━━━━━━━━\n\n🎉 تمت إضافة الشخصية إلى مجموعتك`
        })

    } catch (err) {
        console.log('Buy error:', err)
        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء عملية الشراء'
        })
    }
}



// =========================
// .شراء
// =========================

if (text === '.متجر') {

    try {

        const shop = await Shop.find()

        if (!shop.length) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ لا توجد شخصيات في المتجر حالياً'
            })
        }

        let txt =
`╔════════════════════╗
        🏪 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑 𝐒𝐇𝐎𝐏
╚════════════════════╝

🎁 يتم تجديد المتجر كل ساعة

━━━━━━━━━━━━━━━━━━

`

        shop.forEach((item, i) => {

            txt +=
`╭────〔 ${i + 1} 〕────╮
🧿 الاسم : ${item.character.name}
🌟 الندرة : ${item.character.rarity}
⚔️ القوة : ${item.character.power}
🎭 الشكل : ${item.character.form || 'عادي'}
✨ القدرة : ${item.character.ability || 'لا يوجد'}
💰 السعر : ${item.price}
╰────────────────╯

`
        })

        txt +=
`━━━━━━━━━━━━━━━━━━

🛒 للشراء:

.شراءمتجر رقم_العرض

مثال:
.شراءمتجر 1`

        return safeSend(msg.key.remoteJid, { text: txt })

    } catch (err) {

        console.log('Shop error:', err)

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء فتح المتجر'
        })
    }
}
        
// =========================
// .قتال_مجموع
// =========================


        if (text.startsWith('.قتال_مجموع')) {

try {
    
    
    const mentioned =
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;

    if (!mentioned || !mentioned[0]) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ استخدم منشن\n\nمثال:\n.قتال_مجموع @user'
        });
    }

    const targetId = mentioned[0];

    const me = await Player.findOne({ userId });
const enemy = await Player.findOne({ userId: targetId });

if (!me || !enemy) {
    return safeSend(msg.key.remoteJid, {
        text: '❌ أحد اللاعبين لا يملك حساباً'
    });
}

me.rewardedLevels = me.rewardedLevels || [];
me.specialAbilities = me.specialAbilities || [];
    
    if (me.fights == null) me.fights = 5;
if (!me.lastFightReset) me.lastFightReset = Date.now();

const now = Date.now();
const fightCooldown = 30 * 60 * 1000;

if (now - me.lastFightReset >= fightCooldown) {
    me.fights = 5;
    me.lastFightReset = now;
    }

    if ((me.fights || 0) <= 0) {

        const remaining = fightCooldown - (now - me.lastFightReset);

        const minutes = Math.floor(remaining / (1000 * 60));

        return safeSend(msg.key.remoteJid, {
            text:
`❌ انتهت محاولات القتال

⚔️ المتبقي: 0/5

🕒 الوقت المتبقي: ${minutes} دقيقة

🔄 تتجدد المحاولات كل 30 دقيقة`
        });
    }

    if (!me.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ لا تملك شخصيات'
        });
    }

    if (!enemy.characters?.length) {
        return safeSend(msg.key.remoteJid, {
            text: '❌ الخصم لا يملك شخصيات'
        });
    }

    let myPower =
        me.characters.reduce((sum, c) => sum + Number(c.power || 0), 0);

    let enemyPower =
        enemy.characters.reduce((sum, c) => sum + Number(c.power || 0), 0);

    let myAttack = myPower
let enemyAttack = enemyPower;

let myAbilityName = 'بدون';
let myAbilityDescription = 'لا يوجد';
let myAbilityTier = 'عادية';

let enemyAbilityName = 'بدون';
let enemyAbilityDescription = 'لا يوجد';
let enemyAbilityTier = 'عادية';

let reducedReward = false;

    const common = [
        ['🔥 غضب المحارب','يزيد القوة بنسبة 30%',() => { myAttack += Math.floor(myAttack * 0.30) }],
        ['💥 الضربة الحرجة','يزيد القوة بنسبة 50%',() => { myAttack += Math.floor(myAttack * 0.50) }],
        ['🛡️ درع الحماية','يقلل ضرر الخصم بنسبة 25%',() => { enemyAttack -= Math.floor(enemyAttack * 0.25) }],
        ['🔄 الكاونتر','يعكس 20% من قوة الخصم عليه',() => { enemyAttack -= Math.floor(enemyAttack * 0.20) }],
        ['🃏 نين متطور','يزيد القوة بنسبة 40%',() => { myAttack += Math.floor(myAttack * 0.40) }],
        ['🌊 تنفس الماء','يزيد القوة بنسبة 45%',() => { myAttack += Math.floor(myAttack * 0.45) }],
        ['🔵 طور الناسك','يزيد القوة بنسبة 35%',() => { myAttack += Math.floor(myAttack * 0.35) }]
    ];

    const rare = [
        ['🍈 أكل فاكهة شيطان','يزيد القوة بنسبة 50%',() => { myAttack += Math.floor(myAttack * 0.50) }],
        ['⚔️ بانكاي','يزيد القوة بنسبة 40%',() => { myAttack += Math.floor(myAttack * 0.40) }],
        ['⚔️ هاكي التصلب المتقدم','يزيد القوة بنسبة 55%',() => { myAttack += Math.floor(myAttack * 0.55) }],
        ['🟡 سوبر سايان','يزيد القوة بنسبة 60%',() => { myAttack += Math.floor(myAttack * 0.60) }],
        ['⚡ تنفس البرق','يزيد القوة بنسبة 70%',() => { myAttack += Math.floor(myAttack * 0.70) }],
        ['👁️ مانغيكيو شارينغان','يزيد القوة بنسبة 45%',() => { myAttack += Math.floor(myAttack * 0.45) }],
        ['👑 قوة الكوينشي','يزيد القوة بنسبة 50%',() => { myAttack += Math.floor(myAttack * 0.50) }],
        ['⚡ الغريزة الفائقة','تفادي',() => {
            if (Math.random() <= 0.30) enemyAttack = 0;
        }],
        ['🌪️ الاستبدال','تفادي',() => { enemyAttack = 0 }]
    ];

    const legendary = [
        ['🔴 سوبر سايان غود','يزيد القوة بنسبة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['🔥 تنفس الشمس','يزيد القوة بنسبة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['👑 هاكي الملوك','يضعف الخصم 25%',() => { enemyAttack -= Math.floor(enemyAttack * 0.25) }],
        ['🖤 أنتي ماجيك','يقلل الخصم 40%',() => { enemyAttack -= Math.floor(enemyAttack * 0.40) }],
        ['👁️ العين الشاملة','يقلل الخصم 30%',() => { enemyAttack -= Math.floor(enemyAttack * 0.30) }],
        ['🔥 أماتيراسو','يقلل الخصم 20%',() => { enemyAttack -= Math.floor(enemyAttack * 0.20) }],
        ['⚔️ سوسانو الكامل','يزيد القوة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['👑 ملك السحر','يزيد القوة 90%',() => { myAttack += Math.floor(myAttack * 0.90) }],
        ['👑 ملك اللعنات','يزيد القوة 100%',() => { myAttack += Math.floor(myAttack * 1.00) }],
        ['⚙️ جير 5','يزيد القوة 80%',() => { myAttack += Math.floor(myAttack * 0.80) }],
        ['♾️ اللانهاية','يقلل الخصم 40%',() => { enemyAttack -= Math.floor(enemyAttack * 0.40) }]
    ];

    const epic = [
        ['🐉 نيكا','يزيد القوة 100%',() => { myAttack += Math.floor(myAttack * 1.00) }],
        ['🌀 كسر الحدود','يزيد القوة 200%',() => { myAttack += Math.floor(myAttack * 2.00) }],
        ['🎲 الحظ المطلق','×2',() => { myAttack *= 2 }],
        ['🌟 قوة البطل المختار','×2',() => { myAttack *= 2 }],
        ['🌌 الصحوة الكاملة','×2.5',() => { myAttack *= 2.5 }],
        ['👊 البوابة الثامنة','+70%',() => {
            myAttack += Math.floor(myAttack * 0.70);
            reducedReward = true;
        }]
    ];

    const tierChance = Math.random() * 100;

let selectedPool;

if (tierChance <= 50) {
    selectedPool = common;
    myAbilityTier = 'عادية';
} else if (tierChance <= 80) {
    selectedPool = rare;
    myAbilityTier = 'نادرة';
} else if (tierChance <= 95) {
    selectedPool = legendary;
    myAbilityTier = 'أسطورية';
} else {
    selectedPool = epic;
    myAbilityTier = 'ملحمية';
}

    // قدرة اللاعب
    const myAbility =
        selectedPool[Math.floor(Math.random() * selectedPool.length)];

    myAbilityName = myAbility[0];
    myAbilityDescription = myAbility[1];
    

    myAbility[2]();

    // قدرة العدو
    const enemyTierChance = Math.random() * 100;

    let enemyPool;

    if (enemyTierChance <= 50) enemyPool = common;
    else if (enemyTierChance <= 80) enemyPool = rare;
    else if (enemyTierChance <= 95) enemyPool = legendary;
    else enemyPool = epic;

    const enemyAbility =
        enemyPool[Math.floor(Math.random() * enemyPool.length)];

    enemyAbilityName = enemyAbility[0];
    enemyAbilityDescription = enemyAbility[1];

    const oldMyAttack = myAttack;

    myAttack = enemyAttack;
    enemyAbility[2]();
    enemyAttack = myAttack;
    myAttack = oldMyAttack;

    const finalMyAttack = Math.floor(myAttack);
    const finalEnemyAttack = Math.floor(enemyAttack);

    let winner;
    let reward;
    let winnerId;

    if (finalMyAttack >= finalEnemyAttack) {
        winnerId = userId;
        winner = 'أنت';
        reward = Math.max(500, Math.floor(enemyPower / 10));
    } else {
        winnerId = targetId;
        winner = 'الخصم';
        reward = Math.max(500, Math.floor(myPower / 10));
    }

    me.money = (me.money || 0) + reward;
    me.xp = (me.xp || 0) + 100;

    let levelUpMessage = '';

while ((me.xp || 0) >= Math.floor(300 + (me.level * 150))) {

    const neededXp = Math.floor(300 + (me.level * 150));

    me.xp -= neededXp;
me.level += 1;

// المستوى الجديد
const currentLevel = me.level;

levelUpMessage += `🎉 وصلت إلى المستوى ${currentLevel}\n`;
levelUpMessage += `💰 حصلت على 500 مال\n`;

const ability = levelAbilities[currentLevel];

if (ability) {

    me.specialAbilities = me.specialAbilities || [];

    if (!me.specialAbilities.includes(ability.name)) {

        me.specialAbilities.push(ability.name);

        me.attackBonus = me.attackBonus || 0;
        me.defenseBonus = me.defenseBonus || 0;
        me.critBonus = me.critBonus || 0;
        me.dodgeBonus = me.dodgeBonus || 0;
        me.reflectBonus = me.reflectBonus || 0;
        me.lifestealBonus = me.lifestealBonus || 0;
        me.bossDamageBonus = me.bossDamageBonus || 0;

        switch (ability.type) {
            case "attack": me.attackBonus += ability.value; break;
            case "defense": me.defenseBonus += ability.value; break;
            case "crit": me.critBonus += ability.value; break;
            case "dodge": me.dodgeBonus += ability.value; break;
            case "reflect": me.reflectBonus += ability.value; break;
            case "lifesteal": me.lifestealBonus += ability.value; break;
            case "bossDamage": me.bossDamageBonus += ability.value; break;
        }

        levelUpMessage += `
✨ قدرة جديدة

${ability.name}

📜 ${ability.description}

📈 التأثير: +${ability.value}%
`;
    }
}

me.money += 500;


// 🟢 صندوق كل 10 مستويات (مرة واحدة فقط)
if (currentLevel % 10 === 0) {

    me.maxCharacters = (me.maxCharacters || 30) + 5;

    levelUpMessage += `
📦 زيادة المخزون

➕ +5 شخصيات

📦 السعة الجديدة:
${me.maxCharacters}
`;
}

    me.rewardedLevels ||= [];
me.boxes ||= {
    basic: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    sss_chance: 0,
    sss_high: 0
};

if (!me.rewardedLevels.includes(currentLevel)) {

    switch (currentLevel) {

        case 10:
            me.boxes.basic += 5;
            levelUpMessage += `🎁 حصلت على 5 صناديق عادية\n`;
            break;

        case 20:
            me.boxes.rare += 3;
            levelUpMessage += `🎁 حصلت على 3 صناديق نادرة\n`;
            break;

        case 30:
            me.boxes.rare += 5;
            levelUpMessage += `🎁 حصلت على 5 صناديق نادرة\n`;
            break;

        case 40:
            me.boxes.epic += 2;
            levelUpMessage += `🎁 حصلت على 2 صندوق ملحمي\n`;
            break;

        case 50:
            me.boxes.epic += 4;
            levelUpMessage += `🎁 حصلت على 4 صناديق ملحمية\n`;
            break;

        case 60:
            me.boxes.legendary += 1;
            levelUpMessage += `🎁 حصلت على صندوق أسطوري\n`;
            break;

        case 70:
            me.boxes.legendary += 2;
            levelUpMessage += `🎁 حصلت على 2 صندوق أسطوري\n`;
            break;

        case 80:
            me.boxes.legendary += 3;
            levelUpMessage += `🎁 حصلت على 3 صناديق أسطورية\n`;
            break;

        case 90:
            me.boxes.sss_chance += 1;
            levelUpMessage += `🎁 حصلت على صندوق فرصة SSS\n`;
            break;

        case 100:
            me.boxes.sss_high += 1;
            levelUpMessage += `👑 حصلت على صندوق SSS عالي\n`;
            break;
    }

    me.rewardedLevels.push(currentLevel);
}
    if (me.level >= 100) {
    me.level = 100;
    me.xp = 0;
    break;
    }
}

me.fights -= 1;
await me.save();

if (levelUpMessage) {
    await sock.sendMessage(
        msg.key.remoteJid,
        {
            text: `🎉 مبروك @${userId.split('@')[0]}

${levelUpMessage}`,
            mentions: [userId]
        }
    );
}

const battleMessage = `⚔️ ══〔 GRAND BATTLE〕══ ⚔️
👤 مجموع قوتك:
${myPower}

👥 مجموع قوة الخصم:
${enemyPower}

━━━━━━━━━━━━━━━━━━

✨ قدرتك:
${myAbilityName}

📖 الوصف:
${myAbilityDescription}

🏷️ التصنيف:
${myAbilityTier}

━━━━━━━━━━━━━━━━━━

✨ قدرة الخصم:
${enemyAbilityName}

📖 الوصف:
${enemyAbilityDescription}

🏷️ التصنيف:
${enemyAbilityTier}

━━━━━━━━━━━━━━━━━━

⚔️ قوتك النهائية:
${Math.floor(myAttack)}

🛡️ قوة الخصم النهائية:
${Math.floor(enemyAttack)}

━━━━━━━━━━━━━━━━━━

👑 الفائز:
@${winnerId.split('@')[0]}

💰 المكافأة:
${reward}

🎖️ المستوى:
${me.level}

⭐ الخبرة:
${me.xp}

⚔️ القتالات المتبقية:
${me.fights}/5`;

return safeSend(msg.key.remoteJid, {
    text: battleMessage,
    mentions: [winnerId || userId || targetId]
});

 } catch (err) {

        console.log(err);

        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء القتال'
        });
    }

} // ← إغلاق if
        
        // =========================
        // .قتال
        // =========================

    
if (text.startsWith('.قتال')) {

    try {

        const args = text.trim().split(' ')

        const charPower = Number(args[args.length - 2])
        const charName = args.slice(1, -2).join(' ')

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

        if (!mentioned || !mentioned[0]) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ استخدم منشن\n\nمثال:\n.قتال Hashirama 2300 @user'
            })
        }

        const target = mentioned[0]

        const me = await Player.findOne({ userId })
        const enemy = await Player.findOne({ userId: target })

        if (!me) {
            return safeSend(msg.key.remoteJid, { text: '❌ لا تملك حساباً' })
        }

        if (!enemy) {
            return safeSend(msg.key.remoteJid, { text: '❌ الخصم لا يملك حساباً' })
        }

        // =====================
        // تجهيز البيانات
        // =====================

        me.abilities = me.abilities || []
        enemy.abilities = enemy.abilities || []

        const safeLevelAbilities = levelAbilities || {}

        function getLevelAbilities(level) {
            const result = []
            for (let lvl in safeLevelAbilities) {
                if (level >= Number(lvl)) {
                    result.push(safeLevelAbilities[lvl])
                }
            }
            return result
        }

        me.levelAbilities = getLevelAbilities(me.level || 1)
        enemy.levelAbilities = getLevelAbilities(enemy.level || 1)

        me.allAbilities = [...me.abilities, ...me.levelAbilities]
        enemy.allAbilities = [...enemy.abilities, ...enemy.levelAbilities]

        // =====================
        // نظام القتالات (Cooldown)
        // =====================

        const now = Date.now()
        const cooldown = 30 * 60 * 1000

        if (me.fights == null) me.fights = 5
        if (!me.lastFightReset) me.lastFightReset = now

        if (now - me.lastFightReset >= cooldown) {
            me.fights = 5
            me.lastFightReset = now
        }

        if (me.fights <= 0) {
            return safeSend(msg.key.remoteJid, {
                text: '⏳ انتهت القتالات اليومية (5/5)'
            })
        }

        me.characters = me.characters || []
        enemy.characters = enemy.characters || []

        const myCharacter = me.characters.find(c =>
    c.name?.toLowerCase().trim() === charName.toLowerCase().trim() &&
    Number(c.power) == Number(charPower)
)

        if (!myCharacter) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ الشخصية غير موجودة لديك'
            })
        }

        if (!enemy.characters.length) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ الخصم لا يملك شخصيات'
            })
        }

        // =====================
        // اختيار شخصية الخصم
        // =====================

        const sortedChars = [...enemy.characters].sort((a, b) => b.power - a.power)
        const chance = Math.random() * 100

        let enemyCharacter

        if (chance <= 30) {
            enemyCharacter = sortedChars[0]
        } else if (chance <= 70) {
            enemyCharacter = sortedChars[sortedChars.length - 1]
        } else {
            enemyCharacter = sortedChars[Math.floor(Math.random() * sortedChars.length)]
        }

        if (!enemyCharacter) {
            return safeSend(msg.key.remoteJid, {
                text: '❌ لا يمكن اختيار شخصية للخصم'
            })
        }

        // =====================
        // حساب القوة
        // =====================

        let myAttack =
            myCharacter.power +
            (me.level || 1) * 5 +
            Math.floor(Math.random() * 300)

        let enemyAttack =
            enemyCharacter.power +
            (enemy.level || 1) * 5 +
            Math.floor(Math.random() * 300)

        let finalMyAttack = myAttack
        let finalEnemyAttack = enemyAttack

        let abilityMessage = ''

        // =====================
        // القدرات
        // =====================

        for (let ab of me.allAbilities || []) {

            if (!ab) continue

            if (ab.type === "attack") {
                finalMyAttack += finalMyAttack * (ab.value || 0) / 100
            }

            if (ab.type === "defense") {
                finalEnemyAttack -= finalEnemyAttack * (ab.value || 0) / 100
            }

            if (ab.type === "crit") {
                if (Math.random() * 100 < (ab.value || 0)) {
                    finalMyAttack *= 2
                    abilityMessage += `\n⚡ كريتيكال من ${ab.name || 'قدرة'}`
                }
            }

            if (ab.type === "dodge") {
                if (Math.random() * 100 < (ab.value || 0)) {
                    finalEnemyAttack = 0
                    abilityMessage += `\n💨 مراوغة من ${ab.name || 'قدرة'}`
                }
            }

            if (ab.type === "reflect") {
                const reflected = Math.floor(finalEnemyAttack * (ab.value || 0) / 100)
                finalMyAttack += reflected
                abilityMessage += `\n🔄 عكس ضرر من ${ab.name || 'قدرة'}`
            }

            if (ab.type === "lifesteal") {
                const heal = finalMyAttack * (ab.value || 0) / 100
                me.hp = (me.hp || 100) + heal
            }
        }

        // =====================
        // تحديد الفائز
        // =====================

        const rewards = {
            'عادي': 100,
            'ممتاز': 300,
            'اسطوري': 1000,
            'SSS': 3000
        }

        let winner
        let reward = 0

        if (finalMyAttack >= finalEnemyAttack) {

            winner = me.userId || userId

            reward = rewards[enemyCharacter.rarity] || 100

            me.money = (me.money || 0) + reward
            me.xp = (me.xp || 0) + 200

        } else {

            winner = enemy.userId

            reward = rewards[myCharacter.rarity] || 100

            enemy.money = (enemy.money || 0) + reward
        }

        // =====================
        // لفل أب
        // =====================

        while ((me.xp || 0) >= Math.floor(300 + ((me.level || 1) * 150))) {

            me.xp -= Math.floor(300 + ((me.level || 1) * 150))
            me.level = (me.level || 1) + 1

            if (me.level >= 100) {
                me.level = 100
                me.xp = 0
                break
            }

            me.money = (me.money || 0) + 500
        }

        me.fights = Math.max(0, (me.fights || 0) - 1)

        // =====================
        // حفظ البيانات
        // =====================

        await me.save()
        await enemy.save()

        // =====================
        // الرسالة النهائية
        // =====================

        const battleMessage = `
╔══════════════════════╗
        ⚔️ 𝐄𝐏𝐈𝐂 𝐁𝐀𝐓𝐓𝐋𝐄 ⚔️
╚══════════════════════╝

🛡️ 𝐘𝐎𝐔𝐑 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑

🧿 الاسم:
${myCharacter.name || 'غير معروف'}

⚡ القوة:
${myCharacter.power}

━━━━━━━━━━━━━━━━━━

🎯 𝐄𝐍𝐄𝐌𝐘 𝐂𝐇𝐀𝐑𝐀𝐂𝐓𝐄𝐑

🧿 الاسم:
${enemyCharacter.name || 'غير معروف'}

⚡ القوة:
${enemyCharacter.power}

━━━━━━━━━━━━━━━━━━

${abilityMessage ? `✨ القدرات:\n${abilityMessage}\n━━━━━━━━━━━━━━━━━━` : ''}

🏆 الفائز:
@${(winner || userId).split('@')[0]}

💰 المكافأة:
${reward}

⭐ الخبرة:
+200

🎟️ القتالات المتبقية:
${me.fights}/5

━━━━━━━━━━━━━━━━━━
🔥 نهاية القتال
`

        return safeSend(msg.key.remoteJid, {
            text: battleMessage,
            mentions: [me.userId, enemy.userId].filter(Boolean)
        })

    } catch (err) {
        console.log(err)
        return safeSend(msg.key.remoteJid, {
            text: '❌ حدث خطأ أثناء القتال'
        })
    }
}
        

async function distributeBossRewards(sock, groupId) {

    const players = await Player.find({
        bossDamage: { $gt: 0 }
    })

    const killerId = currentBoss?.killer
    const killer =
    players.find(
        p => p.userId === currentBoss?.killer
    )

    if (!players.length) return

    players.sort((a, b) =>
        (b.bossDamage || 0) - (a.bossDamage || 0)
    )

    const first = players[0]
    const second = players[1]
    const third = players[2]


if (first) {

    first.money =
        (first.money || 0) + 10000

    first.xp =
        (first.xp || 0) + 1000

    first.boxes = first.boxes || {}

    first.boxes.sss_chance =
        (first.boxes.sss_chance || 0) + 1

    first.boxes.sss_high =
        (first.boxes.sss_high || 0) + 1

    await first.save()
}

if (second) {

    second.money =
        (second.money || 0) + 5000

    second.xp =
        (second.xp || 0) + 500

    second.boxes = second.boxes || {}

    second.boxes.sss_high =
        (second.boxes.sss_high || 0) + 1

    second.boxes.legendary =
        (second.boxes.legendary || 0) + 1

    await second.save()
}

if (third) {

    third.money =
        (third.money || 0) + 2500

    third.xp =
        (third.xp || 0) + 500

    third.boxes = third.boxes || {}

    third.boxes.legendary =
        (third.boxes.legendary || 0) + 1

    third.boxes.epic =
        (third.boxes.epic || 0) + 1

    await third.save()
}

for (let i = 3; i < players.length; i++) {

    const player = players[i]

    player.money =
        (player.money || 0) + 2500

    player.xp =
        (player.xp || 0) + 500

    player.boxes = player.boxes || {}

    player.boxes.epic =
        (player.boxes.epic || 0) + 2

    await player.save()
}

    
    if (killer) {

    killer.boxes =
        killer.boxes || {}

    killer.boxes.sss_high =
        (killer.boxes.sss_high || 0) + 1

    await killer.save()
    }

    const rankingData = players.map(p => ({
        userId: p.userId,
        damage: p.bossDamage || 0
    }))

    await Player.updateMany(
    {},
    {
        $set: {
            bossDamage: 0,
            bossHits: 0
        }
    }
)

console.log("All boss damage reset")

    const mentions = [
    ...new Set([
        ...players.map(p => p.userId),
        killerId
    ].filter(Boolean))
]

    
    let ranking = ''

    rankingData.forEach((p, i) => {
        ranking += `${i + 1}- @${p.userId.split('@')[0]}
💥 الضرر: ${p.damage}

`
    })

    console.log("BEFORE SEND MESSAGE")
console.log("groupId =", groupId)
console.log("mentions =", mentions)

await sock.sendMessage(groupId, {
    text: `🏆 اختبار رسالة الزعيم`
})

await sock.sendMessage(groupId, {
    text: `🏆 ═══════〔 نتائج الزعيم العالمي 〕══════ 🏆

🥇 ═══ المركز الأول ═══

👑 @${players[0]?.userId.split('@')[0] || 'لا يوجد'}

💰 10000 مال
⭐ 1000 XP

📦 1 SSS Chance Box
📦 1 SSS High Box

━━━━━━━━━━━━━━━━━━

🥈 ═══ المركز الثاني ═══

⚔️ @${players[1]?.userId.split('@')[0] || 'لا يوجد'}

💰 5000 مال
⭐ 500 XP

📦 1 SSS High Box
📦 1 Legendary Box

━━━━━━━━━━━━━━━━━━

🥉 ═══ المركز الثالث ═══

🔥 @${players[2]?.userId.split('@')[0] || 'لا يوجد'}

💰 2500 مال
⭐ 500 XP

📦 1 Legendary Box
📦 1 Epic Box

━━━━━━━━━━━━━━━━━━

🎖️ بقية المشاركين

💰 2500 مال
⭐ 500 XP

📦 2 Epic Boxes

━━━━━━━━━━━━━━━━━━

☠️ ═══ الضربة القاضية ═══

@${killerId?.split('@')[0] || 'لا يوجد'}

🎁 1 SSS High Box إضافي

━━━━━━━━━━━━━━━━━━

📊 ═══ الترتيب النهائي ═══

${ranking}

━━━━━━━━━━━━━━━━━━

🎉 تم توزيع جميع الجوائز بنجاح

🌍 الزعيم العالمي سقط!
⚔️ استعدوا للمعركة القادمة!`,
    mentions
})

console.log("AFTER SEND MESSAGE")

} // إغلاق distributeBossRewards

async function distributeRankingRewards(sock, groupId) {

const metadata =
    await sock.groupMetadata(groupId)

const participants =
    metadata.participants.map(
        p => p.id
    )

const players =
    await Player.find({
        userId: {
            $in: participants
        }
    })

const ranking = players.map(player => {

    const totalPower =
        (player.characters || [])
            .reduce(
                (sum, c) =>
                    sum + (c.power || 0),
                0
            )

    return {
        player,
        power: totalPower
    }
})

ranking.sort(
    (a, b) =>
        b.power - a.power
)

const top15 =
    ranking.slice(0, 15)
    if (!top15.length) return

const first = top15[0]?.player
const second = top15[1]?.player
const third = top15[2]?.player

if (first) {

    first.boxes = first.boxes || {}

    first.boxes.sss_high =
        (first.boxes.sss_high || 0) + 1

    first.boxes.sss_chance =
        (first.boxes.sss_chance || 0) + 1

    const sssChars =
        characters.filter(
            c => c.rarity === 'SSS'
        )

    if (sssChars.length) {

        const reward =
            sssChars[
                Math.floor(
                    Math.random() *
                    sssChars.length
                )
            ]

        first.characters =
            first.characters || []

        first.characters.push(
            JSON.parse(
                JSON.stringify(reward)
            )
        )
    }

    await first.save()
}

if (second) {

    second.boxes = second.boxes || {}

    second.boxes.sss_high =
        (second.boxes.sss_high || 0) + 2

    second.boxes.legendary =
        (second.boxes.legendary || 0) + 2

    await second.save()
}

if (third) {

    third.boxes = third.boxes || {}

    third.boxes.sss_high =
        (third.boxes.sss_high || 0) + 1

    third.boxes.legendary =
        (third.boxes.legendary || 0) + 2

    await third.save()
}

for (let i = 3; i < top15.length; i++) {

    const player =
        top15[i].player

    player.boxes =
        player.boxes || {}

    if (i <= 9) {

        player.boxes.legendary =
            (player.boxes.legendary || 0) + 2

        player.boxes.epic =
            (player.boxes.epic || 0) + 2

    } else {

        player.boxes.epic =
            (player.boxes.epic || 0) + 2

        player.boxes.rare =
            (player.boxes.rare || 0) + 2
    }

    await player.save()
}

let result =

`🏆 ═════〔 جوائز الترتيب 〕═════ 🏆

🥇 @${first?.userId.split('@')[0] || 'لا يوجد'}
🌌 شخصية SSS
📦 SSS High
📦 SSS Chance

🥈 @${second?.userId.split('@')[0] || 'لا يوجد'}
📦 2 SSS High
📦 2 Legendary

🥉 @${third?.userId.split('@')[0] || 'لا يوجد'}
📦 1 SSS High
📦 2 Legendary

━━━━━━━━━━━━━━

🎉 تم توزيع الجوائز على أفضل 15 لاعب`

await sock.sendMessage(
    groupId,
    {
        text: result,
        mentions: [
            first?.userId,
            second?.userId,
            third?.userId
        ].filter(Boolean)
    }
)

}
    
}) // <-- هذا الإغلاق الصحيح والوحيد لـ messages.upsert (بعد نهاية كل الأوامر)
} // <-- هذا الإغلاق الصحيح لدالة startBot بالكامل

// 3. السطر الأخير والوحيد في نهاية الملف لتشغيل البوت
startBot().catch(console.error)
