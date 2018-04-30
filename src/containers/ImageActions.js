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
import { toggleMoveToProject } from "../actions/projectActions";
import { IconButton, MenuItem } from "material-ui";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoriteIcon from "material-ui/svg-icons/action/favorite-border";
import FavoritedIcon from "material-ui/svg-icons/action/favorite";
import EditIcon from "material-ui/svg-icons/image/edit";
import AddIcon from "material-ui/svg-icons/content/add";
import { LaunchIcon, IntercomIcon, MoveIcon } from "../cyverse-ui/icons";
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
  isCompact,
  openInstanceLaunch,
  openAddImageToProject,
  openMoveToProject,
  location,
  toggleFavorite,
  project,
  projects,
  classes
}) =>
  isCompact ? (
    <ActionGroup className={classes.wrapper} stopPropagation>
      <ActionGroup>
        <IconButton
          onClick={() => toggleFavorite(image.id)}
          tooltip="Add to &quot;Favorites List&quot;"
        >
          {image.favorited ? <FavoritedIcon color="red" /> : <FavoriteIcon />}
        </IconButton>
      </ActionGroup>
      <VerticalMenu>
        <MenuItem
          primaryText="Launch"
          leftIcon={<LaunchIcon />}
          onClick={() => openInstanceLaunch(image, project)}
        />
        <MenuItem primaryText="Share" leftIcon={<ShareIcon />} />
        {!project ? (
          <MenuItem
            primaryText="Add to Project"
            leftIcon={<AddIcon />}
            onClick={() => openAddImageToProject(image.id, projects[0].id)}
          />
        ) : (
          <MenuItem
            primaryText="Move to Project"
            leftIcon={<MoveIcon />}
            onClick={() => openMoveToProject(image.id, project)}
          />
        )}
        <MenuItem primaryText="Report" leftIcon={<IntercomIcon />} />
      </VerticalMenu>
    </ActionGroup>
  ) : (
    <ActionGroup className={classes.wrapper} stopPropagation>
      {image.favorited && hideQuickActions ? (
        <IconButton
          onClick={() => toggleFavorite(image.id)}
          tooltip="Add to &quot;Favorites List&quot;"
        >
          <FavoritedIcon color="red" />
        </IconButton>
      ) : null}
      <ActionGroup hide={hideQuickActions} className={classes.quickActions}>
        <IconButton
          onClick={() => openInstanceLaunch(image, project)}
          tooltip="Launch Instance of this Image"
        >
          <LaunchIcon />
        </IconButton>
        <IconButton tooltip="Get Link to Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={() => toggleFavorite(image.id)}
          tooltip="Add to &quot;Favorites List&quot;"
        >
          {image.favorited ? <FavoritedIcon color="red" /> : <FavoriteIcon />}
        </IconButton>
      </ActionGroup>
      <VerticalMenu>
        {!project ? (
          <MenuItem
            primaryText="Add to Project"
            leftIcon={<AddIcon />}
            onClick={() => openAddImageToProject(image.id, projects[0].id)}
          />
        ) : (
          <MenuItem
            primaryText="Move to Project"
            leftIcon={<MoveIcon />}
            onClick={() => openMoveToProject(image.id, project)}
          />
        )}
        <MenuItem primaryText="Report" leftIcon={<IntercomIcon />} />
      </VerticalMenu>
    </ActionGroup>
  );

// Map state and actions to props
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openInstanceLaunch: toggleInstanceForm,
      openAddImageToProject: toggleAddImageToProject,
      openMoveToProject: toggleMoveToProject("images"),
      toggleFavorite
    },
    dispatch
  );

const mapStateToProps = ({ projectList: { data: projects } }) => ({
  projects
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    injectSheet(styles)(ImageActions)
  )
);
