import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Buttons.css'

import { TeamsAction } from '../../../Redux/Info/Teams'
import { IsBracketUpToDateAction } from '../../../Redux/Bracket/IsBracketUpToDate'
import RandomizeArray from '../../../Algorithms/Misc/RandomizeArray'

const duplicateTeam = 'duplicateTeam'
const blankTeam = 'blankTeam'

class Buttons extends Component {
    RandomizeTeams = () => {
        const teams = {...this.props.teams}
        RandomizeArray(teams.teamsList)
        this.props.UpdateTeams(teams)
        this.props.IsBracketUpToDate(false)
    }

    ClearTeams = () => {
        const teams = {...this.props.teams}
        teams.remaining = 254
        teams.teamsList=['','']
        teams.emptyFields={'0': 1, '1': 1}
        this.props.UpdateTeams(teams)
        this.props.IsBracketUpToDate(false)
    }

    Prompt = (id) => {
        findDOMNode(this.refs[id]).style.display = 'inline'
    }
    
    UnPrompt = (id) => {
        findDOMNode(this.refs[id]).style.display = 'none'
    }

    IsEveryTeamFilled = (e) => {
        const { teamsList } = this.props.teams
        const teamNames = {}
        
        let empty = false
        for (let i = 0; i < teamsList.length; i++) {
            if (teamsList[i] === '') {
                empty = true
            }
            teamNames[teamsList[i]] = 1
        }

        const duplicate = Object.keys(teamNames).length !== teamsList.length
        if (empty) {
            e.preventDefault()
            this.Prompt(blankTeam)
        } else if (duplicate) {
            e.preventDefault()
            this.Prompt(duplicateTeam)
        }
    }

    render() {
        const { isBracketUpToDate } = this.props
        return (
            <section className='buttonsSection'>
                <div
                    className='blankTeam'
                    ref={blankTeam}
                    onClick={() => this.UnPrompt(blankTeam)}
                >
                    Team Names Cannot Be Blank
                </div>
                <div
                    className='duplicateTeam'
                    ref={duplicateTeam}
                    onClick={() => this.UnPrompt(duplicateTeam)}
                >
                    No Duplicate Teams
                </div>
                <div className='infoButtonWrapper'>                    
                    <NavLink
                        className='generate'
                        exact to={`/Bracket`}
                        onClick={this.IsEveryTeamFilled}
                    >
                        {isBracketUpToDate ? 'To Bracket!' : 'Generate Bracket!'}
                    </NavLink>
                    <button 
                        className='randomize'
                        onClick={this.RandomizeTeams}
                    >
                        Randomize
                    </button>
                    <button 
                        className='clear'
                        onClick={this.ClearTeams}    
                    >
                        Clear
                    </button>
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ teams, isBracketUpToDate }) => ({
    teams: teams,
    isBracketUpToDate: isBracketUpToDate
})

const mapActionsToProps = {
    UpdateTeams: TeamsAction,
    IsBracketUpToDate: IsBracketUpToDateAction
}

export default connect(mapStateToProps, mapActionsToProps)(Buttons)