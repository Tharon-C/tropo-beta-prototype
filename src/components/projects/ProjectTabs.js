import React from "react";
import {Tab, Tabs } from "material-ui";
import {Element} from "../../cyverse-ui";

const ImageDetailTabs = ({ image, onTabClick, ...rest }) => (
    <Element {...rest}>
      <Tabs
        style={{
          width: "100%",
          maxWidth: "700px"
        }}
      >
        <Tab label="Info"
          data-route="info"
          onActive={onTabClick}
        />
        <Tab label="Instances" 
            data-route="instances"
            onActive={onTabClick}
        />
        <Tab label="Volumes" 
            data-route="volumes"
            onActive={onTabClick}
        />
                <Tab label="Images" 
            data-route="images"
            onActive={onTabClick}
        />
                <Tab label="Links" 
            data-route="links"
            onActive={onTabClick}
        />
      </Tabs>
    </Element>
  );

  export default ImageDetailTabs;