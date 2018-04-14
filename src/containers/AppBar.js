import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openSidebar, closeSidebar } from "../actions/appActions";
import { withRouter } from "react-router-dom";
import { zIndex } from "../styles/styles";
import { isMobile } from "../selectors/browser";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import UserIcon from "material-ui/svg-icons/action/account-circle";
import SearchBar from "../components/SearchBar";
import { IconButton } from "material-ui";

const AppBar = ({ location, sidebarIsOpen, openSidebar, closeSidebar, isMobile }) => {
  const appName = location.pathname
    .split("/")
    .filter(i => !!i && i !== "tropo-beta-prototype")[0];
  const locationTitle = appName ? appName.replace(/-/g, " ") : "DashBoard";
  return (
    <header
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 56,
        background: "#006ca9",
        zIndex: zIndex.AppBar,
        fontSize: "20px",
        color: "white",
        padding: "0 16px 0 8px",
        boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
        textTransform: "capitalize"
      }}
    >
      <div style={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: "235px",
            paddingRight: "16px"
          }}
        >
          <IconButton
            style={{ marginRight: "16px" }}
            onClick={() => (sidebarIsOpen ? closeSidebar() : openSidebar())}
          >
            <MenuIcon color="white" />
          </IconButton>{" "}
          {locationTitle}
        </div>
        { isMobile ? null :
        <SearchBar style={{ opacity: 0.3, width: "600px" }} />
        }
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "300",
          padding: "8px"
        }}
      >
        <UserIcon style={{ marginRight: "16px" }} color="white" /> JohnD
      </div>
    </header>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openSidebar,
      closeSidebar
    },
    dispatch
  );

const mapStateToProps = state => ({
  sidebarIsOpen: state.appState.sidebarOpen,
  isMobile: isMobile(state)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBar));
