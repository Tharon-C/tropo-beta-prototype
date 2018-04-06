import React from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { get } from "../utils";
import { Dialog, FlatButton } from "material-ui";
import { SelectField, MenuItem } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
import {
  changeMoveToProject,
  confirmMoveToProject,
  toggleMoveToProject,
  resetMoveToProject
} from "../actions/projectActions";
const styles = {
  TextField: {
    width: "100%",
    maxWidth: "500px"
  }
};
const AddImageToProjectDialog = ({
  showForm,
  hideForm,
  onChangeProject,
  addToProject,
  resetMoveToProject,
  confirmMoveToProject,
  goToProject,
  project,
  projects,
  assetType,
  submitData
}) => {
  const noProject = projects.length <= 0;

  return (
    <Dialog
      open={showForm}
      onRequestClose={() => {
        hideForm();
        resetMoveToProject();
      }}
      title="Move To Project"
      actions={[
        <FlatButton
          label="Cancel"
          onClick={() => {
            hideForm();
            resetMoveToProject();
          }}
        />,
        <FlatButton
          primary
          label="Move To Project"
          disabled={noProject}
          onClick={() => {
            confirmMoveToProject(submitData);
            resetMoveToProject();
            goToProject(project, assetType);
          }}
        />
      ]}
    >
      <InfoBlock text={<P>Text explaining Projects here.</P>} />
      {!noProject ? (
        <SelectField
          onChange={(e, i, value) => onChangeProject(value)}
          value={project}
          style={styles.TextField}
          floatingLabelText="Select Project"
        >
          {projects.map(project => (
            <MenuItem value={project.id} primaryText={project.name} />
          ))}
        </SelectField>
      ) : (
        <Element typography="body2">
          You do not have another project to move to.
        </Element>
      )}
    </Dialog>
  );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleMoveToProject(),
      onChangeProject: changeMoveToProject,
      confirmMoveToProject,
      resetMoveToProject,
      goToProject: (newProject, asset) =>
        push(`/projects/${newProject}/${asset}`)
    },
    dispatch
  );
const mapStateToProps = ({
  projectList,
  moveToProject: { showForm, assetType, data }
}) => {
  const projects = projectList.data.filter(i => i.id !== data.oldProject);
  const submitData = !data.newProject
    ? R.merge(data, {
        newProject: projects[0] ? projects[0].id : "" 
      })
    : data;
  return {
    showForm,
    assetType: data.assetType,
    project: submitData.newProject,
    projects,
    submitData
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  AddImageToProjectDialog
);
