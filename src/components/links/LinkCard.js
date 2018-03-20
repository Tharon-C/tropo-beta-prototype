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
import {LinkIcon} from "../../cyverse-ui/icons";
import ProjectActions from "../../containers/ProjectActions";
import LinkInfo from "./LinkInfo";
import LinksTabs from "./LinkTabs";
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

const ProjectIdentity = ({ image }) => (
  <Identity
    image={<Avatar color="black" backgroundColor="none" icon={<LinkIcon />} />}
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
    top: "48px",
    zIndex: 898,
  },
  header: {
    minHeight: "48px"
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

const ProjectSummary = withTheme(
  injectSheet(summaryStyles)(({ image, classes }) => (
    <Element className={classes.wraper}>
      <SummaryText>{image.summary}</SummaryText>
    </Element>
  ))
);

export const ProjectListHeader = withTheme(
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
        <Element typography="label">Summary</Element>
      </ListCardSummary>
    </ListCardHeader>
    </ListCard>
  ))
);

class ProjectCard extends Component {
  state = { isHovered: false, view: "info" };
  onMouseEnter = () => {
    this.setState({ isHovered: true });
  };
  onMouseLeave = () => {
    this.setState({ isHovered: false });
  };
  onTabClick = (tab) => {
    this.setState({ view: tab.props["data-route"]})
  }
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
            <ProjectIdentity image={image} />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            <ProjectSummary image={image} />
          </ListCardSummary>
          <ProjectActions
            hideQuickActions={isExpanded ? false : !this.state.isHovered}
            isHoveredimage={image}
          />
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>
          <LinkInfo image={image} view={this.state.view}/>
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default ProjectCard;
