const Beast =
require('../database/Beast')

const Player =
require('../database/Player')

const beasts =
require('./beasts')

const beastAbilities =
require('./beastAbilities')

const playerAbilities =
require('./playerAbilities')

const beastRewards =
require('./beastRewards')

function randomChance(percent) {

    return (
        Math.random() * 100
    ) < percent

}

function getRandomAbility(list) {

    return list[
        Math.floor(
            Math.random() * list.length
        )
    ]

}

async function getBeast(name) {

    return await Beast.findOne({
        name
    })

}

async function getPlayer(userId) {

    return await Player.findOne({
        userId
    })

}

function getEquippedBeast(player) {

    if (
        !player ||
        !player.equippedBeast
    ) {
        return null
    }

    return beasts.find(
        b =>
            b.id ===
            player.equippedBeast
    )

}

function calculateBeastBonus(
    player
) {

    const beast =
        getEquippedBeast(player)

    if (!beast) {

        return {
            attack: 0,
            defense: 0,
            hp: 0,
            crit: 0,
            dodge: 0,
            reflect: 0
        }

    }

    return beast

}

function calculatePlayerDamage(
    player
) {

    let damage = 1000

    damage +=
        Math.floor(
            damage *
            (
                player.attackBonus || 0
            ) / 100
        )

    const pet =
        getEquippedBeast(player)

    if (pet) {

        damage +=
            Math.floor(
                damage *
                (
                    pet.attack || 0
                ) / 100
            )

    }

    return damage

}

async function addDamage(
    beast,
    player,
    damage
) {

    beast.rankings =
        beast.rankings || {}

    const current =
        beast.rankings.get(
            player.userId
        ) || 0

    beast.rankings.set(
        player.userId,
        current + damage
    )

    beast.hp -= damage

    if (
        beast.hp < 0
    ) {
        beast.hp = 0
    }

    await beast.save()

}

async function resetBeast(
    beast
) {

    beast.hp =
        beast.maxHp

    beast.rankings =
        {}

    beast.currentAbility =
        null

    await beast.save()

}

module.exports = {

    getBeast,
    getPlayer,

    calculatePlayerDamage,
    calculateBeastBonus,

    addDamage,

    resetBeast,

    getRandomAbility,
    randomChance

}
