import React from "react";
import injectSheet from "react-jss";
import classnames from "classnames";
import { Element} from "../cyverse-ui";

const styles = theme => ({
    wrapper: {
        display: "flex",
        alignItems: "center"
      },
    statusLight: {
        height: "12px",
        width: "12px",
        borderRadius: "900px",
        display: "inline-block",
        marginRight: "8px"
      },
      statusInactive: {
        background: "lightGrey"
      },
      statusActive: {
        background: theme.palette.success
      },
      statusError: {
        background: theme.palette.danger
      }
})

const Status = ({className, color, label, classes, ...rest}) => {
    let statusColor;
    switch (color) {
      case "success":
        statusColor = classes.statusActive;
        break;
      case "danger":
        statusColor = classes.statusError;
        break;
        case "inactive":
        statusColor = classes.statusInactive;
      default:
        statusColor = classes.statusInactive;
    }

    const wrapperClasses = classnames(
        {[className]: className},
        classes.wrapper,
    )
    return (
        <Element {...rest} className={wrapperClasses}>
            <div className={`${statusColor} ${classes.statusLight}`} /> {label}
        </Element>
    )
}

export default injectSheet(styles)(Status);