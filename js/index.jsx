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
import ExportBtn from "./components/export-btn";
import Grid from "../lib/gs/gs-react-grid";
import { createImportDataAction, createChangeRowStatusAction, UNDEFINED, IN_PROGRESS, DONE, ERROR, NOT_FOUND, EXISTS } from "./actions/data-action";
import { createChangeSiteAction } from "./actions/target-site-action";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import Dropzone from "react-dropzone";
import { mainReducer } from "./reducers/main-reducer";
import $ from "../lib/gs/gs-common";
import TextInput from "grommet/components/TextInput";

const columns = [
    { field: "number", label: "No" },
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
const ExportBtnContainer = connect(
    (state) => {
        return {
            data: state.data,
            onClick: () => {
                const items = state.data;
                // exporting file

                let csvContent = "data:text/csv;charset=utf-8,No,Keyword,Status,Conclusion\r\n";
                items.map((item) => {
                    let row = "";
                    ["number", "keyword", "status", "conclusion"].map((field) => {
                        row += item[field] + ",";
                    });
                    csvContent += row.substr(0, row.length - 1);// remove the last , character
                    csvContent += "\r\n";
                });
                const encodedUri = encodeURI(csvContent);
                // window.open(encodedUri);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noopener");
                link.setAttribute("download", "Search on " + state.targetSite + ".csv");
                link.click();
            }
        };
    }, null
)(ExportBtn);
let changeTimeout;
const SiteInputContainer = connect(() => {
    return {
        // value: state.targetSite ? state.targetSite : ""
    };
}, (dispatch) => {
    return {
        onDOMChange: (event) => {
            if (changeTimeout) {
                window.clearTimeout(changeTimeout);
            }
            const value = event.target.value;
            changeTimeout = window.setTimeout(() => {
                dispatch(createChangeSiteAction(value));
            }, 700);
        }
    };
})(TextInput);
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
                        >
                        <Box
                            margin="small"
                            colorIndex="light-1"
                            size={
                                {
                                    width: "xxlarge"
                                }
                            }
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
                            <SiteInputContainer
                                placeHolder="Enter the site where you want to search (start with 'www')"
                                style={{
                                    margin: "10px 0 5px 0"
                                }}
                                >
                            </SiteInputContainer>
                            <Box
                                size="small"
                                >
                                <ExportBtnContainer label="Export to CSV"
                                    type="button"
                                    primary={false}
                                    >
                                </ExportBtnContainer>
                            </Box>
                        </Box>
                        <Box
                            align="center"
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
                                style={{}}
                                >
                            </GridContainer>
                        </Box>
                        <Box
                            align="center"
                            size={
                                {
                                    width: "xxlarge"
                                }
                            }>
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
        </Article >
    );
};
render(
    <Provider store={createStore(mainReducer)}>
        <MainApp></MainApp>
    </Provider>, document.getElementById("app-root"));