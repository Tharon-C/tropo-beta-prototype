import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ProjectCard, { ProjectListHeader } from "./ProjectCard";
import ProjectCardCompact from "./ProjectCardCompact";

class ProjectList extends Component {
  state = {
    batchMode: false,
    selectedItems: [],
    selected: null
  };
  onCheck = (e, state, item) => {
    const { selectable } = this.props;
    // We can set or use any prop we want for this check
    const curr = item.props.uid;
    const list = this.state.selectedItems;
    const selectedItems = list.includes(curr)
      ? list.filter(i => curr !== i)
      : [...list, curr];
    this.setState({ selectedItems });
  };
  render() {
    const {
      projects,
      showHeader = true,
      loadMoreEnteries,
      range,
      selectable,
      isSticky,
      isMobile
    } = this.props;
    const { selectedItems } = this.state;
    const batchMode = selectedItems.length > 0;
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        {showHeader ? (
          <ProjectListHeader
            compact={isMobile}
            isSticky={isSticky}
            batchMode={batchMode}
            onBatchClick={(e, isChecked) => {
              this.setState({
                selectedItems: isChecked
                  ? projects.map(project => project.id)
                  : []
              });
            }}
          />
        ) : null}

        <MediaCardGroup>
          {projects.map((project, i) => {
            return !isMobile ? (
              <ProjectCard
                uid={project.id}
                isSticky={isSticky}
                selectable={selectable}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(project.id)}
                onCheck={this.onCheck}
                key={project.id}
                project={project}
              />
            ) : (
              <ProjectCardCompact
                uid={project.id}
                isSticky={isSticky}
                selectable={selectable}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(project.id)}
                onCheck={this.onCheck}
                key={project.id}
                project={project}
              />
            );
          })}
        </MediaCardGroup>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projectList.data
});
export default connect(mapStateToProps, null)(ProjectList);
