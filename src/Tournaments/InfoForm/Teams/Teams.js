import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Teams.css'

import AddTeamsArea from './AddTeamsArea/AddTeamsArea'
import BestOfSingle from './BestOfSingle/BestOfSingle'
import BestOfRoundRobin from './BestOfRoundRobin/BestOfRoundRobin'

class Teams extends Component {
    render() {
        const { remaining } = this.props
        const { tournamentFormat } = this.props
        return (
            <section className='teamsContainer'>
                <div className='teamsLabel'>Teams:</div>
                <div className='teamsWrapper'>
                    <AddTeamsArea/>
                    <div className='teamsRemaining'>{remaining} Teams Remaining</div>
                    {tournamentFormat === 'Single Elimination' &&
                        <BestOfSingle/>
                    }
                    {tournamentFormat === 'Round Robin' &&
                        <BestOfRoundRobin/>
                    }
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ teams, tournamentFormat }) => ({ // we dont care about the teams here
    remaining: teams.remaining,
    tournamentFormat: tournamentFormat
})

export default connect(mapStateToProps)(Teams)