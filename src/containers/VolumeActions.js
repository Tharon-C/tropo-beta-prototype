import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";
import { deleteVolume } from "../actions/volumeActions";
import { toggleMoveToProject } from "../actions/projectActions";
import { IconButton, MenuItem } from "material-ui";
import RefreshIcon from "material-ui/svg-icons/navigation/refresh";
import DesktopIcon from "material-ui/svg-icons/hardware/desktop-mac";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import PauseIcon from "material-ui/svg-icons/av/pause";
import EditIcon from "material-ui/svg-icons/image/edit";
import {
  MoveIcon,
  DetachInstanceIcon,
  AttachInstanceIcon,
  IntercomIcon
} from "../cyverse-ui/icons";
import { ActionGroup, VerticalMenu } from "../cyverse-ui";
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
  volume,
  deleteVolume,
  hideQuickActions,
  openMoveToProject,
  classes
}) => (
  <ActionGroup className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <IconButton tooltip="Detach from Instance">
        <DetachInstanceIcon />
      </IconButton>
    </ActionGroup>
    <VerticalMenu>
      <MenuItem primaryText="Edit" leftIcon={<EditIcon />} />
      <MenuItem
        primaryText="Delete"
        leftIcon={<DeleteIcon />}
        onClick={() => deleteVolume(volume.id)}
      />
      <MenuItem
        primaryText="Move Volume"
        leftIcon={<MoveIcon />}
        onClick={() => {
          openMoveToProject(volume.id, volume.project)
        }}
      />
      <MenuItem primaryText="Report Issue" leftIcon={<IntercomIcon />} />
    </VerticalMenu>
  </ActionGroup>
);
export const VolumeBatchActions = props => (
  <ActionGroup {...props} stopPropagation>
    <IconButton tooltip="Detach from Instance">
      <DetachInstanceIcon />
    </IconButton>
    <IconButton>
      <MoveIcon tooltip="Move Volume" />
    </IconButton>
    <IconButton tooltip="Delete Volume">
      <DeleteIcon />
    </IconButton>
  </ActionGroup>
);


function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteVolume,
      openMoveToProject: toggleMoveToProject("volumes")
    },
    dispatch
  );
}
export default connect(null, mapDispatchToProps)(
  withRouter(injectSheet(styles)(ImageActions))
);
