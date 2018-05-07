import React from "react";
import injectSheet from "react-jss";
import RemoveIcon from "material-ui/svg-icons/navigation/close";
import { Element } from "../cyverse-ui";

const styles = theme => ({
  wrapper: {
    position: "relative",
    background: "#DEDEDE",
    borderRadius: "900px",
    fontSize: "12px",
    display: "inline-block",
    margin: "4px"
  },
  innerWrapper: {
    display: "flex",
    alignItems: "center",
    height: "22px"
  },
  label: {
    marginRight: "8px",
    marginLeft: "8px"
  },
  removeButton: {
    height: "14px",
    width: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,.2)",
    borderRadius: "999px",
    marginRight: "4px",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(0,0,0,.4)"
    }
  },
  removeIcon: {
    width: "12px",
    height: "12px"
  }
});

const Tag = ({ classes, label, onRemove, ...rest }) => (
  <Element {...rest} onClick={onRemove} className={classes.wrapper}>
    <div className={classes.innerWrapper}>
      <div className={classes.label}>{label}</div>
      {onRemove ? (
        <div className={classes.removeButton} onClick={onRemove}>
          <RemoveIcon className={classes.removeIcon} color="#DEDEDE" />
        </div>
      ) : null}
    </div>
  </Element>
);

export default injectSheet(styles)(Tag);
