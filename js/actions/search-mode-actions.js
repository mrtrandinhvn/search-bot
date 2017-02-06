export const IN_TEXT = "intext";
export const IN_TITLE = "intitle";
export const WILDCARD = "wildcat";
export const IN_URL = "inurl";
export const CHANGE_SEARCH_MODE = "CHANGE_SEARCH_MODE";

export const createChangeSearchModeAction = (mode = IN_TEXT) => {
    return {
        type: CHANGE_SEARCH_MODE,
        mode
    };
};