import React from "react";
import injectSheet from "react-jss";
import { Tabs, Tab } from "material-ui";
import { Element } from "../cyverse-ui";
import AssetsFAB from "../containers/AssetsFAB";
import InstanceList from "../components/instances/InstanceList";
import CommentsLink from "../components/CommentsLink";
const styles = {
  viewHeader: {
    background: "white",
    position: "sticky",
    top: 0,
    boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
    height: "48px",
    zIndex: "9999"
  }
};

const Instances = ({ classes }) => (
  <React.Fragment>
    <div className={classes.viewHeader}>
      <AssetsFAB />
    </div>
    <Element whitespace={["pv4", "ps13"]}>
      <InstanceList />
    </Element>
    <CommentsLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285754822/comments" />
  </React.Fragment>
);

export default injectSheet(styles)(Instances);
