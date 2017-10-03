let shapes = ['rectangle', 'diamond', 'circle']
let colors = ['red', 'green', 'purple']
let fills = ['empty', 'solid', 'striped']
let numbers = [1, 2, 3]

let deckArray = []
let cardNumber = 1

let newCard = (id, shape, color, fill, number) => {}

shapes.forEach(function(shape) {
  colors.forEach(function(color) {
    fills.forEach(function(fill) {
      numbers.forEach(function(number) {
        let newCard = {
          id: cardNumber,
          shape: shape,
          color: color,
          fill: fill,
          number: number
        }
        deckArray.push(newCard)
        cardNumber ++
      })
    })
  })
})

let shuffle = (array) => {
  let shuffledArray = []

  while (array.length > 0) {
    let randomIndex = Math.floor(Math.random() * array.length)
    shuffledArray.push(array[randomIndex])
    array.splice(randomIndex, 1)
  }
  return shuffledArray;

}

// let shuffledDeckArray = deckArray.splice(0, 12)
let shuffledDeckArray = shuffle(deckArray)

shuffledDeckArray.forEach(function(card, index) {
  card.id = index
})

const deck = {cards: shuffledDeckArray}

export default deck
