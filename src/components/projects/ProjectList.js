import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import images from "../../IMAGE_DATA.json"
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ProjectCard, { ProjectListHeader } from "./ProjectCard";

const ImageList = ({ loadMoreEnteries }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <ProjectListHeader/>
      <MediaCardGroup>
        {images.slice(0,9).map((image, i) => {
          return (
            <ProjectCard key={image.id} image={image}/>
          );
        })}
      </MediaCardGroup>
    </section>
  );
};

export default ImageList;
