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
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import Grid from "../lib/gs/gs-react-grid";
const MainApp = () => {
    return (
        <Article>
            <Box align="center">
                <Header
                    fixed={false}
                    float={false}
                    size="medium"
                    splash={false}>
                    <Title>
                        <Box justify="center">
                            Sample Title
                        </Box>
                    </Title>
                </Header>
                <Section>
                    <Box align="center">

                        <Button label="Submit"
                            type="submit"
                            primary={true}
                            onClick={() => { } } >
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
render(<MainApp></MainApp>, document.getElementById("app-root"));