import React from "react";
import injectSheet, { withTheme } from "react-jss";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import get from "../../utils/get";
import {toggleInstanceForm} from "../../actions/instanceActions";
import {toggleLinkForm} from "../../actions/linkActions";
import {toggleVolumeForm} from "../../actions/volumeActions";
import {FloatingActionButton } from "material-ui";
import AddIcon from "material-ui/svg-icons/content/add";
import { Element, P } from "../../cyverse-ui";
import Tag from "../Tag";
import InstanceList from "../instances/InstanceList";
import VolumeList from "../Volumes/VolumeList";
import ImageList from "../images/ImageList";
import LinkList from "../links/LinkList";

import SummaryText from "cyverse-ui/lib/SummaryText";

const ProjectInfo = ({ tags, project, view, showInstanceForm, showLinkForm, showVolumeForm }) => {
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
        <div style={{position: "relative"}}>
        <FloatingActionButton
            mini
            secondary
            onClick={() => showInstanceForm(null, project)}
            style={{
              position: "absolute",
              right: 0,
              top: "-20px",
              zIndex: 1
            }}
          >
            <AddIcon />
          </FloatingActionButton>
          <InstanceList filter={(item) => project.instances.includes(item.id)}/>
          
        </div>
      );
    case "volumes":
    return (
          <div style={{position: "relative"}}>
        <FloatingActionButton
            mini
            secondary
            onClick={() => showVolumeForm(project)}
            style={{
              position: "absolute",
              right: 0,
              top: "-20px",
              zIndex: 1
            }}
          >
            <AddIcon />
          </FloatingActionButton>
    <VolumeList filter={(item) => project.volumes.includes(item.id)}/>
    </div>
    );
    case "links":
    return (
      <div style={{position: "relative"}}>
      <FloatingActionButton
          mini
          secondary
          onClick={() => showLinkForm(project)}
          style={{
            position: "absolute",
            right: 0,
            top: "-20px",
            zIndex: 1
          }}
        >
          <AddIcon />
        </FloatingActionButton> 
    <LinkList filter={(item) => project.links.includes(item.id)}/>
    </div>
    );
    case "images":
    return (
    <React.Fragment>
    <ImageList filter={(item) => project.images.includes(item.id)}/>
  </React.Fragment>
    );

  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showInstanceForm: toggleInstanceForm,
      showVolumeForm: toggleVolumeForm,
      showLinkForm: toggleLinkForm,
    },
    dispatch
  );

const mapStateToProps = ({tagList, instanceList, volumeList, imageList}) => ({
  tags: tagList.data,
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
