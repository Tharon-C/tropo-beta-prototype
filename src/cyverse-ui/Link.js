import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import Element from "./Element";

const styles = theme => ({
    wrapper: {
        color: theme.palette.primary1Color
    }
})

const CyLink = ({classes, ...rest}) => (
    <Link {...rest} className={classes.wrapper}/>
)

export default injectSheet(styles)(CyLink)
