import React from "react";
import injectSheet, { withTheme } from "react-jss";
import {connect} from "react-redux";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import { Element, P } from "../../cyverse-ui";
import Tag from "../Tag";
import InstanceList from "../instances/InstanceList";
import VolumeList from "../Volumes/VolumeList";
import ImageList from "../images/ImageList";
import LinkList from "../links/LinkList";

import SummaryText from "cyverse-ui/lib/SummaryText";

const ProjectInfo = ({ project, view }) => {
  switch (view) {
    case "info":
      return (
        <Element>
          <Element typography="label" whitespace="mb1">
            Description
          </Element>
          <P whitespace="mb4">{project.description}</P>
          <Element typography="label" whitespace="mb1">
            Tags
          </Element>
          {project.tags.map(({ id }) => {
            return <Tag label={get.byId(id)(tags).name} />;
          })}
        </Element>
      );
    case "instances":
      return (
        <React.Fragment>
          <InstanceList filter={(item) => project.instances.includes(item.id)}/>
        </React.Fragment>
      );
    case "volumes":
    return (
    <React.Fragment>
    <VolumeList filter={(item) => project.volumes.includes(item.id)}/>
  </React.Fragment>
    );
    case "links":
    return (
    <React.Fragment>
    <LinkList filter={(item) => project.links.includes(item.id)}/>
  </React.Fragment>
    );
    case "images":
    return (
    <React.Fragment>
    <ImageList filter={(item) => project.images.includes(item.id)}/>
  </React.Fragment>
    );

  }
};
const mapStateToProps = ({tagList, instanceList, volumeList, imageList}) => ({
  tags: tagList.data,
})
export default connect(mapStateToProps, null)(ProjectInfo);
