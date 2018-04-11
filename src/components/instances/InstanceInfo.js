import React from "react";
import injectSheet, { withTheme } from "react-jss";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import { Element, P } from "../../cyverse-ui";
import Tag from "../Tag";
import InstanceVolumes from "./InstanceVolumes";

const styles = theme => ({
  listItem: {
    display: "flex",
    ...theme.whitespace["mb2"],
    "@media(max-width: 780px)": {
      display: "block",
      ...theme.whitespace["mb3"],

    }
  },
  label: {
    width: "100px"
  },
  details: {
    maxWidth: "50%",
    paddingRight: "36px",
    "@media(max-width: 1400px)": {
      maxWidth: "100%"
    }
  }
});
const InstanceInfo = ({ image, classes }) => (
  <Element className={classes.details}>
    <Element whitespace="mb4">
      <Element typography="body2" whitespace="mb4">
        InstanceDetails
      </Element>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          ID
        </Element>
        <Element typography="body1">19737</Element>
      </div>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          Status
        </Element>
        <Element typography="body1">Active</Element>
      </div>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          Size
        </Element>
        <Element typography="body1">Large1</Element>
      </div>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          IP Adress
        </Element>
        <Element typography="body1">128.196.65.334</Element>
      </div>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          Based on
        </Element>
        <Element typography="body1">Ubuntu 14.04 with Docker 17x</Element>
      </div>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          Provider
        </Element>
        <Element typography="body1">Marana Cloud</Element>
      </div>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          SSH Key
        </Element>
        <Element typography="body1">Office Desktop</Element>
      </div>
      <div className={classes.listItem}>
        <Element className={classes.label} typography="label" whitespace="mb1">
          Identifier
        </Element>
        <Element typography="body1">55757663hfdhg456768567ggdff5rf</Element>
      </div>
    </Element>
    <Element typography="label" whitespace="mb1">
      Notes
    </Element>
    <P whitespace="mb4">{image.description}</P>
    <Element whitespace="mb4">
      <Element typography="label" whitespace="mb1">
        Tags
      </Element>
      {image.tags.map(({ id }) => {
        return <Tag label={get.byId(id)(tags).name} />;
      })}
    </Element>
    <Element typography="label" whitespace="mb1">
      Volumes
    </Element>
    <Element
      style={{
        overflow: "hidden",
        display: "flex",
        whiteSpace: "nowrap",
        width: "100%",
        padding: "4px"
      }}
    >
      <InstanceVolumes instance={image} />
    </Element>
  </Element>
);

export default withTheme(injectSheet(styles)(InstanceInfo));
