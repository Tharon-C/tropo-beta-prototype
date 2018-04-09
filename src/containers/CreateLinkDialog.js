import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { Dialog, FlatButton } from "material-ui";
import {
  toggleLinkForm,
  changeLinkProperty,
  createLink,
  resetLink
} from "../actions/linkActions";
import { TextField, MenuItem, SelectField } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
const styles = {
  TextField: {
    display: "block",
    width: "100%",
    maxWidth: "500px"
  }
};
const CreateLinkDialog = ({
  showForm,
  hideForm,
  name,
  description,
  summary,
  url,
  project,
  projects,
  onChangeName,
  onChangeDescription,
  onChangeSummary,
  onChangeURL,
  onChangeProject,
  createLink,
  resetLink,
  goToLinks,
  gotToProject,
  link
}) => (
  <Dialog
    open={showForm}
    onRequestClose={() => {
      hideForm();
      resetLink();
    }}
    title="Create Link"
    actions={[
      <FlatButton
        label="Cancel"
        onClick={() => {
          hideForm();
          resetLink();
        }}
      />,
      <FlatButton
        primary
        label="Create Link"
        onClick={() => {
          createLink(link);
          resetLink();
          !link.project ? goToLinks() : gotToProject(link.project);
        }}
      />
    ]}
  >
    <InfoBlock text={<P>Text explaining links here</P>} />
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
      multiLine={true}
      rowsMax={4}
    />
    <TextField
      onChange={e => onChangeURL(e.target.value)}
      value={url}
      style={styles.TextField}
      floatingLabelText="URL"
    />
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

  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleLinkForm,
      onChangeDescription: changeLinkProperty("description"),
      onChangeName: changeLinkProperty("name"),
      onChangeSummary: changeLinkProperty("summary"),
      onChangeURL: changeLinkProperty("url"),
      onChangeProject: changeLinkProperty("project"),
      createLink,
      resetLink,
      goToLinks: () => push(`${process.env.PUBLIC_URL}/all-assets`),
      gotToProject: project => push(`${process.env.PUBLIC_URL}/projects/${project}/links`)
    },
    dispatch
  );
const mapStateToProps = ({ projectList, createLink: { showForm, data } }) => ({
  showForm,
  name: data.name,
  url: data.url,
  description: data.description,
  summary: data.summary,
  link: data,
  project: data.project,
  projects: projectList.data,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateLinkDialog);
