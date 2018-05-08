import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { get } from "../../utils";
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

const StepActions = ({ stepIndex, onNext, onPrev, selectedImage }) => {
  return (
    <div
      style={{
        margin: "8px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <FlatButton
        label="Back"
        icon={<LeftArrowIcon />}
        disabled={stepIndex === 0}
        onClick={onPrev}
      />
      <Element typography="body2">
      {stepIndex !== 0
        ? "Basic Settings"
        : selectedImage
          ? `${selectedImage.name} Selected`
          : "Select an Image"}
      </Element>
      <FlatButton
        label="Next"
        labelPosition="before"
        disabled={stepIndex === 1 || !selectedImage}
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
  newInstance,
  selectedImage,
  createInstance,
  resetInstance,
  toggleInstanceForm,
  goToInstances,
  goToProject
}) => {
  return (
    <React.Fragment>
      <StepActions
        stepIndex={stepIndex}
        selectedImage={selectedImage}
        onNext={() => (stepIndex === 0 ? setStepIndex(1) : null)}
        onPrev={() => (stepIndex === 1 ? setStepIndex(0) : null)}
      />
      <Hr />
      <Element
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        }}
        hide={stepIndex !== 1}
        whitespace={["ps2", "mv1"]}
      >
        <FlatButton
          icon={<SettingsIcon />}
          style={{ width: "40%" }}
          label="Advanced"
        />
        <RaisedButton
          primary
          style={{ width: "40%" }}
          label="Launch"
          onClick={() => {
            createInstance(newInstance);
            resetInstance();
            !newInstance.project
              ? goToInstances()
              : goToProject(newInstance.project);
          }}
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
      goToInstances: () => push(`${process.env.PUBLIC_URL}/instances`),
      goToProject: project =>
        push(`${process.env.PUBLIC_URL}/projects/${project}/instances`)
    },
    dispatch
  );
const mapStateToProps = ({
  imageList,
  createInstance: { showForm, stepIndex, project, data: newInstance }
}) => ({
  showForm,
  stepIndex,
  project,
  newInstance,
  selectedImage: newInstance.image
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateInstanceSidebar
);
