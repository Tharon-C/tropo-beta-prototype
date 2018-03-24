import React from "react";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as instanceActions from "../actions/instanceActions";
import { IconButton, MenuItem } from "material-ui";
import { withRouter } from "react-router-dom";
import RefreshIcon from "material-ui/svg-icons/navigation/refresh";
import DesktopIcon from "material-ui/svg-icons/hardware/desktop-mac";
import EditIcon from "material-ui/svg-icons/image/edit";
import PauseIcon from "material-ui/svg-icons/av/pause";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import { ConsoleIcon, IntercomIcon, MoveIcon } from "../cyverse-ui/icons";
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
const ImageActions = ({ instance, deleteInstance, hideQuickActions, classes }) => (
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
      <MenuItem primaryText="Reboot" />
      <MenuItem onClick={ () => deleteInstance(instance.id)} primaryText="Delete" />
      <MenuItem primaryText="Attach Volume" />
      <MenuItem primaryText="Move To Project" />
      <MenuItem primaryText="Request Image" />
      <MenuItem primaryText="Report Issue" />
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
  return bindActionCreators({
    deleteInstance: instanceActions.deleteInstance
  }, dispatch)
}
export default connect(null, mapDispatchToProps )(withRouter(injectSheet(styles)(ImageActions)));
