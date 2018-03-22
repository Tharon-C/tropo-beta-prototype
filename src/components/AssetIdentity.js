import React from "react";
import {Identity, Checkable } from "../cyverse-ui";
import { Avatar } from "material-ui"; 

const AssetIdentity = ({ primaryText, isCheckable, checked, onCheck, icon }) => (
  <Identity
    image={
      <Checkable
        isCheckable={isCheckable}
        checkboxProps={{
          checked,
          onCheck
        }}
      >
        <Avatar color="black" backgroundColor="none" icon={ icon } />
      </Checkable>
    }
    primaryText={primaryText}
    secondaryText="Created May 8, 2017"
  />
);

export default AssetIdentity;

