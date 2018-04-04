import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeProperty } from "../../actions/instanceActions";
import { get } from "../../utils";
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

class CreateInstanceViews extends Component {
  selectImage = image => {
    const { changeImage, changeName } = this.props;
    changeImage(image.id);
    changeName(image.name);
  };
  render() {
    const {
      stepIndex,
      name,
      provider,
      allocationSource,
      size,
      project,
      projects,
      changeProvider,
      changeName,
      changeProject,
      changeSize,
      changeImage,
      image,
      changeAllocationSource
    } = this.props;
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
                <SelectField
                  style={{ width: "100%" }}
                  floatingLabelText="Project"
                  value={project ? project.id : "Select Project"}
                  onChange={(e, index, value) => changeProject(value)}
                >
                  <MenuItem
                    primaryText="Select Project"
                    value="Select Project"
                  />
                  {projects.map(project => (
                    <MenuItem primaryText={project.name} value={project.id} />
                  ))}
                </SelectField>
              </Element>
              <Element style={{ width: "100%" }}>
                <Element typography="body2">Instance Resources</Element>
                <SelectField
                  style={{ width: "100%" }}
                  floatingLabelText="Allocation Source"
                  value="1"
                >
                  <MenuItem primaryText="Monthly Allocation" value="1" />
                  <MenuItem primaryText="XSEDE" value="2" />
                </SelectField>

                <SelectField
                  style={{ width: "100%" }}
                  floatingLabelText="Provider"
                  value="1"
                >
                  <MenuItem primaryText="Cyverse Marana Cloud" value="1" />
                  <MenuItem primaryText="Cyverse Workshop Cloud" value="2" />
                </SelectField>

                <SelectField
                  style={{ width: "100%" }}
                  floatingLabelText="Instance Size"
                  value="1"
                >
                  <MenuItem
                    primaryText="tiny1 (CPU: 1, Mem: 4 GB, Disk: 30 GB)"
                    value="1"
                  />
                  <MenuItem
                    primaryText="tiny2 (CPU: 1, Mem: 8 GB, Disk: 60 GB)"
                    value="2"
                  />
                  <MenuItem
                    primaryText="small1 (CPU: 2, Mem: 8 GB, Disk: 60 GB)"
                    value="3"
                  />
                  <MenuItem
                    primaryText="small2 (CPU: 2, Mem: 16 GB, Disk: 120 GB)"
                    value="4"
                  />
                  <MenuItem
                    primaryText="medium1 (CPU: 4, Mem: 8 GB, Disk: 80 GB)"
                    value="5"
                  />
                  <MenuItem
                    primaryText="medium2 (CPU: 4, Mem: 16 GB, Disk: 160 GB)"
                    value="6"
                  />
                  <MenuItem
                    primaryText="medium3 (CPU: 4, Mem: 32 GB, Disk: 240 GB)"
                    value="7"
                  />
                </SelectField>
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
          <ImageList
            onImageClick={this.selectImage}
            selectMode={true}
            selected={image}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeProvider: changeProperty("provider"),
      changeName: changeProperty("name"),
      changeProject: changeProperty("project"),
      changeSize: changeProperty("size"),
      changeAllocationSource: changeProperty("allocationSource"),
      changeImage: changeProperty("image")
    },
    dispatch
  );
const mapStateToProps = ({
  projectList,
  createInstance: { stepIndex, data }
}) => ({
  stepIndex: stepIndex,
  name: data.name,
  project: get.byId(data.project)(projectList.data),
  projects: projectList.data,
  image: data.image,
  provider: data.provider,
  allocationSource: data.allocationSource,
  size: data.size
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateInstanceViews
);
