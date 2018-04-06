import React from "react";
import injectSheet from "react-jss";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { toggleMoveToProject } from "../actions/projectActions";
import { deleteLink } from "../actions/linkActions";
import { connect } from "react-redux";
import { IconButton, MenuItem } from "material-ui";
import EditIcon from "material-ui/svg-icons/image/edit";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import UserAddIcon from "material-ui/svg-icons/social/person-add";
import { ActionGroup, VerticalMenu,  } from "../cyverse-ui";
import {IntercomIcon, MoveIcon} from "../cyverse-ui/icons";
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

export const LinkMenu = ({openMoveToProject, link}) => (
  <VerticalMenu>
    <MenuItem primaryText="Delete" leftIcon={<DeleteIcon/>}/>
    <MenuItem
        primaryText="Move To Project"
        onClick={() => openMoveToProject(link.id, link.project)}
        leftIcon={<MoveIcon />}
      />
    <MenuItem primaryText="Report Issue" leftIcon={<IntercomIcon/>}/>
  </VerticalMenu>
);

export const LinkQuickActions = ({...rest}) => (
  <IconButton>
    <EditIcon />
  </IconButton>
)

const LinkActions = ({
  hideQuickActions,
  classes,
  hide,
  ...rest }) => (
  <ActionGroup hide={hide} { ...rest} className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <LinkQuickActions/>
    </ActionGroup>
    <LinkMenu {...rest}/>
  </ActionGroup>
);

export const LinkBatchActions = (props) => (
  <ActionGroup {...props} stopPropagation>
    <IconButton>
      <DeleteIcon />
    </IconButton>
  </ActionGroup>
);
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteLink,
      openMoveToProject: toggleMoveToProject("links")
    },
    dispatch
  );
}
export default connect(null, mapDispatchToProps)(
  withRouter(injectSheet(styles)(injectSheet(styles)(LinkActions)))
);
