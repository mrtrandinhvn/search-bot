export const ALLINTITLE = "allintitle";
export const ALLINTEXT = "allintext";
export const CHANGE_SEARCH_MODE = "CHANGE_SEARCH_MODE";

export const createChangeSearchModeAction = (mode = ALLINTITLE) => {
    return {
        type: CHANGE_SEARCH_MODE,
        mode
    };
};