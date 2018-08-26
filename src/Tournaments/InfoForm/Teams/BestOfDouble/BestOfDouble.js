import React, { Component } from 'react'
import { connect } from 'react-redux'
import './BestOfDouble.css'

// double elim action
import { BestOfDoubleAction } from '../../../../Redux/Bracket/Double/BestOfDouble'
import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'
import Input from './Input/Input'

class BestOfDouble extends Component {
    Modify = (value, index, whichBracket) => {
        const isValueNumOrBlank = (value === '' || (typeof parseInt(value, 10) === 'number' && !isNaN(parseInt(value,10))))
        if (isValueNumOrBlank) {
            if (value !== '') {
                value = parseInt(value, 10)
                value = value > 99 ? 99 : value
                value = value < 1 ? 1 : value
            }
            const bestOf = {...this.props.bestOf}
            const bestOfBracket = [...bestOf[whichBracket]]
            bestOfBracket[index] = value
            bestOf[whichBracket] = bestOfBracket
            this.props.IsBracketUpToDate(false)
            this.props.UpdateBestOf(bestOf)
        }
    }

    PushOrPopBestOf = () => {
        const { teamsList } = this.props.teams
        let shouldUpdate = false
        // upper
        const upperRounds = Math.ceil(Math.log(teamsList.length)/Math.log(2))
        const upperBestOf = [...this.props.bestOf.upper]
        if (upperRounds > upperBestOf.length) {
            const roundsToAdd = upperRounds - upperBestOf.length
            for (let i = 0; i < roundsToAdd; i++) {
                upperBestOf.push(1)
            }
            shouldUpdate = true
        } else if (upperRounds < upperBestOf.length) {
            const roundsToSubtract = upperBestOf.length - upperRounds
            for (let i = 0; i < roundsToSubtract; i++) {
                upperBestOf.pop()
            }
            shouldUpdate = true
        }
        // lower - FIX THIS ALGORITHM
        const lowerRounds = teamsList.length === 2 ? 0 : Math.ceil(Math.log(teamsList.length)/Math.log(2)) + 1
        const lowerBestOf = [...this.props.bestOf.lower]
        if (lowerRounds > lowerBestOf.length) {
            const roundsToAdd = lowerRounds - lowerBestOf.length
            for (let i = 0; i < roundsToAdd; i++) {
                lowerBestOf.push(1)
            }
            shouldUpdate = true
        } else if (lowerRounds < lowerBestOf.length) {
            const roundsToSubtract = lowerBestOf.length - lowerRounds
            for (let i = 0; i < roundsToSubtract; i++) {
                lowerBestOf.pop()
            }
            shouldUpdate = true
        }
        if (shouldUpdate) {
            this.props.UpdateBestOf({
                upper: upperBestOf,
                lower: lowerBestOf,
                grandFinals: this.props.bestOf.grandFinals
            })
        }
    }

    componentDidMount = () => {
        this.PushOrPopBestOf()
    }

    componentDidUpdate = () => {
        this.PushOrPopBestOf() // problem is here
    }

    render() {
        const { bestOf } = this.props
        const upperRounds = bestOf.upper.length
        let bestOfUpper = [<div className='bracketLabel' key={-1}>Upper Bracket</div>]
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
                            key={index + 2}
                            index={index}
                            value={value}
                            Modify={this.Modify}
                            bestOf={bestOf}
                            whichBracket={'upper'}
                        />
                    </div>
                </div>
            )
        })
        
        const lowerRounds = bestOf.lower.length
        let bestOfLower = [<div className='bracketLabel' key={-1}>Lower Bracket</div>]
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
                            key={index + 1}
                            index={index}
                            value={value}
                            Modify={this.Modify}
                            bestOf={bestOf}
                            whichBracket={'lower'}
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
                <div className='bracketLabel'>Grand Finals</div>
                <div className='bestOfDoubleHeader'>
                Grand Finals:
                    <Input
                        index={0}
                        value={bestOf.grandFinals[0]}
                        Modify={this.Modify}
                        bestOf={bestOf}
                        whichBracket={'grandFinals'}
                    />
                </div>
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