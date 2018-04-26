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
import { VolumeIdentity } from "../components/Volumes/VolumeCard";
import VolumeInfo from "../components/Volumes/VolumeInfo";
import VolumeActions from "../containers/VolumeActions";

class VolumeDetail extends Component {
  render() {
    const { volume, back, isMobile } = this.props;
    console.log(volume);
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
            name="Volume Detail"
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
                <VolumeIdentity volume={volume} />
              </ListCardIdentity>
              <ActionGroup>
                <VolumeActions volume={volume}/>
              </ActionGroup>
            </ListCardHeader>
            <ListCardDetail>
              <VolumeInfo
                isMobile={isMobile}
                detailView={true}
                volume={volume}
              />
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
      back: () => push(`${process.env.PUBLIC_URL}/volumes`),
      onTabClick: view => push(view)
    },
    dispatch
  );
const mapStateToProps = (state, { match }) => {
  const location = state.routing.location.pathname.split("/").reverse();
  const view = match.isExact ? "info" : location[0];
  return {
    volume: get.byId(match.params.id)(state.volumeList.data),
    view,
    location,
    isMobile: isMobile(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeDetail);
