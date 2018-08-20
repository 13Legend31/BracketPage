import React, { Component } from 'react'
import { connect } from 'react-redux'
import './AddTeamsArea.css'

import { TeamsAction } from '../../../../Redux/Info/Teams'
import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'
import Input from './Input/Input'

class AddTeamsArea extends Component {
    constructor(props) {
        super(props)
        this.focus = 0
        this.inputs = [] // SET THIS IN COMPONENT DID MOUNT, CHANGE THIS IN ADD/REMOVE TEAMS

        this.teamNames = {} // name: {index}
        this.currentName = ''
        this.previousName = ''
    }

    componentDidMount = () => {
        document.getElementsByClassName('addTeamsArea')[0].addEventListener('keydown', (e) => {
            // press enter, add a team
            if (e.keyCode === 13) {
                this.AddTeam(this.focus)
            }
            // press backslash to remove team if empty
            else if (e.keyCode === 8 && this.inputs[this.focus].value === '') {
                e.preventDefault()
                this.RemoveTeam(this.focus)
            } else if (e.keyCode === 38) {
                this.ChangeFocus(this.focus - 1)
            } else if (e.keyCode === 40) {
                this.ChangeFocus(this.focus + 1)
            }
        })

        // THIS IS ONLY FOR TESTING
        /* const teams = {...this.props.teams}
        const teamsList = []
        for (let i = 0; i < 243; i++) {
            teamsList.push(`${1}`)
        }
        teams.teamsList = teamsList
        teams.remaining = 256 - teamsList.length
        this.props.UpdateTeams(teams) */
        //----------------------------

        this.inputs = document.getElementsByClassName('teamInput')
        for (let i = 0; i < this.inputs.length; i++) {
            const name = this.inputs[i].value
            if (!this.teamNames[name] && name !== '') {
                this.teamNames[name] = new Map()
            }
            if (name !== '') {
                this.teamNames[name].set(i, 1)
            }
        }
        for (let name in this.teamNames) {
            if (this.teamNames.hasOwnProperty(name) && this.teamNames[name].size > 1) {
                this.teamNames[name].forEach((val, key) =>
                    this.inputs[key].style.color = 'orange'
                )
            }
        }
    }

    componentDidUpdate = () => {
        this.inputs = document.getElementsByClassName('teamInput')
    }

    UpdateTeamName = (index, name) => {
        const teams = {...this.props.teams}
        teams.teamsList.splice(index, 1, name)

        // insert name into table
        if (!this.teamNames[name] && name !== '') {
            this.teamNames[name] = new Map()
        }
        if (name !== '') {
            this.teamNames[name].set(index, 1) // put index into the table
        }

        // check if duplicates
        if (this.teamNames[name] && this.teamNames[name].size > 1) {
            console.log(name)
            this.teamNames[name].forEach((val, key) => {
                this.inputs[key].style.color = 'orange'
            })
        } else {
            this.inputs[index].style.color = 'white'
        }

        // delete previous name from table
        const prev = this.teamNames[this.previousName]
        if (prev) {
            prev.delete(index)
            if (prev.size === 1) {
                prev.forEach((val, key) => {
                    this.inputs[key].style.color = 'white'
                })
            }
            else if (prev.size === 0) {
                delete this.teamNames[this.previousName]
            }
        }

        console.log(this.teamNames)
        this.previousName = name
        this.props.UpdateTeams(teams)
        this.props.IsBracketUpToDate(false)
    }

    Shift(index, k) {
        // we have to shift the style over too
        for (let name in this.teamNames) {
            if (this.teamNames.hasOwnProperty(name)) {
                const map = new Map()
                this.teamNames[name].forEach((val, key) => {
                    if (key > index) {
                        const pos = k > 0 ? key : key + k; 
                        this.inputs[pos].style.color = 'white'
                        map.set(key + k, 1)
                    } else {
                        map.set(key, 1)
                    }
                })
                if (map.size > 1) {
                    map.forEach((val, key) => {
                        this.inputs[key].style.color = 'orange'
                    })
                }

                this.teamNames[name] = map
            }
        }
    }

    AddTeam = (index) => {
        const teams = {...this.props.teams}
        if (teams.remaining > 0) {
            teams.teamsList.splice(index + 1, 0, '')
            teams.remaining--
            this.props.UpdateTeams(teams)
            this.props.IsBracketUpToDate(false)
            this.ChangeFocus(index + 1)
            // shift key >= index teamNames ++
            this.Shift(index, 1)
        }        
    }

    RemoveTeam = (index) => {
        const teams = {...this.props.teams}
        if (teams.remaining < 254 && index !== 0) {
            teams.teamsList.splice(index, 1)
            teams.remaining++
            this.props.UpdateTeams(teams)
            this.props.IsBracketUpToDate(false)
            this.ChangeFocus(index - 1)
            // shift key >= index teamNames --
            this.Shift(index, -1)
        }
    }

    ChangeFocus = (index) => {
        const length = this.props.teams.teamsList.length
        if (index === length) {
            index--
        } else if (index < 0) {
            index = 0
        }
        this.focus=index
        this.inputs[index].focus()        
        this.previousName = this.inputs[index].value
    }

    render() {
        const { teamsList } = this.props.teams
        return (
            <section className='addTeamsArea'>
                {teamsList.map((name, index) => (
                    <Input
                        key={index}
                        index={index}
                        value={name}
                        UpdateTeamName={this.UpdateTeamName}
                        RemoveTeam={this.RemoveTeam}
                        ChangeFocus={this.ChangeFocus}
                    />
                ))}
            </section>
        );
    }
}

const mapStateToProps = ({ teams }) => ({
    teams: teams
})

const mapActionsToProps = {
    UpdateTeams: TeamsAction,
    IsBracketUpToDate: IsBracketUpToDateAction,
}

export default connect(mapStateToProps, mapActionsToProps)(AddTeamsArea)