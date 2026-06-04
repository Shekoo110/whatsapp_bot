const bosses = [

{
name: "Aizen",
hp: 50000,
maxHp: 50000,
attack: 2500,

followers: [
{
    name: "Gin",
    hp: 15000,
    ability: "poison"
    image: "https://files.catbox.moe/g9e6ey.jpg"
},
{
    name: "Tosen",
    hp: 15000,
        ability: "blind"
    image: "https://files.catbox.moe/6e9lvz.jpg"
}
],

image: "https://i.ibb.co/9ksxPcRw/527968451e980d63fa2d4a7c1895b289.jpg",

ability: {
name: "Kyoka Suigetsu",
description: "قام أيزن بخداع الجميع وخفض الضرر القادم 50%",
effect: "halfDamage"
}
},

{
name: "Yhwach",
hp: 70000,
maxHp: 70000,
attack: 2500,

followers: [
{
    name: "Jugram",
    hp: 18000,
    ability: "reflect"
    image: "https://files.catbox.moe/1vuy9d.jpg"
},
{
    name: "Uryu",
    hp: 18000,
        ability: "dodge"
    image: "https://files.catbox.moe/q77oxp.jpg"
}
],

image: "https://i.ibb.co/HW8VPVx/52432833eade63aa7067622060e66183.jpg",

ability: {
name: "The Almighty",
description: "رأى يوهاباخ المستقبل وتجنب الهجمة بالكامل",
effect: "dodge"
}
},

{
name: "Tokinada",
hp: 60000,
maxHp: 60000,
attack: 2500,

followers: [
{
    name: "Hikone",
    hp: 16000,
    ability: "bonusDamage"
    image: "https://files.catbox.moe/i1l10b.jpg"
},
{
    name: "Aura",
    hp: 16000,
        ability: "healBoss"
    image: "https://files.catbox.moe/sve9lh.jpg"
}
],

image: "https://i.ibb.co/LDdFC0sT/17145c15b01b425c4562f5dedda5ae28.jpg",

ability: {
name: "Enrakyoten",
description: "نسخ قدرة قوية واستعاد 4000 HP",
effect: "heal"
}
},

{
name: "Imu",
hp: 100000,
maxHp: 100000,
  attack: 3000,
followers: [
{
    name: "Saturn",
    hp: 20000,
    ability: "healBoss"
    image: "https://files.catbox.moe/iispeh.jpg"
},
{
    name: "Garling",
    hp: 20000,
        ability: "bonusDamage"
    image: "https://files.catbox.moe/42bjc5.jpg"
}
],

  
image: "https://i.ibb.co/pvVx2yTN/24f563ae16e1fd49977688a5c800c7e6.jpg",
ability: {
name: "Unknown Power",
description: "استعاد 10000 HP من قوته الغامضة",
effect: "bigHeal"
}
},

{
name: "Joy Boy",
hp: 90000,
maxHp: 90000,
  attack: 3500,

followers: [
{
    name: "Zoro",
    hp: 25000,
    ability: "bonusDamage"
    image: "https://files.catbox.moe/wvaecf.jpg"
},
{
    name: "Sanji",
    hp: 25000,
    ability: "healBoss"
    image: "https://files.catbox.moe/8hufgb.jpg"
}
],

  
image: "https://i.ibb.co/fGMK2s9z/c59baa23779c58bc8351e2f4a308d419.jpg",
ability: {
name: "Nika",
description: "أطلق قوة نيكا وألحق ضرراً مضاعفاً",
effect: "doubleDamage"
}
},

{
name: "Madara",
hp: 65000,
maxHp: 65000,
  attack: 3000,

followers: [
{
    name: "Obito",
    hp: 20000,
    ability: "dodge"
    image: "https://files.catbox.moe/p7lq99.jpg"
},
{
    name: "Pain",
    hp: 20000,
    ability: "reflect"

    image: "https://files.catbox.moe/p3o4ww.jpg"
}
],

  
image: "https://i.ibb.co/whT9p1GX/6d2b34e75a541170762589b638248d60.jpg",
ability: {
name: "Susanoo",
description: "استدعى السوسانو واستعاد 5000 HP",
effect: "heal"
}
},

{
name: "Kaido",
hp: 80000,
maxHp: 80000,
  attack: 3000,

followers: [
{
    name: "King",
    hp: 20000,
    ability: "reduceDamage"
    image: "https://files.catbox.moe/9c6tda.jpg"
},
{
    name: "Queen",
    hp: 20000,
        ability: "poison"
    image: "https://files.catbox.moe/zat21v.jpg"
}
],
  
image: "https://i.ibb.co/m531jPmT/3efd2af2492ded6dc0c1f69b1c65c533.jpg",
ability: {
name: "Dragon Form",
description: "تحول إلى تنين وخفض الضرر المستلم",
effect: "reduceDamage"
}
},

{
name: "Roger",
hp: 85000,
maxHp: 85000,
  attack: 3000,

followers: [
{
    name: "Rayleigh",
    hp: 18000,
    ability: "bonusDamage"
    image: "https://files.catbox.moe/0qz0nl.jpg"
},
{
    name: "Gaban",
    hp: 18000,
    ability: "reflect"
    image: "https://files.catbox.moe/pqq9da.jpg"
}
],

  
image: "https://i.ibb.co/rKwwTPhv/49eabbd5a9f5ee5fd47ed6eef7ac1156.jpg",
ability: {
name: "Conqueror Haki",
description: "أطلق الهاكي الملكي وأضعف المهاجمين",
effect: "reduceDamage"
}
},

{
name: "Meruem",
hp: 55000,
maxHp: 55000,
  attack: 2500,

followers: [
{
    name: "Youpi",
    hp: 22000,
    ability: "bonusDamage"
    image: "https://files.catbox.moe/rht29c.jpg"
},
{
    name: "Pouf",
    hp: 22000,
        ability: "healBoss"
    image: "https://files.catbox.moe/sxvyby.jpg"
}
],
  
image: "https://i.ibb.co/M5Jkz69y/af5a90f6f02b1b6671b51a4c701a5ed6.jpg",
ability: {
name: "Evolution",
description: "تطور ميرويم واستعاد 3000 HP",
effect: "heal"
}
},

{
name: "Teach",
hp: 75000,
maxHp: 75000,
  attack: 2500,

followers: [
{
    name: "Shiryu",
    hp: 20000,
    ability: "dodge"
    image: "https://files.catbox.moe/uhxd0l.jpg"
},
{
    name: "Burgess",
    hp: 20000,
    ability: "critical"
    image: "https://files.catbox.moe/ejt1ox.jpg"
}
],
  
image: "https://i.ibb.co/ns9FFjSG/4905692f38d6e5225eab3be16b5ab855.jpg",
ability: {
name: "Darkness",
description: "ابتلع الظلام جزءاً من الضرر",
effect: "halfDamage"
}
}

]

module.exports = bosses
