import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import images from "../../IMAGE_DATA.json"
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import ProjectCard, {ProjectListHeader} from "../projects/ProjectCard";
import InstanceCard, {InstanceListHeader} from "../instances/InstanceCard";
import VolumeCard from "../Volumes/VolumeCard";

const ImageList = ({ loadMoreEnteries }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <ProjectListHeader/>
      <MediaCardGroup whitespace="mb3">
        {images.slice(0,9).map((image, i) => {
          return (
            <ProjectCard key={image.id} image={image}/>
          );
        })}
      </MediaCardGroup>
      <InstanceListHeader/>
      <MediaCardGroup>
        {images.slice(10,15).map((image, i) => {
          return (
            <InstanceCard key={image.id} image={image}/>
          );
        })}
        {images.slice(20,22).map((image, i) => {
          return (
            <VolumeCard key={image.id} image={image}/>
          );
        })}
        {images.slice(15,18).map((image, i) => {
          return (
            <InstanceCard key={image.id} image={image}/>
          );
        })}
        {images.slice(23,25).map((image, i) => {
          return (
            <VolumeCard key={image.id} image={image}/>
          );
        })}
      </MediaCardGroup>
    </section>
  );
};

export default ImageList;
