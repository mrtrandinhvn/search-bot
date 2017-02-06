import { IN_TEXT, CHANGE_SEARCH_MODE } from "../actions/search-mode-actions";
export const searchModeReducers = (state = IN_TEXT, action = { type: null, mode: "" }) => {
    switch (action.type) {
        case CHANGE_SEARCH_MODE:
            return action.mode;
        default:
            return state;
    }
};