import { IMPORT_DATA, CHANGE_ROW_STATUS } from "../actions/data-action.js";
import { combineReducers } from "redux";
const rowReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case CHANGE_ROW_STATUS:
            if (state.id !== action.data.id) {
                return state;
            }
            return {
                ...state,
                status: action.data.status,
                results: action.data.result,
                conclusions: action.data.conclusions
            };
        default:
            return state;
    }
};
export const dataReducer = (state = [], action = { type: null, data: null }) => {
    switch (action.type) {
        case IMPORT_DATA:
            return [
                ...action.data
            ]; // overwrite data array
        case CHANGE_ROW_STATUS:
            return state.map((row) => {
                return rowReducer(row, action);
            });
        default:
            return state;
    }

};
export const mainReducer = combineReducers({
    data: dataReducer
});