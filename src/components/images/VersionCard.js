import React, { Component } from "react";
import randomcolor from "randomcolor";
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
        image={ <Avatar
          children={"V1"}
          backgroundColor={randomcolor({
            seed: image.name
          })}
          color="rgba(255,255,255,.7)"
        />
    }
    primaryText={"Version 1"}
    secondaryText="Created May 8, 2017"
  />
);

const ImageSummary = ({ image }) => {
  return (
    <div style={{ padding: "8px 0px" }}>
      <SummaryText>{image.summary}</SummaryText>
    </div>
  );
};

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
    const { onExpand, isExpanded, image, ...rest } = this.props;
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
          <ImageActions
            hideQuickActions={isExpanded ? false : !this.state.isHovered}
            isHoveredimage={image}
          />
        </ListCardHeader>
        <ImageDetailTabs hide={!isExpanded} />
        <ListCardDetail hide={!isExpanded}>
          <ImageInfo view={"info"} image={image} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default ImageCard;
