const battleState = {

activeBattle: null,

battleInterval: null,

captureIntervals: {},

  fights: {},

respawnTimers: {},

battleDuration: 5 * 60,

maxPlayers: 8,

flags: ['A', 'B', 'C', 'D', 'E']

}

module.exports = battleState
