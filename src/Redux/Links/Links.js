import { UPDATE_LINKS } from '../Constants/Types'

function LinksAction(links) {
    return {
        type: UPDATE_LINKS,
        payload: {
            links: links
        }
    }
}

function LinksReducer(state=[], { type, payload }) {
    if (type === UPDATE_LINKS) {
        return payload.links
    } else {
        return state
    }
}

export { LinksAction, LinksReducer }