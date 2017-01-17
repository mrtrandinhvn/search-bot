import { CHANGE_SITE } from "../actions/target-site-action";

export const targetSiteReducer = (state = "", action = { type: null, newUrl: null }) => {
    switch (action.type) {
        case CHANGE_SITE:
            return action.newUrl;
        default:
            return state;
    }
};