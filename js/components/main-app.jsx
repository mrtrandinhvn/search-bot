// external libraries
import React from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import TextInput from "grommet/components/TextInput";
import Dropzone from "react-dropzone";
// components

import { createChangeSiteAction } from "../actions/target-site-action";
import { createImportDataAction, createChangeRowStatusAction, UNDEFINED, IN_PROGRESS, DONE, ERROR, NOT_FOUND, EXISTS } from "../actions/data-action";

// internal libraries
import $ from "../../lib/gs/gs-common";
import Grid from "../../lib/gs/gs-react-grid";

// ================================= END IMPORT ===============================================
// ================================= END IMPORT ===============================================
// ================================= END IMPORT ===============================================
let changeTimeout;

const MainApp = ({columns, sortIndex, sortAscending, data, dispatch, targetSite}) => {
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
                            dispatch(createImportDataAction(reader.result.split("\r\n")));
                        };
                        reader.readAsText(files[0]);
                    } }
                    >
                    <div style={{
                        textAlign: "center"
                    }}>Try dropping one file here, or click to select a file to upload.</div>
                </Dropzone>
                <TextInput
                    placeHolder="Enter the site where you want to search (start with 'www')"
                    style={{
                        margin: "10px 0 5px 0"
                    }}
                    value={targetSite ? targetSite : ""}
                    onDOMChange={(event) => {
                        // if (changeTimeout) {
                        //     window.clearTimeout(changeTimeout);
                        // }
                        const value = event.target.value;
                        // changeTimeout = window.setTimeout(() => {
                        dispatch(createChangeSiteAction(value));
                        // }, 700);
                    } }
                    >
                </TextInput>
                <Box
                    size="small"
                    >
                    <Button label="Export to CSV"
                        type="button"
                        primary={false}
                        onClick={() => {
                            const items = data;
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
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("target", "_blank");
                            link.setAttribute("rel", "noopener");
                            link.setAttribute("download", "Search on " + targetSite + ".csv");
                            link.click();
                        } }
                        >
                    </Button>
                </Box>
            </Box>
            <div>{data.length} keyword(s)</div>
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
                    style={{}}
                    onRowClick={(id) => {
                        console.log(data[id].keyword);
                    } }
                    >
                </Grid>
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
                        console.log("DO SEARCH");
                    } }
                    >
                </Button>
            </Box>
        </Box>
    );
};
MainApp.propTypes = {
    columns: React.PropTypes.array.isRequired,
    sortIndex: React.PropTypes.number.isRequired,
    sortAscending: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    targetSite: React.PropTypes.string
};
export default MainApp;