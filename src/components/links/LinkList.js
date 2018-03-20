import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import images from "../../IMAGE_DATA.json"
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import LinkCard, { ProjectListHeader } from "./LinkCard";

const ImageList = ({ loadMoreEnteries, range }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <ProjectListHeader/>
      <MediaCardGroup>
        {images.slice(range[0], range[1]).map((image, i) => {
          return (
            <LinkCard key={image.id} image={image}/>
          );
        })}
      </MediaCardGroup>
    </section>
  );
};

export default ImageList;
