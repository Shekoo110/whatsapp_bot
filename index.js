const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')

const { calculateDamageAdvanced } = require('./utils/pvp')
const express = require("express")
const QRCode = require("qrcode")

console.log('Bot starting...')

const mongoose = require('mongoose')
const bosses = require('./bosses')
const getRank = require('./utils/rank')
const { getSkillDamage } = require('./utils/skills')
const Boss = require('./models/Boss')
const { getTotalStats } = require('./utils/stats')
const { generateEquipmentShop } = require('./systems/shopSystem')

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

const Player = require('./models/Player')
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
const characters = require('./characters.json')

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
        const age = Date.now() - oldShop.createdAt
        if (age < 60 * 60 * 1000) {
            return await Shop.find()
        }
    }

    let shopItems = []
    for (let i = 0; i < 5; i++) {
        const rarity = getRandomRarity()
        const pool = allCharacters.filter(c => c.rarity === rarity)
        if (!pool.length) continue

        const character = pool[Math.floor(Math.random() * pool.length)]
        const priceMultiplier = {
            'عادي': 1000,
            'ممتاز': 3000,
            'اسطوري': 8000,
            'SSS': 20000
        }

        const price = priceMultiplier[rarity] + Math.floor(Math.random() * 1000)
        shopItems.push({ character, price })
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

let currentBoss = null
const ABILITY_CHANCE = 30
const levelAbilities = {
    5: { name: "👁️ شارينغان", type: "crit", value: 5, description: "5% ضربة حرجة إضافية" },
    10: { name: "🛡️ صلابة الحديد", type: "defense", value: 5, description: "تقليل الضرر 5%" },
    15: { name: "⚔️ عين الصقر", type: "crit", value: 5, description: "زيادة فرصة الضربة الحرجة" },
    20: { name: "🔥 لهب التنين", type: "reflect", value: 5, description: "إرجاع 5% من الضرر" },
    25: { name: "🌑 رينيغان", type: "lifesteal", value: 5, description: "استعادة 5% من الضرر" },
    30: { name: "💀 سوسانو", type: "attack", value: 10, description: "زيادة الهجوم 10%" },
    35: { name: "🦅 غرائز المقاتل", type: "dodge", value: 10, description: "زيادة المراوغة 10%" },
    40: { name: "👑 هاكي الملك", type: "stun", value: 5, description: "5% شل الخصم" },
    45: { name: "🐉 تنين الأساطير", type: "bossDamage", value: 10, description: "ضرر إضافي ضد الزعيم" },
    50: { name: "☄️ قوة الكواكب", type: "attack", value: 15, description: "زيادة الهجوم 15%" },
    55: { name: "❄️ تجميد الزمن", type: "freeze", value: 5, description: "5% تجميد الخصم" },
    60: { name: "⚔️ سيد المعارك", type: "crit", value: 10, description: "10% ضربة حرجة" },
    65: { name: "🛡️ درع العمالقة", type: "defense", value: 10, description: "تقليل الضرر 10%" },
    70: { name: "🌋 غضب البركان", type: "reflect", value: 10, description: "عكس 10% من الضرر" },
    75: { name: "👹 قوة الشياطين", type: "attack", value: 20, description: "زيادة الهجوم 20%" },
    80: { name: "🌌 بوابة الأبعاد", type: "dodge", value: 15, description: "15% مراوغة" },
    85: { name: "🌩️ سيد العواصف", type: "reflect", value: 15, description: "يعكس 15% من الضرر على الخصم" },
    90: { name: "💎 الجسد الماسي", type: "defense", value: 15, description: "تقليل الضرر 15%" },
    95: { name: "🔥 ملك الجحيم", type: "lifesteal", value: 15, description: "استعادة 15% من الضرر" },
    100: { name: "🌟 الحاكم المطلق", type: "ultimate", value: 25, description: "زيادة جميع الإحصائيات 25%" }
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
        case 1: case 2: case 3: case 4: return { draws: 1, xp: 100 }
        case 5: return { money: 500, xp: 500, box: 'basic' }
        case 6: case 7: case 8: case 9: return { draws: 1, xp: 150 }
        case 10: return { money: 1000, xp: 1000, box: 'rare' }
        case 11: case 12: case 13: case 14: return { draws: 1, xp: 200 }
        case 15: return { money: 1500, xp: 2000, box: 'epic' }
        case 16: case 17: case 18: case 19: return { draws: 1, xp: 300 }
        case 20: return { money: 2000, xp: 3000, box: 'legendary' }
        case 21: case 22: case 23: case 24: return { draws: 1, xp: 400 }
        case 25: return { money: 3000, xp: 5000, box: 'sss_chance' }
        case 26: case 27: case 28: case 29: return { draws: 1, xp: 500 }
        case 30: return { money: 4000, xp: 10000, box: 'sss_high', title: '👑 ملك الأبطال' }
        default: return null
    }
}

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('MongoDB Error:', err))

const app = express()
let qrCodeData = ""

app.get("/", (req, res) => {
    if (qrCodeData) {
        res.send(`<html><body style="background:#111;display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;color:white;font-family:sans-serif;"><h2>امسح QR لتشغيل البوت</h2><img src="${qrCodeData}" width="300" /></body></html>`)
    } else {
        res.send(`<html><body style="background:#111;color:white;display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;"><h2>البوت متصل بالفعل ✅</h2></body></html>`)
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running")
})

async function spawnBoss(sock, groupId) {
    currentBoss = { ...bosses[Math.floor(Math.random() * bosses.length)] }
    await Boss.deleteMany({})
    await Boss.create(currentBoss)

    await sock.sendMessage(groupId, {
        text: `🔥 *═══〔 ظُـهُـور الـزَّعِـيـم 〕═══* 🔥\n\n👑 *الاسم:* ${currentBoss.name}\n❤️ *الصحة:* ${currentBoss.hp}/${currentBoss.maxHp}\n\n⚔️ *استخدم:* \`.زعيم\` للمعلومات\n🗡️ *استخدم:* \`.هجوم\` للمشاركة والقتال!`
    })
}

async function startBot() {
    const savedBoss = await Boss.findOne()
    if (savedBoss) {
        currentBoss = savedBoss
        console.log('✅ تم تحميل الزعيم المحفوظ')
    }

    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({ auth: state })

    sock.ev.on('creds.update', saveCreds)
    const safeSend = async (jid, data) => {
        try { return await sock.sendMessage(jid, data) } catch (e) { console.log('Send error:', e) }
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, qr } = update
        if
