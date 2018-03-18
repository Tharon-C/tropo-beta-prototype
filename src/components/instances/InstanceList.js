import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import images from "../../IMAGE_DATA.json"
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import InstanceCard, {InstanceListHeader} from "./InstanceCard";

const ImageList = ({ loadMoreEnteries }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <InstanceListHeader/>
      <MediaCardGroup>
        {images.slice(0,25).map((image, i) => {
          return (
            <InstanceCard key={image.id} image={image}/>
          );
        })}
      </MediaCardGroup>
    </section>
  );
};

export default ImageList;
