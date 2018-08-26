import { UPDATE_LOWER_BRACKET } from '../../Constants/Types'

function LowerBracketAction(lowerBracket) {
    return {
        type: UPDATE_LOWER_BRACKET,
        payload: {
            lowerBracket: lowerBracket
        }
    }
}

function LowerBracketReducer(state=[], { type, payload }) {
    if (type === UPDATE_LOWER_BRACKET) {
        return payload.lowerBracket
    } else {
        return state
    }
}

export { LowerBracketAction, LowerBracketReducer }