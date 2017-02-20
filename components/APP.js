'use strict'

import React from 'react'
import io from 'socket.io-client'
import Header from './parts/Header'
import Game from './game/Game'

class APP extends React.Component {

  constructor () {
    super()
    this.state = {
      status: 'disconnected',
      error: '',
      currentUser: 'none',
      currentTeam: 'none',
      turn: 'none',
      players: [],
      walls: [],
      moves: []
    }
    this.emit = this.emit.bind(this)
  }

  componentWillMount () {
    this.socket = io('localhost:3000')
    this.socket.on('connect', () => this.setState({ status: 'connected' }))
    this.socket.on('disconnect', () => this.setState({ status: 'disconnected' }))
    this.socket.on('error', (err) => this.setState({ error: err.mess }))
    this.socket.on('update', (x) => this.setState({ ...x }))
  }

  emit (eventName, payload) {
    this.socket.emit(eventName, payload)
  }

  render () {
    return (
      <div>
        <Header {...this.state} />
        <div className='game-container'>
          <Game emit={this.emit} {...this.state} />
        </div>
      </div>
    )
  }
}

module.exports = APP
