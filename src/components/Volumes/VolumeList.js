import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import VolumeCard, { VolumeListHeader } from "./VolumeCard";
import VolumeCardCompact from "./VolumeCardCompact";

class VolumeList extends Component {
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
      filter = () => true,
      volumes,
      showHeader = true,
      loadMoreEnteries,
      range,
      isMobile,
      isSticky
    } = this.props;
    const { selectedItems } = this.state;
    const batchMode = selectedItems.length > 0;
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        {showHeader ? (
          <VolumeListHeader
            isCompact={isMobile}
            isSticky={isSticky}
            batchMode={batchMode}
            onBatchClick={(e, isChecked) => {
              this.setState({
                selectedItems: isChecked
                  ? volumes.filter(filter).map(volume => volume.id)
                  : []
              });
            }}
          />
        ) : null}
        <MediaCardGroup noScroll={isMobile}>
          {volumes.filter(filter).map((volume, i) => {
            return !isMobile ? (
              <VolumeCard
                key={volume.id}
                uid={volume.id}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(volume.id)}
                onCheck={this.onCheck}
                volume={volume}
              />
            ) : (
              <VolumeCardCompact
                key={volume.id}
                uid={volume.id}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(volume.id)}
                onCheck={this.onCheck}
                volume={volume}
              />
            );
          })}
        </MediaCardGroup>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  volumes: state.volumeList.data
});
export default connect(mapStateToProps, null)(VolumeList);
