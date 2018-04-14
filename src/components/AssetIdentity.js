import React from "react";
import { Identity, Checkable, ProgressAvatar } from "../cyverse-ui";

const AssetIdentity = ({
  primaryText,
  isCheckable,
  checked,
  onCheck,
  icon,
  percent,
  compact,
  ...rest
}) => (
  <Identity
    {...rest}
    compact={compact}
    image={
      <Checkable
        isCheckable={isCheckable}
        checkboxProps={{
          checked,
          onCheck
        }}
      >
        <ProgressAvatar
          size={compact ? 32 : 36}
          thickness={5}
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
