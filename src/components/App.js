import React, { Component } from 'react'
import CardsOnScreen from './CardsOnScreen'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      deck: props.deck.cards,
      cardsOnScreen: [],
      selectedCards: [],
      player1Score: 0,
      player2Score: 0,
      gameOver: false
    }

    this.clearSelected = this.clearSelected.bind(this)
    this.drawCard = this.drawCard.bind(this)
    this.removeMatchedCards = this.removeMatchedCards.bind(this)
    this.replaceMatchedCards = this.replaceMatchedCards.bind(this)
    this.clickCard = this.clickCard.bind(this)
    this.checkElementMatch = this.checkElementMatch.bind(this)
    this.checkCardMatch = this.checkCardMatch.bind(this)
    this.addRow = this.addRow.bind(this)
  }

  clearSelected() {
    this.setState({ selectedCards: [] })
  }

  drawCard() {
    let nextCard = this.state.deck[0]
    let newCards = this.state.cardsOnScreen
    newCards.push(nextCard)
    let newDeck = this.state.deck
    newDeck.shift()
    this.setState({
      deck: newDeck,
      cardsOnScreen: newCards
    })
  }


  removeMatchedCards(arrayOfCards) {
    let newCards = this.state.cardsOnScreen
    arrayOfCards.forEach(card => {
      let cardIndex = newCards.indexOf(card)
      newCards.splice(cardIndex, 1)
    })
    this.setState({ cardsOnScreen: newCards })
  }

  replaceMatchedCards(arrayOfCards) {
    let newCards = this.state.cardsOnScreen
    arrayOfCards.forEach(card => {
      let cardIndex = newCards.indexOf(card)
      newCards.splice(cardIndex, 1, this.state.deck[0])
      let newDeck = this.state.deck
      newDeck.shift()
      this.setState({ deck: newDeck })
    })
    this.setState({ cardsOnScreen: newCards })
  }

  clickCard(card) {
    if (!this.state.selectedCards.includes(card)) {
      this.setState({ error: null })
      if (this.state.selectedCards.length < 3) {
        let newSelectedCards = this.state.selectedCards
        let addedCard = [card]
        newSelectedCards = newSelectedCards.concat(addedCard)
        this.setState({ selectedCards: newSelectedCards })
      }
    }
  }

  checkElementMatch(arrayOfCards, element) {
    let card1 = arrayOfCards[0]
    let card2 = arrayOfCards[1]
    let card3 = arrayOfCards[2]
    if (card1[element] === card2[element] && card2[element] === card3[element] && card1[element] === card3[element]) {
      return true
    } else if (card1[element] !== card2[element] && card2[element] !== card3[element] && card1[element] !== card3[element]) {
      return true
    } else {
      return false
    }
  }

  checkCardMatch(arrayOfCards, player) {
    let isASet = false
    let gameOver = false
    if (arrayOfCards.length === 3) {
      let colorMatch = this.checkElementMatch(arrayOfCards, 'color')
      let shapeMatch = this.checkElementMatch(arrayOfCards, 'shape')
      let fillMatch = this.checkElementMatch(arrayOfCards, 'fill')
      let numberMatch = this.checkElementMatch(arrayOfCards, 'number')
      if (colorMatch && shapeMatch && fillMatch && numberMatch) {
        isASet = true
        if (this.state.cardsOnScreen.length === 12 && this.state.deck.length > 0) {
          this.replaceMatchedCards(arrayOfCards)
        } else {
          this.removeMatchedCards(arrayOfCards)
          if (this.state.cardsOnScreen.length === 0) {
            gameOver = true
          }
        }
        this.addScore(player)
      } else {
        this.setState({ error: "Try Again" })
      }
      console.log(isASet)
      this.setState({
        selectedCards: [],
        gameOver: gameOver
      })
    } else {
      this.setState({ error: "Select 3 cards"})
    }
  }

  addScore(player) {
    let newScore
    if (player == 1) {
      newScore = this.state.player1Score + 1
      this.setState({
        player1Score: newScore,
        error: null
      })
    } else if (player == 2) {
      newScore = this.state.player2Score + 1
      this.setState({
        player2Score: newScore,
        error: null
      })
    }
  }

  addRow() {
    if (this.state.deck.length > 0) {
      for (let i = 0; i < 3; i++){
        this.drawCard()
      }
    } else {
      this.setState({ gameOver: true })
    }
  }

  componentDidMount() {
    for (let i = 0; i < 12; i++){
      this.drawCard()
    }
  }

  render() {
    let winningPlayer
    if (this.state.player1Score === this.state.player2Score) {
      winningPlayer = "Its a tie!"
    } else if (this.state.player1Score > this.state.player2Score) {
      winningPlayer = "Player 1 Wins!"
    } else {
      winningPlayer = "Player 2 Wins!"
    }

    let gameOverDiv
    if (this.state.gameOver) {
      gameOverDiv = <h1 className="text-center">{winningPlayer}</h1>
    }

    let errorDiv
    if (this.state.error) {
      errorDiv = <div className="error"><h3>{this.state.error}</h3></div>
    }
    console.log(this.state.deck)
    console.log(this.state.cardsOnScreen)
    let checkMatchPlayer1 = () => this.checkCardMatch(this.state.selectedCards, 1)
    let checkMatchPlayer2 = () => this.checkCardMatch(this.state.selectedCards, 2)
    return(
      <div className="row">
        <h1 className="text-center">Ready, set ... Set!!</h1>
        <div className="row">
          <div className="small-9 columns">
            <div className="row">
              {gameOverDiv}
              <CardsOnScreen
                deck={this.props.deck.cards}
                cardsOnScreen={this.state.cardsOnScreen}
                clickCard={this.clickCard}
                selectedCards={this.state.selectedCards}
              />
            </div>
          </div>
          <div className="small-3 columns text-center">
            {errorDiv}
            <button type="button" className="button" onClick={checkMatchPlayer1}>Add Set for Player 1</button>
            <h4>Player 1 Score</h4>
            <h3>{this.state.player1Score}</h3>
            <button type="button" className="button" onClick={checkMatchPlayer2}>Add Set for Player 2</button>
            <h4>Player 2 Score:</h4>
            <h3>{this.state.player2Score}</h3>
            <div>
              <button type="button" className="button" onClick={this.addRow}>We're stuck!</button>
            </div>
            <div>
              <button type="button" className="button" onClick={this.clearSelected}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
