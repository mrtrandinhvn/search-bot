export const IMPORT_DATA = "IMPORT_DATA";
export const CHANGE_ROW_STATUS = "CHANGE_ROW_STATUS";
// statusess
export const IN_PROGRESS = "IN_PROGRESS";
export const NOT_STARTED = "NOT_STARTED";
export const DONE = "DONE";

// conclusions
export const UNDEFINED = "UNDEFINED";
export const NOT_FOUND = "NOT_FOUND";
export const EXISTS = "EXISTS";

export const createImportDataAction = (keywords) => {
    const data = keywords.map((kw, index) => {
        return {
            id: index,
            keyword: kw,
            searchLink: kw + " link",
            status: NOT_STARTED,
            results: 0,
            conclusion: UNDEFINED
        };
    });
    return {
        type: IMPORT_DATA,
        data
    };
};

export const createChangeRowStatusAction = (id, status, results, conclusions) => {
    return {
        type: CHANGE_ROW_STATUS,
        data: {
            id,
            status,
            results,
            conclusions
        }
    };
};