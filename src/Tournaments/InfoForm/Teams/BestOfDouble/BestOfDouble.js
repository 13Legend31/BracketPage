import React, { Component } from 'react'
import { connect } from 'react-redux'
import './BestOfDouble.css'

// double elim action
import { BestOfDoubleAction } from '../../../../Redux/Bracket/Double/BestOfDouble'
import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'
import Input from './Input/Input'

class BestOfDouble extends Component {
    Modify = (value, index) => {
        const isValueNumOrBlank = (value === '' || (typeof parseInt(value, 10) === 'number' && !isNaN(parseInt(value,10))))
        if (isValueNumOrBlank) {
            if (value !== '') {
                value = parseInt(value, 10)
                value = value > 99 ? 99 : value
                value = value < 1 ? 1 : value
            }
            const bestOf = [...this.props.bestOf]
            bestOf[index] = value
            this.props.IsBracketUpToDate(false)
            this.props.UpdateBestOf(bestOf)
        }
    }

    PushOrPopBestOf = () => {
        const { teamsList } = this.props.teams
        // upper
        const upperRounds = Math.ceil(Math.log(teamsList.length)/Math.log(2))
        const upperBestOf = [...this.props.bestOf.upper]
        if (upperRounds > upperBestOf.length) {
            const roundsToAdd = rounds - bestOf.length
            for (let i = 0; i < roundsToAdd; i++) {
                bestOf.push(1)
            }
        } else if (rounds < bestOf.length) {
            const roundsToSubtract = bestOf.length - rounds
            for (let i = 0; i < roundsToSubtract; i++) {
                bestOf.pop()
            }
        }
        // lower
    }

    componentDidMount = () => {
        this.PushOrPopBestOf()
    }

    componentDidUpdate = () => {
        this.PushOrPopBestOf()
    }

    render() {
        const { bestOf } = this.props
        const upperRounds = bestOf.upper.length
        let bestOfUpper = [<div className='upperBracketBestOf'>Upper Bracket</div>]
        bestOf.upper.forEach(( value, index ) => {
            let header = `Round ${index + 1}`
            header = index + 1 === upperRounds ? `Upper Bracket Finals` : header
            bestOfUpper.push(
                <div
                    key={index}
                    className='bestOfUpdaterWrapper'
                >
                    <div className='bestOfDoubleHeader'>
                        {header}:
                        <Input
                            key={index}
                            index={index}
                            value={value}
                            Modify={this.Modify}
                            bestOf={bestOf}
                        />
                    </div>
                </div>
            )
        })
        
        const lowerRounds = bestOf.lower.length
        let bestOfLower = [<div className='lowerBracketBestOf'>Lower Bracket</div>]
        bestOf.lower.forEach(( value, index ) => {
            let header = `Round ${index + 1}`
            header = index + 1 === lowerRounds ? `Lower Bracket Finals` : header
            bestOfLower.push(
                <div
                    key={index}
                    className='bestOfUpdaterWrapper'
                >
                    <div className='bestOfDoubleHeader'>
                        {header}:
                        <Input
                            key={index}
                            index={index}
                            value={value}
                            Modify={this.Modify}
                            bestOf={bestOf}
                        />
                    </div>
                </div>
            )
        })

        return (
            <section className='bestOfDouble'>
                <h3 className='bestOfDoubleName'>Best of</h3>
                {bestOfUpper}
                {bestOfLower}
            </section>
        );
    }
}

const mapStateToProps = ({ bestOfDouble, teams }) => ({
    bestOf: bestOfDouble,
    teams: teams
})

const mapActionsToProps = {
    UpdateBestOf: BestOfDoubleAction,
    IsBracketUpToDate: IsBracketUpToDateAction
}

export default connect(mapStateToProps, mapActionsToProps)(BestOfDouble)