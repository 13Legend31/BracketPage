import React, { Component, PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import './BestOfRoundRobin.css'

import { BestOfRoundRobinAction } from '../../../../Redux/Bracket/RoundRobin/BestOfRoundRobin'
import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'

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
                className='bestOfRoundRobinInput'
                value={value}
                onChange={(e) => Modify(e.target.value, index)}
                ref={`bestOfRoundRobinInput${index}`}
                onFocus={() => this.onFocus(`bestOfRoundRobinInput${index}`)}
                onBlur={() => this.onBlur(`bestOfRoundRobinInput${index}` ,index)}
            />
        );
    }
}

class BestOfRoundRobin extends Component {
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
        const n = teamsList.length
        const rounds = n%2 === 0 ? n - 1 : n
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
        let bestOfUpdater = bestOf.map(( value, index ) => {
            return (
                <div
                    key={index}
                    className='bestOfUpdaterWrapper'
                >
                    <div className='bestOfRoundRobinHeader'>
                        {`Round ${index + 1}`}:
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
            <section className='bestOfRoundRobin'>
                <h3 className='bestOfRoundRobinName'>Best of</h3>
                {bestOfUpdater}
            </section>
        );
    }
}

const mapStateToProps = ({ bestOfRoundRobin, teams }) => ({
    bestOf: bestOfRoundRobin,
    teams: teams
})

const mapActionsToProps = {
    UpdateBestOf: BestOfRoundRobinAction,
    IsBracketUpToDate: IsBracketUpToDateAction
}

export default connect(mapStateToProps, mapActionsToProps)(BestOfRoundRobin)