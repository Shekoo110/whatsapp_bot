module.exports = {

bossShield() {

return {

type: "shield",

value: 300000,

message: "🛡️ البوس كوّن درعاً بقوة 300,000!"

}

},

massAttack() {

return {

type: "aoe",

damage: 25000,

message: "💥 البوس هاجم جميع الشخصيات!"

}

},

rageMode() {

return {

type: "buff",

damageMultiplier: 1.5,

message: "🔥 دخل البوس في وضع Rage! زاد ضرره 50%."

}

},

regeneration() {

return {

type: "heal",

percent: 5,

message: "💚 استعاد البوس 5% من صحته."

}

},

counterSlash() {

return {

type: "counter",

chance: 30,

damage: 20000,

message: "⚔️ البوس رد الهجوم!"

}

},

devilLaser() {

return {

type: "single",

damage: 45000,

message: "☄️ Devil Laser!"

}

},

meteor() {

return {

type: "aoe",

damage: 18000,

message: "🌠 Meteor Shower!"

}

},

sealPower() {

return {

type: "debuff",

damageReduction: 30,

duration: 2,

message: "⛓️ تم ختم قوة الشخصية!"

}

},

chaosShield() {

return {

type: "shield",

value: 500000,

message: "🔷 Chaos Shield!"

}

},

thunderStorm() {

return {

type: "aoe",

damage: 30000,

message: "⚡ Thunder Storm!"

}

},

freeze() {

return {

type: "freeze",

duration: 1,

message: "❄️ تجمدت الشخصية!"

}

},

fear() {

return {

type: "fear",

duration: 1,

message: "😨 الشخصية خائفة!"

}

},

poison() {

return {

type: "poison",

damage: 10000,

duration: 3,

message: "☠️ أصيبت الشخصية بالسم."

}

},

execute() {

return {

type: "execute",

hpPercent: 20,

message: "☠️ تم القضاء على الشخصية!"

}

},

reflect() {

return {

type: "reflect",

percent: 25,

message: "🪞 انعكس جزء من الضرر."

}

}

}
