import React from "react";
import injectSheet from "react-jss";
import {Tabs, Tab} from "material-ui";
import InstanceList from "../components/instances/InstanceList";
import CommentsLink from "../components/CommentsLink";
import { FloatingActionButton, Element } from "../cyverse-ui";
const styles = {
    FAB: {
        position: "absolute",
        right: "24px",
        top: "24px",
    }
}

const Instances = ({classes}) => (
    <React.Fragment>
        <div style={{background: "white", position: "sticky", top: 0, boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)", height: "48px", zIndex: "9999"}} >
            <FloatingActionButton secondary className={classes.FAB}/>
        </div>
        <Element whitespace={["pv4", "ps13"]}>
            <InstanceList/>
        </Element>
        <CommentsLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285754822/comments"/>
    </React.Fragment>
)

export default injectSheet(styles)(Instances)