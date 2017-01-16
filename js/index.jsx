import "../css/index";
import "grommet/scss/vanilla/index";
import React from "react";
import { render } from "react-dom";
import MyHeader from "./components/header";
import Box from "grommet/components/Box";
import Article from "grommet/components/Article";
import Section from "grommet/components/Section";
import MyFooter from "./components/footer";
import SearchBtn from "./components/search-btn";

import Grid from "../lib/gs/gs-react-grid";
import { createImportDataAction } from "./actions/data-action";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import Dropzone from "react-dropzone";
import { mainReducer } from "./reducers/data-reducers";

const columns = [
    { field: "keyword", label: "Keyword" },
    { field: "searchLink", label: "Search Url" },
    { field: "status", label: "Status" },
    { field: "results", label: "Results" },
    { field: "conclusion", label: "Conclusion" },
];
const initialState = {
    data: [],
    sortIndex: 0,
    sortAscending: true
};
const DZContainer = connect(null, (dispatch) => {
    return {
        onDrop: (files) => {
            var reader = new FileReader();
            reader.onload = function () {
                dispatch(createImportDataAction(reader.result.split("\r\n")));
            };
            reader.readAsText(files[0]);
        }
    };
})(Dropzone);
const GridContainer = connect(
    (state) => {
        return {
            data: state.data
        };
    },
    null
)(Grid);
const SearchBtnContainer = connect(
    (state) => {
        return {
            data: state.data
        };
    }, (dispatch, props) => {
        return {
            onClick: () => {
                debugger;
                console.log(dispatch);
                console.log(props);
            }
        };
    })(SearchBtn);

const MainApp = () => {
    return (
        <Article>
            <Box align="center"
                colorIndex="light-2">
                <MyHeader></MyHeader>
                <Section>
                    <Box
                        align="center"
                        full={true}
                        colorIndex="light-2"
                        >
                        <Box
                            margin="small"
                            colorIndex="light-1"
                            >
                            <DZContainer
                                multiple={false}
                                style={{
                                    borderWidth: "5px",
                                    borderColor: "#cecccc",
                                    borderStyle: "dashed",
                                    borderRadius: "5px",
                                    padding: "30px",
                                    transition: "all 0.5s",
                                }}
                                activeStyle={{
                                    borderColor: "green"
                                }}>
                                <div style={{
                                    textAlign: "center"
                                }}>Try dropping one file here, or click to select a file to upload.</div>
                            </DZContainer>
                        </Box>
                        <Box
                            margin="small"
                            pad="small"
                            size={
                                {
                                    height: "medium",
                                    width: "xxlarge"
                                }
                            }
                            colorIndex="light-1"
                            style={
                                {
                                    overflowY: "auto"
                                }
                            }
                            >
                            <GridContainer
                                columns={columns}
                                sortIndex={initialState.sortIndex}
                                sortAscending={initialState.sortAscending}
                                >
                            </GridContainer>

                        </Box>
                        <Box>
                            <SearchBtnContainer
                                label="Search"
                                type="button"
                                primary={true}
                                >
                            </SearchBtnContainer>
                        </Box>
                    </Box>
                </Section>
                <MyFooter></MyFooter>
            </Box>
        </Article>
    );
};
render(
    <Provider store={createStore(mainReducer)}>
        <MainApp></MainApp>
    </Provider>, document.getElementById("app-root"));