import React, { Component } from "react";
import randomcolor from "randomcolor";
import injectSheet, { withTheme } from "react-jss";
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

const VolumeIdentity = ({ image, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<VolumeIcon />}
    primaryText={image.name}
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
    background: theme.palette.success,
    height: "12px",
    width: "12px",
    borderRadius: "900px",
    display: "inline-block",
    marginRight: "8px"
  }
});

const VolumeSummary = withTheme(
  injectSheet(summaryStyles)(({ image, classes }) => (
    <Element className={classes.wraper}>
      <Element className={`${classes.cell} ${classes.activity}`}>
        <div className={classes.statusLight} /> Attatched
      </Element>
      <Element className={classes.cell}>60GB</Element>
      <Element className={classes.cell}>CYMAR</Element>
    </Element>
  ))
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
      image,
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
              image={image}
              onCheck={this.onCheck}
              checked={checked}
            />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            {simple ? (
              <SummaryText>{image.description}</SummaryText>
            ) : (
              <VolumeSummary image={image} />
            )}
          </ListCardSummary>
          <VolumeActions
            volume={image}
            hideQuickActions={isExpanded ? false : !this.state.isHovered}
            isHoveredimage={image}
          />
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>
          <VolumeInfo image={image} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default VolumeCard;
