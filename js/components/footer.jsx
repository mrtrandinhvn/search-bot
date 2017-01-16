import React from "react";
import Header from "grommet/components/Header";
import Footer from "grommet/components/Footer";
import Logo from "grommet/components/SVGIcon";
import Paragraph from "grommet/components/Paragraph";

const MyFooter = () => {
    return (
        <Footer>
            <Header justify="between">
                <Logo></Logo>
                <Paragraph margin="none">
                    © 2017 mrtrandinhvn
                        </Paragraph>
            </Header>
        </Footer>
    );
};
export default MyFooter;