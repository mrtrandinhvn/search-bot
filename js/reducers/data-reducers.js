import { IMPORT_DATA, CHANGE_ROW_STATUS } from "../actions/data-actions.js";
import { CHANGE_SITE } from "../actions/target-site-actions";
import { WILDCARD, IN_TEXT, IN_TITLE, IN_URL } from "../actions/search-mode-actions";
export const generateAjaxSearchLink = (url = "", keyword = "", mode = "") => {
    switch (mode) {
        case IN_TEXT:
        case IN_TITLE:
            return "https://www.google.co.uk/search?sclient=psy-ab&site=&source=hp&q=" + mode + ":%22" + window.encodeURI(keyword) + "%22+-comment+-comments+-review+-reviews+-rating+-ratings+site:" + window.encodeURI(url) + "&oq=&gs_l=hp.3...280706.280706.0.283440.1.1.0.0.0.0.317.317.3-1.1.0....0...1c.1.64.psy-ab..0.0.0.cZQaGCGnaPk&pbx=1&bav=on.2,or.&bvm=bv.146094739,d.dGo&fp=1&biw=1185&bih=950&dpr=1&tch=1&ech=1&psi=_l6ZWOmAG4eg0gSOpYCgDg.1486446334974.3";
        case WILDCARD:
            return "https://www.google.co.uk/search?sclient=psy-ab&biw=1185&bih=950&q=%22" + window.encodeURI(keyword) + "%22+-comment+-comments+-rating+-ratings+-review+-reviews+site:" + window.encodeURI(url) + "&oq=&gs_l=serp.3...121265.148298.0.149322.37.36.1.0.0.0.360.2563.33j2j0j1.36.0....0...1c.1.64.psy-ab..1.0.0.MngPc2EBZ7E&pbx=1&bav=on.2,or.&bvm=bv.146094739,d.dGo&fp=594a44a2cd1af981&dpr=1&tch=1&ech=1&psi=C2GZWM-ZAoL10gSfuKhA.1486446859471.5";
        case IN_URL:
            return "https://www.google.co.uk/search?sclient=psy-ab&hl=en&site=webhp&source=hp&q=" + mode + ":%22" + window.encodeURI(keyword) + "%22+site:" + window.encodeURI(url) + "&oq=inurl:%22washing+machine+asda%22+site:www.tesco.com&gs_l=hp.12...1385.1385.0.5478.1.1.0.0.0.0.63.63.1.1.0....0...1c.1.64.psy-ab..0.0.0.kgYBW7C_rG4&pbx=1&bav=on.2,or.&bvm=bv.146094739,d.dGo&fp=1&biw=1276&bih=950&dpr=1&tch=1&ech=1&psi=jpSZWLLHL4uq0gS3poC4Cw.1486460047290.3";
    }
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
