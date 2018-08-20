import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ScoreBoard.css'

import Row from './Row/Row'

class ScoreBoard extends Component {
    render() {
        const { roundRobinScoreBoard } = this.props
        let rows = roundRobinScoreBoard.map(({name, win, loss}, index) => 
            <Row
                key={index}
                name={name}
                win={win}
                loss={loss}
            />
        )
        return (
            <section className='scoreBoard'>
                {rows}
            </section>
        );
    }
}

const mapStateToProps = ({ roundRobinScoreBoard }) => ({
    roundRobinScoreBoard: roundRobinScoreBoard
})

export default connect(mapStateToProps)(ScoreBoard)