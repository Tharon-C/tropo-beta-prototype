import React from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ImageCard from "./ImageCard";


const ImageList = ({ filter = () => true, images, loadMoreEnteries, range }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <MediaCardGroup>
      {images.filter(filter).slice(0,10).map((image, i) =>{
          return (
            <ImageCard key={image.id} image={image}/>
          );
        })}
      </MediaCardGroup>
      <FlatButton
        style={{
          marginTop: 22,
          display: "block",
          margin: "auto"
        }}
        primary
        onClick={loadMoreEnteries}
        label="Load More Images"
      />
    </section>
  );
};

const mapStateToProps = state => ({
  images: state.imageList.data
})
export default connect(mapStateToProps, null)(ImageList);
