import React from "react";
import { Tab, Tabs } from "material-ui";
import { Element } from "../../cyverse-ui";

const ImageDetailTabs = ({ image, onTabClick, view, ...rest }) => (
  <Element {...rest}>
    <Tabs
      style={{
        width: "100%",
        maxWidth: "700px"
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
