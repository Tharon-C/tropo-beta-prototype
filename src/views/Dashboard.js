import React, { Component } from "react";
import { Element, Hr, P } from "../cyverse-ui";
import DashboardWidgets from "../components/dashboard/DashboardWidgets"

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Element whitespace={["pv4", "ps13"]}>
            <DashboardWidgets/>
        </Element>
      </React.Fragment>
    );
  }
}

export default Dashboard;
