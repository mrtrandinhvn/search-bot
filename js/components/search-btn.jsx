import React from "react";
import Button from "grommet/components/Button";
const SearchBtn = (props) => {
    return (
        <div data={props.data}>
            <Button {...props}></Button>
        </div>
    );
};
export default SearchBtn;