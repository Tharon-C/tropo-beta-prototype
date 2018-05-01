import React from "react";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import * as sort from "../../utils/sort";
import { Element, P, MediaCardGroup, CopyButton, Code } from "../../cyverse-ui";
import VersionCard from "./VersionCard";
import Tag from "../Tag";
import tagList from "../../TAG_DATA";
import providerList from "../../PROVIDER_DATA";

export default ({ version, image, selectMode }) => {
  const { tags, description, providers, id } = version;
  return (
    <React.Fragment>
      <Element typography="label" whitespace="mb1">
        Change Log
      </Element>
      <Element
        root="p"
        whitespace="mb6"
        style={{ whiteSpace: "pre-line", lineHeight: "24px", maxWidth: "500px" }}
        typography="body1"
      >
        {description}
      </Element>
      <Element whitespace="mb6">
        <Element typography="label" whitespace="mb1">
          Providers Available
        </Element>
        {providers.map(provider => {
          const { name, code, id } = get.byId(provider.id)(providerList);
          return (
            <Element whitespace="mb2">
              <Element whitespace="mb1">{`${name} (${code})`}</Element>
              <Code>
                {id}
              </Code>
              <CopyButton text={id} />
            </Element>
          );
        })}
      </Element>
    </React.Fragment>
  );
};
