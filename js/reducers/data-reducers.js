import { IMPORT_DATA, CHANGE_ROW_STATUS } from "../actions/data-actions.js";
import { CHANGE_SITE } from "../actions/target-site-actions";
export const generateAjaxSearchLink = (url = "", keyword = "", mode = "") => {
    return "https://www.google.co.uk/search?sclient=psy-ab&biw=1136&bih=950&tbs=qdr:y&q=" + mode + ":+" + window.encodeURI(keyword) + "+site:http:%2F%2F" + window.encodeURI(url) + "&gs_l=serp.3...36084.36084.4.41864.1.1.0.0.0.0.135.135.0j1.1.0....0...1c.1.64.psy-ab..0.0.0.9NVFzIaVhEU&pbx=1&bav=on.2,or.&bvm=bv.144224172,d.dGc&fp=68e1e7926b6eb876&dpr=1&tch=1&ech=1&psi=sGWAWP_bDseC8wXz26m4DQ.1484809649063.5";
};
export const generateExportSearchLink = (url = "", keyword = "", mode = "") => {
    return "https://www.google.co.uk/#q=" + mode + ":+" + window.encodeURI(keyword) + "+site:http://" + window.encodeURI(url) + "&tbs=qdr:y";
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
        default:
            return state;
    }
};
export const dataReducer = (state = [], action = { type: null, data: [] }) => {
    switch (action.type) {
        case IMPORT_DATA:
            return [
                ...action.data
            ]; // overwrite state array
        case CHANGE_ROW_STATUS:
            return state.map((row) => {
                return rowReducer(row, action);
            });
        default:
            return state;
    }
};
