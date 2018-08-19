import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './Tournaments.css'

import Routes from './Routes/Routes.js'

import { TournamentNameAction } from '../Redux/Info/TournamentName'
import { TournamentFormatAction } from '../Redux/Info/TournamentFormat'
import { TeamsAction } from '../Redux/Info/Teams'
import { IsBracketUpToDateAction } from '../Redux/Bracket/IsBracketUpToDate'
import { SingleEliminationDataAction } from '../Redux/Bracket/Single/SingleEliminationData'
import { BestOfSingleAction } from '../Redux/Bracket/Single/BestOfSingle'
import { RoundRobinDataAction } from '../Redux/Bracket/RoundRobin/RoundRobinData'
import { RoundRobinScoreBoardAction } from '../Redux/Bracket/RoundRobin/RoundRobinScoreBoard'
import { BestOfRoundRobinAction } from '../Redux/Bracket/RoundRobin/BestOfRoundRobin'
import { LinksAction } from '../Redux/Links/Links'

class Tournaments extends Component {
    componentDidMount = () => {
        const location = this.props.history.location.pathname
        const path = location.replace(/\/Info|\/Bracket/i,'')
        if (path) {
            fetch(`https://ezbracketapi.herokuapp.com${path}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(response => response.json())
            .then((store) => {
                if (!store.error) {
                    this.props.TournamentNameAction(store.tournamentName)
                    this.props.TournamentFormatAction(store.tournamentFormat)
                    this.props.TeamsAction(store.teams)
                    this.props.IsBracketUpToDateAction(store.isBracketUpToDate)
                    this.props.SingleEliminationDataAction(store.singleEliminationData)
                    this.props.BestOfSingleAction(store.bestOfSingle)
                    this.props.RoundRobinDataAction(store.roundRobinData)
                    this.props.RoundRobinScoreBoardAction(store.roundRobinScoreBoard)
                    this.props.BestOfRoundRobinAction(store.bestOfRoundRobin)
                    this.props.LinksAction(store.links)
                } else {
                    alert('Unable to find data')
                    this.props.history.push('/Info')
                }
            })
            .catch(() => alert('Sorry, something went wrong!'))
        }
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {Routes.map(({ path, component, exact }) =>
                        <Route
                            key={path}
                            path={path}
                            component={component}
                            exact={exact}
                        />
                    )}
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = () => ({})

const mapActionsToProps = {
    TournamentNameAction: TournamentNameAction,
    TournamentFormatAction: TournamentFormatAction,
    TeamsAction: TeamsAction,
    IsBracketUpToDateAction: IsBracketUpToDateAction,
    SingleEliminationDataAction: SingleEliminationDataAction,
    BestOfSingleAction: BestOfSingleAction,
    RoundRobinDataAction: RoundRobinDataAction,
    RoundRobinScoreBoardAction: RoundRobinScoreBoardAction,
    BestOfRoundRobinAction: BestOfRoundRobinAction,
    LinksAction: LinksAction
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Tournaments))