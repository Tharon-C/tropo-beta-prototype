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
import InstanceIcon from "../../icons/InstanceIcon";
import InstanceActions, {
  InstanceBatchActions
} from "../../containers/InstanceActions";
import InstanceInfo from "./InstanceInfo";
import AssetListHeader from "../AssetListHeader";
import AssetIdentity from "../AssetIdentity";

import {
  ListCard,
  ListCardDetail,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  SummaryText,
  P,
  Element,
} from "../../cyverse-ui/";

const ImageIdentity = ({ image, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<InstanceIcon />}
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

const ImageSummary = withTheme(
  injectSheet(summaryStyles)(({ image, classes }) => (
    <Element className={classes.wraper}>
      <Element className={`${classes.cell} ${classes.activity}`}>
        <div className={classes.statusLight} /> Active
      </Element>
      <Element className={classes.cell}>Large1</Element>
      <Element className={classes.cell}>CYMAR</Element>
    </Element>
  ))
);

export const InstanceListHeader = withTheme(
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
      actions={<InstanceBatchActions />}
    />
  ))
);

class ImageCard extends Component {
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
            <ImageIdentity
              isCheckable={isExpanded ? true : isCheckable ? true : isHovered}
              image={image}
              onCheck={this.onCheck}
              checked={checked}
            />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            <ImageSummary image={image} />
          </ListCardSummary>
          <InstanceActions
            hideQuickActions={isExpanded ? false : !this.state.isHovered}
            isHoveredimage={image}
          />
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>
          <InstanceInfo image={image} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default ImageCard;
