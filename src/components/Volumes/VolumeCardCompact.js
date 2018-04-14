import React, { Component } from "react";
import randomcolor from "randomcolor";
import injectSheet, { withTheme } from "react-jss";
import classnames from "classnames";
import styles from "../../styles/styles";
import VolumeIcon from "../../icons/VolumeIcon";
import VolumeActions, {
  VolumeBatchActions
} from "../../containers/VolumeActions";
import VolumeInfo from "./VolumeInfo";
import AssetIdentity from "../AssetIdentity";
import AssetListHeader from "../AssetListHeader";

import {
  ListCard,
  ListCardDetail,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  Identity,
  SummaryText,
  P,
  Element
} from "../../cyverse-ui/";
import { Checkbox } from "material-ui";

const VolumeIdentity = ({ image, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<VolumeIcon />}
    primaryText={image.name}
    secondaryText="Created May 8, 2017"
  />
);

class VolumeCard extends Component {
  state = { isHovered: false };
  onMouseEnter = () => {
    this.setState({ isHovered: true });
  };
  onMouseLeave = () => {
    this.setState({ isHovered: false });
  };
  onCheck = (e, state) => {
    this.props.onCheck(e, state, this);
  };
  render() {
    const {
      simple,
      isCheckable,
      onExpand,
      checked,
      isExpanded,
      image,
      ...rest
    } = this.props;
    const { isHovered } = this.state;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          style={{ minHeight: "48px" }}
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
              <VolumeIdentity
                compact={true}
                hide={isExpanded}
                isCheckable={isExpanded ? true : isCheckable ? true : isHovered}
                image={image}
                onCheck={this.onCheck}
                checked={checked}
              />
              { isExpanded ?
              <Checkbox onCheck={this.onCheck} checked={checked} />
              : null}
          </ListCardIdentity>
        </ListCardHeader>
        {image.description && !isExpanded ? (
          <SummaryText whitespace={["ms7", "pb1"]}>
            {image.description}
          </SummaryText>
        ) : null}
        <ListCardDetail hide={!isExpanded}>
          <VolumeIdentity whitespace="mb3" image={image} />
          <VolumeInfo image={image} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default VolumeCard;
