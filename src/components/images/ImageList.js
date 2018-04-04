import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ImageCard from "./ImageCard";

class ImageList extends Component {
  state = { page: 1 };
  requestPage = () => {
    this.setState(state => {
      return {
        page: state.page + 1
      };
    });
  };

  render() {
    const {
      filter = () => true,
      images,
      loadMoreEnteries,
      range,
      selectMode = false,
      onImageClick,
      selected,
      project
    } = this.props;
    const currentList = images.filter(filter).slice(0, 20 * this.state.page);
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        <MediaCardGroup>
          {currentList.map((image, i) => {
            return (
              <ImageCard
                isSelected={image.id === selected}
                onCardClick={onImageClick}
                selectMode={selectMode}
                key={image.id}
                image={image}
                project={project}
              />
            );
          })}
        </MediaCardGroup>
        {currentList.length >= 20 ? (
          <FlatButton
            style={{
              marginTop: 22,
              display: "block",
              margin: "auto"
            }}
            primary
            onClick={this.requestPage}
            label="Load More Images"
          />
        ) : null}
      </section>
    );
  }
}
const mapStateToProps = state => ({
  images: state.imageList.data
});
export default connect(mapStateToProps, null)(ImageList);
