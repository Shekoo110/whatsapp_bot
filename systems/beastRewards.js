const EGG_SHOP_TICKETS = {

    first: 20,
    second: 15,
    third: 10,

    others: 5
}

const EGG_BEAST_REWARDS = {

    first: {
        egg: 1,
        money: 100000,
        xp: 500
    },

    second: {
        egg: 1,
        money: 75000,
        xp: 400
    },

    third: {
        egg: 1,
        money: 50000,
        xp: 300
    },

    others: {
        tickets: 5,
        money: 25000,
        xp: 150
    }
}

const NORMAL_BEAST_REWARDS = {

    first: {
        tickets: 20,
        money: 100000,
        xp: 500
    },

    second: {
        tickets: 15,
        money: 75000,
        xp: 400
    },

    third: {
        tickets: 10,
        money: 50000,
        xp: 300
    },

    others: {
        tickets: 5,
        money: 25000,
        xp: 150
    }
}

function getEggCarrierReward(rank) {

    if (rank === 1)
        return EGG_BEAST_REWARDS.first

    if (rank === 2)
        return EGG_BEAST_REWARDS.second

    if (rank === 3)
        return EGG_BEAST_REWARDS.third

    return EGG_BEAST_REWARDS.others
}

function getNormalReward(rank) {

    if (rank === 1)
        return NORMAL_BEAST_REWARDS.first

    if (rank === 2)
        return NORMAL_BEAST_REWARDS.second

    if (rank === 3)
        return NORMAL_BEAST_REWARDS.third

    return NORMAL_BEAST_REWARDS.others
}

module.exports = {

    EGG_SHOP_TICKETS,

    EGG_BEAST_REWARDS,
    NORMAL_BEAST_REWARDS,

    getEggCarrierReward,
    getNormalReward
}
