import { UPDATE_TOURNAMENT_FORMAT } from '../Constants/Types'

function TournamentFormatAction(tournamentFormat) {
    return {
        type: UPDATE_TOURNAMENT_FORMAT,
        payload: {
            tournamentFormat: tournamentFormat
        }
    }
}

function TournamentFormatReducer(state='', { type, payload }) {
    if (type === UPDATE_TOURNAMENT_FORMAT) {
        return payload.tournamentFormat
    } else {
        return state
    }
}

export { TournamentFormatAction, TournamentFormatReducer }