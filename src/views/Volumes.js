import React from "react";
import injectSheet from "react-jss";
import { zIndex } from "../styles/styles";
import { Tabs, Tab } from "material-ui";
import AssetsFAB from "../containers/AssetsFAB";
import VolumeList from "../components/Volumes/VolumeList";
import { FloatingActionButton, Element } from "../cyverse-ui";
import CommentLink from "../components/CommentsLink";

const styles = {
  viewHeader: {
    background: "white",
    position: "sticky",
    top: 0,
    boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
    height: "48px",
    zIndex: zIndex.viewHeader
  }
};

const Instances = ({ classes }) => (
  <React.Fragment>
    <div className={classes.viewHeader}>
      <AssetsFAB />
    </div>
    <Element whitespace={["pv4", "ps13"]}>
      <VolumeList isSticky={true}/>
    </Element>
    <CommentLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285755680/comments" />
  </React.Fragment>
);

export default injectSheet(styles)(Instances);
