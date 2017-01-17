export const CHANGE_SITE = "CHANGE_SITE";
export const createChangeSiteAction = (newUrl = "") => {
    return {
        type: CHANGE_SITE,
        newUrl
    };
};