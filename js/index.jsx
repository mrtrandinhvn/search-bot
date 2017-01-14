import "../css/index";
import "grommet/scss/vanilla/index";
import React from "react";
import { render } from "react-dom";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Article from "grommet/components/Article";
import Section from "grommet/components/Section";
import Footer from "grommet/components/Footer";
import Button from "grommet/components/Button";
import Logo from "grommet/components/SVGIcon";
import Paragraph from "grommet/components/Paragraph";
import Grid from "../lib/gs/gs-react-grid";
import { createAddDataAction } from "./actions/data-action";
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
                dispatch(createAddDataAction(reader.result.split("\r\n")));
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
const MainApp = () => {
    return (
        <Article>
            <Box align="center"
                colorIndex="light-2">
                <Header
                    fixed={false}
                    float={false}
                    size="medium"
                    splash={false}>
                    <Title>
                        <Box align="center">
                            Google Search Bot
                        </Box>
                    </Title>
                </Header>
                <Section>
                    <Box align="center"
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
                                    borderWidth: "2px",
                                    borderColor: "black",
                                    borderStyle: "dashed",
                                    borderRadius: "4px",
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
                            full="horizontal"
                            size={
                                {
                                    height: "medium"
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
                        <Button label="Search"
                            type="submit"
                            primary={true}
                            onClick={() => { console.log(1); } } >
                        </Button>
                    </Box>
                </Section>
                <Footer>
                    <Header justify="between">
                        <Logo></Logo>
                        <Paragraph margin="none">
                            © 2017 mrtrandinhvn
                        </Paragraph>
                    </Header>
                </Footer>
            </Box>
        </Article>
    );
};
render(
    <Provider store={createStore(mainReducer)}>
        <MainApp></MainApp>
    </Provider>, document.getElementById("app-root"));