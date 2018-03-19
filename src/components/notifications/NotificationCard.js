import React, { Component } from "react";
import randomcolor from "randomcolor";
import injectSheet, { withTheme } from "react-jss";
import { Avatar, Checkbox } from "material-ui";
import get from "../../utils/get";
import MenuItem from "material-ui/MenuItem";
import WarningIcon from "material-ui/svg-icons/alert/warning";
import { Tabs, Tab } from "material-ui";
import { LaunchIcon, AttachInstanceIcon, DetachInstanceIcon } from "../../cyverse-ui/icons";
//import InstanceActions from "../../containers/InstanceActions";
import NotificationInfo from "./NotificationInfo";
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

const ImageIdentity = ({ notificationType, isError }) => {
  const showWarning = isError ? (
    <WarningIcon
      style={{ position: "absolute", top: -14, left: -10, width: 15 }}
      size={15}
      color="orange"
    />
  ) : null;
  let Icon;
  let primaryText;

  switch (notificationType) {
    case "launchInstance":
      primaryText = isError
        ? "Instance failed to launch!"
        : "Instance launched succesfully";
      Icon = <LaunchIcon/>
      break
      case "attachVolume":
      primaryText = isError
        ? "Volume failed to attach!"
        : "Volume attached succesfully";
      Icon = <AttachInstanceIcon/>
      break
      case "detachVolume":
      primaryText = isError
        ? "Volume failed to dettach!"
        : "Volume detached succesfully";
      Icon = <DetachInstanceIcon/>
  }

  return (
    <div style={{ position: "relative" }}>
      {showWarning}
      <Identity
        image={
          <Avatar color="black" backgroundColor="none" icon={Icon} />
        }
        primaryText={primaryText}
        secondaryText="May 8, 2017 2:20pm"
      />
    </div>
  );
};

const summaryStyles = theme => ({
  wraper: {
    display: "flex",
    padding: "8px 0px"
  },
  header: {
    minHeight: "48px"
  },
  checkbox: {
    marginLeft: "6px",
    marginRight: "6px"
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
  injectSheet(summaryStyles)(({ summaryMessage, classes }) => (
    <SummaryText>{summaryMessage}</SummaryText>
  ))
);

export const InstanceListHeader = withTheme(
  injectSheet(summaryStyles)(({ image, classes }) => (
    <ListCard whitespace="mb1">
      <ListCardHeader className={classes.header}>
        <ListCardIdentity>
          <Element className={classes.checkbox}>
            <Checkbox />
          </Element>
          <Element typography="label">Name</Element>
        </ListCardIdentity>
        <ListCardSummary>
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
        </ListCardSummary>
      </ListCardHeader>
    </ListCard>
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
  render() {
    const {
      onExpand,
      isExpanded,
      summaryMessage,
      notificationType,
      isError,
      ...rest
    } = this.props;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <ImageIdentity
              isError={isError}
              notificationType={notificationType}
            />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            <ImageSummary summaryMessage={summaryMessage} />
          </ListCardSummary>
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded} />
      </ListCard>
    );
  }
}

export default ImageCard;
