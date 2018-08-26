import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DoubleElimination.css'

import { UpperBracketAction } from '../../../../Redux/Bracket/Double/UpperBracket'
import { LowerBracketAction } from '../../../../Redux/Bracket/Double/LowerBracket'
import { GrandFinalsAction } from '../../../../Redux/Bracket/Double/GrandFinals'
import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'
import SingleElimFormatter from '../../../../Algorithms/Single/SingleElimFormatter' // upper bracket
import LowerBracketFormatter from '../../../../Algorithms/Double/LowerBracketFormatter' // lower bracket
import GrandFinalsFormatter from '../../../../Algorithms/Double/GrandFinalsFormatter' // grand finals
import UpperBracket from './UpperBracket/UpperBracket'

class DoubleElimination extends Component {
    componentDidMount = () => {
        const { isBracketUpToDate, teams, bestOfDouble, UpdateUpper, UpdateLower, UpdateGrandFinals, IsBracketUpToDate } = this.props
        if (!isBracketUpToDate) {
            const upperBracket = SingleElimFormatter(teams, bestOfDouble.upper)
            const lowerBracket = LowerBracketFormatter(upperBracket, bestOfDouble.lower)
            const grandFinals = GrandFinalsFormatter(bestOfDouble.grandFinals)
            UpdateUpper(upperBracket)
            UpdateLower(lowerBracket)
            UpdateGrandFinals(grandFinals)
            IsBracketUpToDate(true)
        }
    }

    render() {
        return (
            <section className='doubleElimination'>
                <div className='upperAndLower'>
                    <UpperBracket/>
                </div>
                <div className='grandFinalsWrapper'>

                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ teams, bestOfDouble, isBracketUpToDate }) => ({
    teams: teams.teamsList,
    bestOfDouble: bestOfDouble,
    isBracketUpToDate: isBracketUpToDate
})

const mapActionsToProps = {
    UpdateUpper: UpperBracketAction,
    UpdateLower: LowerBracketAction,
    UpdateGrandFinals: GrandFinalsAction,
    IsBracketUpToDate: IsBracketUpToDateAction
}

export default connect(mapStateToProps, mapActionsToProps)(DoubleElimination)