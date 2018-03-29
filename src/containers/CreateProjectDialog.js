import React from "react";
import { connect } from "react-redux";
import {push} from "react-router-redux";
import { bindActionCreators } from "redux";
import { Dialog, FlatButton } from "material-ui";
import {
  toggleProjectForm,
  changeProjectProperty,
  createProject,
  resetProject,
} from "../actions/projectActions";
import { TextField } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
const styles = {
  TextField: {
    display: "block",
    width: "100%",
    maxWidth: "500px"
  }
};
const CreateProjectDialog = ({
  showForm,
  hideForm,
  name,
  description,
  summary,
  onChangeName,
  onChangeDescription,
  onChangeSummary,
  onChangeSize,
  createProject,
  resetProject,
  goToProjects,
  project
}) => (
  <Dialog
    open={showForm}
    onRequestClose={() => {
      hideForm()
      resetProject()
    }}
    title="Create Project"
    actions={[
      <FlatButton label="Cancel" onClick={ () => {hideForm()
      resetProject()}}/>,
      <FlatButton primary label="Create Project" onClick={
        () => {
          createProject(project)
          resetProject()
          goToProjects()
        }
      }/>
    ]}
  >
    <InfoBlock text={<P>Text explaining Projects here.</P>} />
    <TextField
      onChange={e => onChangeName(e.target.value)}
      value={name}
      style={styles.TextField}
      floatingLabelText="Name"
    />
    <TextField
      onChange={e => onChangeSummary(e.target.value)}
      value={summary}
      style={styles.TextField}
      floatingLabelText="Summary"
    />
    <TextField
      onChange={e => onChangeDescription(e.target.value)}
      value={description}
      style={styles.TextField}
      floatingLabelText="Description"
    />
  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleProjectForm,
      onChangeDescription: changeProjectProperty("description"),
      onChangeName: changeProjectProperty("name"),
      onChangeSummary: changeProjectProperty("summary"),
      onChangeSize: changeProjectProperty("size"),
      createProject,
      resetProject,
      goToProjects: () => push("/projects")
    },
    dispatch
  );
const mapStateToProps = ({
  createProject: { showForm, data } 
}) => ({
  showForm,
  name: data.name,
  description: data.description,
  summary: data.summary,
  project: data,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectDialog);
