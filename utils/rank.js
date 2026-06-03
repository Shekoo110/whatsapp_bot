function getRank(mmr) {

    if (mmr >= 3000)
        return '👑 أسطوري'

    if (mmr >= 2500)
        return '💠 ماستر'

    if (mmr >= 2000)
        return '💎 ألماسي'

    if (mmr >= 1500)
        return '🥇 بلاتيني'

    if (mmr >= 1200)
        return '🥈 ذهبي'

    return '🥉 برونزي'
}

module.exports = getRank
