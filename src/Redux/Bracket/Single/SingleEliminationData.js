import { UPDATE_SINGLE_ELIMINATION_DATA } from '../../Constants/Types'

function SingleEliminationDataAction(singleEliminationData) {
    return {
        type: UPDATE_SINGLE_ELIMINATION_DATA,
        payload: {
            singleEliminationData: singleEliminationData
        }
    }
}

function SingleEliminationDataReducer(state=[], { type, payload }) {
    if (type === UPDATE_SINGLE_ELIMINATION_DATA) {
        return payload.singleEliminationData
    } else {
        return state
    }
}

export { SingleEliminationDataAction, SingleEliminationDataReducer }