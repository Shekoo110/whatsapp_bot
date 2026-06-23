const characters = require('./characters.json')
const Player = require('./models/Player')

const auctionGroups = [

'120363020823525909@g.us',

'120363409897316453@g.us'

]

let currentAuction = {

active: false,

character: null,

highestBid: 100000,

highestBidder: null,

endTime: null

}

function getAuctionCharacters() {

return characters.filter(

c =>

c.rarity === 'SSS' &&

c.power >= 6000

)

}

function getRandomAuctionCharacter() {

const pool = getAuctionCharacters()

return pool[
Math.floor(
Math.random() * pool.length
)
]

}
async function startAuction(sock) {

if (currentAuction.active) return

const character =
getRandomAuctionCharacter()

currentAuction = {

active: true,

character,

highestBid: 100000,

highestBidder: null,

endTime:
Date.now() +
(15 * 60 * 1000)

}

const text =

`🏛️ مزاد جديد

👤 ${character.name}

🌟 ${character.rarity}
⚔️ ${character.power}

💰 السعر الحالي:
100,000

📈 أقل زيادة:
150,000

⏳ المدة:
15 دقيقة

استخدم:
.مزايدة المبلغ`

for (const group of auctionGroups) {

await sock.sendMessage(
group,
{
text
}
)

}

setTimeout(
() => finishAuction(sock),
15 * 60 * 1000
)

}

async function finishAuction(sock) {

if (!currentAuction.active)
return

if (
!currentAuction.highestBidder
) {

for (
const group
of auctionGroups
) {

await sock.sendMessage(
group,
{
text:

`⌛ انتهى المزاد

❌ لم يزايد أحد

👤 ${currentAuction.character.name}`
}
)

}

currentAuction.active = false
return
}

const winner =
await Player.findOne({

userId:
currentAuction.highestBidder

})

if (
winner &&
winner.money >=
currentAuction.highestBid
) {

winner.money -=
currentAuction.highestBid

winner.characters.push(
currentAuction.character
)

await winner.save()

for (
const group
of auctionGroups
) {

await sock.sendMessage(
group,
{
text:

`🏆 انتهى المزاد

👑 الفائز:

@${winner.userId.split('@')[0]}

💰 السعر النهائي:
${currentAuction.highestBid.toLocaleString()}

🎁 الشخصية:

${currentAuction.character.name}`
,
mentions: [
winner.userId
]
}
)

}

}

currentAuction.active = false

}

module.exports = {

currentAuction,

auctionGroups,

getRandomAuctionCharacter,

startAuction,

finishAuction

}
