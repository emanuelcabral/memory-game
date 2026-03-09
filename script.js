const board = document.getElementById("board")
const restartBtn = document.getElementById("restart")

const timeDisplay = document.getElementById("time")
const movesDisplay = document.getElementById("moves")

// sonidos
const flipSound = new Audio("sounds/flip.mp3")
const matchSound = new Audio("sounds/match.mp3")
const winSound = new Audio("sounds/win.mp3")

let icons = ["🍎","🍌","🍇","🍓","🍍","🥝","🍒","🍉"]
let cards = [...icons, ...icons]

let flippedCards = []
let matched = 0
let moves = 0

let time = 0
let timer = null

function shuffle(array){
return array.sort(() => Math.random() - 0.5)
}

function startTimer(){

if(timer !== null) return

timer = setInterval(()=>{

time++
timeDisplay.textContent = time

},1000)

}

function createBoard(){

board.innerHTML = ""

cards = shuffle(cards)

cards.forEach(icon => {

const card = document.createElement("div")

card.classList.add("card")

card.dataset.icon = icon

card.innerHTML = ""

card.addEventListener("click", flipCard)

board.appendChild(card)

})

}

function flipCard(){

startTimer()

if(this.classList.contains("flipped") || flippedCards.length === 2) return

flipSound.play()

this.classList.add("flipped")

this.innerHTML = this.dataset.icon

flippedCards.push(this)

if(flippedCards.length === 2){

moves++
movesDisplay.textContent = moves

checkMatch()

}

}

function checkMatch(){

let [card1, card2] = flippedCards

if(card1.dataset.icon === card2.dataset.icon){

matchSound.play()

matched++

flippedCards = []

if(matched === 8){

clearInterval(timer)

setTimeout(()=>{

winSound.play()

alert(`Ganaste!
Tiempo: ${time} segundos
Movimientos: ${moves}`)

},500)

}

}else{

setTimeout(()=>{

card1.classList.remove("flipped")
card2.classList.remove("flipped")

card1.innerHTML = ""
card2.innerHTML = ""

flippedCards = []

},900)

}

}

restartBtn.addEventListener("click", ()=>{

matched = 0
moves = 0
time = 0

movesDisplay.textContent = 0
timeDisplay.textContent = 0

clearInterval(timer)
timer = null

flippedCards = []

createBoard()

})

createBoard()