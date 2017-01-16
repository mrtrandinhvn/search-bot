import React from "react";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";

const MyHeader = () => {
    return (
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
    );
};
export default MyHeader;