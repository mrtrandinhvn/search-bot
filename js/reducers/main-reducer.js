import { dataReducer } from "./data-reducers";
import { targetSiteReducer } from "./target-site-reducers";
import { combineReducers } from "redux";

export const mainReducer = combineReducers({
    data: dataReducer,
    targetSite: targetSiteReducer,
    sortIndex: () => 1,
    sortAscending: () => true
});