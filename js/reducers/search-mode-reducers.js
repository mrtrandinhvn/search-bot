import { ALLINTITLE, CHANGE_SEARCH_MODE } from "../actions/search-mode-actions";
export const searchModeReducers = (state = ALLINTITLE, action = { type: null, mode: "" }) => {
    switch (action.type) {
        case CHANGE_SEARCH_MODE:
            return action.mode;
        default:
            return state;
    }
};