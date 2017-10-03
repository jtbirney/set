import React from 'react'

const Card = (props) => {
  let number = props.card.number
  let shapes = []
  for (let i = 0; i < number; i++){
    shapes.push(
      <div key={i} className={`shapes ${props.card.shape} ${props.card.color}-${props.card.fill}`}></div>
    )
  }

  let selected = ""
  if (props.selectedCards.includes(props.card)) {
    selected = "selected"
  }

  return (
    <div className={`small-4 columns text-center centered-column column-block`} onClick={props.clickCard}>
      <div className={`card middle ${selected}`}>
        {shapes}
      </div>
    </div>
  )
}

export default Card
