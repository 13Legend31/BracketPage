import { UPDATE_ROUND_ROBIN_DATA } from '../../Constants/Types'

function RoundRobinDataAction(roundRobinData) {
    return {
        type: UPDATE_ROUND_ROBIN_DATA,
        payload: {
            roundRobinData: roundRobinData
        }
    }
}

function RoundRobinDataReducer(state=[], { type, payload }) {
    if (type === UPDATE_ROUND_ROBIN_DATA) {
        return payload.roundRobinData
    } else {
        return state
    }
}

export { RoundRobinDataAction, RoundRobinDataReducer }