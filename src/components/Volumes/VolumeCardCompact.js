import React, { Component } from "react";
import { connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {push} from "react-router-redux";
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

const VolumeIdentity = ({ volume, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<VolumeIcon />}
    primaryText={volume.name}
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
      volume,
      goToDetail,
      ...rest
    } = this.props;
    const { isHovered } = this.state;
    return (
      <ListCard {...rest}>
        <ListCardHeader
          style={{ minHeight: "48px" }}
          onClick={() => goToDetail(volume.id)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
              <VolumeIdentity
                hide={isExpanded}
                isCheckable={isExpanded ? true : isCheckable ? true : isHovered}
                volume={volume}
                onCheck={this.onCheck}
                checked={checked}
              />
              { isExpanded ?
              <Checkbox onCheck={this.onCheck} checked={checked} />
              : null}
          </ListCardIdentity>
          <VolumeActions
            isCompact={true}
            volume={volume}
            hideQuickActions={true}
            isHoveredimage={volume}
          />
        </ListCardHeader>
        {volume.description && !isExpanded ? (
          <SummaryText whitespace={["ms7", "pb1"]}>
            {volume.description}
          </SummaryText>
        ) : null}
      </ListCard>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToDetail: volumeId =>
        push(`${process.env.PUBLIC_URL}/volumes/${volumeId}`)
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(VolumeCard);
