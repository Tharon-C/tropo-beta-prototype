import React from "react";
import injectSheet from "react-jss";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { IconButton, MenuItem } from "material-ui";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoriteIcon from "material-ui/svg-icons/action/favorite-border";
import EditIcon from "material-ui/svg-icons/image/edit";
import AddIcon from "material-ui/svg-icons/content/add";
import { LaunchIcon, IntercomIcon } from "cyverse-ui/es/icons";
import { ActionGroup, VerticalMenu } from "../cyverse-ui";
const styles = {
  wrapper: {
    position: "absolute",
    right: 0,
    background:
      "linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 20%,rgba(255,255,255,1) 56%);",
    paddingLeft: "50px"
  }
};
const ImageActions = ({
  hideQuickActions,
  pushInstanceLaunch,
  location,
  classes
}) => (
  <ActionGroup className={classes.wrapper} stopPropagation>
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <IconButton tooltip="Add to &quot;Favorites List&quot;">
        <FavoriteIcon />
      </IconButton>
      <IconButton tooltip="Get Link to Share">
        <ShareIcon />
      </IconButton>
      <IconButton
        onClick={() => pushInstanceLaunch(location.pathname)}
        tooltip="Launch Instance of this Image"
      >
        <LaunchIcon />
      </IconButton>
    </ActionGroup>
    <VerticalMenu>
      <MenuItem primaryText="Edit Image" />
      <MenuItem primaryText="Add to Project" />
      <MenuItem primaryText="Report" />
    </VerticalMenu>
  </ActionGroup>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      pushInstanceLaunch: current => push(current + "/instance-launch")
    },
    dispatch
  );

export default withRouter(
  connect(null, mapDispatchToProps)(injectSheet(styles)(ImageActions))
);
