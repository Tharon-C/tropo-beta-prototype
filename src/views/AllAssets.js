import React from "react";
import injectSheet from "react-jss";
import { Checkbox, Toggle} from "material-ui";
import { FloatingActionButton, Element } from "../cyverse-ui";
import AllAssetList from "../components/allAssets/AllAssetsList";
import CommentLink from "../components/CommentsLink"

const styles = {
  FAB: {
    position: "absolute",
    right: "24px",
    top: "24px"
  }
};

const Instances = ({ classes }) => (
  <React.Fragment>
    <div
      style={{
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
      }}
    > 
    <div style={{display: "flex", alignItems: "center"}}>
      <Element style={{margin: "0 16px 0 0"}} typography="label">Show:</Element>
      <Checkbox style={{width: "150px"}} label="Instances" checked />
      <Checkbox style={{width: "150px"}} label="Volumes" checked />
      <Checkbox style={{width: "150px"}} label="Projects" checked />
      <FloatingActionButton secondary className={classes.FAB} />
    </div>
    <Toggle style={{width: "200px"}} label="Expand Nested Items"/>
    </div>
    <Element whitespace={["pv4", "ps13"]}>
      <AllAssetList />
    </Element>
    <CommentLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285754476/comments"/>
  </React.Fragment>
);

export default injectSheet(styles)(Instances);
