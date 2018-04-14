import React from "react";
import { Tab, Tabs } from "material-ui";
import { Element } from "../../cyverse-ui";

const ImageDetailTabs = ({ image, onTabClick, view, compact, ...rest }) => (
  <Element {...rest} style={{
    overflow: compact ? "scroll" : null
  }}>
    <Tabs
      style={{
        width: compact ? 500 : "100%",
        maxWidth: "700px",
      }}
      value={view}
    >
      <Tab label="Info" value="info" onActive={onTabClick} />
      <Tab label="Instances" value="instances" onActive={onTabClick} />
      <Tab label="Volumes" value="volumes" onActive={onTabClick} />
      <Tab label="Images" value="images" onActive={onTabClick} />
      <Tab label="Links" value="links" onActive={onTabClick} />
    </Tabs>
  </Element>
);

export default ImageDetailTabs;
