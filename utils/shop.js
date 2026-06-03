// systems/shopSystem.js

function generateEquipmentShop() {
    const items = [

        // =========================
        // 🅱️ B RANK
        // =========================
        {
            id: "b_sword_1",
            name: "سيف خشبي",
            type: "weapon",
            rarity: "B",
            price: 200,

            attack: 20,
            hp: 0,
            defense: 0,
            accuracy: 0,
            critRate: 0,
            critDamage: 0,
            dodge: 0,
            shield: 0,
            lifesteal: 0
        },
        {
            id: "b_sword_2",
            name: "خنجر قديم",
            type: "weapon",
            rarity: "B",
            price: 250,

            attack: 25,
            hp: 0,
            defense: 0,
            accuracy: 2,
            critRate: 1,
            critDamage: 0,
            dodge: 0,
            shield: 0,
            lifesteal: 0
        },
        {
            id: "b_armor_1",
            name: "درع جلدي",
            type: "armor",
            rarity: "B",
            price: 300,

            attack: 0,
            hp: 150,
            defense: 10,
            accuracy: 0,
            critRate: 0,
            critDamage: 0,
            dodge: 0,
            shield: 0,
            lifesteal: 0
        },
        {
            id: "b_ring_1",
            name: "خاتم ضعيف",
            type: "accessory",
            rarity: "B",
            price: 220,

            attack: 0,
            hp: 0,
            defense: 0,
            accuracy: 0,
            critRate: 2,
            critDamage: 5,
            dodge: 1,
            shield: 0,
            lifesteal: 0
        },

        // =========================
        // 🅰️ A RANK
        // =========================
        {
            id: "a_sword_1",
            name: "سيف حديدي",
            type: "weapon",
            rarity: "A",
            price: 500,

            attack: 60,
            hp: 0,
            defense: 0,
            accuracy: 5,
            critRate: 3,
            critDamage: 10,
            dodge: 0,
            shield: 0,
            lifesteal: 0
        },
        {
            id: "a_armor_1",
            name: "درع فولاذي",
            type: "armor",
            rarity: "A",
            price: 700,

            attack: 0,
            hp: 400,
            defense: 35,
            accuracy: 0,
            critRate: 0,
            critDamage: 0,
            dodge: 0,
            shield: 50,
            lifesteal: 0
        },
        {
            id: "a_ring_1",
            name: "خاتم القتال",
            type: "accessory",
            rarity: "A",
            price: 600,

            attack: 10,
            hp: 0,
            defense: 5,
            accuracy: 5,
            critRate: 5,
            critDamage: 10,
            dodge: 3,
            shield: 0,
            lifesteal: 0
        },

        // =========================
        // 💠 SS RANK
        // =========================
        {
            id: "ss_sword_1",
            name: "سيف الظلام",
            type: "weapon",
            rarity: "SS",
            price: 2000,

            attack: 150,
            hp: 0,
            defense: 20,
            accuracy: 10,
            critRate: 10,
            critDamage: 30,
            dodge: 5,
            shield: 0,
            lifesteal: 5
        },
        {
            id: "ss_armor_1",
            name: "درع التنين",
            type: "armor",
            rarity: "SS",
            price: 2600,

            attack: 0,
            hp: 1200,
            defense: 80,
            accuracy: 0,
            critRate: 0,
            critDamage: 0,
            dodge: 5,
            shield: 200,
            lifesteal: 0
        },

        // =========================
        // 💎 SSS RANK
        // =========================
        {
            id: "sss_sword_1",
            name: "سيف الإمبراطور",
            type: "weapon",
            rarity: "SSS",
            price: 5000,

            attack: 300,
            hp: 0,
            defense: 50,
            accuracy: 10,
            critRate: 10,
            critDamage: 50,
            dodge: 5,
            shield: 0,
            lifesteal: 5
        },
        {
            id: "sss_armor_1",
            name: "درع التنين الملكي",
            type: "armor",
            rarity: "SSS",
            price: 5500,

            attack: 0,
            hp: 1500,
            defense: 120,
            accuracy: 0,
            critRate: 0,
            critDamage: 0,
            dodge: 3,
            shield: 500,
            lifesteal: 0
        }
    ];

    // خلط واختيار 5 عناصر
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    return shuffledItems.slice(0, 5);
}

module.exports = { generateEquipmentShop };
