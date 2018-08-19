import { UPDATE_IS_BRACKET_UP_TO_DATE } from '../Constants/Types'

function IsBracketUpToDateAction(isBracketUpToDate) {
    return {
        type: UPDATE_IS_BRACKET_UP_TO_DATE,
        payload: {
            isBracketUpToDate: isBracketUpToDate
        }
    }
}

function IsBracketUpToDateReducer(state=false, { type, payload }) {
    if (type === UPDATE_IS_BRACKET_UP_TO_DATE) {
        return payload.isBracketUpToDate
    } else {
        return state
    }
}

export { IsBracketUpToDateAction, IsBracketUpToDateReducer }