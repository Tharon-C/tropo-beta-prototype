import React from 'react';
import { SvgIcon } from 'material-ui';

const InstanceIcon = ({ size = 24, style, ...rest }) => {
    return (
        <SvgIcon { ...rest }
            style={{
                height: size,
                width: size,
                ...style
            }}
        >
            <path d="M2,20 L22,20 L22,16 L2,16 L2,20 L2,20 Z M4,17 L6,17 L6,19 L4,19 L4,17 L4,17 Z M8,17 L10,17 L10,19 L8,19 L8,17 Z M5,5 L19,5 L22,15 L2,15 L5,5 Z" id="path-1"></path>
        </SvgIcon>
    )
};

export default InstanceIcon