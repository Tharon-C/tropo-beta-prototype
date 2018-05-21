import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "../../selectors/browser";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element, InfoBlock, P } from "../../cyverse-ui/";
import ImageCard from "./ImageCard";
import ImageCardCompact from "./ImageCardCompact";

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
      view,
      images,
      loadMoreEnteries,
      range,
      selectMode = false,
      onImageClick,
      selected,
      project,
      isCompact,
      isSticky,
      isMobile
    } = this.props;
    const currentList = images.filter(filter).slice(0, 20 * this.state.page);
    const listMessage =
      view === "Favorites"
        ? `You have not favorited any Images. You can favorite images by clicking on the heart button on the right side of any Image`
        : `You do not own any Images. You can request an Image be created from an Instance by selecting "Image Request" on the instance you would like to Image`;

    console.log(listMessage);
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        {currentList.length <= 0 ? (
          <InfoBlock
            text={
              <Element style={{ maxWidth: "600px", lineHeight: "1.5" }} typography="subheading">
                {listMessage}
              </Element>
            }
          />
        ) : null}
        <MediaCardGroup>
          {currentList.map((image, i) => {
            return isCompact || isMobile ? (
              <ImageCardCompact
                isSticky={isSticky}
                isSelected={image.id === selected}
                onCardClick={onImageClick}
                selectMode={selectMode}
                key={image.id}
                image={image}
                project={project}
              />
            ) : (
              <ImageCard
                isSticky={isSticky}
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
  images: state.imageList.data,
  isMobile: isMobile(state)
});
export default connect(mapStateToProps, null)(ImageList);
