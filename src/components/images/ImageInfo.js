import React from "react";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import * as sort from "../../utils/sort";
import { Element, P, MediaCardGroup } from "../../cyverse-ui";
import VersionCard from "./VersionCard";
import Tag from "../Tag";
import tagList from "../../TAG_DATA";

export default ({ image, view, selectMode }) => {
  const { tags, description, versions } = image;
  if (view === "info") {
    return (
      <React.Fragment>
        <Element typography="label" whitespace="mb1">
          Description
        </Element>
        <Element
          style={{
            whiteSpace: "pre-line",
            lineHeight: "24px",
            maxWidth: "500px"
          }}
          whitespace="mb4"
        >
          {description}
        </Element>
        <Element typography="label" whitespace="mb1">
          Tags
        </Element>
        {tags
          ? tags.map(({ id }) => {
              return <Tag label={get.byId(id)(tagList).name} />;
            })
          : null}
      </React.Fragment>
    );
  }
  if (view === "versions") {
    return (
      <MediaCardGroup>
        {sort
          .created(versions)
          .map((version, i) => (
            <VersionCard
              key={version.id}
              image={image}
              version={version}
              i={i}
            />
          ))
          .slice()
          .reverse()}
      </MediaCardGroup>
    );
  }
};
