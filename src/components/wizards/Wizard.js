import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { zIndex } from "../../styles/styles";
import browserState from "../../containers/browser";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import { IconButton, RaisedButton, FlatButton, TextField } from "material-ui";
import {
  stepper,
  Step,
  Stepper,
  StepButton,
  StepContent
} from "material-ui/Stepper";

import LeftArrowIcon from "material-ui/svg-icons/navigation/arrow-back";
import RightArrowIcon from "material-ui/svg-icons/navigation/arrow-forward";
import SettingsIcon from "material-ui/svg-icons/action/settings";
import { Element, Hr, MeterGauge, P } from "../../cyverse-ui";
import ProjectList from "../projects/ProjectList";
import ImageList from "../images/ImageList";
import { toggleInstanceForm } from "../../actions/instanceActions";

const Wizard = ({
  show,
  close,
  location,
  sidebarContent,
  view,
  title,
  isMobile
}) =>
  show ? (
    <Element
      root="section"
      style={{
        position: "fixed",
        display: isMobile ? "block" : "flex",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#EFEFEF",
        width: "100%",
        height: "100%",
        zIndex: zIndex.Wizard
      }}
    >
      {isMobile ? null : (
        <a
          style={{
            position: "absolute",
            right: "16px",
            top: "6px",
            fontSize: "18px",
            textAlign: "center",
            cursor: "pointer",
            ontWeight: 500
          }}
          onClick={close}
        >
          <CloseIcon
            style={{
              width: 35,
              height: 35,
              display: "block",
              borderRadius: "50%",
              border: "solid 2px rgba(0, 0, 0, 0.75)",
              marginBottom: "4px"
            }}
          />
          ESC
        </a>
      )}
      <Element
        elevation={3}
        style={{
          background: "white",
          zIndex: 999,
          ...(isMobile
            ? {
                width: "100%",
                position: "fixed",
                bottom: 0
              }
            : {
                width: "470px"
              })
        }}
      >
        {isMobile ? null : (
          <React.Fragment>
            <Element
              typography="title"
              whitespace={["ps2", "pv1"]}
              style={{ display: "flex", alignItems: "center" }}
            >
              {title}
            </Element>
            <Hr />
          </React.Fragment>
        )}
        {sidebarContent}
      </Element>
      {isMobile ? (
        <React.Fragment>
          <Element
            typography="title"
            elevation={4}
            style={{
              zIndex: 999,
              position: "sticky",
              top: 0,
              background: "white",
              display: "flex",
              alignItems: "center"
            }}
          >
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
            {title}
          </Element>
        </React.Fragment>
      ) : null}
      <Element
        root="main"
        whitespace={isMobile ? "ps3" : "p10"}
        style={{
          width: "100%",
          overflowX: "scroll",
          height: "100vh",
          paddingBottom: 100
        }}
      >
        {view}
      </Element>
    </Element>
  ) : null;

export default browserState(Wizard);
