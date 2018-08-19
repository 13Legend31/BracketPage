import { UPDATE_BEST_OF_ROUND_ROBIN } from '../../Constants/Types'

function BestOfRoundRobinAction(bestOfRoundRobin) {
    return {
        type: UPDATE_BEST_OF_ROUND_ROBIN,
        payload: {
            bestOfRoundRobin: bestOfRoundRobin
        }
    }
}

function BestOfRoundRobinReducer(state=[], { type, payload }) {
    if (type === UPDATE_BEST_OF_ROUND_ROBIN) {
        return payload.bestOfRoundRobin
    } else {
        return state
    }
}

export { BestOfRoundRobinAction, BestOfRoundRobinReducer }