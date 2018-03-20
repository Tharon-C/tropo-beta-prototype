import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import images from "../../IMAGE_DATA.json"
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ImageCard from "./ImageCard";


const ImageList = ({ loadMoreEnteries, range }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <MediaCardGroup>
      {images.slice(range ? range[0] :  3, range ? range[1] : 15).map((image, i) =>{
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

export default ImageList;
