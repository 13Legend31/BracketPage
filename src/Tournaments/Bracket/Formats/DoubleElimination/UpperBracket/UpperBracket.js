import React, { Component } from 'react'
import { connect } from 'react-redux'
import './UpperBracket.css'

import { UpperBracketAction } from '../../../../../Redux/Bracket/Double/UpperBracket'
import { LowerBracketAction } from '../../../../../Redux/Bracket/Double/LowerBracket'
import RoundOf from '../RoundOf/RoundOf'

class UpperBracket extends Component {
    AdvanceWinner = (round, position, data, winner) => {

    }

    RemoveWinner = (round, position, data, whichTeamScore, score) => {

    }

    // DO NOT MODIFY SCORE WITH THIS FUNCTION
    // SCORE CAN EQUAL ''
    UpdateScore = (round, position, whichTeamScore, score, bestOf) => {
        
    }

    render() {
        const data = this.props.upperBracket
        const teams = data.map(({TCardList}) => TCardList)
        return (
            <section className='theUpperBracket'>
                {data.map(( { bestOf }, index ) =>
                    <RoundOf
                        key={index}
                        round={index + 1}
                        header={index === data.length - 1 ? 'Upper Bracket Finals' : `Round ${index}`}
                        padding={70 * Math.pow(2, index - 1) - 25}
                        TCardList={teams[index]}
                        bestOf={bestOf}
                        UpdateScore={this.UpdateScore}
                        shouldConnect={index !== data.length - 1}
                    />
                )}
            </section>
        )
    }
}

const mapStateToProps = ({ upperBracket, lowerBracket, grandFinals }) => ({
    upperBracket: upperBracket,
    lowerBracket: lowerBracket,
    grandFinals: grandFinals
})

const mapActionsToProps = {
    UpdateUpper: UpperBracketAction,
    UpdateLower: LowerBracketAction,
}

export default connect(mapStateToProps, mapActionsToProps)(UpperBracket)