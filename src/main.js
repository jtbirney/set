import './main.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import deck from './constants/deck'
import App from './components/App'

ReactDOM.render(
  <App deck={deck} />,
  document.getElementById('app')
)
