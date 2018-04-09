import React from "react";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as instanceActions from "../actions/instanceActions";
import { toggleMoveToProject } from "../actions/projectActions";
import { IconButton, MenuItem } from "material-ui";
import RefreshIcon from "material-ui/svg-icons/navigation/refresh";
import DesktopIcon from "material-ui/svg-icons/hardware/desktop-mac";
import EditIcon from "material-ui/svg-icons/image/edit";
import PauseIcon from "material-ui/svg-icons/av/pause";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import ImageIcon from "material-ui/svg-icons/content/save";
import ArrowDropLeft from "material-ui/svg-icons/navigation/arrow-drop-down";
import KeyIcon from "material-ui/svg-icons/communication/vpn-key";
import {
  ConsoleIcon,
  IntercomIcon,
  MoveIcon,
  AttachInstanceIcon,
  IPIcon,
  BootscriptIcon
} from "../cyverse-ui/icons";
import { ActionGroup, VerticalMenu } from "../cyverse-ui";
import { map } from "async";

const styles = {
  wrapper: {
    position: "absolute",
    right: 0,
    background:
      "linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 20%,rgba(255,255,255,1) 56%);",
    paddingLeft: "50px"
  },
  quickActions: {}
};
const ImageActions = ({
  instance,
  deleteInstance,
  hideQuickActions,
  openMoveToProject,
  openAttachfromInstance,
  classes
}) => (
  <ActionGroup className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <IconButton tooltip="Pause Instance">
        <PauseIcon />
      </IconButton>
      <IconButton tooltip="Open Remote Desktop">
        <DesktopIcon />
      </IconButton>
      <IconButton tooltip="Open Terminal">
        <ConsoleIcon />
      </IconButton>
    </ActionGroup>
    <VerticalMenu>
      <MenuItem primaryText="Reboot" leftIcon={<RefreshIcon />} />
      <MenuItem
        onClick={() => deleteInstance(instance.id)}
        primaryText="Delete"
        leftIcon={<DeleteIcon />}
      />
      <MenuItem primaryText="Attach Volume" onClick={()=> openAttachfromInstance(instance.id)} leftIcon={<AttachInstanceIcon />} />
      <MenuItem
        primaryText="Move To Project"
        onClick={() => openMoveToProject(instance.id, instance.project)}
        leftIcon={<MoveIcon />}
      />
      <MenuItem primaryText="Request Image" leftIcon={<ImageIcon />} />
      <MenuItem primaryText="Report Issue" leftIcon={<IntercomIcon />} />
      <MenuItem
        primaryText="Advanced Actions"
        leftIcon={<ArrowDropLeft style={{ transform: "rotate(90deg)" }} />}
        targetOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        menuItems={[
          <MenuItem primaryText="Add SSH Key" leftIcon={<KeyIcon />} />,
          <MenuItem
            primaryText="Add Bootscript"
            leftIcon={<BootscriptIcon />}
          />,
          <MenuItem primaryText="Add Static IP" leftIcon={<IPIcon />} />
        ]}
      />
    </VerticalMenu>
  </ActionGroup>
);
export const InstanceBatchActions = props => (
  <ActionGroup {...props} stopPropagation>
    <IconButton tooltip="Move Instance">
      <MoveIcon />
    </IconButton>
    <IconButton tooltip="Pause Instance">
      <PauseIcon />
    </IconButton>
    <IconButton tooltip="Delete Instance">
      <DeleteIcon />
    </IconButton>
  </ActionGroup>
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteInstance: instanceActions.deleteInstance,
      openMoveToProject: toggleMoveToProject("instances"),
      openAttachfromInstance: instanceActions.toggleAttachFromInstance,
    },
    dispatch
  );
}
export default connect(null, mapDispatchToProps)(
  withRouter(injectSheet(styles)(ImageActions))
);
