const _ = require('lodash')
const quiche = require('quiche')

const C1 = 1 // цена деления амперметра
const C2 = 20 // цена деления вольтметра

const U_MAX = 400
const I_MAX = 20

const GAMMA_I = 0.5
const GAMMA_U = 0.5

function randomRange(a, b) {
  return Math.floor(Math.random() * b) + a
}

const deltaI = (C1 / 2) + ((GAMMA_I * I_MAX) / 100)
const deltaU = (C2 / 2) + ((GAMMA_U * U_MAX) / 100)

const bin = []

for (let i = 0; i < 5; i++) {
  const I = randomRange(1, 20)
  const U = randomRange(1, 400)

  const P = U * I

  bin.push({P, U, I})
}


const epsilonI = deltaI / _.last(bin).I
const epsilonU = deltaU / _.last(bin).U

const epsilonP = (epsilonI + epsilonU).toFixed(3)
const deltaP = _.last(bin).P * epsilonP

const chart2 = quiche('line')

chart2.setTitle('P=f(U)')
chart2.addData(_.sortBy(_.map(bin, (e) => e.P)), 'P', '00FF00')
chart2.addAxisLabels('x', _.sortBy(_.map(bin, (e) => e.U)))
chart2.setAutoScaling()
chart2.setTransparentBackground()

console.log(bin)

console.log({
  epsilonI,
  epsilonU,
  epsilonP,
  deltaP
})

console.log(`График: ${chart2.getUrl(true)}`)

process.exit()
