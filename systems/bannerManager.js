const Banner = require('../models/Banner')
const characters = require('../characters.json')

// =========================
// تاريخ السعودية
// =========================

function getSaudiDate() {

    return new Date().toLocaleDateString(
        'en-CA',
        {
            timeZone: 'Asia/Riyadh'
        }
    )

}

// =========================
// الحصول على البنر
// =========================

async function getBanner() {

    let banner =
        await Banner.findOne()

    if (!banner) {

        banner =
            await Banner.create({})

    }

    return banner

}

// =========================
// تصفية شخصيات البنر
// =========================

function getBannerCharacters() {

    return characters.filter(c =>

        c.rarity === 'SSS' &&
        c.power >= 6000

    )

}
// =========================
// تجديد البنر
// =========================

async function refreshBanner() {

    const banner = await getBanner()

    const today = getSaudiDate()

    // إذا تم التجديد اليوم لا يفعل شيء
    if (banner.lastReset === today) {

        return banner

    }

    const pool = getBannerCharacters()

    // استبعاد الشخصيات التي ظهرت مؤخراً
    let available = pool.filter(

        c => !banner.recentCharacters.includes(c.name)

    )

    // إذا انتهت القائمة نبدأ من جديد
    if (!available.length) {

        banner.recentCharacters = []

        available = pool

    }

    // اختيار شخصية عشوائية
    const character =

        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ]

    banner.character = character

    banner.bannerName = character.name

    banner.lastReset = today

    // إعادة العداد العالمي
    banner.globalPulls = 0

    banner.rewardClaimed = false

    banner.participants = []

    // حفظ الشخصية لمنع تكرارها
    banner.recentCharacters.push(character.name)

    // لا نحتفظ إلا بآخر 10 شخصيات
    if (banner.recentCharacters.length > 10) {

        banner.recentCharacters.shift()

    }

    await banner.save()

    return banner

}

module.exports = {

    getSaudiDate,

    getBanner,

    getBannerCharacters,

    refreshBanner

}
