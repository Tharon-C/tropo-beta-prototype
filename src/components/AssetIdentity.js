import React from "react";
import { Identity, Checkable, ProgressAvatar } from "../cyverse-ui";

const AssetIdentity = ({
  primaryText,
  isCheckable,
  checked,
  onCheck,
  icon,
  percent,
  ...rest
}) => (
  <Identity
    {...rest}
    image={
      <Checkable
        size={32}
        isCheckable={isCheckable}
        checkboxProps={{
          checked,
          onCheck
        }}
      >
        <ProgressAvatar
          size={32}
          thickness={3}
          percent={percent}
          color="black"
          backgroundColor="white"
          icon={icon}
        />
      </Checkable>
    }
    primaryText={primaryText}
    secondaryText="Created May 8, 2017"
  />
);

export default AssetIdentity;
