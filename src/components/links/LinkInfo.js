import React from "react";
import injectSheet, { withTheme } from "react-jss";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import { Element, P } from "../../cyverse-ui";
import Tag from "../Tag";
import InstanceCard from "../instances/InstanceCard";
import VolumeCard from "../Volumes/VolumeCard";
import ImageCard from "../images/ImageCard";
import LinkCard from "../links/LinkCard";

import SummaryText from "cyverse-ui/lib/SummaryText";

const ProjectInfo = ({ image, view }) => {
  switch (view) {
    case "info":
      return (
        <Element>
          <Element typography="label" whitespace="mb1">
            Description
          </Element>
          <P whitespace="mb4">{image.description}</P>
          <Element typography="label" whitespace="mb1">
            Tags
          </Element>
          {image.tags.map(({ id }) => {
            return <Tag label={get.byId(id)(tags).name} />;
          })}
        </Element>
      );
    case "instances":
      return (
        <React.Fragment>
          <InstanceCard image={image} />
          <InstanceCard image={image} />
          <InstanceCard image={image} />
        </React.Fragment>
      );
    case "volumes":
    return (
    <React.Fragment>
    <VolumeCard image={image} />
    <VolumeCard image={image} />
    <VolumeCard image={image} />
  </React.Fragment>
    );
    case "links":
    return (
    <React.Fragment>
    <LinkCard image={image} />
    <LinkCard image={image} />
    <LinkCard image={image} />
  </React.Fragment>
    );
    case "images":
    return (
    <React.Fragment>
    <ImageCard image={image} />
    <ImageCard image={image} />
    <ImageCard image={image} />
  </React.Fragment>
    );

  }
};

export default ProjectInfo;
