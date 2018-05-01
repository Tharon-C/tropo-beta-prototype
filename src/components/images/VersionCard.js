import React, { Component } from "react";
import randomcolor from "randomcolor";
import moment from "moment";
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
import VersionInfo from "./VersionInfo";
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

const ImageIdentity = ({ image, version, i }) => {
  const versionNumber = i + 1;
  return (
    <Identity
      image={
        <Avatar
          children={"V" + versionNumber}
          backgroundColor={randomcolor({
            seed: image.name
          })}
          color="rgba(255,255,255,.7)"
        />
      }
      primaryText={"Version " + versionNumber}
      secondaryText={"Created " + moment(version.created).format("MMMM D, YY")}
    />
  );
};

const summaryStyles = {
  providerWrapper: {
    display: "flex"
  },
  providerLabel: {
    width: "100px"
  },
  provider: {
    width: "75px"
  }
};

const ImageSummary = injectSheet(summaryStyles)(
  ({ version, image, classes }) => {
    return (
      <Element whitespace="pv1">
        <SummaryText whitespace="mb1">{version.summary}</SummaryText>
        <Element
          className={classes.providerWrapper}
          style={{ display: "flex" }}
        >
          <Element className={classes.providerLabel} typography="label">
            Providers:
          </Element>
          {version.providers.map(provider => (
            <Element className={classes.provider} typography="body1">
              {provider.code}
            </Element>
          ))}
        </Element>
      </Element>
    );
  }
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
      image,
      version,
      selectMode,
      i,
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
            <ImageIdentity image={image} version={version} i={i} />
          </ListCardIdentity>
          <ListCardSummary hide={isExpanded}>
            <ImageSummary version={version} />
          </ListCardSummary>
        </ListCardHeader>
        <ListCardDetail hide={!isExpanded}>
          <VersionInfo version={version} image={image} />
        </ListCardDetail>
      </ListCard>
    );
  }
}

export default ImageCard;
