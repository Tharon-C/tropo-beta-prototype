import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import ListIcon from "material-ui/svg-icons/action/list";
import NotificationsIcon from "material-ui/svg-icons/social/notifications";
import ProjectsIcon from "material-ui/svg-icons/file/folder";
import ImageIcon from "material-ui/svg-icons/content/save";
import { ListItem } from "material-ui";
import VolumeIcon from "../icons/VolumeIcon";
import InstanceIcon from "../icons/InstanceIcon";

const SideBar = ({
  imageCatalog,
  instances,
  allAssets,
  volumes,
  projects,
  notifications
}) => (
  <nav
    style={{
      background: "#EAEAEA",
      width: "250px",
      paddingTop: "16px",
      overflowX: "scroll",
      position: "sticky",
      top: 0,
      zIndex: "9999",
      boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)"
    }}
  >
    <ListItem primaryText="Dashboard" leftIcon={<DashboardIcon />} />
    <ListItem
      onClick={imageCatalog}
      primaryText="Image Catalog"
      leftIcon={<ImageIcon />}
    />
    <ListItem
      primaryText="All Assets"
      onClick={allAssets}
      leftIcon={<ListIcon />}
      initiallyOpen
    />
    <ListItem
      style={{paddingLeft: "30px"}}
      onClick={instances}
      primaryText="Instances"
      leftIcon={<InstanceIcon />}
    />
    <ListItem
      style={{paddingLeft: "30px"}}
      onClick={volumes}
      primaryText="Volumes"
      leftIcon={<VolumeIcon />}
    />
    <ListItem
      style={{paddingLeft: "30px"}}
      onClick={projects}
      primaryText="Projects"
      leftIcon={<ProjectsIcon />}
    />
    <ListItem
      onClick={notifications}
      primaryText="Notifications"
      leftIcon={<NotificationsIcon />}
    />
  </nav>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      imageCatalog: () => push("/image-catalog"),
      instances: () => push("/instances"),
      volumes: () => push("/volumes"),
      projects: () => push("/projects"),
      allAssets: () => push("/all-assets"),
      notifications: () => push("/notifications")
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(SideBar);
