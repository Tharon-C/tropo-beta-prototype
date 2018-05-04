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
import Status from "../Status";
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
  VerticalMenu,
  CopyButton
} from "../../cyverse-ui/";
import { resetProject } from "../../actions/projectActions";

export const InstanceIdentity = ({ instance, ...rest }) => (
  <AssetIdentity
    {...rest}
    percent={instance.progress}
    icon={<InstanceIcon />}
    primaryText={instance.name}
    secondaryText="Created May 8, 2017"
  />
);

const summaryStyles = theme => ({
  wraper: {
    display: "flex",
    padding: "8px 0px"
  },
  cell: {
    display: "flex",
    alignItems: "center"
  },

  statusCell: {
    flexBasis: "120px", 
  },
  sizeCell: {
    flexBasis: "120px",
  },
  ipCell: {
    flexBasis: "170px",
    marginRight: "16px"
  },
  activity: {
    display: "flex",
    alignItems: "center"
  }
});

const InstanceSummary = withTheme(
  injectSheet(summaryStyles)(({ instance, classes }) => {
    let statusColor;
    switch (instance.activity) {
      case "Active":
        statusColor = "success";
        break;
      case "Error":
        statusColor = "danger";
        break;
      default:
        statusColor = "inactive";
    }
    const statusLightClasses = classnames(classes.statusLight, statusColor);
    return (
      <Element className={classes.wraper}>
        <Element className={`${classes.cell} ${classes.statusCell}`}>
          <Status label={instance.activity} color={statusColor} />
        </Element>
        <Element className={`${classes.cell} ${classes.ipCell}`}>
          874.366.473.12 <CopyButton text="874.366.473.12" />
        </Element>
        <Element className={`${classes.cell} ${classes.sizeCell}`}>Large1</Element>
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
            <Element className={`${classes.cell} ${classes.statusCell}`}>
              <Element typography="label">Status</Element>
            </Element>
            <Element className={`${classes.cell} ${classes.ipCell}`}>
              <Element typography="label">IP Address</Element>
            </Element>
            <Element className={`${classes.cell} ${classes.sizeCell}`}>
              <Element typography="label">Size</Element>
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
      instance,
      volumes,
      windowSize,
      ...rest
    } = this.props;
    const { isHovered } = this.state;

    let isCompact = false;
    switch (windowSize) {
      case "small":
        isCompact = true;
    }
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          style={
            isExpanded && isSticky
              ? {
                  position: "sticky",
                  background: "white",
                  top: 48,
                  zIndex: 800,
                  border: "solid 1px lightgrey"
                }
              : null
          }
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <InstanceIdentity
              isCheckable={isExpanded ? true : isCheckable ? true : isHovered}
              instance={instance}
              onCheck={this.onCheck}
              checked={checked}
            />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            {simple ? (
              <SummaryText>{instance.description}</SummaryText>
            ) : (
              <InstanceSummary instance={instance} />
            )}
          </ListCardSummary>
          <InstanceActions
            hide={isCheckable}
            instance={instance}
            hideQuickActions={isExpanded ? false : !this.state.isHovered}
            isHoveredimage={instance}
          />
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>
          <InstanceInfo instance={instance} />
        </ListCardDetail>
        {instance.volumes.length !== 0 && !isExpanded ? (
          <ListCardHeader whitespace="pb1" style={{ minHeight: "32px" }}>
            {!isCompact ? <ListCardIdentity /> : <div style={{ width: 62 }} />}
            <Element
              style={{
                overflow: "hidden",
                display: "flex",
                whiteSpace: "nowrap",
                width: "100%",
                padding: "4px"
              }}
            >
              <InstanceVolumes instance={instance} />
            </Element>
          </ListCardHeader>
        ) : null}
      </ListCard>
    );
  }
}
const mapStateToProps = state => ({
  volumes: state.volumeList.data,
  windowSize: state.browser.mediaType
});
export default connect(mapStateToProps, null)(ImageCard);
