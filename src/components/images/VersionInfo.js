import React from "react";
import tags from "../../TAG_DATA.json";
import get from "../../utils/get";
import * as sort from "../../utils/sort";
import { Element, P, MediaCardGroup, CopyButton } from "../../cyverse-ui";
import VersionCard from "./VersionCard";
import Tag from "../Tag";
import tagList from "../../TAG_DATA";
import providerList from "../../PROVIDER_DATA";

export default ({ version, image, selectMode }) => {
  const { tags, description, providers, id } = version;
  return (
    <React.Fragment>
      <Element typography="label" whitespace="mb1">
        ID
      </Element>
      <Element
        typography="body1"
        whitespace="mb3"
        style={{ display: "flex", alignItems: "center" }}
      >
        {id} <CopyButton text={id} />
      </Element>
      <Element typography="label" whitespace="mb1">
        Providers
      </Element>
      {providers.map(provider => {
        const { name, code } = get.byId(provider.id)(providerList);
        return <Element>{`${name} (${code})`}</Element>;
      })}
      <Element typography="label" whitespace="mb1">
        Change Log
      </Element>
      <P whitespace="mb4">{description}</P>
    </React.Fragment>
  );
};
