import React from "react";
import injectSheet, { withTheme } from "react-jss";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import { Element, P } from "../../cyverse-ui";
import Tag from "../Tag";
import InstanceList from "../instances/InstanceList";
import VolumeList from "../Volumes/VolumeList";
import ImageList from "../images/ImageList";
import LinkList from "../links/LinkList";

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
          <InstanceList range={[6, 10]}/>
        </React.Fragment>
      );
    case "volumes":
    return (
    <React.Fragment>
    <VolumeList range={[5, 7]}/>
  </React.Fragment>
    );
    case "links":
    return (
    <React.Fragment>
    <LinkList range={[2, 3]}/>
  </React.Fragment>
    );
    case "images":
    return (
    <React.Fragment>
    <ImageList range={[2, 3]}/>
  </React.Fragment>
    );

  }
};

export default ProjectInfo;
