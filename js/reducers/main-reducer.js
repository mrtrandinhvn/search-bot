import { dataReducer } from "./data-reducers";
import { targetSiteReducer } from "./target-site-reducers";
import { searchModeReducers } from "./search-mode-reducers";

import { combineReducers } from "redux";

export const mainReducer = combineReducers({
    data: dataReducer,
    targetSite: targetSiteReducer,
    sortIndex: () => 0,
    sortAscending: () => true,
    mode: searchModeReducers
});