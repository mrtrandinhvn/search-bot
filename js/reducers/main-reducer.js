import { dataReducer } from "./data-reducers";
import { targetSiteReducer } from "./target-site-reducers";

export const mainReducer = (state = {}, action) => {
    return {
        targetSite: targetSiteReducer(state.targetSite, action),
        data: (() => {
            return dataReducer(state.data, action, targetSiteReducer(state.targetSite, action));
        })()
    };
};