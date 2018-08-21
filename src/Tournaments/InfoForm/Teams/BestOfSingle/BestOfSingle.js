import React, { Component, PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import './BestOfSingle.css'

import { BestOfSingleAction } from '../../../../Redux/Bracket/Single/BestOfSingle'
import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'

// bestOf is guarenteed to be a number

class Input extends PureComponent {
    onFocus = (input) => {
        findDOMNode(this.refs[input]).value = ''
    }

    onBlur = (input, index) => {
        findDOMNode(this.refs[input]).value = this.props.bestOf[index]
        if (this.props.bestOf[index] === '') {
            this.props.Modify(1, index)
        }
    }

    render() {
        const { index, value, Modify } = this.props
        return (
            <input
                className='bestOfSingleInput'
                value={value}
                onChange={(e) => Modify(e.target.value, index)}
                ref={`bestOfSingleInput${index}`}
                onFocus={() => this.onFocus(`bestOfSingleInput${index}`)}
                onBlur={() => this.onBlur(`bestOfSingleInput${index}` ,index)}
            />
        );
    }
}

class BestOfSingle extends Component {
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
        const rounds = Math.ceil(Math.log(teamsList.length)/Math.log(2))
        const bestOf = [...this.props.bestOf]
        if (rounds > bestOf.length) {
            const roundsToAdd = rounds - bestOf.length
            for (let i = 0; i < roundsToAdd; i++) {
                bestOf.push(1)
                this.props.UpdateBestOf(bestOf)
            }
        } else if (rounds < bestOf.length) {
            const roundsToSubtract = bestOf.length - rounds
            for (let i = 0; i < roundsToSubtract; i++) {
                bestOf.pop()
                this.props.UpdateBestOf(bestOf)
            }
        }
    }

    componentDidMount = () => {
        this.PushOrPopBestOf()
    }

    componentDidUpdate = () => {
        this.PushOrPopBestOf()
    }

    render() {
        const { bestOf } = this.props
        const rounds = bestOf.length
        let bestOfUpdater = bestOf.map(( value, index ) => {
            let header = `Round ${index + 1}`
            header = index + 1 === rounds ? `Grand Finals` : header
            header = index + 2 === rounds ? `Semi Finals` : header
            header = index + 3 === rounds ? `Quarter Finals` : header
            return (
                <div
                    key={index}
                    className='bestOfUpdaterWrapper'
                >
                    <div className='bestOfSingleHeader'>
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
            <section className='bestOfSingle'>
                <h3 className='bestOfSingleName'>Best of</h3>
                {bestOfUpdater}
            </section>
        );
    }
}

const mapStateToProps = ({ bestOfSingle, teams }) => ({
    bestOf: bestOfSingle,
    teams: teams
})

const mapActionsToProps = {
    UpdateBestOf: BestOfSingleAction,
    IsBracketUpToDate: IsBracketUpToDateAction
}

export default connect(mapStateToProps, mapActionsToProps)(BestOfSingle)