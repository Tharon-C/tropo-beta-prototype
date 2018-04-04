import React, { Component } from "react";
import randomcolor from "randomcolor";
import injectSheet from "react-jss";
import { Avatar } from "material-ui";
import get from "../../utils/get";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoritedBorderIcon from "material-ui/svg-icons/action/favorite-border";
import { Tabs, Tab } from "material-ui";
import { LaunchIcon } from "cyverse-ui/es/icons";
import ImageActions from "../../containers/ImageActions";
import ImageInfo from "./ImageInfo";
import Tag from "./../Tag";
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

const ImageIdentity = ({ image }) => (
  <Identity
    image={
      <Avatar
        children={"V1"}
        backgroundColor={randomcolor({
          seed: image.name
        })}
        color="rgba(255,255,255,.7)"
      />
    }
    primaryText={"Version 1"}
    secondaryText="Updated May 8, 2017"
  />
);

const summaryStyles = {
  providerWrapper: {
    display: "flex"
  },
  provider: {
    width: "100px"
  }
};

const ImageSummary = injectSheet(summaryStyles)(({ image, classes }) => {
  return (
    <Element whitespace="pv1">
      <SummaryText whitespace="mb1">{image.summary}</SummaryText>
      <Element
        className={classes.providerWrapper}
        style={{ display: "flex" }}
        typography="caption"
      >
        <Element className={classes.provider} typography="label">
          Providers:
        </Element>
        <Element className={classes.provider} typography="body2">
          CYMAR,
        </Element>
        <Element className={classes.provider} typography="body2">
          CYWRK,
        </Element>
        <Element className={classes.provider} typography="body2">
          IPWRK
        </Element>
      </Element>
    </Element>
  );
});

const ImageDetailTabs = ({ image, ...rest }) => (
  <Element {...rest}>
    <Tabs
      style={{
        width: "100%",
        maxWidth: "400px"
      }}
    >
      <Tab label="Info" />
      <Tab label="Versions" />
    </Tabs>
  </Element>
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
    const { onExpand, isExpanded, image, selectMode, ...rest } = this.props;
    return (
      <ListCard isExpanded={isExpanded} {...rest}>
        <ListCardHeader
          onClick={onExpand}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <ListCardIdentity>
            <ImageIdentity image={image} />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            <ImageSummary image={image} />
          </ListCardSummary>
          {!selectMode ? (
            <ImageActions
              hideQuickActions={isExpanded ? false : !this.state.isHovered}
              isHoveredimage={image}
            />
          ) : null}
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>Comming soon :)</ListCardDetail>
      </ListCard>
    );
  }
}

export default ImageCard;
