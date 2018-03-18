import React, { Component } from "react";
import randomcolor from "randomcolor";
import injectSheet, { withTheme } from "react-jss";
import { Avatar, Checkbox } from "material-ui";
import get from "../../utils/get";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoritedBorderIcon from "material-ui/svg-icons/action/favorite-border";
import { Tabs, Tab } from "material-ui";
import VolumeIcon from "../../icons/VolumeIcon";
import VolumeActions from "../../containers/VolumeActions";
import VolumeInfo from "./VolumeInfo";
import Tag from "../Tag";
import tags from "../../TAG_DATA.json";

import {
  ListCard,
  ListCardDetail,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  Identity,
  SummaryText,
  P,
  Element,
  ShowMoreEllipsis
} from "../../cyverse-ui/";

const VolumeIdentity = ({ image }) => (
  <Identity
    image={
      <Avatar color="black" backgroundColor="none" icon={<VolumeIcon/>} />
    }
    primaryText={image.name}
    secondaryText="Created May 8, 2017"
  />
);

const summaryStyles = theme => ({
  wraper: {
    display: "flex",
    padding: "8px 0px"
  },
  headerWrapper: {
    position: "sticky",
    zIndex: "9999",
    top: "48px",
  },
  header: {
    minHeight: "48px",
  },
  checkbox: {
    marginLeft: "6px",
    marginRight: "6px",
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
  injectSheet(summaryStyles)(({ image, classes }) => (
    <ListCard className={classes.headerWrapper} whitespace="mb1">
    <ListCardHeader className={classes.header}>
      <ListCardIdentity>
        <Element className={classes.checkbox}>
          <Checkbox/>
        </Element>
        <Element typography="label">
          Name</Element>
      </ListCardIdentity>
      <ListCardSummary>
        <Element className={classes.wraper}>
          <Element className={`${classes.cell} ${classes.activity}`}>
          <Element typography="label">Status</Element>
          </Element>
          <Element className={classes.cell}> <Element typography="label">Size</Element></Element>
          <Element className={classes.cell}> <Element typography="label">Provider</Element></Element>
        </Element>
      </ListCardSummary>
    </ListCardHeader>
    </ListCard>
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
  render() {
    const { onExpand, isExpanded, image, ...rest } = this.props;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <VolumeIdentity image={image} />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            <VolumeSummary image={image} />
          </ListCardSummary>
          <VolumeActions
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
