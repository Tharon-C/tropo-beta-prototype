import React from 'react';
import get from "../../utils/get";
import { Element, SummaryText, ShowMoreEllipsis } from "../../cyverse-ui";
import Tag from "../Tag";
import tagList from "../../TAG_DATA";

export default ({ image: { summary, tags }, ...rest }) => {
    return (
      <Element {...rest} style={{ padding: "4px 16px" }}>
        <SummaryText>{summary}</SummaryText>
        <div style={{ paddingTop: "8px" }}>
          {tags ? tags.slice(0, 6).map(({ id }) => {
            return <Tag label={get.byId(id)(tagList).name} />;
          }): null}
          { !tags ? null : tags.length > 6 ? (
            <ShowMoreEllipsis style={{ display: "inlineBlock" }} />
          ) : null}
        </div>
      </Element> 
    );
  };