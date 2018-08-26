import { UPDATE_GRAND_FINALS } from '../../Constants/Types'

function GrandFinalsAction(grandFinals) {
    return {
        type: UPDATE_GRAND_FINALS,
        payload: {
            grandFinals: grandFinals
        }
    }
}

function GrandFinalsReducer(state=[], { type, payload }) {
    if (type === UPDATE_GRAND_FINALS) {
        return payload.grandFinals
    } else {
        return state
    }
}

export { GrandFinalsAction, GrandFinalsReducer }