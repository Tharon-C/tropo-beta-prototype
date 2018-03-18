import React from "react";
import injectSheet, { withTheme } from "react-jss";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import { Element, P } from "../../cyverse-ui";
import Tag from "../Tag";
import SummaryText from "cyverse-ui/lib/SummaryText";

const ProjectInfo = ({image}) => (
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
)

export default ProjectInfo