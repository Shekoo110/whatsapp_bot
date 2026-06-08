const games = {}

function createGame(
groupId,
playerX,
playerO
) {

games[groupId] = {

playerX,

playerO,

turn: playerX,

board: [
    '1','2','3',
    '4','5','6',
    '7','8','9'
]

}

}

function getGame(groupId) {

return games[groupId]

}

function deleteGame(groupId) {

delete games[groupId]

}

function renderBoard(board) {

return "${board[0]} | ${board[1]} | ${board[2]} ───────── ${board[3]} | ${board[4]} | ${board[5]} ───────── ${board[6]} | ${board[7]} | ${board[8]}"

}

function checkWinner(board) {

const wins = [

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

]

for (const combo of wins) {

const [a,b,c] =
    combo

if (
    board[a] === board[b] &&
    board[b] === board[c]
) {

    return board[a]
}

}

return null

}

function isDraw(board) {

return board.every(
cell =>
cell === '❌' ||
cell === '⭕'
)

}

module.exports = {

games,

createGame,

getGame,

deleteGame,

renderBoard,

checkWinner,

isDraw

}
