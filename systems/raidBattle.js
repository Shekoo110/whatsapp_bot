const Player =
require('../models/Player')

const Raid =
require('../models/Raid')

const kingdoms =
require('./raidKingdoms')

const raidAbilities =
require('./raidAbilities')

const {
    calculatePlayerDamage
} =
require('./raidUtils')

const {
    topReward,
    normalReward
} =
require('./raidRewards')

// =========================
// إعدادات الرايد
// =========================

const ATTACK_COOLDOWN =
30000

const RAGE_PHASE_1 =
50

const RAGE_PHASE_2 =
20

// =========================
// الشخصية الحية الحالية
// =========================

function getAliveCharacter(player){

    if(
        !player.characters ||
        !player.characters.length
    ){
        return null
    }

    for(
        const character
        of player.characters
    ){

        if(character.dead)
            continue

        if(
            character.currentHp ===
            undefined
        ){

            character.currentHp =
            character.power

        }

        if(
            character.currentHp > 0
        ){

            return character

        }

    }

    return null

}

// =========================
// هل اللاعب انتهى؟
// =========================

function isPlayerDead(player){

    return !getAliveCharacter(
        player
    )

}

// =========================
// إعادة الشخصيات للحياة
// =========================

function resetCharacters(player){

    if(
        !player.characters
    ) return

    for(
        const character
        of player.characters
    ){

        character.dead = false

        character.currentHp =
        character.power

    }

}

// =========================
// مرحلة غضب البوس
// =========================

function getBossPhase(raid){

    const percent =
    (
        raid.hp /
        raid.maxHp
    ) * 100

    if(
        percent <=
        RAGE_PHASE_2
    ){

        return 3

    }

    if(
        percent <=
        RAGE_PHASE_1
    ){

        return 2

    }

    return 1

}

// =========================
// ترتيب أعلى الضرر
// =========================

function getRanking(raid){

    return Object
    .entries(
        raid.damageMap || {}
    )
    .sort(
        (a,b)=>
        b[1]-a[1]
    )

}
// =========================
// هجوم الزعيم
// =========================

function bossAttack(
    raid,
    player
){

    const character =
        getAliveCharacter(player)

    if(!character){

        return{

            playerDead:true,

            damage:0,

            text:
"☠️ جميع شخصياتك سقطت."

        }

    }

    // =====================
    // المرحلة الحالية
    // =====================

    const phase =
        getBossPhase(raid)

    let damage =
        raid.bossAttack

    if(phase === 2){

        damage =
        Math.floor(
            damage * 1.35
        )

    }

    else if(phase === 3){

        damage =
        Math.floor(
            damage * 1.8
        )

    }

    let battleText = ''

    // =====================
    // قدرة المملكة
    // =====================

    const kingdom =
        kingdoms.find(
            k =>
            k.name ===
            raid.kingdom
        )

    if(
        kingdom &&
        kingdom.bossSkill &&
        Math.random()*100 <=
        kingdom.bossSkill.chance
    ){

        damage =
        Math.floor(
            damage *
            kingdom.bossSkill.multiplier
        )

        battleText +=

`${kingdom.bossSkill.text}

`

    }

    // =====================
    // قدرة البوس الخاصة
    // =====================

    if(
        raidAbilities[
            raid.bossName
        ]
    ){

        const skill =
        raidAbilities[
            raid.bossName
        ]

        if(
            Math.random()*100 <=
            skill.chance
        ){

            damage =
            Math.floor(
                damage *
                skill.multiplier
            )

            battleText +=

`${skill.text}

`

        }

    }

    // =====================
    // دودج
    // =====================

    const dodgeChance =

        (player.dodge || 0)+

        (player.dodgeBonus || 0)

    if(
        Math.random()*100 <=
        dodgeChance
    ){

        return{

            playerDead:false,

            dodged:true,

            damage:0,

            current:character,

            text:

`${battleText}
🌀

${character.name}

تفادى الهجوم بنجاح.`

        }

    }

    // =====================
    // الدرع
    // =====================

    if(
        player.shield > 0
    ){

        const absorbed =
        Math.min(
            damage,
            player.shield
        )

        player.shield -=
        absorbed

        damage -=
        absorbed

        battleText +=

`🛡️ امتص الدرع

${absorbed.toLocaleString()}

ضرر

`

    }

    // =====================
    // الدفاع
    // =====================

    damage -=

    (player.defense||0)

    +

    (player.defenseBonus||0)

    if(
        damage < 1
    ){

        damage = 1

    }

    character.currentHp -=
    damage
      // =====================
    // الشخصية ماتت
    // =====================

    if(
        character.currentHp <= 0
    ){

        character.currentHp = 0

        character.dead = true

        const nextCharacter =
            getAliveCharacter(
                player
            )

        // =====================
        // يوجد شخصية أخرى
        // =====================

        if(nextCharacter){

            return{

                playerDead:false,

                damage,

                current:
                nextCharacter,

                text:

`${battleText}
╔══════『 💀 سقوط مقاتل 』══════╗

⚔️ الزعيم

${raid.bossName}

ألحق

💥 ${damage.toLocaleString()}

ضرر

━━━━━━━━━━━━━━━━━━

❌ تم القضاء على

👤 ${character.name}

━━━━━━━━━━━━━━━━━━

⚔️ دخل أرض المعركة

👤 ${nextCharacter.name}

❤️ HP

${nextCharacter.currentHp.toLocaleString()}

╚══════════════════════╝`

            }

        }

        // =====================
        // جميع الشخصيات ماتت
        // =====================

        return{

            playerDead:true,

            damage,

            current:null,

            text:

`${battleText}
╔══════『 ☠️ الهزيمة 』══════╗

💀

سقطت جميع شخصياتك

━━━━━━━━━━━━━━━━━━

🏴 انتهت مشاركتك

في هذا الغزو

💔 حاول مجدداً

في الغزو القادم

╚══════════════════════╝`

        }

    }

    // =====================
    // الشخصية بقيت حية
    // =====================

    return{

        playerDead:false,

        damage,

        current:character,

        text:

`${battleText}
╔══════『 ⚔️ هجوم الزعيم 』══════╗

👹

${raid.bossName}

━━━━━━━━━━━━━━━━━━

💥 الضرر

${damage.toLocaleString()}

━━━━━━━━━━━━━━━━━━

👤

${character.name}

❤️ المتبقي

${character.currentHp.toLocaleString()} HP

╚══════════════════════╝`

    }

}
// =========================
// هجوم اللاعب
// =========================

