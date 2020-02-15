import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'

import { shuffle } from '../../utils/shuffle'

import './bonneteau.styles.scss'

const Item = posed.li({})

class Bonneteau extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cups: [0, 1, 2],
      count: 5,
      ball: Math.floor(Math.random() * 3),
      interval: 0,
      isWin: false,
      messageShow: false,
      isBallVisible: true,
      playing: false,
      startGame: false,
      shuffleProcess: false
    }
  }

  componentDidUpdate() {
    if (this.state.count === 0) {
      clearInterval(this.state.interval)
    }
  }

  startGame = () => {
    this.setState({
      ball: Math.floor(Math.random() * 3),
      messageShow: false,
      playing: false,
      isBallVisible: false,
      startGame: true,
      shuffleProcess: true,
      interval: setInterval(() => {
        this.setState({
          cups: shuffle(this.state.cups),
          count: this.state.count - 1
        })
      }, 1000)
    })
  }

  showResult = (id, e) => {
    const { count, playing, ball } = this.state
    if (count !== 0) return
    if (playing === true) {
      alert('You are already played')
      return
    }

    this.setState({
      messageShow: true,
      playing: true,
      count: 5,
      isBallVisible: true,
      shuffleProcess: false
    })

    ball === id
      ? this.setState({
          isWin: true
        })
      : this.setState({
          isWin: false
        })
  }

  render() {
    const message =
      this.state.messageShow === true ? (
        this.state.isWin === true ? (
          <h1>You win!!!</h1>
        ) : (
          <h1>You lose!!!</h1>
        )
      ) : null

    const { cups, isBallVisible, ball, startGame, shuffleProcess } = this.state

    return (
      <div>
        <ul>
          <PoseGroup>
            {cups.map(id => (
              <Item
                key={id}
                onClick={e => this.showResult(id, e)}
                className='relative'
              >
                {isBallVisible && id === ball ? <sup className='ball' /> : null}
              </Item>
            ))}
          </PoseGroup>
        </ul>
        {message}
        {!shuffleProcess && (
          <button className='btn' onClick={this.startGame}>
            {startGame ? 'Restart' : 'Start'}
          </button>
        )}
      </div>
    )
  }
}

export default Bonneteau
