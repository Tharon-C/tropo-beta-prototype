import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { withRouter } from "react-router-dom";
import { deleteProject } from "../actions/projectActions";
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

export const ProjectMenu = ({deleteProject, project, ...rest}) => (
  <VerticalMenu>
    <MenuItem primaryText="Share Access" leftIcon={<UserAddIcon/>}/>
    <MenuItem primaryText="Delete" onClick={() => deleteProject(project.id) } leftIcon={<DeleteIcon/>}/>
    <MenuItem primaryText="Report Issue" leftIcon={<IntercomIcon/>}/>
  </VerticalMenu>
);

export const ProjectQuickActions = ({...rest}) => (
  <IconButton>
    <EditIcon />
  </IconButton>
)

const ImageActions = ({ hideQuickActions, classes, hide, ...rest }) => (
  <ActionGroup hide={hide} { ...rest} className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <ProjectQuickActions/>
    </ActionGroup>
    <ProjectMenu {...rest}/>
  </ActionGroup>
);

export const ProjectBatchActions = (props) => (
  <ActionGroup {...props} stopPropagation>
    <IconButton>
      <DeleteIcon />
    </IconButton>
  </ActionGroup>
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteProject,
    },
    dispatch
  );
}
export default connect(null, mapDispatchToProps)(
  withRouter(injectSheet(styles)(ImageActions))
);