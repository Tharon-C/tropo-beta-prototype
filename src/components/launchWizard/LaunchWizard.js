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
import ProjectSelectableList from "../projects/ProjectSelectableList";
import ImageList from "../images/ImageList";
import { toggleInstanceForm } from "../../actions/instanceActions";

class LaunchWizard extends Component {
  state = {
    stepIndex: 0
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    return (
      <div
        style={{
          margin: "24px 0",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <FlatButton
          label="Back"
          icon={<LeftArrowIcon />}
          disabled={step === 0}
          onClick={this.handlePrev}
        />
        <FlatButton
          label="Next"
          labelPosition="before"
          disabled={step === 2}
          icon={<RightArrowIcon />}
          onClick={this.handleNext}
        />
      </div>
    );
  }
  render() {
    const { showForm, leaveWizard, location } = this.props;
    const { stepIndex } = this.state;
    console.log(showForm);
    return showForm ? 
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
            leaveWizard(location.pathname);
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
            Instance Launch Wizard
          </Element>
          <Hr />
          <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                Select a Project
              </StepButton>
              <StepContent>
                <P>
                  This is an optional step. Projects help organize Resources
                  into logical groupings and allow for sharing. If you want your
                  instance to be launched in a project, select a project from
                  the list or create a new one.
                </P>
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                Select an Image
              </StepButton>
              <StepContent>
                <P>
                  You have currently selected "Ubuntu no GUI". The Instance you
                  launch will be based on this Image. Images are snapshots of an
                  Instance at a point in time. Lanching an Image will create an
                  Instance of that snapshot for you to use.
                </P>
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                Review Instance Info
              </StepButton>
              <StepContent>
                <P>
                  We have prefilled defaults for you. Edit any field by clicking
                  on it. If you move on to Advanced options your changes will
                  persist. You will have a chance to review again before
                  launching.
                </P>
              </StepContent>
            </Step>
          </Stepper>
          {this.renderStepActions(stepIndex)}
          <Element hide={stepIndex !== 2} whitespace={["ps2", "mt8"]}>
            <RaisedButton
              primary
              style={{ width: "100%", marginBottom: "16px" }}
              label="Launch Instance"
            />
            <FlatButton
              icon={<SettingsIcon />}
              style={{ width: "100%" }}
              label="Advanced Options"
            />
          </Element>
        </Element>
        <Element
          root="main"
          whitespace={["pt10", "ps10"]}
          style={{ width: "100%", overflowX: "scroll" }}
        >
          {stepIndex === 2 ? (
            <Element
              whitespace="p3"
              style={{
                background: "white",
                width: "100%",
                maxWidth: "900px",
                margin: "auto"
              }}
              elevation={2}
            >
              <Element whitespace="mb3" style={{ display: "flex" }}>
                <Element whitespace="pr4" style={{ width: "100%" }}>
                  <Element typography="body2">Basic Information</Element>
                  <TextField
                    value={"Ubuntu 16, no-gui Base"}
                    style={{ width: "100%" }}
                    floatingLabelText="Name"
                  />
                  <TextField
                    value="1"
                    floatingLabelText="Number of Instances"
                  />
                </Element>
                <Element style={{ width: "100%" }}>
                  <Element typography="body2">Instance Resources</Element>
                  <TextField
                    value="Tharon"
                    style={{ width: "100%" }}
                    floatingLabelText="Allocation Source"
                  />
                  <TextField
                    value="CyVerse Marana Cloud"
                    style={{ width: "100%" }}
                    floatingLabelText="Provider"
                  />
                  <TextField
                    value="sm1 (1 CPU, 4GB Memory)"
                    style={{ width: "100%" }}
                    floatingLabelText="Instance Size"
                  />
                </Element>
              </Element>
              <Element whitespace="mb3" typography="body2">
                Resource Consumption
              </Element>
              <MeterGauge
                whitespace="mb3"
                label="Allocation"
                data={`Have used 35 of 120 AU’s from this Allocation Source`}
                startValue={10}
                afterValue={20}
                alertMessage="Hey, let's not get greedy"
              />
              <MeterGauge
                whitespace="mb3"
                label="CPU"
                data={`Will use 8 of 208 alloted CPUs`}
                startValue={4}
                afterValue={2}
                alertMessage="Hey, let's not get greedy"
              />
              <MeterGauge
                whitespace="mb3"
                label="Memory"
                data={`Will use 4GB of 16GB alloted Memory`}
                startValue={7}
                afterValue={2}
                alertMessage="Hey, let's not get greedy"
              />
            </Element>
          ) : null}
          {stepIndex === 0 ? (
            <ProjectSelectableList  showHeader={false} range={[3, 10]} />
          ) : null}
          {stepIndex === 1 ? <ImageList /> : null}
        </Element>
      </Element>
    : null;
}
}
function backOutURL(the_url) {
  const the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      leaveWizard: toggleInstanceForm//current => push(backOutURL(current))
    },
    dispatch
  );

  const mapStateToProps = state => ({
    showForm: state.createInstance.showForm
  })
  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LaunchWizard));
