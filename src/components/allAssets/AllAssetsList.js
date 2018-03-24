import React, {Component} from "react";
import {connect} from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ProjectCard, {ProjectListHeader} from "../projects/ProjectCard";
import InstanceCard from "../instances/InstanceCard";
import VolumeCard, {VolumeListHeader} from "../Volumes/VolumeCard";

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
    const { projects, instances, volumes, showHeader = true, loadMoreEnteries, range, isSticky } = this.props;
    const { selectedItems } = this.state;
    const batchMode = selectedItems.length > 0;
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      {showHeader ? (
          <ProjectListHeader
            isSticky
            batchMode={batchMode}
            onBatchClick={(e, isChecked) => {
              this.setState({
                selectedItems: isChecked ? projects.map(project => project.id) : []
              });
            }}
          />
        ) : null}
      <MediaCardGroup whitespace="mb3">
        {projects.map((project, i) => {
          return (
            <ProjectCard key={project.id}
            uid={project.id}
            isCheckable={selectedItems.length > 0}
            checked={selectedItems.includes(project.id)}
            onCheck={this.onCheck}
            image={project}/>
          );
        })}
        </MediaCardGroup>
    </section>
  );
};
}

const mapStateToProps = state => ({
  projects: state.projectList.data,
  instances: state.instanceList.data,
  volumes: state.volumeList.data,
})
export default connect(mapStateToProps, null)(AllAssetsList);
