import React from "react";
import { hoverable } from "cyverse-ui/es/utils";

const IsHovered = ({render}) => { 
    return hoverable(render())
}

export default IsHovered;