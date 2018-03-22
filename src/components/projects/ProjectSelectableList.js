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
    selectedItem: null,
    selected: null,
  };
  onCheck = (e, state, item) => {
    const {selectable} = this.props;
    // We can set or use any prop we want for this check
    const curr = item.props.uid;
      this.setState({selectedItem: this.state.selectedItem === curr ? null : curr})
  };
  render() {
    const { showHeader = true, loadMoreEnteries, range, selectable, isSticky } = this.props;
    const { selectedItem } = this.state;
    const batchMode = selectedItem;
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        {showHeader ? (
          <ProjectListHeader
            isSticky={isSticky}
            batchMode={batchMode}
            onBatchClick={(e, isChecked ) => {
              this.setState({ selectedItem: isChecked ? images.map(image => image.id) : [] });
            }}
          />
        ) : null}
        
          { selectedItem ? <Element typography="label">Selected Project: </Element> : null }
        <MediaCardGroup>
          {images
            .slice(range ? range[0] : 3, range ? range[1] : 15)
            .reduce(
              (acc, curr) => curr.id !== selectedItem ? [...acc, curr] : [curr, ...acc]
            )
            .map((image, i) => {
              return (
                <ProjectCard
                  whitespace={ image.id === selectedItem ? ["mb6", "mt1"] : null}
                  uid={image.id}
                  isSticky={isSticky}
                  selectable={true}
                  isCheckable={selectedItem}
                  checked={selectedItem === image.id}
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
