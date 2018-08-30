import { TournamentNameAction } from '../Info/TournamentName'
import { TournamentFormatAction } from '../Info/TournamentFormat'
import { TeamsAction } from '../Info/Teams'
import { SingleEliminationDataAction } from '../Bracket/Single/SingleEliminationData'
import { BestOfSingleAction } from '../Bracket/Single/BestOfSingle'
import { RoundRobinDataAction } from '../Bracket/RoundRobin/RoundRobinData'
import { RoundRobinScoreBoardAction } from '../Bracket/RoundRobin/RoundRobinScoreBoard'
import { BestOfRoundRobinAction } from '../Bracket/RoundRobin/BestOfRoundRobin'
import { IsBracketUpToDateAction } from '../Bracket/IsBracketUpToDate'
import { LinksAction } from '../Links/Links'

function ReadInCache(store) {
    const tournamentName = sessionStorage.getItem('tournamentName')
    if (tournamentName) {
        store.dispatch(TournamentNameAction(tournamentName))
    }

    const tournamentFormat = sessionStorage.getItem('tournamentFormat')
    if (tournamentFormat) {
        store.dispatch(TournamentFormatAction(tournamentFormat))
    }

    let teams = sessionStorage.getItem('teams')
    if (teams) {
        teams = JSON.parse(teams)
        store.dispatch(TeamsAction(teams))
    }

    let singleEliminationData = sessionStorage.getItem('singleEliminationData')
    if (singleEliminationData) {
        singleEliminationData = JSON.parse(singleEliminationData)
        store.dispatch(SingleEliminationDataAction(singleEliminationData))
    }

    let bestOfSingle = sessionStorage.getItem('bestOfSingle')
    if (bestOfSingle) {
        bestOfSingle = JSON.parse(bestOfSingle)
        store.dispatch(BestOfSingleAction(bestOfSingle))
    }

    let roundRobinData = sessionStorage.getItem('roundRobinData')
    if (roundRobinData) {
        roundRobinData = JSON.parse(roundRobinData)
        store.dispatch(RoundRobinDataAction(roundRobinData))
    }

    let roundRobinScoreBoard = sessionStorage.getItem('roundRobinScoreBoard')
    if (roundRobinScoreBoard) {
        roundRobinScoreBoard = JSON.parse(roundRobinScoreBoard)
        store.dispatch(RoundRobinScoreBoardAction(roundRobinScoreBoard))
    }

    let bestOfRoundRobin = sessionStorage.getItem('bestOfRoundRobin')
    if (bestOfRoundRobin) {
        bestOfRoundRobin = JSON.parse(bestOfRoundRobin)
        store.dispatch(BestOfRoundRobinAction(bestOfRoundRobin))
    }

    let isBracketUpToDate = sessionStorage.getItem('isBracketUpToDate')
    if (isBracketUpToDate) {
        isBracketUpToDate = JSON.parse(isBracketUpToDate)
        store.dispatch(IsBracketUpToDateAction(isBracketUpToDate))
    }

    let links = sessionStorage.getItem('links')
    if (links) {
        links = JSON.parse(links)
        store.dispatch(LinksAction(links))
    }
}

export default ReadInCache