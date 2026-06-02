function getRank(mmr) {

    if (mmr < 1100) return "برونزي"
    if (mmr < 1300) return "فضي"
    if (mmr < 1500) return "ذهبي"
    if (mmr < 1800) return "بلاتيني"
    if (mmr < 2100) return "ماسي"
    return "أسطوري"
}

module.exports = getRank
