import { UPDATE_TEAMS } from '../Constants/Types'

function TeamsAction(teams) {
    return {
        type: UPDATE_TEAMS,
        payload: {
            teams: teams
        }
    }
}

function TeamsReducer(state=[], { type, payload }) {
    if (type === UPDATE_TEAMS) {
        return payload.teams
    } else {
        return state
    }
}

export { TeamsAction, TeamsReducer }