import React from "react";
import injectSheet from "react-jss";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleInstanceForm } from "../actions/instanceActions";
import {
  toggleAddImageToProject,
  toggleFavorite
} from "../actions/imageActions";

import { IconButton, MenuItem } from "material-ui";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoriteIcon from "material-ui/svg-icons/action/favorite-border";
import FavoritedIcon from "material-ui/svg-icons/action/favorite";
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
  image,
  hideQuickActions,
  openInstanceLaunch,
  openAddImageToProject,
  location,
  isFavorited,
  toggleFavorite,
  project,
  classes
}) => (
  <ActionGroup className={classes.wrapper} stopPropagation>
    {isFavorited && hideQuickActions ? (
      <IconButton
        onClick={() => toggleFavorite(image.id)}
        tooltip="Add to &quot;Favorites List&quot;"
      >
        <FavoritedIcon color="red" />
      </IconButton>
    ) : null}
    <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
      <IconButton
        onClick={() => toggleFavorite(image.id)}
        tooltip="Add to &quot;Favorites List&quot;"
      >
        {isFavorited ? <FavoritedIcon color="red" /> : <FavoriteIcon />}
      </IconButton>
      <IconButton tooltip="Get Link to Share">
        <ShareIcon />
      </IconButton>
      <IconButton
        onClick={() => openInstanceLaunch(image, project)}
        tooltip="Launch Instance of this Image"
      >
        <LaunchIcon />
      </IconButton>
    </ActionGroup>
    <VerticalMenu>
      <MenuItem primaryText="Edit Image" />
      <MenuItem
        primaryText="Add to Project"
        onClick={() => openAddImageToProject(image.id)}
      />
      <MenuItem primaryText="Report" />
    </VerticalMenu>
  </ActionGroup>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openInstanceLaunch: toggleInstanceForm,
      openAddImageToProject: toggleAddImageToProject,
      toggleFavorite
    },
    dispatch
  );

export default withRouter(
  connect(null, mapDispatchToProps)(injectSheet(styles)(ImageActions))
);
