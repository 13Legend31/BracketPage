import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import './index.css'

import Tournaments from './Tournaments/Tournaments'

import { TournamentNameReducer } from './Redux/Info/TournamentName'
import { TournamentFormatReducer } from './Redux/Info/TournamentFormat'
import { TeamsReducer } from './Redux/Info/Teams'
import { IsBracketUpToDateReducer } from './Redux/Bracket/IsBracketUpToDate'
import { SingleEliminationDataReducer } from './Redux/Bracket/Single/SingleEliminationData'
import { BestOfSingleReducer } from './Redux/Bracket/Single/BestOfSingle'
import { RoundRobinDataReducer } from './Redux/Bracket/RoundRobin/RoundRobinData'
import { RoundRobinScoreBoardReducer } from './Redux/Bracket/RoundRobin/RoundRobinScoreBoard'
import { BestOfRoundRobinReducer } from './Redux/Bracket/RoundRobin/BestOfRoundRobin'
import { UpperBracketReducer } from './Redux/Bracket/Double/UpperBracket'
import { LowerBracketReducer } from './Redux/Bracket/Double/LowerBracket'
import { GrandFinalsReducer } from './Redux/Bracket/Double/GrandFinals'
import { BestOfDoubleReducer } from './Redux/Bracket/Double/BestOfDouble'
import { LinksReducer } from './Redux/Links/Links'

import ReadInCache from './Redux/Caching/ReadInCache'
import WriteToCache from './Redux/Caching/WriteToCache'

const allReducers = combineReducers({
    tournamentName: TournamentNameReducer,
    tournamentFormat: TournamentFormatReducer,
    teams: TeamsReducer,
    isBracketUpToDate: IsBracketUpToDateReducer,
    singleEliminationData: SingleEliminationDataReducer,
    bestOfSingle:BestOfSingleReducer,
    roundRobinData: RoundRobinDataReducer,
    roundRobinScoreBoard: RoundRobinScoreBoardReducer,
    bestOfRoundRobin: BestOfRoundRobinReducer,
    upperBracket: UpperBracketReducer,
    lowerBracket: LowerBracketReducer,
    grandFinals: GrandFinalsReducer,
    bestOfDouble: BestOfDoubleReducer,
    links: LinksReducer
})

const store = createStore(
    allReducers,
    {
        tournamentName:'',
        tournamentFormat:'Single Elimination',
        teams:{
            teamsList:[
                '',
                ''
            ],
            remaining:254
        },
        isBracketUpToDate: false,
        singleEliminationData:[],
        bestOfSingle:[],
        roundRobinData:[],
        roundRobinScoreBoard:[],
        bestOfRoundRobin:[],
        upperBracket:[],
        lowerBracket:[],
        grandFinals:[],
        bestOfDouble: {
            upper:[],
            lower:[],
            grandFinals:[1]
        },
        links: {
            view: '',
            edit: ''
        }
    },
    applyMiddleware(WriteToCache)
)

ReadInCache(store)

render(
    <Provider store={store}>
        <BrowserRouter>
            <Tournaments/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)