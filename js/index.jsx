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
import { mainReducer } from "./reducers/main-reducer";

// internal libraries
import $ from "../lib/gs/gs-common";

// components
import MyHeader from "./components/header";
import MainApp from "./components/main-app";
import MyFooter from "./components/footer";

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

const MainAppContainer = connect(
    (state) => {
        // mapStateToProps
        return {
            data: state.data,
            targetSite: state.targetSite,
            sortIndex: state.sortIndex,
            sortAscending: state.sortAscending,
            mode: state.mode
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