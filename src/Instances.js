import React from "react";
import {Tabs, Tab} from "material-ui";
import ImageList from "../components/ImageList";

export default () => (
    <React.Fragment>
        <div style={{background: "white", position: "sticky", top: 0, boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)", zIndex: "9999"}} >
        <Tabs style={{maxWidth: "800px"}}>
            <Tab label="All"/>
            <Tab label="Featured"/>
            <Tab label="Favorites"/>
            <Tab label="Your Images"/>
        </Tabs>
        </div>
        <div style={{padding: "32px 64px"}}>
            <ImageList/>
        </div>
    </React.Fragment>
)