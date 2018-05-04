import React from "react";
import injectSheet from "react-jss";
import Element from "./Element";

const styles = theme => ({
    wrapper: {
        color: theme.palette.primary1Color
    }
})

const Link = ({classes, ...rest}) => (
    <Element {...rest} root="a" className={classes.wrapper}/>
)

export default injectSheet(styles)(Link)
