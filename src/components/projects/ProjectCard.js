import React, { Component } from "react";
import injectSheet, { withTheme } from "react-jss";
import { Tabs, Tab } from "material-ui";
import FolderIcon from "material-ui/svg-icons/file/folder";
import ProjectActions, {
  ProjectBatchActions
} from "../../containers/ProjectActions";
import ProjectInfo from "./ProjectInfo";
import ProjectTabs from "./ProjectTabs";
import AssetListHeader from "../AssetListHeader";
import AssetIdentity from "../AssetIdentity";

import {
  ListCard,
  ListCardDetail,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  SummaryText,
  P,
  Element
} from "../../cyverse-ui/";

const ProjectIdentity = ({ image, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<FolderIcon />}
    primaryText={image.name}
    secondaryText="Created May 8, 2017"
  />
);

const summaryStyles = theme => ({
  wraper: {
    display: "flex",
    padding: "8px 0px"
  }
});

const ProjectSummary = withTheme(
  injectSheet(summaryStyles)(({ image, classes }) => (
    <Element className={classes.wraper}>
      <SummaryText>{image.summary}</SummaryText>
    </Element>
  ))
);

export const ProjectListHeader = props => (
  <AssetListHeader
    {...props}
    summary={<Element typography="label">Summary</Element>}
    actions={<ProjectBatchActions />}
  />
);

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
      isSticky,
      selectable,
      top = "0",
      ...rest
    } = this.props;
    const { isHovered } = this.state;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <div
          style={
            !isExpanded
            ? null : isSticky
            ? {
                position: "sticky",
                top: "48px",
                background: "white",
                zIndex: "899"
              } : null
          }
        >
          <ListCardHeader
            onClick={onExpand}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <ListCardIdentity>
              <ProjectIdentity
                isCheckable={
                  isExpanded
                  ? true : isCheckable
                  ? true : isHovered
                }
                image={image}
                onCheck={this.onCheck}
                checked={checked}
              />
            </ListCardIdentity>
            <ListCardSummary hide={isExpanded}>
              <ProjectSummary image={image} />
            </ListCardSummary>
            <ProjectActions
              hide={selectable}
              hideQuickActions={isExpanded ? false : !isHovered}
              isHoveredimage={image}
            />
          </ListCardHeader>
          <ProjectTabs hide={!isExpanded} onTabClick={this.onTabClick} />
        </div>
        <ListCardDetail hide={!isExpanded}>
          <ProjectInfo image={image} view={this.state.view} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default ProjectCard;
