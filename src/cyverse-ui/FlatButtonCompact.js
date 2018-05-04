import React from "react";
import { FlatButton } from "material-ui";

export default ({style, ...rest}) => (
    <FlatButton { ...rest} 
    style={{
        height: "18px",
        lineHeight: "16px",
        minWidth: "0",
        ...style
    }}
    labelStyle={{
        fontSize: "12px",
        paddingRight: "4px",
        paddingLeft: "4px",
    }}/>
)