import { IMPORT_DATA, CHANGE_ROW_STATUS } from "../actions/data-action.js";
import { CHANGE_SITE } from "../actions/target-site-action";

const generateSearchLink = (url = "", keyword = "") => {
    return "https://www.google.co.uk/search?hl=en&as_q=heels&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=&cr=&as_qdr=all&as_sitesearch=http%3A%2F%2F"
        + window.encodeURI(url)
        + "&as_occt=title&safe=images&as_filetype=&as_rights=#hl=en&as_qdr=all&q=allintitle:+"
        + window.encodeURI(keyword) +
        "+site:http:%2F%2F" + window.encodeURI(url);
};
const rowReducer = (state = {}, action = { type: null, data: null }) => {
    switch (action.type) {
        case CHANGE_ROW_STATUS:
            if (state.id !== action.data.id) {
                return state;
            }
            return {
                ...state,
                status: action.data.status,
                results: action.data.results,
                conclusion: action.data.conclusion
            };
        case CHANGE_SITE:
            return {
                ...state,
                searchLink: generateSearchLink(action.newUrl, state.keyword)
            };
        default:
            return state;
    }
};
export const dataReducer = (state = [], action = { type: null, data: [] }) => {
    switch (action.type) {
        case IMPORT_DATA:
            return action.data.map((item) => {
                return {
                    ...item,
                    searchLink: generateSearchLink(item.searchLink, item.keyword)
                };
            }); // overwrite data array
        case CHANGE_ROW_STATUS:
        case CHANGE_SITE:
            return state.map((row) => {
                return rowReducer(row, action);
            });
        default:
            return state;
    }
};