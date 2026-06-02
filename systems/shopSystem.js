const allItems = require('../items.json')

function generateShop() {

    const shopItems = []

    for (let i = 0; i < 5; i++) {

        const item = allItems[
            Math.floor(Math.random() * allItems.length)
        ]

        shopItems.push({
            id: Date.now() + i,
            name: item.name,
            rarity: item.rarity,
            price: Math.floor(Math.random() * 5000) + 1000,

            attack: item.attack || 0,
            hp: item.hp || 0,
            crit: item.crit || 0,
            dodge: item.dodge || 0
        })
    }

    return shopItems
}

module.exports = {
    generateShop
}
