// stylesheets
import "../css/index";
import "grommet/scss/vanilla/index";

// external libraries
import React from "react";
import { render } from "react-dom";
import Box from "grommet/components/Box";
import Article from "grommet/components/Article";
import Section from "grommet/components/Section";

import { connect, Provider } from "react-redux";
import { createStore } from "redux";

// redux's files
import { createImportDataAction, createChangeRowStatusAction, UNDEFINED, IN_PROGRESS, DONE, ERROR, NOT_FOUND, EXISTS } from "./actions/data-action";
import { mainReducer } from "./reducers/main-reducer";

// internal libraries
import $ from "../lib/gs/gs-common";

// components
import MyHeader from "./components/header";
import MainApp from "./components/main-app";
import MyFooter from "./components/footer";
import SearchBtn from "./components/search-btn";

// ================================= END IMPORT ===============================================
// ================================= END IMPORT ===============================================
// ================================= END IMPORT ===============================================

const columns = [
    { field: "number", label: "No" },
    { field: "keyword", label: "Keyword" },
    // { field: "searchLink", label: "Search Url" },
    { field: "status", label: "Status" },
    // { field: "results", label: "Results" },
    { field: "conclusion", label: "Conclusion" },
];

const SearchBtnContainer = connect(
    (state) => {
        return {
            data: state.data
        };
    }, null,
    (stateProps, dispatchProps, ownProps) => {
        // mergeProps
        const {dispatch} = dispatchProps;
        const items = stateProps.data;
        return {
            ...ownProps,
            ...stateProps,
            onClick: () => {
                let i = 0;
                console.log("START SEARCHING...");
                const doSearch = (rowIndex) => {
                    if (i < 6) {
                        const item = items[i];
                        dispatch(createChangeRowStatusAction(rowIndex, IN_PROGRESS, 0, NOT_FOUND));
                        $.ajax({
                            url: item.searchLink,
                            success: (text) => {
                                let conclusion;
                                if (text.indexOf("did not match any documents.") > -1) {
                                    conclusion = NOT_FOUND;
                                } else {
                                    conclusion = EXISTS;
                                }
                                dispatch(createChangeRowStatusAction(rowIndex, DONE, 0, conclusion));
                            },
                            error: () => {
                                dispatch(createChangeRowStatusAction(rowIndex, ERROR, 0, UNDEFINED));
                            }
                        });
                        i++;
                    } else {
                        console.log(i);
                        window.clearInterval(searchInterval);
                        console.log("STOP SEARCHING");
                    }
                };
                doSearch(i); // initial run
                const searchInterval = window.setInterval(function () {
                    doSearch(i);
                }, 10000);
            }
        };
    }
)(SearchBtn);

const MainAppContainer = connect(
    (state) => {
        // mapStateToProps
        return {
            data: state.data,
            targetSite: state.targetSite,
            sortIndex: state.sortIndex,
            sortAscending: state.sortAscending
        };
    }
)(MainApp);
const AppWrapper = () => {
    return (
        <Article>
            <Box align="center"
                colorIndex="light-2">
                <MyHeader></MyHeader>
                <Section>
                    <MainAppContainer
                        columns={columns}
                        >
                    </MainAppContainer>
                </Section>
                <MyFooter></MyFooter>
            </Box>
        </Article >
    );
};
render(
    <Provider store={createStore(mainReducer)}>
        <AppWrapper></AppWrapper>
    </Provider>, document.getElementById("app-root"));