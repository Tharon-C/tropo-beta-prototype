import React from "react";
import injectSheet from "react-jss";
import {Tabs, Tab} from "material-ui";
import VolumeList from "../components/Volumes/VolumeList";
import { FloatingActionButton } from "../cyverse-ui";
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
            <FloatingActionButton className={classes.FAB}/>
        </div>
        <div style={{padding: "32px 64px"}}>
            <VolumeList/>
        </div>
    </React.Fragment>
)

export default injectSheet(styles)(Instances)