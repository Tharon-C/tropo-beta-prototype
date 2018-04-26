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

const ProjectInfo = ({ link }) => {
      return (
        <Element>
          <Element typography="label" whitespace="mb1">
            Description
          </Element>
          <P whitespace="mb4">{link.description}</P>
          <Element typography="label" whitespace="mb1">
            Tags
          </Element>
          {link.tags.map(({ id }) => {
            return <Tag label={get.byId(id)(tags).name} />;
          })}
        </Element>
      );
};

export default ProjectInfo;
