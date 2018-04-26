import React, { Component } from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ProjectCard, { ProjectListHeader } from "../projects/ProjectCard";
import ProjectCardCompact from "../projects/ProjectCardCompact";

import InstanceCard from "../instances/InstanceCard";
import InstanceCardCompact from "../instances/InstanceCardCompact";
import LinkCard from "../links/LinkCard";
import LinkCardCompact from "../links/LinkCardCompact";
import VolumeCard, { VolumeListHeader } from "../Volumes/VolumeCard";
import VolumeCardCompact from "../Volumes/VolumeCardCompact";

class AllAssetsList extends Component {
  state = {
    batchMode: false,
    selectedItems: []
  };
  onCheck = (e, state, item) => {
    const list = this.state.selectedItems;
    // We can set or use any prop we want for this check
    const curr = item.props.uid;
    const selectedItems = list.includes(curr)
      ? list.filter(i => curr !== i)
      : [...list, curr];
    this.setState({ selectedItems });
  };
  render() {
    const {
      links,
      projects,
      instances,
      volumes,
      showHeader = true,
      loadMoreEnteries,
      range,
      isSticky,
      isCompact
    } = this.props;

    const detInstances = instances.filter(item => !item.project);
    const detVolumes = volumes.filter(item => !item.project);
    const detLinks = links.filter(item => !item.project);

    const { selectedItems } = this.state;
    const batchMode = selectedItems.length > 0;
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        {projects && showHeader ? (
          <ProjectListHeader
            isSticky
            isCompact={isCompact}
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
        {projects ? (
          <MediaCardGroup whitespace="mb3">
            {projects.map((project, i) => {
              return isCompact ? (
                <ProjectCardCompact
                  key={project.id}
                  uid={project.id}
                  isCheckable={selectedItems.length > 0}
                  checked={selectedItems.includes(project.id)}
                  onCheck={this.onCheck}
                  project={project}
                />
              ) : (
                <ProjectCard
                  key={project.id}
                  uid={project.id}
                  isCheckable={selectedItems.length > 0}
                  checked={selectedItems.includes(project.id)}
                  onCheck={this.onCheck}
                  project={project}
                />
              );
            })}
          </MediaCardGroup>
        ) : null}
        {detInstances.length > 0 ||
        detVolumes.length > 0 ||
        detLinks.length > 0 ? (
          <React.Fragment>
            <VolumeListHeader
              isSticky
              isCompact={isCompact}
              batchMode={batchMode}
              onBatchClick={(e, isChecked) => {
                this.setState({
                  selectedItems: isChecked
                    ? projects.map(project => project.id)
                    : []
                });
              }}
            />
            <MediaCardGroup whitespace="mb3">
              {R.union(
                R.union(
                  detInstances.map((instance, i) => {
                    return isCompact ? (
                      <InstanceCardCompact
                        key={instance.id}
                        uid={instance.id}
                        isCheckable={selectedItems.length > 0}
                        checked={selectedItems.includes(instance.id)}
                        onCheck={this.onCheck}
                        instance={instance}
                      />
                    ) : (
                      <InstanceCard
                        key={instance.id}
                        uid={instance.id}
                        isCheckable={selectedItems.length > 0}
                        checked={selectedItems.includes(instance.id)}
                        onCheck={this.onCheck}
                        instance={instance}
                      />
                    );
                  }),
                  detVolumes.map((volume, i) => {
                    return isCompact ? (
                      <VolumeCardCompact
                        key={volume.id}
                        uid={volume.id}
                        isCheckable={selectedItems.length > 0}
                        checked={selectedItems.includes(volume.id)}
                        onCheck={this.onCheck}
                        volume={volume}
                      />
                    ) : (
                      <VolumeCard
                        key={volume.id}
                        uid={volume.id}
                        isCheckable={selectedItems.length > 0}
                        checked={selectedItems.includes(volume.id)}
                        onCheck={this.onCheck}
                        volume={volume}
                      />
                    );
                  })
                ),
                detLinks.map((volume, i) => {
                  return isCompact ? (
                    <LinkCardCompact
                      key={volume.id}
                      uid={volume.id}
                      isCheckable={selectedItems.length > 0}
                      checked={selectedItems.includes(volume.id)}
                      onCheck={this.onCheck}
                      image={volume}
                    />
                  ) : (
                    <LinkCard
                      key={volume.id}
                      uid={volume.id}
                      isCheckable={selectedItems.length > 0}
                      checked={selectedItems.includes(volume.id)}
                      onCheck={this.onCheck}
                      image={volume}
                    />
                  );
                })
              )}
            </MediaCardGroup>
          </React.Fragment>
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projectList.data,
  instances: state.instanceList.data,
  volumes: state.volumeList.data,
  links: state.linkList.data
});
export default connect(mapStateToProps, null)(AllAssetsList);
