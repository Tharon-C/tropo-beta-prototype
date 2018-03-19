import React from "react";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import { Element, P } from "../../cyverse-ui";
import VersionCard from "./VersionCard";
import Tag from "../Tag";

export default ({image, view}) => {
    if(view === "info"){
        return (
            <React.Fragment>
                <Element typography="label" whitespace="mb1">
                    Visablility
                </Element>
                <Element typography="body2" whitespace="mb4">
                    Public
                </Element>
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
            </React.Fragment>
        )
    } if (view === "versions") {
        return (
            <React.Fragment>
            <VersionCard image={image}/>
            <VersionCard image={image}/>
            <VersionCard image={image}/>
            </React.Fragment>
        )
    }

}