import React from "react";
import injectSheet from "react-jss";
import { IconButton, MenuItem } from "material-ui";
import EditIcon from "material-ui/svg-icons/image/edit";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import { IntercomIcon } from "cyverse-ui/es/icons";
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
const ImageActions = ({ hideQuickActions, classes, hide, ...rest }) => (
  <ActionGroup hide={hide} { ...rest} className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </ActionGroup>
    <VerticalMenu>
      <MenuItem primaryText="Share" />
      <MenuItem primaryText="Delete" />
      <MenuItem primaryText="Report Issue" />
    </VerticalMenu>
  </ActionGroup>
);

export const ProjectBatchActions = (props) => (
  <ActionGroup {...props} stopPropagation>
    <IconButton>
      <DeleteIcon />
    </IconButton>
  </ActionGroup>
);

export default injectSheet(styles)(ImageActions);
