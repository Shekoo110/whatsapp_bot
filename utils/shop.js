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
            crit: 0,
            dodge: 0
        },
        {
            id: "b_sword_2",
            name: "خنجر قديم",
            type: "weapon",
            rarity: "B",
            price: 250,
            attack: 25,
            hp: 0,
            crit: 1,
            dodge: 0
        },
        {
            id: "b_armor_1",
            name: "درع جلدي",
            type: "armor",
            rarity: "B",
            price: 300,
            attack: 0,
            hp: 150,
            crit: 0,
            dodge: 0
        },
        {
            id: "b_ring_1",
            name: "خاتم ضعيف",
            type: "accessory",
            rarity: "B",
            price: 220,
            attack: 0,
            hp: 0,
            crit: 1,
            dodge: 1
        },
        {
            id: "b_axe_1",
            name: "فأس صدئ",
            type: "weapon",
            rarity: "B",
            price: 260,
            attack: 30,
            hp: 0,
            crit: 0,
            dodge: 0
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
            crit: 2,
            dodge: 0
        },
        {
            id: "a_sword_2",
            name: "سيف المحارب",
            type: "weapon",
            rarity: "A",
            price: 650,
            attack: 75,
            hp: 0,
            crit: 3,
            dodge: 0
        },
        {
            id: "a_armor_1",
            name: "درع فولاذي",
            type: "armor",
            rarity: "A",
            price: 700,
            attack: 0,
            hp: 400,
            crit: 0,
            dodge: 0
        },
        {
            id: "a_armor_2",
            name: "درع فارس",
            type: "armor",
            rarity: "A",
            price: 800,
            attack: 0,
            hp: 500,
            crit: 0,
            dodge: 1
        },
        {
            id: "a_ring_1",
            name: "خاتم القتال",
            type: "accessory",
            rarity: "A",
            price: 600,
            attack: 0,
            hp: 0,
            crit: 5,
            dodge: 2
        },
        {
            id: "a_ring_2",
            name: "خاتم السرعة",
            type: "accessory",
            rarity: "A",
            price: 650,
            attack: 0,
            hp: 0,
            crit: 2,
            dodge: 5
        },
        {
            id: "a_dagger_1",
            name: "خنجر سريع",
            type: "weapon",
            rarity: "A",
            price: 550,
            attack: 65,
            hp: 0,
            crit: 3,
            dodge: 1
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
            crit: 10,
            dodge: 5
        },
        {
            id: "ss_sword_2",
            name: "سيف التنين",
            type: "weapon",
            rarity: "SS",
            price: 2500,
            attack: 180,
            hp: 0,
            crit: 12,
            dodge: 3
        },
        {
            id: "ss_armor_1",
            name: "درع التنين",
            type: "armor",
            rarity: "SS",
            price: 2600,
            attack: 0,
            hp: 1200,
            crit: 0,
            dodge: 5
        },
        {
            id: "ss_armor_2",
            name: "درع الظل",
            type: "armor",
            rarity: "SS",
            price: 2400,
            attack: 0,
            hp: 1000,
            crit: 5,
            dodge: 8
        },
        {
            id: "ss_ring_1",
            name: "خاتم الأسطورة",
            type: "accessory",
            rarity: "SS",
            price: 2200,
            attack: 0,
            hp: 0,
            crit: 10,
            dodge: 10
        },
        {
            id: "ss_ring_2",
            name: "خاتم القوة",
            type: "accessory",
            rarity: "SS",
            price: 2100,
            attack: 20,
            hp: 0,
            crit: 8,
            dodge: 6
        },
        {
            id: "ss_blade_1",
            name: "نصل الفوضى",
            type: "weapon",
            rarity: "SS",
            price: 3000,
            attack: 200,
            hp: 0,
            crit: 15,
            dodge: 0
        },
        {
            id: "ss_staff_1",
            name: "عصا الطاقة",
            type: "weapon",
            rarity: "SS",
            price: 2800,
            attack: 170,
            hp: 0,
            crit: 12,
            dodge: 5
        }
    ];

    // خلط المصفوفة بشكل سليم برمجياً واختيار 5 عناصر عشوائية
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    return shuffledItems.slice(0, 5);
}

// تصدير الدالة لتستطيع قراءتها من ملف index.js
module.exports = { generateEquipmentShop };
