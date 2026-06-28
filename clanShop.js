const SHOP_ITEMS = [

{
id: "pull_ticket",
name: "🎟️ تذكرة سحب",
price: 10,
limit: 5,
unlockLevel: 1
},

{
id: "legendary_box",
name: "📦 صندوق ليجندري",
price: 10,
limit: 5,
unlockLevel: 1
},

{
id: "sss_chance",
name: "✨ SSS Chance",
price: 20,
limit: 5,
unlockLevel: 5
},

{
id: "sss_high",
name: "💎 SSS High",
price: 20,
limit: 5,
unlockLevel: 15
},

{
id: "storage",
name: "📦 +5 مخزون",
price: 100,
limit: 1,
unlockLevel: 10
},

{
id: "summon_boss",
name: "👹 استدعاء الزعيم",
price: 500,
limit: 1,
unlockLevel: 12
},

{
id: "sss_shard",
name: "🧩 شظية SSS",
price: 200,
limit: 1,
unlockLevel: 18
},

{
id: "rename",
name: "✏️ تغيير اسم العشيرة",
price: 1000,
limit: 1,
unlockLevel: 25
}

]

function getClanShop(level){

return SHOP_ITEMS.map(item=>({

...item,

locked:
level < item.unlockLevel

}))

}

module.exports = {

SHOP_ITEMS,

getClanShop

}
