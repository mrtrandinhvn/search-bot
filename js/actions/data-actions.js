export const IMPORT_DATA = "IMPORT_DATA";
export const CHANGE_ROW_STATUS = "CHANGE_ROW_STATUS";
// statusess
export const IN_PROGRESS = "IN_PROGRESS";
export const NOT_STARTED = "NOT_STARTED";
export const DONE = "DONE";
export const ERROR = "ERROR";

// conclusion
export const UNDEFINED = "UNDEFINED";
export const NOT_FOUND = "NOT_FOUND";
export const EXISTS = "EXISTS";

export const createImportDataAction = (keywords, searchLink = "") => {
    const data = keywords.map((kw, index) => {
        return {
            number: index + 1,
            id: index,
            keyword: kw,
            searchLink: searchLink,
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

export const createChangeRowStatusAction = (id = -1, status = NOT_STARTED, results = 0, conclusion = UNDEFINED) => {
    return {
        type: CHANGE_ROW_STATUS,
        data: {
            id,
            status,
            results,
            conclusion
        }
    };
};