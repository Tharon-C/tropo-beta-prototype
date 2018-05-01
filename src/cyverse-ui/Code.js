import React from "react";
import classnames from "classnames";
import injectSheet from "react-jss";
import Element from "./Element";

const styles = theme => ({
  wrapper: {
    background: "rgba(0,0,0,0.03)",
    fontSize: "14px"
  },
  wrapper__inline: {
    display: "inline",
    border: "solid rgba(0,0,0,.2) 1px",
    borderRadius: "3px",
    color: "crimson",
    padding: "0 3px 2px",
    verticalAlign: "middle"
  },
  wrapper__block: {
    display: "block",
    whiteSpace: "pre-wrap",
    padding: "20px",
    borderLeft: "solid rgba(0,0,0,.08) 5px"
  }
});
const Code = ({ classes, className, inline = true, block, ...rest }) => {
  const codeClasses = classnames(
    className,
    "Cy-Code",
    classes.wrapper,
    { [classes.wrapper__inline]: inline },
    { [classes.wrapper_block]: block }
  );
  return <Element root="code" {...rest} className={codeClasses} />;
};

export default injectSheet(styles)(Code);
