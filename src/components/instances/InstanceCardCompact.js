import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
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

const InstanceIdentity = ({ instance, ...rest }) => (
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
  injectSheet(summaryStyles)(({ instance, classes }) => {
    let statusColor;
    switch (instance.activity) {
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
          <div className={statusLightClasses} /> {instance.activity}
        </Element>
        <Element className={classes.cell}>Large1</Element>
        <Element className={classes.cell}>CYMAR</Element>
      </Element>
    );
  })
);

export const InstanceListHeaderCompact = withTheme(
  injectSheet(summaryStyles)(
    ({ project, classes, createInstance, ...rest }) => (
      <AssetListHeader
        {...rest}
        compact={true}
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
      simple,
      isCheckable,
      onExpand,
      checked,
      isExpanded,
      instance,
      volumes,
      windowSize,
      goToDetail,
      ...rest
    } = this.props;
    const { isHovered } = this.state;

    let isCompact = false;
    switch (windowSize) {
      case "small":
        isCompact = true;
    }
    return (
      <ListCard>
        <ListCardHeader
          style={{ minHeight: "48px" }}
          onClick={() => goToDetail(instance.id)}
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
          <InstanceActions
            hide={isCheckable}
            isCompact={true}
            instance={instance}
            hideQuickActions={true}
            isHoveredimage={instance}
          />
        </ListCardHeader>
        {!isExpanded && instance.description ? (
          <SummaryText whitespace="ms3">{instance.description}</SummaryText>
        ) : null}
        {instance.volumes.length !== 0 && !isExpanded ? (
          <ListCardHeader
            whitespace={["pv1", "ms3"]}
            style={{ minHeight: "32px" }}
          >
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
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToDetail: instanceId =>
        push(`${process.env.PUBLIC_URL}/instances/${instanceId}`)
    },
    dispatch
  );

const mapStateToProps = state => ({
  volumes: state.volumeList.data,
  windowSize: state.browser.mediaType
});
export default connect(mapStateToProps, mapDispatchToProps)(ImageCard);
