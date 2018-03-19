import React from "react";
import injectSheet from "react-jss";
import { Element } from "../cyverse-ui";
const styles = {
    wrapper: {
        background: "rgba(0,0,0,.3)",
        padding: "4px",
        position: "fixed",
        bottom: 0,
        left: 0,
        color: "white",
        fontSize: "12px",
        fontWeight: 200,
        zIndex: 9999,
        borderRadius: "0 3px 0 0",
        "&:hover": {
            background: "rgba(0,0,0,.8)",
        }
    }
}
const CommentsLink = ({classes, ...rest}) => (
    <Element {...rest} root="a" className={classes.wrapper}>
      Leave comments for this view
    </Element>
);
export default injectSheet(styles)(CommentsLink)