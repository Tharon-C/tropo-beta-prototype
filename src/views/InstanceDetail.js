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
import { InstanceIdentity } from "../components/instances/InstanceCard";
import InstanceInfo from "../components/instances/InstanceInfo";
import InstanceActions from "../containers/InstanceActions";

class InstanceDetail extends Component {
  render() {
    const { instance, back, isMobile } = this.props;
    console.log(instance);
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
            name="Project Detail"
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
                <InstanceIdentity instance={instance} />
              </ListCardIdentity>
              <ActionGroup>
                <InstanceActions instance={instance}/>
              </ActionGroup>
            </ListCardHeader>
            <ListCardDetail>
              <InstanceInfo
                isMobile={isMobile}
                detailView={true}
                instance={instance}
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
      back: () => push(`${process.env.PUBLIC_URL}/projects`),
      onTabClick: view => push(view)
    },
    dispatch
  );
const mapStateToProps = (state, { match }) => {
  const location = state.routing.location.pathname.split("/").reverse();
  const view = match.isExact ? "info" : location[0];
  return {
    instance: get.byId(match.params.id)(state.instanceList.data),
    view,
    location,
    isMobile: isMobile(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetail);
