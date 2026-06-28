const SHOP_ITEMS = [

{
id: "pull_ticket",
name: "🎟️ تذكرة سحب",
type: "pulls",
amount: 1,
price: 10,
limit: 5,
unlockLevel: 1
},

{
id: "legendary_box",
name: "📦 صندوق ليجندري",
type: "legendary_box",
amount: 1,
price: 10,
limit: 5,
unlockLevel: 1
},

{
id: "sss_chance",
name: "✨ SSS Chance",
type: "sss_chance",
amount: 1,
price: 20,
limit: 5,
unlockLevel: 5
},

{
id: "sss_high",
name: "💎 SSS High",
type: "sss_high",
amount: 1,
price: 20,
limit: 5,
unlockLevel: 15
},

{
id: "storage",
name: "📦 زيادة سعة +5",
type: "storage",
amount: 5,
price: 100,
limit: 1,
unlockLevel: 10
},

{
id: "summon_boss",
name: "👹 استدعاء زعيم العشيرة",
type: "boss",
amount: 1,
price: 500,
limit: 1,
unlockLevel: 12
},

{
id: "sss_shard",
name: "🧩 شظية SSS عشوائية",
type: "sss_shard",
amount: 1,
price: 200,
limit: 1,
unlockLevel: 18
},

{
id: "rename",
name: "✏️ تغيير اسم العشيرة",
type: "rename",
amount: 1,
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
