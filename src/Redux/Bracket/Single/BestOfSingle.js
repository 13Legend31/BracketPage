import { UPDATE_BEST_OF_SINGLE } from '../../Constants/Types'

function BestOfSingleAction(bestOfSingle) {
    return {
        type: UPDATE_BEST_OF_SINGLE,
        payload: {
            bestOfSingle:bestOfSingle
        }
    }
}

function BestOfSingleReducer(state=[], { type, payload }) {
    if (type === UPDATE_BEST_OF_SINGLE) {
        return payload.bestOfSingle
    } else {
        return state
    }
}

export { BestOfSingleAction, BestOfSingleReducer }