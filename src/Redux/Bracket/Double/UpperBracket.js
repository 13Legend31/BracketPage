import { UPDATE_UPPER_BRACKET } from '../../Constants/Types'

function UpperBracketAction(upperBracket) {
    return {
        type: UPDATE_UPPER_BRACKET,
        payload: {
            upperBracket: upperBracket
        }
    }
}

function UpperBracketReducer(state=[], { type, payload }) {
    if (type === UPDATE_UPPER_BRACKET) {
        return payload.upperBracket
    } else {
        return state
    }
}

export { UpperBracketAction, UpperBracketReducer }