import React from "react";
import {Tabs, Tab} from "material-ui";
import NotificationList from "../components/notifications/NotificationList";

export default () => (
    <React.Fragment>
        <div style={{padding: "32px 64px"}}>
            <NotificationList/>
        </div>
    </React.Fragment>
)