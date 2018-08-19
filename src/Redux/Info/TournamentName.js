import { UPDATE_TOURNAMENT_NAME } from '../Constants/Types'

function TournamentNameAction(tournamentName) {
    return {
        type: UPDATE_TOURNAMENT_NAME,
        payload: {
            tournamentName: tournamentName
        }
    }
}

function TournamentNameReducer(state='', { type, payload}) {
    if (type === UPDATE_TOURNAMENT_NAME) {
        return payload.tournamentName
    } else {
        return state
    }
}

export { TournamentNameAction, TournamentNameReducer }