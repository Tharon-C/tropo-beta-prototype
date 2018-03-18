import React from "react";
import injectSheet, { withTheme } from "react-jss";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import { Element, P } from "../../cyverse-ui";
import Tag from "../Tag";

const styles = theme => ({
    listItem: {
        display: "flex",
        marginBottom: "16px"

    },
    label: {
        width: "100px",
    },
    details: {
        maxWidth: "50%",
        paddingRight: "36px"
    }
})
const VolumeInfo = ({image, classes}) => (
    <Element className={classes.details}>
        <Element whitespace="mb4">
            <Element typography="body2" whitespace="mb4">
                VolumeDetails
            </Element>
            <div className={classes.listItem}>
                <Element className={classes.label} typography="label" whitespace="mb1">
                    ID
                </Element>
                <Element typography="body1">
                    19737
                </Element>
            </div>
            <div className={classes.listItem}>
                <Element className={classes.label} typography="label">
                    Status
                </Element>
                <Element typography="body1">
                    Attached
                </Element>
            </div>
            <div className={classes.listItem}>
                <Element className={classes.label} typography="label">
                    Size
                </Element>
                <Element typography="body1">
                    60GB
                </Element>
            </div>
            <div className={classes.listItem}>
                <Element className={classes.label} typography="label" whitespace="mb1">
                    Provider
                </Element>
                <Element typography="body1">
                    Marana Cloud
                </Element>
            </div>
            <div className={classes.listItem}>
                <Element className={classes.label} typography="label" whitespace="mb1">
                    Identifier
                </Element>
                <Element typography="body1">
                    55757663hfdhg456768567ggdff5rf
                </Element>
            </div>
        </Element>
        <Element typography="label" whitespace="mb1">
            Notes
        </Element>
        <P whitespace="mb4">{image.description}</P>
        <Element typography="label" whitespace="mb1">
            Tags
        </Element>
        {image.tags.map(({ id }) => {
          return <Tag label={get.byId(id)(tags).name} />;
        })} 
    </Element>
)

export default withTheme(injectSheet(styles)(VolumeInfo))