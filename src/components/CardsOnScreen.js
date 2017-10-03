import React from 'react'
import Card from './Card'

const CardsOnScreen = props => {

  let cards = props.cardsOnScreen.map(card => {
    let clickCard = () => props.clickCard(card)
    return(
      <Card
        key={card.id}
        card={card}
        clickCard={clickCard}
        selectedCards={props.selectedCards}
      />
    )
  })
  return(
    <div>
      {cards}
    </div>
  )
}

export default CardsOnScreen
