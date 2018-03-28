import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeProperty } from "../../actions/instanceActions";
import {
  IconButton,
  RaisedButton,
  FlatButton,
  TextField,
  SelectField,
  MenuItem
} from "material-ui";
import { Element, Hr, MeterGauge, P } from "../../cyverse-ui";
import ProjectList from "../projects/ProjectList";
import ImageList from "../images/ImageList";

const CreateInstanceViews = ({
  stepIndex,
  name,
  provider,
  allocationSource,
  size,
  project,
  changeProvider,
  changeName,
  changeProject,
  changeSize,
  changeAllocationSource,
}) => {
  return (
    <React.Fragment>
      {stepIndex === 1 ? (
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
                value={name}
                style={{ width: "100%" }}
                floatingLabelText="Name"
                onChange={e => changeName(e.target.value)}
              />
              <TextField
                style={{ width: "100%" }}
                floatingLabelText="Project"
                value={project ? project.name : "Select Project"}
                onChange={e => changeProject(e.target.value)}
              />
            </Element>
            <Element style={{ width: "100%" }}>
              <Element typography="body2">Instance Resources</Element>
              <TextField
                style={{ width: "100%" }}
                floatingLabelText="Allocation Source"
                value={allocationSource}
                onChange={e => changeAllocationSource(e.target.value)}
              />

              <TextField
                value={provider}
                style={{ width: "100%" }}
                floatingLabelText="Provider"
              />
              <TextField
                value={size}
                style={{ width: "100%" }}
                floatingLabelText="Instance Size"
                onChange={e => changeSize(e.target.value)}
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
      {stepIndex === 0 ? <ImageList /> : null}
    </React.Fragment>
  );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeProvider: changeProperty("provider"),
      changeName: changeProperty("name"),
      changeProject: changeProperty("project"),
      changeSize: changeProperty('size'),
      changeAllocationSource: changeProperty('allocationSource'),
    },
    dispatch
  );
const mapStateToProps = ({ createInstance: { stepIndex, data } }) => ({
  stepIndex: stepIndex,
  name: data.name,
  project: data.project, 
  provider: data.provider,
  allocationSource: data.allocationSource,
  size: data.size
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateInstanceViews
);
