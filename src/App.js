import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, IndexRoute, withRouter } from "react-router-dom";
import { closeSidebar, openSidebar } from "./actions/appActions";
import Sidebar from "./containers/SideBar";
import AppBar from "./containers/AppBar";
import Dashboard from "./views/Dashboard";
import ImageCatalog from "./views/ImageCatalog";
import Instances from "./views/Instances";
import Volumes from "./views/Volumes";
import Projects from "./views/Projects";
import Notifications from "./views/Notifications";
import AllAssets from "./views/AllAssets";
import ProjectDetail from "./views/ProjectDetail";
import InstanceDetail from "./views/InstanceDetail"
import VolumeDetail from "./views/VolumeDetail";
import LinkDetail from "./views/LinkDetail";
import ImageDetail from "./views/ImageDetail";
import dashboard from "material-ui/svg-icons/action/dashboard";
import viewAgenda from "material-ui/svg-icons/action/view-agenda";
import { bindActionCreators } from "../../../Library/Caches/typescript/2.7/node_modules/redux";

class App extends Component {
  render() {
    const { showWizard, closeSidebar, openSidebar, windowSize } = this.props;
    windowSize === "large" || windowSize === "infinity"
      ? openSidebar()
      : closeSidebar();
    return !showWizard ? (
      <div>
        <AppBar />
        <div
          style={{
            display: "flex",
            height: "calc(100vh - 56px)"
          }}
        >
          <Sidebar />
          <main
            style={{
              background: "#F2F2F2",
              flexGrow: 1,
              width: 0,
              overflowX: "scroll"
            }}
          >
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Dashboard}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/image-catalog`}
              component={ImageCatalog}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/all-assets`}
              component={AllAssets}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/instances`}
              component={Instances}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/volumes`}
              component={Volumes}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/projects`}
              component={Projects}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/notifications`}
              component={Notifications}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/projects/:id`}
              component={ProjectDetail}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/instances/:id`}
              component={InstanceDetail}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/volumes/:id`}
              component={VolumeDetail}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/links/:id`}
              component={LinkDetail}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/image-catalog/:id`}
              component={ImageDetail}
            />
          </main>
        </div>
      </div>
    ) : null;
  }
}

function mapStateToProps(store) {
  return {
    windowSize: store.browser.mediaType,
    showWizard: store.createInstance.showForm
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeSidebar,
      openSidebar
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
