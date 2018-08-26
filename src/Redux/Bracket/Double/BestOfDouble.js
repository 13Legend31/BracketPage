import { UPDATE_BEST_OF_DOUBLE } from '../../Constants/Types'

function BestOfDoubleAction(bestOfDouble) {
    return {
        type: UPDATE_BEST_OF_DOUBLE,
        payload: {
            bestOfDouble:bestOfDouble
        }
    }
}

function BestOfDoubleReducer(state=[], { type, payload }) {
    if (type === UPDATE_BEST_OF_DOUBLE) {
        return payload.bestOfDouble
    } else {
        return state
    }
}

export { BestOfDoubleAction, BestOfDoubleReducer }