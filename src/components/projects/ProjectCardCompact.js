import React, { Component } from "react";
import injectSheet, { withTheme } from "react-jss";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { Tabs, Tab } from "material-ui";
import FolderIcon from "material-ui/svg-icons/file/folder";
import ExpandIcon from "material-ui/svg-icons/action/launch";
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

export const ProjectIdentity = ({ project, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<FolderIcon />}
    primaryText={project.name}
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
  injectSheet(summaryStyles)(({ project, classes }) => (
    <Element className={classes.wraper}>
      <SummaryText>{project.summary}</SummaryText>
    </Element>
  ))
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
    this.setState({ view: tab.props["value"] });
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
      project,
      isSticky,
      top = "0",
      goToDetail,
      ...rest
    } = this.props;
    const { isHovered } = this.state;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          style={{ minHeight: "48px" }}
          onClick={() => goToDetail(project.id)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <ProjectIdentity
              compact={true}
              hide={isExpanded}
              isCheckable={isExpanded ? true : isCheckable ? true : isHovered}
              project={project}
              onCheck={this.onCheck}
              checked={checked}
            />
          </ListCardIdentity>
          <ProjectActions
            hide={isCheckable}
            isCompact={true}
            hideQuickActions={true}
          />
        </ListCardHeader>
        {project.description && !isExpanded ? (
          <SummaryText whitespace={["ms7", "pb1"]}>
            {project.description}
          </SummaryText>
        ) : null}
      </ListCard>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToDetail: projectId =>
        push(`${process.env.PUBLIC_URL}/projects/${projectId}`)
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ProjectCard);
