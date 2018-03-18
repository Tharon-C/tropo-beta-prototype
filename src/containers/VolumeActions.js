import React from "react";
import injectSheet from "react-jss";
import { IconButton, MenuItem } from "material-ui";
import RefreshIcon from "material-ui/svg-icons/navigation/refresh";
import DesktopIcon from "material-ui/svg-icons/hardware/desktop-mac";
import EditIcon from "material-ui/svg-icons/image/edit";
import PauseIcon from "material-ui/svg-icons/av/pause";
import { AttachIcon, IntercomIcon } from "cyverse-ui/es/icons";
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
const ImageActions = ({ hideQuickActions, classes }) => (
  <ActionGroup className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <IconButton tooltip="Pause Instance">
        <AttachIcon />
      </IconButton>
    </ActionGroup>
    <VerticalMenu>
      <MenuItem primaryText="Edit" />
      <MenuItem primaryText="Delete" />
      <MenuItem primaryText="Move Volume" />
      <MenuItem primaryText="Report Issue" />
    </VerticalMenu>
  </ActionGroup>
);

export default injectSheet(styles)(ImageActions);
