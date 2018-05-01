import React from "react";
import injectSheet, { withTheme } from "react-jss";
import classnames from "classnames";
import Element from "./Element";

const styles = theme => ({
    wrapper: {
        maxWidth: "600px",
        lineHeight: "24px",
        margin: 0,
        ...theme.whitespace.m0,
        ...theme.whitespace.mb3,
    },
});

class P extends React.Component {
    /**
     * P is a typography component for rendering a paragraph with the proper styles.
     */
    static displayName = "P";
    render() {
        const { classes, className, rest, whitespace="mb3" } = this.props;
        const wrapperClasses = classnames(
            { [className]: className },
            "CY-P",
            classes.wrapper,
        );
        return (
            <Element
                {...rest}
                root="p"
                whitespace={whitespace}
                className={wrapperClasses}
            >
                {this.props.children}
            </Element>
        );
    }
}

export default withTheme(injectSheet(styles)(P));
