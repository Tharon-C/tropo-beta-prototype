import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import randomcolor from "randomcolor";
import { Avatar } from "material-ui";
import get from "../../utils/get";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import ShareIcon from "material-ui/svg-icons/social/share";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import FavoritedBorderIcon from "material-ui/svg-icons/action/favorite-border";
import { Tabs, Tab } from "material-ui";
import { LaunchIcon } from "cyverse-ui/es/icons";
import ImageActions from "../../containers/ImageActions";
import ImageInfo from "./ImageInfo";
import Tag from "./../Tag";
import tags from "../../TAG_DATA.json";

import {
  ListCard,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  Identity,
  SummaryText,
  P,
  Element,
  ShowMoreEllipsis
} from "../../cyverse-ui/";

export const ImageIdentity = ({ image, isSelected }) => (
  <Identity
    image={
      isSelected ? (
        <CheckIcon style={{ width: 40, height: 40, color: "green" }} />
      ) : image.avatar ? (
        <Avatar backgroundColor="#EFEFEF" src={image.avatar} />
      ) : (
        <Avatar
          children={image.name[0]}
          backgroundColor={randomcolor({
            seed: image.name
          })}
          color="rgba(255,255,255,.7)"
        />
      )
    }
    primaryText={image.name}
    secondaryText="Updated May 8, 2017"
  />
);

const ImageSummary = ({ image, ...rest }) => {
  return (
    <Element {...rest} style={{ padding: "4px 16px" }}>
      <SummaryText>{image.summary}</SummaryText>
      <div style={{ paddingTop: "8px" }}>
        {image.tags.slice(0, 6).map(({ id }) => {
          return <Tag label={get.byId(id)(tags).name} />;
        })}
        {image.tags.length > 6 ? (
          <ShowMoreEllipsis style={{ display: "inlineBlock" }} />
        ) : null}
      </div>
    </Element>
  );
};

class ImageCard extends Component {
  render() {
    const {
      isSelected,
      image,
      selectMode,
      project,
      isSticky,
      goToDetail,
      ...rest
    } = this.props;
    return (
      <ListCard {...rest}>
        <ListCardHeader onClick={() => goToDetail(image.id)}>
          <ListCardIdentity>
            <ImageIdentity image={image} isSelected={isSelected} />
          </ListCardIdentity>
          {!selectMode ? (
            <ImageActions
              isCompact={true}
              isHoveredimage={image}
              image={image}
              project={project}
            />
          ) : null}
        </ListCardHeader>
        <ImageSummary image={image} />
      </ListCard>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToDetail: imageId =>
        push(`${process.env.PUBLIC_URL}/image-catalog/${imageId}`)
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(ImageCard);
