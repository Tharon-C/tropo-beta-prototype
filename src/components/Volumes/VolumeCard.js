import React, { Component } from "react";
import randomcolor from "randomcolor";
import injectSheet, { withTheme } from "react-jss";
import classnames from "classnames"
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

export const VolumeIdentity = ({ volume, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<VolumeIcon />}
    primaryText={volume.name}
    secondaryText="Created May 8, 2017"
  />
);

const summaryStyles = theme => ({
  wraper: {
    display: "flex",
    padding: "8px 0px"
  },
  cell: {
    width: "120px",
    marginRight: "16px"
  },
  activity: {
    display: "flex",
    alignItems: "center"
  },
  statusLight: {
    height: "12px",
    width: "12px",
    borderRadius: "900px",
    display: "inline-block",
    marginRight: "8px"
  },
  statusInactive: {
    background: "lightGrey"
  },
  statusActive: {
    background: theme.palette.success
  },
  statusError: {
    background: theme.palette.danger
  }
});

const VolumeSummary = withTheme(
  injectSheet(summaryStyles)(({ volume, classes }) => {
    let statusColor;
    switch (volume.status) {
      case "Attached":
        statusColor = classes.statusActive;
        break;
      case "Error":
        statusColor = classes.statusError;
        break;
      default:
        statusColor = classes.statusInactive;
    }
    const statusLightClasses = classnames(classes.statusLight, statusColor);
    return (
      <Element className={classes.wraper}>
        <Element className={`${classes.cell} ${classes.activity}`}>
          <div className={statusLightClasses} /> {volume.status}
        </Element>
        <Element className={classes.cell}>60GB</Element>
        <Element className={classes.cell}>CYMAR</Element>
      </Element>
    );
  })
);

export const VolumeListHeader = withTheme(
  injectSheet(summaryStyles)(({ classes, ...rest }) => (
    <AssetListHeader
      {...rest}
      summary={
        <Element className={classes.wraper}>
          <Element className={`${classes.cell} ${classes.activity}`}>
            <Element typography="label">Status</Element>
          </Element>
          <Element className={classes.cell}>
            {" "}
            <Element typography="label">Size</Element>
          </Element>
          <Element className={classes.cell}>
            {" "}
            <Element typography="label">Provider</Element>
          </Element>
        </Element>
      }
      actions={<VolumeBatchActions />}
    />
  ))
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
      ...rest
    } = this.props;
    const { isHovered } = this.state;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <VolumeIdentity
              isCheckable={isExpanded ? true : isCheckable ? true : isHovered}
              volume={volume}
              onCheck={this.onCheck}
              checked={checked}
            />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            {simple ? (
              <SummaryText>{volume.description}</SummaryText>
            ) : (
              <VolumeSummary volume={volume} />
            )}
          </ListCardSummary>
          <VolumeActions
            hide={isCheckable}
            volume={volume}
            hideQuickActions={isExpanded ? false : !this.state.isHovered}
            isHoveredimage={volume}
          />
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>
          <VolumeInfo volume={volume} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default VolumeCard;
