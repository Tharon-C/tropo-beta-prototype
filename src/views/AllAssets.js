import React from "react";
import injectSheet from "react-jss";
import { Checkbox, Toggle } from "material-ui";
import { FloatingActionButton, Element } from "../cyverse-ui";
import AssetsFAB from "../containers/AssetsFAB";
import AllAssetList from "../components/allAssets/AllAssetsList";
import CommentLink from "../components/CommentsLink";

const styles = {
  viewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    position: "sticky",
    top: 0,
    boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
    height: "48px",
    zIndex: "900",
    padding: "0 120px 0 16px"
  },
  filters: {
    display: "flex",
    alignItems: "center"
  },
  filtersLabel: {
    margin: "0 16px 0 0"
  },
  filter: {
    width: "150px"
  }
};

const Instances = ({ classes }) => (
  <React.Fragment>
    <div className={classes.viewHeader}>
      <div className={classes.filters}>
        <Element className={classes.filtersLabel} typography="label">
          Show:
        </Element>
        <Checkbox style={styles.filter} label="Instances" checked />
        <Checkbox style={styles.filter} label="Volumes" checked />
        <Checkbox style={styles.filter} label="Projects" checked />
      </div>
      <Toggle style={{ width: "200px" }} label="Expand Nested Items" />
      <AssetsFAB />
    </div>
    <Element whitespace={["pv4", "ps13"]}>
      <AllAssetList isSticky/>
    </Element>
    <CommentLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285754476/comments" />
  </React.Fragment>
);

export default injectSheet(styles)(Instances);
