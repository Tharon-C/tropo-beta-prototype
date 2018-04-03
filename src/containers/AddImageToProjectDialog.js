import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { Dialog, FlatButton } from "material-ui";
import { TextField } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
import {
  changeImageProject,
  addToProject,
  toggleAddImageToProject,
  resetAddToProject
} from "../actions/imageActions";
const styles = {
  TextField: {
    display: "block",
    width: "100%",
    maxWidth: "500px"
  }
};
const AddImageToProjectDialog = ({
  showForm,
  hideForm,
  onChangeProject,
  addToProject,
  resetAddToProject,
  goToProjects,
  project,
  image
}) => (
  <Dialog
    open={showForm}
    onRequestClose={() => {
      hideForm();
      resetAddToProject();
    }}
    title="Add Image Project"
    actions={[
      <FlatButton
        label="Cancel"
        onClick={() => {
          hideForm();
          resetAddToProject();
        }}
      />,
      <FlatButton
        primary
        label="Create Project"
        onClick={() => {
          addToProject(image, project);
          resetAddToProject();
          goToProjects();
        }}
      />
    ]}
  >
    <InfoBlock text={<P>Text explaining Projects here.</P>} />
    <TextField
      onChange={e => onChangeProject(e.target.value)}
      value={project}
      style={styles.TextField}
      floatingLabelText="Select Project"
    />
  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleAddImageToProject,
      onChangeProject: changeImageProject,
      addToProject,
      resetAddToProject,
      goToProjects: () => push("/projects")
    },
    dispatch
  );
const mapStateToProps = ({ addToProject: { showForm, data } }) => ({
  showForm,
  image: data.image,
  project: data.project,
  image: data.image
});
export default connect(mapStateToProps, mapDispatchToProps)(
  AddImageToProjectDialog
);
