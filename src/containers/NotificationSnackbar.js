import React from "react";
import { connect } from "react-redux";
import { get } from "../utils";
import { Snackbar, FlatButton } from "material-ui";
import { Element } from "../cyverse-ui";
import { LaunchIcon } from "../cyverse-ui/icons";

const NotificationMessage = ({ notification, instances }) => {
  switch (notification.type) {
    case "LAUNCH":
      return (
        <React.Fragment>
          <LaunchIcon color="white" />
          <Element whitespace="ms3" typography="body2">
            Instance Launched Succesfully
          </Element>
          {`The instance "${
            get.byId(notification.assets[0])(instances).name
          }" has launched succesfully`}
        </React.Fragment>
      );
  }
};

const NotificationSnackbar = ({ isOpen, instances, notification }) => (
  <Snackbar
    action="More Info"
    onActionClick={() => {}}
    style={{ width: "70%" }}
    bodyStyle={{ width: "100%", maxWidth: "100%", display: "flex" }}
    messageStyle={{ width: "100%" }}
    message={
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <NotificationMessage
          notification={notification}
          instances={instances}
        />
        <FlatButton
          style={{ position: "absolute", right: 0, top: "5px" }}
          label="More Info"
          secondary
        />
      </div>
    }
    open={isOpen}
  />
);

const mapStateToProps = state => ({
  isOpen: state.appState.showNotification,
  notification: state.notificationList.data.slice().reverse()[0],
  instances: state.instanceList.data
});
export default connect(mapStateToProps, null)(NotificationSnackbar);
