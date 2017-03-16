// external libraries
import React from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Input from "grommet/components/TextInput";
import RadioButton from "grommet/components/RadioButton";
import FormField from "grommet/components/FormField";
import Columns from "grommet/components/Columns";
import Form from "grommet/components/Form";
import Dropzone from "react-dropzone";
// components
import { createChangeSearchModeAction, IN_TITLE, IN_TEXT, IN_URL, WILDCARD } from "../actions/search-mode-actions";
import { createChangeSiteAction } from "../actions/target-site-actions";
import { createImportDataAction, createChangeRowStatusAction, UNDEFINED, IN_PROGRESS, DONE, ERROR, NOT_FOUND, EXISTS } from "../actions/data-actions";

// internal libraries
import $ from "../../lib/gs/gs-common";
import Grid from "../../lib/gs/gs-react-grid";
import { generateAjaxSearchLink } from "../reducers/data-reducers";

// ================================= END IMPORT ===============================================
// ================================= END IMPORT ===============================================
// ================================= END IMPORT ===============================================
let changeTimeout;
const searchTimeInterval = 300; // ms
const siteChangeTimeout = 700; // ms
const MainApp = ({ columns, sortIndex, sortAscending, data, dispatch, targetSite, mode }) => {
    const total = data.length;
    const searched = data.filter((item) => item.status === DONE || item.status === ERROR).length;
    const searchedPercent = (searched * 100 / total).toFixed(2);
    return (
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
                <Dropzone
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
                    }}
                    onDrop={(files) => {
                        var reader = new FileReader();
                        reader.onload = function () {
                            const keywords = [];
                            reader.result.split("\r\n").map((row) => {
                                keywords.push(row.split(",")[0]); // get the first column of each row
                            });
                            dispatch(createImportDataAction(keywords));
                        };
                        reader.readAsText(files[0]);
                    }}
                >
                    <div style={{
                        textAlign: "center"
                    }}>Try dropping one file here, or click to select a file to upload.</div>
                </Dropzone>
                <Box
                    align="center"
                    size={{
                        width: "xxlarge"
                    }}
                >
                    <Columns
                        masonry={false}
                        size='small'
                        justify='center'
                        maxCount={2}>
                        <Box align='center'
                            pad='medium'
                            margin='small'
                            colorIndex='light-2'>
                            <FormField label="API Key">
                                <Input></Input>
                            </FormField>
                        </Box>
                        <Box align='center'
                            pad='medium'
                            margin='small'
                            colorIndex='light-2'>
                            <FormField label="Search Engine ID">
                                <Input></Input>
                            </FormField>
                        </Box>
                    </Columns>
                    <Form
                        style={{
                            width: "100%"
                        }}
                    >
                        <FormField
                            label="Search Site"
                            style={{
                                width: "100%"
                            }}
                        >
                            <Input
                                placeHolder="Start with 'www'"
                                defaultValue=""
                                onDOMChange={(event) => {
                                    if (changeTimeout) {
                                        window.clearTimeout(changeTimeout); // clear old timeout
                                    }
                                    const value = event.target.value;
                                    changeTimeout = window.setTimeout(() => {
                                        dispatch(createChangeSiteAction(value));
                                    }, siteChangeTimeout);
                                }}
                            >
                            </Input>
                        </FormField>
                        <FormField
                            label="Search Mode"
                            style={{ width: "100%" }}
                        >
                            <RadioButton
                                id="mode-intext"
                                label="High Traffic"
                                checked={mode === IN_TEXT}
                                onChange={() => {
                                    dispatch(createChangeSearchModeAction(IN_TEXT));
                                }} ></RadioButton>
                            <RadioButton
                                id="mode-intitle"
                                label="High conversions"
                                checked={mode === IN_TITLE}
                                onChange={() => {
                                    dispatch(createChangeSearchModeAction(IN_TITLE));
                                }} ></RadioButton>
                            <RadioButton
                                id="mode-wildcard"
                                label="Wildcard"
                                checked={mode === WILDCARD}
                                onChange={() => {
                                    dispatch(createChangeSearchModeAction(WILDCARD));
                                }} ></RadioButton>
                            <RadioButton
                                id="mode-inurl"
                                label="Products being sold"
                                checked={mode === IN_URL}
                                onChange={() => {
                                    dispatch(createChangeSearchModeAction(IN_URL));
                                }} ></RadioButton>
                        </FormField>
                    </Form>
                </Box>
            </Box>
            <Box
                align="center"
                size={
                    {
                        width: "xxlarge"
                    }
                }>
                <Button
                    label="Search"
                    type="button"
                    primary={true}
                    onClick={() => {
                        let i = 0;
                        const doSearch = (rowIndex) => {
                            if (i < data.length) {
                                const item = data[i];
                                dispatch(createChangeRowStatusAction(rowIndex, IN_PROGRESS));
                                $.ajax({
                                    url: generateAjaxSearchLink(targetSite, item.keyword, mode),
                                    success: (text) => {
                                        let conclusion;
                                        if (text.indexOf("No results found for") > -1 || text.indexOf("did not match any documents.") > -1) {
                                            conclusion = NOT_FOUND;
                                        } else {
                                            conclusion = EXISTS;
                                        }
                                        //let conclusion = EXISTS;
                                        //console.log(generateAjaxSearchLink(targetSite, item.keyword, mode));
                                        //window.setTimeout(
                                        //() => {
                                        dispatch(createChangeRowStatusAction(rowIndex, DONE, 0, conclusion));
                                        //}, 1000);
                                    },
                                    error: () => {
                                        dispatch(createChangeRowStatusAction(rowIndex, ERROR, 0, UNDEFINED));
                                    }
                                });
                                i++;
                            } else {
                                window.clearInterval(searchInterval);
                            }
                        };
                        doSearch(i); // initial run
                        const searchInterval = window.setInterval(function () {
                            doSearch(i);
                        }, searchTimeInterval);
                    }}
                >
                </Button>
            </Box>
            <div style={{
                width: "960px",
                border: "1px solid #ddd"
            }}>
                <span style={{
                    color: "#fff",
                    display: "inline-block",
                    width: isNaN(searchedPercent) ? 0 : searchedPercent + "%",
                    textAlign: "center",
                    backgroundColor: "#865cd6"
                }}>{isNaN(searchedPercent) ? "0" : searchedPercent}%</span>
            </div>
            <Box
                size="small"
                margin="small"
            >
                <Button label="Export to CSV"
                    type="button"
                    primary={false}
                    style={{
                        display: searched === total && total > 0 ? "block" : "none"
                    }}
                    onClick={() => {
                        const items = data;
                        // exporting file
                        let csvContent = "data:text/csv;charset=utf-8,No,Keyword,Status,Conclusion\r\n";
                        items.map((item) => {
                            let row = "";
                            ["number", "keyword", "status", "conclusion"].map((field) => {
                                row += item[field] + ",";
                            });
                            // row += generateExportSearchLink(item.targetSite, item.keyword, mode);
                            csvContent += row.substr(0, row.length - 1);// remove the last ',' character
                            csvContent += "\r\n";
                        });
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("target", "_blank");
                        link.setAttribute("rel", "noopener");
                        link.setAttribute("download", "Search on " + targetSite + ".csv");
                        link.click();
                    }}
                >
                </Button>
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
                <Grid
                    data={data}
                    columns={columns}
                    sortIndex={sortIndex}
                    sortAscending={sortAscending}
                >
                </Grid>
            </Box>
        </Box >
    );
};
MainApp.propTypes = {
    columns: React.PropTypes.array.isRequired,
    sortIndex: React.PropTypes.number.isRequired,
    sortAscending: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    targetSite: React.PropTypes.string,
    mode: React.PropTypes.string.isRequired
};
export default MainApp;