import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  setStep,
  createInstance,
  resetInstance,
  toggleInstanceForm
} from "../../actions/instanceActions";

import { IconButton, RaisedButton, FlatButton, TextField } from "material-ui";
import {
  stepper,
  Step,
  Stepper,
  StepButton,
  StepContent
} from "material-ui/Stepper";
import { Element, Hr, MeterGauge, P } from "../../cyverse-ui";

import LeftArrowIcon from "material-ui/svg-icons/navigation/arrow-back";
import RightArrowIcon from "material-ui/svg-icons/navigation/arrow-forward";
import SettingsIcon from "material-ui/svg-icons/action/settings";

const StepActions = ({ stepIndex, onNext, onPrev }) => {
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
        disabled={stepIndex === 0}
        onClick={onPrev}
      />
      <FlatButton
        label="Next"
        labelPosition="before"
        disabled={stepIndex === 1}
        icon={<RightArrowIcon />}
        onClick={onNext}
      />
    </div>
  );
};

const CreateInstanceSidebar = ({
  setStepIndex,
  stepIndex,
  project,
  selectedImage,
  newInstance,
  createInstance,
  resetInstance,
  toggleInstanceForm,
  goToInstances,
  goToProject
}) => {
  return (
    <React.Fragment>
      <Stepper activeStep={stepIndex} orientation="vertical">
        <Step>
          <StepButton onClick={() => setStepIndex(0)}>
            Select an Image
          </StepButton>
          <StepContent>
            {selectedImage ? (
              <P>
                You have currently selected "{selectedImage.name}". The Instance
                you launch will be based on this Image. Images are snapshots of
                an Instance at a point in time. Lanching an Image will create an
                Instance of that snapshot for you to use.
              </P>
            ) : (
              <P>Select an Image to base your Instance on</P>
            )}
          </StepContent>
        </Step>
        <Step>
          <StepButton onClick={() => setStepIndex(1)}>
            Review Instance Info
          </StepButton>
          <StepContent>
            <P>
              We have prefilled defaults for you. Edit any field by clicking on
              it. If you move on to Advanced options your changes will persist.
              You will have a chance to review again before launching.
            </P>
          </StepContent>
        </Step>
      </Stepper>
      {
        <StepActions
          stepIndex={stepIndex}
          onNext={() => (stepIndex === 0 ? setStepIndex(1) : null)}
          onPrev={() => (stepIndex === 1 ? setStepIndex(0) : null)}
        />
      }
      <Element hide={stepIndex !== 1} whitespace={["ps2", "mt8"]}>
        <RaisedButton
          primary
          style={{ width: "100%", marginBottom: "16px" }}
          label="Launch Instance"
          onClick={() => {
            createInstance(newInstance);
            resetInstance();
            console.log(newInstance.project);
            !newInstance.project
              ? goToInstances()
              : goToProject(newInstance.project.id);
          }}
        />
        <FlatButton
          icon={<SettingsIcon />}
          style={{ width: "100%" }}
          label="Advanced Options"
        />
      </Element>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setStepIndex: setStep,
      createInstance,
      resetInstance,
      toggleInstanceForm,
      goToInstances: () => push("/instances"),
      goToProject: project => push(`/projects/${project}/instances`)
    },
    dispatch
  );
const mapStateToProps = ({
  createInstance: {
    showForm,
    stepIndex,
    selectedImage,
    project,
    data: newInstance
  }
}) => ({
  showForm,
  stepIndex,
  selectedImage,
  project,
  newInstance
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateInstanceSidebar
);
