import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { Dialog, FlatButton } from "material-ui";
import { SelectField, MenuItem } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
import {
  changeImageProject,
  addToProject,
  toggleAddImageToProject,
  resetAddToProject
} from "../actions/imageActions";
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
  resetAddToProject,
  goToProject,
  project,
  projects,
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
          addToProject(image, project );
          resetAddToProject();
          goToProject(project);
        }}
      />
    ]}
  >
    <InfoBlock text={<P>Text explaining Projects here.</P>} />
    <SelectField
      onChange={(e, i, value) => onChangeProject(value)}
      value={project}
      style={styles.TextField}
      floatingLabelText="Select Project"
    >
    { projects.map( project =>
      <MenuItem value={project.id} primaryText={project.name}/>
    )}
    </SelectField>
  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleAddImageToProject,
      onChangeProject: changeImageProject,
      addToProject,
      resetAddToProject,
      goToProject: project => push(`${process.env.PUBLIC_URL}/projects/${project}/images`)
    },
    dispatch
  );
const mapStateToProps = ({ projectList, addToProject: { showForm, data } }) => ({
  showForm,
  image: data.image,
  project: data.project,
  image: data.image,
  projects: projectList.data
});
export default connect(mapStateToProps, mapDispatchToProps)(
  AddImageToProjectDialog
);
