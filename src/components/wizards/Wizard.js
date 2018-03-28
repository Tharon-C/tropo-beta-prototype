import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CircleCloseIcon from "material-ui/svg-icons/navigation/close";
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

const Wizard = ({ show, close, location, sidebarContent, view, title }) => (
  show ? (
    <Element
      root="section"
      style={{
        position: "fixed",
        display: "flex",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#EFEFEF",
        width: "100%",
        height: "100%",
        zIndex: 9999
      }}
    >
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
        onClick={() => {
          close();
        }}
      >
        <CircleCloseIcon
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
      <Element
        elevation={3}
        style={{
          background: "white",
          width: "470px"
        }}
      >
        <Element
          typography="title"
          whitespace={["ps2", "pv1"]}
          style={{ display: "flex", alignItems: "center" }}
        >
          {title}
        </Element>
        <Hr />
        {sidebarContent}
      </Element>
      <Element
        root="main"
        whitespace={["pt10", "ps10"]}
        style={{ width: "100%", overflowX: "scroll" }}
      >
        {view}
      </Element>
    </Element>
  ) : null
)

export default Wizard;
