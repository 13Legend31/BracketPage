import { UPDATE_ROUND_ROBIN_SCOREBOARD } from '../../Constants/Types'

function RoundRobinScoreBoardAction(roundRobinScoreBoard) {
    return {
        type: UPDATE_ROUND_ROBIN_SCOREBOARD,
        payload: {
            roundRobinScoreBoard: roundRobinScoreBoard
        }
    }
}

function RoundRobinScoreBoardReducer(state=[], { type, payload }) {
    if (type === UPDATE_ROUND_ROBIN_SCOREBOARD) {
        return payload.roundRobinScoreBoard
    } else {
        return state
    }
}

export { RoundRobinScoreBoardAction, RoundRobinScoreBoardReducer }