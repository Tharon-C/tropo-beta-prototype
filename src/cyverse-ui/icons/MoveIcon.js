import React from "react";
import { SvgIcon } from "material-ui";

const LinkIcon = ({ size = 24, style, ...rest }) => {
    return (
        <SvgIcon
            {...rest}
            style={{
                height: size,
                width: size,
                ...style,
            }}
            viewBox="0 0 24 24"
        >
        
        <path d="M10,4 L12,6 L20,6 C21.1,6 22,6.9 22,8 L22,18 C22,19.1 21.1,20 20,20 L4,20 C2.9,20 2,19.1 2,18 L2.01,6 C2.01,4.9 2.9,4 4,4 L10,4 Z M11.1226016,15 L11.1226016,17.3964844 L17,12.8964844 L11.1226016,8.39648438 L11.1226016,11 L6.51123047,11 L6.51123047,15 L11.1226016,15 Z" id="path-1"></path>
        </SvgIcon>
    );
};

export default LinkIcon;
