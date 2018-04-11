import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { zIndex } from "../styles/styles";
import DashboardIcon from "material-ui/svg-icons/action/dashboard";
import ListIcon from "material-ui/svg-icons/action/list";
import NotificationsIcon from "material-ui/svg-icons/social/notifications";
import ProjectsIcon from "material-ui/svg-icons/file/folder";
import ImageIcon from "material-ui/svg-icons/content/save";
import { ListItem } from "material-ui";
import VolumeIcon from "../icons/VolumeIcon";
import InstanceIcon from "../icons/InstanceIcon";
import SelectableList from "../components/SelectableList";

const SideBar = ({
  dashboard,
  imageCatalog,
  instances,
  allAssets,
  volumes,
  projects,
  notifications,
  current
}) => {
  return (
    <nav
      style={{
        background: "#EAEAEA",
        width: "250px",
        paddingTop: "16px",
        overflowX: "scroll",
        position: "sticky",
        top: 0,
        zIndex: zIndex.SideBar,
        boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)"
      }}
    >
      <SelectableList value={current || "dashboard"}>
        <ListItem
          value={"dashboard"}
          onClick={dashboard}
          primaryText="Dashboard"
          leftIcon={<DashboardIcon />}
        />
        <ListItem
          value={"image-catalog"}
          onClick={imageCatalog}
          primaryText="Image Catalog"
          leftIcon={<ImageIcon />}
        />
        <ListItem
          value={"all-assets"}
          primaryText="All Assets"
          onClick={allAssets}
          leftIcon={<ListIcon />}
        />
        <ListItem
          value={"instances"}
          style={{ paddingLeft: "30px" }}
          onClick={instances}
          primaryText="Instances"
          leftIcon={<InstanceIcon />}
        />
        <ListItem
          value={"volumes"}
          style={{ paddingLeft: "30px" }}
          onClick={volumes}
          primaryText="Volumes"
          leftIcon={<VolumeIcon />}
        />
        <ListItem
          value={"projects"}
          style={{ paddingLeft: "30px" }}
          onClick={projects}
          primaryText="Projects"
          leftIcon={<ProjectsIcon />}
        />
        <ListItem
          value={"notifications"}
          onClick={notifications}
          primaryText="Notifications"
          leftIcon={<NotificationsIcon />}
        />
      </SelectableList>
    </nav>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dashboard: () => push(`${process.env.PUBLIC_URL}/`),
      imageCatalog: () => push(`${process.env.PUBLIC_URL}/image-catalog`),
      instances: () => push(`${process.env.PUBLIC_URL}/instances`),
      volumes: () => push(`${process.env.PUBLIC_URL}/volumes`),
      projects: () => push(`${process.env.PUBLIC_URL}/projects`),
      allAssets: () => push(`${process.env.PUBLIC_URL}/all-assets`),
      notifications: () => push(`${process.env.PUBLIC_URL}/notifications`)
    },
    dispatch
  );

const mapStateToProps = state => ({
  current: state.routing.location.pathname
    .split("/")
    .filter(i => !!i && i !== "tropo-beta-prototype")[0]
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
