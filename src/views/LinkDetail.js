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
import { LinkIdentity } from "../components/links/LinkCard";
import LinkInfo from "../components/links/LinkInfo";
import LinkActions from "../containers/LinkActions";

class LinkDetail extends Component {
  render() {
    const { link, back, isMobile } = this.props;
    console.log(link);
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
            name="Link Detail"
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
                <LinkIdentity link={link} />
              </ListCardIdentity>
              <ActionGroup>
                <LinkActions link={link}/>
              </ActionGroup>
            </ListCardHeader>
            <ListCardDetail>
              <LinkInfo
                isMobile={isMobile}
                detailView={true}
                link={link}
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
      back: () => push(`${process.env.PUBLIC_URL}/all-assets`),
      onTabClick: view => push(view)
    },
    dispatch
  );
const mapStateToProps = (state, { match }) => {
  const location = state.routing.location.pathname.split("/").reverse();
  const view = match.isExact ? "info" : location[0];
  return {
    link: get.byId(match.params.id)(state.linkList.data),
    view,
    location,
    isMobile: isMobile(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkDetail);
