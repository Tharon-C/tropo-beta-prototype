import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { isMobile } from "../selectors/browser";
import { zIndex } from "../styles/styles";
import { Tabs, Tab } from "material-ui";
import AssetsFAB from "../containers/AssetsFAB";
import VolumeList from "../components/Volumes/VolumeList";
import { Element } from "../cyverse-ui";
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

const Instances = ({ classes, isMobile }) => (
  <React.Fragment>
    {isMobile ? (
      <AssetsFAB isMobile={true} />
    ) : (
      <div className={classes.viewHeader}>
        <AssetsFAB />
      </div>
    )}
    <Element whitespace={isMobile ? "ps2" : ["pv4", "ps13"]}>
      <VolumeList isMobile={true} isSticky={true} />
    </Element>
    <CommentLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285755680/comments" />
  </React.Fragment>
);

const mapStateToProps = state => ({
  isMobile: isMobile(state)
});
export default connect(mapStateToProps, null)(injectSheet(styles)(Instances));
