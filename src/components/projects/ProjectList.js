import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import images from "../../IMAGE_DATA.json";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ProjectCard, { ProjectListHeader } from "./ProjectCard";

class ImageList extends Component {
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
    const { showHeader = true, loadMoreEnteries, range } = this.props;
    const { selectedItems } = this.state;
    const batchMode = selectedItems.length > 0;
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        {showHeader ? (
          <ProjectListHeader
            batchMode={batchMode}
            onBatchClick={(e, isChecked ) => {
              this.setState({ selectedItems: isChecked ? images.map(image => image.id) : [] });
            }}
          />
        ) : null}
        <MediaCardGroup>
          {images
            .slice(range ? range[0] : 3, range ? range[1] : 15)
            .map((image, i) => {
              return (
                <ProjectCard
                  uid={image.id}
                  isCheckable={selectedItems.length > 0}
                  checked={selectedItems.includes(image.id)}
                  onCheck={this.onCheck}
                  key={image.id}
                  image={image}
                />
              );
            })}
        </MediaCardGroup>
      </section>
    );
  }
}

export default ImageList;
