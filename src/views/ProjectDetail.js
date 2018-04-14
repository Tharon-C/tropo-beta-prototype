import React, { Component } from "react";
import * as R from "ramda";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobile} from "../selectors/browser";
import { get } from "../utils";
import { zIndex } from "../styles/styles";

import {
  Element,
  Hr,
  P,
  ListCard,
  ListCardHeader,
  ListCardIdentity,
  SubHeader,
  ActionGroup
} from "../cyverse-ui";
import { ProjectIdentity } from "../components/projects/ProjectCard";
import ProjectInfo from "../components/projects/ProjectInfo";
import ProjectTabs from "../components/projects/ProjectTabs";
import { ProjectQuickActions, ProjectMenu } from "../containers/ProjectActions";
import DashboardWidgets from "../components/dashboard/DashboardWidgets";

class ProjectDetail extends Component {
  onTabClick = tab => {
    const { onTabClick, project } = this.props;
    onTabClick(`${process.env.PUBLIC_URL}/projects/${project.id}/${tab.props["value"]}`);
  };
  render() {
    const { project, view, onTabClick, back, isMobile } = this.props;
    console.log(project);
    return (
      <React.Fragment>
        <div
          style={{
            background: "white",
            position: "sticky",
            display: "flex",
            alignItems: "center",
            top: 0,
            height: 48,
            boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
            zIndex: zIndex.viewHeader
          }}
        >
          <SubHeader
            style={{ width: "100%" }}
            name="Project Detail"
            onBack={back}
            actions={
              <React.Fragment>
                <ProjectQuickActions />
                <ProjectMenu />
              </React.Fragment>
            }
          />
        </div>
        <Element
          style={{ maxWidth: "1200px", margin: "auto" }}
          whitespace="ps1"
        >
          <ListCard>
            <ListCardHeader>
              <ListCardIdentity>
                <ProjectIdentity project={project} />
              </ListCardIdentity>
            </ListCardHeader>
            <ProjectTabs
              compact={isMobile}
              view={view}
              whitespace="mb2"
              onTabClick={this.onTabClick}
            />
          </ListCard>
          <ProjectInfo isMobile={isMobile} detailView={true} project={project} view={view} />
        </Element>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      back: () => push(`${process.env.PUBLIC_URL}/projects`),
      onTabClick: view => push(view)
    },
    dispatch
  );
const mapStateToProps = (state, { match }) => {
  const location = state.routing.location.pathname.split("/").reverse();
  const view = match.isExact ? "info" : location[0];
  return {
    project: get.byId(match.params.id)(state.projectList.data),
    view,
    location,
    isMobile: isMobile(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
