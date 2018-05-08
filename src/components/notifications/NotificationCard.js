import React, { Component } from "react";
import moment from "moment";
import {connect} from "react-redux";
import { get } from "../../utils";
import randomcolor from "randomcolor";
import { Avatar, Checkbox } from "material-ui";
import MenuItem from "material-ui/MenuItem";
import WarningIcon from "material-ui/svg-icons/alert/warning";
import { Tabs, Tab } from "material-ui";
import {
  LaunchIcon,
  AttachInstanceIcon,
  DetachInstanceIcon
} from "../../cyverse-ui/icons";
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

const NotificationIdentity = ({ notification }) => {
  const isError = notification.status === "error" 
  const showWarning = isError ? (
    <WarningIcon
      style={{ position: "absolute", top: -14, left: -10, width: 15 }}
      size={15}
      color="orange"
    />
  ) : null;
  let Icon;
  let primaryText;

  switch (notification.type) {
    case "LAUNCH":
      primaryText = isError
        ? "Instance failed to launch!"
        : "Instance launched succesfully";
      Icon = <LaunchIcon />;
      break;
    case "ATTACH_VOLUME":
      primaryText = isError
        ? "Volume failed to attach!"
        : "Volume attached succesfully";
      Icon = <AttachInstanceIcon />;
      break;
    case "DETACH_VOLUME":
      primaryText = isError
        ? "Volume failed to dettach!"
        : "Volume detached succesfully";
      Icon = <DetachInstanceIcon />;
  }

  return (
    <div style={{ position: "relative" }}>
      {showWarning}
      <Identity
        image={<Avatar color="black" backgroundColor="none" icon={Icon} />}
        primaryText={primaryText}
        secondaryText={moment(notification.created).format('MMMM DD YYYY, h:mm')}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  instances: state.instanceList.data
})
const NotificationSummary = connect(mapStateToProps, null)(({ notification, instances }) => {
  switch (notification.type) {
    case "LAUNCH":
      return (
        <SummaryText>{`The Instance "${
          get.byId(notification.assets[0])(instances).name
        }" Launched Succesfully`}</SummaryText>
      );
  }
});

class NotificationCard extends Component {
  state = { isHovered: false };
  onMouseEnter = () => {
    this.setState({ isHovered: true });
  };
  onMouseLeave = () => {
    this.setState({ isHovered: false });
  };
  render() {
    const { onExpand, isExpanded, notification, ...rest } = this.props;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <NotificationIdentity
              notification={notification}
            />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            <NotificationSummary notification={notification} />
          </ListCardSummary>
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded} />
      </ListCard>
    );
  }
}

export default NotificationCard;
