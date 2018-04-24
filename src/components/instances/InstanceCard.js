import React, { Component } from "react";
import { connect } from "react-redux";
import randomcolor from "randomcolor";
import injectSheet, { withTheme } from "react-jss";
import { Avatar, Checkbox } from "material-ui";
import get from "../../utils/get";
import classnames from "classnames";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoritedBorderIcon from "material-ui/svg-icons/action/favorite-border";
import AddIcon from "material-ui/svg-icons/content/add";
import { Tabs, Tab } from "material-ui";
import InstanceIcon from "../../icons/InstanceIcon";
import { VolumeIcon } from "../../cyverse-ui/icons";
import InstanceActions, {
  InstanceBatchActions
} from "../../containers/InstanceActions";
import InstanceInfo from "./InstanceInfo";
import AssetListHeader from "../AssetListHeader";
import AssetIdentity from "../AssetIdentity";
import InstanceVolumes from "./InstanceVolumes";
import {
  ListCard,
  ListCardDetail,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  SummaryText,
  P,
  Element,
  VerticalMenu
} from "../../cyverse-ui/";
import { resetProject } from "../../actions/projectActions";

const ImageIdentity = ({ image, ...rest }) => (
  <AssetIdentity
    {...rest}
    percent={image.progress}
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

const InstanceSummary = withTheme(
  injectSheet(summaryStyles)(({ image, classes }) => {
    let statusColor;
    switch (image.activity) {
      case "Active":
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
          <div className={statusLightClasses} /> {image.activity}
        </Element>
        <Element className={classes.cell}>Large1</Element>
        <Element className={classes.cell}>874.366.473.12</Element>
      </Element>
    );
  })
);

export const InstanceListHeader = withTheme(
  injectSheet(summaryStyles)(
    ({ project, classes, createInstance, ...rest }) => (
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
              <Element typography="label">IP Address</Element>
            </Element>
          </Element>
        }
        actions={<InstanceBatchActions />}
      />
    )
  )
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
      isSticky,
      simple,
      isCheckable,
      onExpand,
      checked,
      isExpanded,
      image,
      volumes,
      windowSize,
      ...rest
    } = this.props;
    const { isHovered } = this.state;

    let isCompact = false;
    switch(windowSize) {
      case "small": isCompact = true
    }
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          style={isExpanded && isSticky ? {
            position: "sticky",
            background: "white",
            top: 48,
            zIndex: 800,
            border: "solid 1px lightgrey"
          } : null}
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
              compact={isCompact}
            />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            {simple ? (
              <SummaryText>{image.description}</SummaryText>
            ) : <InstanceSummary image={image}/> }
          </ListCardSummary>
          <InstanceActions
            hide={isCheckable}
            instance={image}
            hideQuickActions={isExpanded ? false : !this.state.isHovered}
            isHoveredimage={image}
          />
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>
          <InstanceInfo image={image} />
        </ListCardDetail>
        {image.volumes.length !== 0 && !isExpanded ? (
          <ListCardHeader whitespace="pb1" style={{ minHeight: "32px" }}>
          { !isCompact ? 
          <ListCardIdentity /> : <div style={{width: 62}}/>}
          <Element
            style={{
              overflow: "hidden",
              display: "flex",
              whiteSpace: "nowrap",
              width: "100%",
              padding: "4px"
            }}
          >
          <InstanceVolumes instance={image} />
          </Element>
    </ListCardHeader>
        ) : null}
      </ListCard>
    );
  }
}
const mapStateToProps = state => ({
  volumes: state.volumeList.data,
  windowSize: state.browser.mediaType,
});
export default connect(mapStateToProps, null)(ImageCard);
