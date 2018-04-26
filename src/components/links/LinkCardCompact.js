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
import { LinkIcon } from "../../cyverse-ui/icons";
import LinkActions, {
  LinkBatchActions
} from "../../containers/LinkActions";
import LinkInfo from "./LinkInfo";
import LinksTabs from "./LinkTabs";
import Tag from "../Tag";
import tags from "../../TAG_DATA.json";
import AssetListHeader from "../AssetListHeader";
import AssetIdentity from "../AssetIdentity";

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

const ProjectIdentity = ({ link, ...rest }) => (
  <AssetIdentity
    {...rest}
    icon={<LinkIcon />}
    primaryText={link.name}
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
    zIndex: 898
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

const ProjectSummary = withTheme(
  injectSheet(summaryStyles)(({ link, classes, ...rest }) => (
    <Element {...rest } className={classes.wraper}>
      <SummaryText>{link.description}</SummaryText>
    </Element>
  ))
);

export const ProjectListHeader = withTheme(
  injectSheet(summaryStyles)(({ classes, ...rest }) => (
    <AssetListHeader
      {...rest}
      summary={<Element typography="label">Summary</Element>}
      actions={<LinkBatchActions />}
    />
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
  onTabClick = tab => {
    this.setState({ view: tab.props["data-route"] });
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
      link,
      project,
      ...rest
    } = this.props;
    const { isHovered } = this.state;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          style={{ minHeight: "48px"}}
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <ProjectIdentity
              isCheckable={isExpanded ? true : isCheckable ? true : isHovered}
              link={link}
              onCheck={this.onCheck}
              checked={checked}
            />
          </ListCardIdentity>
          <LinkActions
            hide={isCheckable}
            isCompact={true}
            link={link}
            project={project}
            hideQuickActions={true}
            isHoveredimage={link}
          />
        </ListCardHeader>
        <ProjectSummary whitespace="ms3" hide={isExpanded} link={link} />
        <ListCardDetail hide={!isExpanded}>
          <LinkInfo link={link} view={this.state.view} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default ProjectCard;
