import React from "react";
import injectSheet from "react-jss";
import { IconButton, MenuItem } from "material-ui";
import EditIcon from "material-ui/svg-icons/image/edit";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import UserAddIcon from "material-ui/svg-icons/social/person-add";
import { ActionGroup, VerticalMenu,  } from "../cyverse-ui";
import {IntercomIcon} from "../cyverse-ui/icons";
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

export const LinkMenu = ({...rest}) => (
  <VerticalMenu>
    <MenuItem primaryText="Delete" leftIcon={<DeleteIcon/>}/>
    <MenuItem primaryText="Report Issue" leftIcon={<IntercomIcon/>}/>
  </VerticalMenu>
);

export const LinkQuickActions = ({...rest}) => (
  <IconButton>
    <EditIcon />
  </IconButton>
)

const LinkActions = ({ hideQuickActions, classes, hide, ...rest }) => (
  <ActionGroup hide={hide} { ...rest} className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <LinkQuickActions/>
    </ActionGroup>
    <LinkMenu/>
  </ActionGroup>
);

export const LinkBatchActions = (props) => (
  <ActionGroup {...props} stopPropagation>
    <IconButton>
      <DeleteIcon />
    </IconButton>
  </ActionGroup>
);

export default injectSheet(styles)(LinkActions);