async function attackRaid({

    sock,
    jid,
    userId

}){

    const raid =
    await Raid.findOne({

        active:true

    })

    if(!raid){

        return sock.sendMessage(

            jid,

            {

text:

`❌ لا يوجد أي غزو نشط حالياً.

استخدم

.رايد

لمعرفة موعد الغزو القادم.`

            }

        )

    }

    const player =
    await Player.findOne({

        userId

    })

    if(!player){

        return sock.sendMessage(

            jid,

            {

                text:
"❌ لا يوجد حساب."

            }

        )

    }

    // =====================
    // جميع الشخصيات ماتت
    // =====================

    if(

        isPlayerDead(player)

    ){

        return sock.sendMessage(

            jid,

            {

text:

`☠️ جميع شخصياتك سقطت.

لا يمكنك المشاركة

حتى ينتهي الرايد.`

            }

        )

    }

    // =====================
    // كولداون
    // =====================

    const now = Date.now()

    if(

        player.lastRaidAttack &&

        now -

        player.lastRaidAttack

        < ATTACK_COOLDOWN

    ){

        const remain =

        Math.ceil(

            (

                ATTACK_COOLDOWN -

                (

                    now -

                    player.lastRaidAttack

                )

            ) / 1000

        )

        return sock.sendMessage(

            jid,

            {

text:

`⏳ انتظر

${remain}

ثانية

ثم هاجم مرة أخرى.`

            }

        )

    }

    player.lastRaidAttack = now

    // =====================
    // حساب ضرر اللاعب
    // =====================

    const battle =

    calculatePlayerDamage(

        player

    )

    let damage =
    battle.damage

    let abilityText =
    battle.abilityText

    // =====================
    // مرحلة البوس
    // =====================

    const phase =

    getBossPhase(

        raid

    )

    let phaseText = ""

    if(

        phase === 2 &&

        !raid.phase2

    ){

        raid.phase2 = true

        phaseText =

`🔥════════════════════

😡 دخل الزعيم

مرحلة الغضب

━━━━━━━━━━━━━━

زاد ضرره بنسبة

35%

════════════════════🔥`

    }

    if(

        phase === 3 &&

        !raid.phase3

    ){

        raid.phase3 = true

        phaseText =

`☠️════════════════════

👹 الزعيم

فقد السيطرة

━━━━━━━━━━━━━━

دخل المرحلة الأخيرة

وزاد ضرره بشكل هائل

════════════════════☠️`

    }

    raid.hp -= damage

    if(

        raid.hp < 0

    ){

        raid.hp = 0

    }
      // =====================
    // حفظ الضرر
    // =====================

    if(!raid.damageMap){

        raid.damageMap = {}

    }

    raid.damageMap[userId] =
    (
        raid.damageMap[userId] || 0
    ) + damage

    raid.totalDamage =
    (
        raid.totalDamage || 0
    ) + damage

    // =====================
    // هجوم الزعيم
    // =====================

    const bossResult =
    bossAttack(
        raid,
        player
    )

    // =====================
    // نسبة الصحة
    // =====================

    const hpPercent =
    Math.floor(

        (
            raid.hp /
            raid.maxHp
        ) * 100

    )

    const barLength = 20

const filled = Math.round(
    (hpPercent / 100) * barLength
)

const hpBar =
    "█".repeat(filled) +
    "░".repeat(barLength - filled)

    await player.save()

    await raid.save()

    // =====================
    // رسالة القتال
    // =====================

    await sock.sendMessage(

        jid,

        {

text:

`🏰 ═════〔 غــزو المملكة 〕═════ 🏰

⚔️ المهاجم

👤 @${userId.split("@")[0]}

━━━━━━━━━━━━━━━━━━

👹 الزعيم

${raid.bossName}

🏰 المملكة

${raid.kingdom}

━━━━━━━━━━━━━━━━━━

${phaseText}

${abilityText || "⚔️ هجوم عادي"}

${battle.crit ? "🔥 ضربة حرجة" : ""}

━━━━━━━━━━━━━━━━━━

💥 الضرر

${damage.toLocaleString()}

━━━━━━━━━━━━━━━━━━

❤️ صحة الزعيم

${hpBar}

${hpPercent}%

${raid.hp.toLocaleString()} / ${raid.maxHp.toLocaleString()}

━━━━━━━━━━━━━━━━━━

${bossResult.text}`,

mentions:[
userId
]

        }

    )
      // =====================
    // انتهاء الرايد
    // =====================

    if (raid.hp <= 0) {

        raid.active = false

        const ranking =
            getRanking(raid)

        await sock.sendMessage(jid, {

text:

`🎉 ═════〔 تم تحرير المملكة 〕═════ 🎉

🏰 المملكة

${raid.kingdom}

👹 الزعيم

${raid.bossName}

تمت هزيمته بنجاح!

━━━━━━━━━━━━━━━━━━

🏆 يتم الآن احتساب الجوائز...

🎁 يرجى الانتظار...`

        })

        for (

            let i = 0;

            i < ranking.length;

            i++

        ) {

            const [

                targetId,

                totalDamage

            ] = ranking[i]

            const targetPlayer =
                await Player.findOne({

                    userId: targetId

                })

            if (!targetPlayer)
                continue

            let reward

            if (i < 3) {

                reward =
                    topReward(

                        i + 1,

                        raid.anime

                    )

            }

            else {

                reward =
                    normalReward()

            }

            // =====================
            // فلوس
            // =====================

            targetPlayer.money +=
                reward.money

            // =====================
            // الصناديق
            // =====================

            if (reward.boxes) {

                targetPlayer.boxes.sss_chance +=
                    reward.boxes.sss_chance || 0

                targetPlayer.boxes.sss_high +=
                    reward.boxes.sss_high || 0

            }

            // =====================
            // شخصية SSS
            // =====================

            if (reward.character) {

                targetPlayer.characters.push({

                    ...reward.character,

                    originalPower:
                        reward.character.power,

                    evolutionLevel: 0,

                    urAbilities: [],

                    currentHp:
                        reward.character.power,

                    dead: false

                })

            }

            // =====================
            // إعادة الشخصيات للحياة
            // =====================

            resetCharacters(
                targetPlayer
            )

            await targetPlayer.save()

            // =====================
            // رسالة الجائزة
            // =====================

            await sock.sendMessage(jid, {

text:

`🏆 ═════〔 الجائزة 〕═════ 🏆

${i == 0 ? "🥇 الأول" :
i == 1 ? "🥈 الثاني" :
i == 2 ? "🥉 الثالث" :
"🎖️ مشارك"}

👤 @${targetId.split("@")[0]}

━━━━━━━━━━━━━━━━━━

💰 ${reward.money.toLocaleString()}

${reward.character ?

`🌟 حصل على

${reward.character.name}

⭐ SSS`

:

"❌ لم يحصل على شخصية SSS"

}

🎁 SSS Chance ×${reward.boxes.sss_chance}

🎁 SSS High ×${reward.boxes.sss_high}

💥 إجمالي الضرر

${totalDamage.toLocaleString()}`,

mentions: [

targetId

]

            })

        }

        raid.active = false

raid.endedAt = Date.now()

await raid.save()

    }

}
// =========================
// هل يوجد رايد؟
// =========================

async function isRaidRunning(){

    return await Raid.findOne({

        active:true

    })

}

// =========================
// معلومات الرايد
// =========================

async function getRaidInfo(){

    return await Raid.findOne({

        active:true

    })

}

// =========================
// EXPORTS
// =========================

module.exports = {

    attackRaid,

    isRaidRunning,

    getRaidInfo

}
