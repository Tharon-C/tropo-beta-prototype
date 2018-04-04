import React from "react";
import { connect } from "react-redux";
import {push} from "react-router-redux";
import { bindActionCreators } from "redux";
import { Dialog, FlatButton } from "material-ui";
import {
  toggleVolumeForm,
  changeVolumeProperty,
  createVolume,
  resetVolume,
} from "../actions/volumeActions";
import { TextField } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
const styles = {
  TextField: {
    display: "block",
    width: "100%",
    maxWidth: "500px"
  }
};
const CreateVolumeDialog = ({
  showForm,
  hideForm,
  name,
  description,
  summary,
  size,
  onChangeName,
  onChangeDescription,
  onChangeSummary,
  onChangeSize,
  createVolume,
  resetVolume,
  goToVolumes,
  goToProject,
  volume
}) => (
  <Dialog
    open={showForm}
    onRequestClose={() => {
      hideForm()
      resetVolume()
    }}
    title="Create Volume"
    actions={[
      <FlatButton label="Cancel" onClick={ () => {hideForm()
      resetVolume()}}/>,
      <FlatButton primary label="Create Volume" onClick={
        () => {
          createVolume(volume)
          resetVolume()
          !volume.project ? goToVolumes() : goToProject(volume.project)
        }
      }/>
    ]}
  >
    <InfoBlock text={<P>Text explaining Volumes here</P>} />
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
      multiLine={true}
      rowsMax={4}
      floatingLabelText="Description"
    />
    <TextField
      onChange={e => onChangeSize(e.target.value)}
      style={styles.TextField}
      type="number"
      value={size}
      floatingLabelText="Size (in GB)"
    />
  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleVolumeForm,
      onChangeDescription: changeVolumeProperty("description"),
      onChangeName: changeVolumeProperty("name"),
      onChangeSummary: changeVolumeProperty("summary"),
      onChangeSize: changeVolumeProperty("size"),
      createVolume,
      resetVolume,
      goToVolumes: () => push("/volumes"),
      goToProject: project => push(`/projects/${project}/volumes`) 
    },
    dispatch
  );
const mapStateToProps = ({
  createVolume: { showForm, data } 
}) => ({
  showForm,
  name: data.name,
  size: data.size,
  description: data.description,
  summary: data.summary,
  volume: data,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateVolumeDialog);
