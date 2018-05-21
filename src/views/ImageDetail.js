import React, { Component } from "react";
import * as R from "ramda";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobile } from "../selectors/browser";
import { get } from "../utils";
import { zIndex } from "../styles/styles";
import {
  Element,
  Hr,
  P,
  ListCard,
  ListCardHeader,
  ListCardIdentity,
  SubHeader,
  ActionGroup,
  ListCardDetail
} from "../cyverse-ui";
import { ImageIdentity, ImageDetailTabs } from "../components/images/ImageCard";
import ImageInfo from "../components/images/ImageInfo";
import ImageActions from "../containers/ImageActions";

class ImageDetail extends Component {
  state = { view: "info" };
  onTabClick = tab => {
    this.setState({ view: tab.props["data-route"] });
  };
  render() {
    const { image, back, isMobile } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            background: "white",
            position: "sticky",
            display: "flex",
            alignItems: "center",
            top: 0,
            height: 48,
            boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
            zIndex: zIndex.viewHeader,
            marginBottom: "4px"
          }}
        >
          <SubHeader
            style={{ width: "100%" }}
            name="Image Detail"
            onBack={back}
          />
        </div>
        <Element
          style={{ maxWidth: "1200px", margin: "auto" }}
          whitespace={isMobile ? "ps1" : ["ps13", "pv3"]}
        >
          <ListCard style={{ marginBottom: "4px" }}>
            <ListCardHeader>
              <ListCardIdentity>
                <ImageIdentity image={image} />
              </ListCardIdentity>
              <ActionGroup>
                <ImageActions image={image} />
              </ActionGroup>
            </ListCardHeader>
            <ImageDetailTabs onTabClick={this.onTabClick} />
            <ListCardDetail>
              <ImageInfo view={this.state.view} image={image} />
            </ListCardDetail>
          </ListCard>
        </Element>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      back: () => push(`${process.env.PUBLIC_URL}/image-catalog`),
      onTabClick: view => push(view)
    },
    dispatch
  );
const mapStateToProps = (state, { match }) => {
  const location = state.routing.location.pathname.split("/").reverse();
  return {
    image: get.byId(match.params.id)(state.imageList.data),
    location,
    isMobile: isMobile(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
