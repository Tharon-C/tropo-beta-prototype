import React, { Component } from "react";
import randomcolor from "randomcolor";
import injectSheet, { withTheme } from "react-jss";
import { Avatar, Checkbox } from "material-ui";
import get from "../../utils/get";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoritedBorderIcon from "material-ui/svg-icons/action/favorite-border";
import { Tabs, Tab } from "material-ui";
import FolderIcon from "material-ui/svg-icons/file/folder";
import ProjectActions, {
  ProjectBatchActions
} from "../containers/ProjectActions";
import AssetIdentity from "./AssetIdentity"

import {
  ListCard,
  ListCardDetail,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  Identity,
  SummaryText,
  P,
  Element,
  ShowMoreEllipsis,
  Checkable
} from "../cyverse-ui/";

class ProjectCard extends Component {
  state = { isHovered: false, view: "info" };
  onMouseEnter = () => {
    this.setState({ isHovered: true });
  };
  onMouseLeave = () => {
    this.setState({ isHovered: false });
  };
  onTabClick = tab => {
    this.setState({ view: tab.props["data-route"] });
  };

  onCheck = (e, state) => {
    this.props.onCheck(e, state, this);
  };
  render() {
    const {
      isCheckable,
      onExpand,
      checked,
      isExpanded,
      image,
      ...rest
    } = this.props;
    const { isHovered } = this.state;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <div
          style={
            isExpanded
              ? {
                  position: "sticky",
                  top: "48px",
                  background: "white",
                  zIndex: "899"
                }
              : null
          }
        >
          <ListCardHeader
            onClick={onExpand}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <ListCardIdentity>
              <AssetIdentity
                {...rest}
                percent={image.progress}
                icon={<FolderIcon />}
                primaryText={image.name}
                secondaryText="Created May 8, 2017"
              />
            </ListCardIdentity>
            <ListCardSummary hide={isExpanded}>
              {image.summary}
            </ListCardSummary>
            <ProjectActions
              hideQuickActions={isExpanded ? false : !isHovered}
              isHoveredimage={image}
            />
          </ListCardHeader>
          
        </div>
        <ListCardDetail hide={!isExpanded}>
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default ProjectCard;
