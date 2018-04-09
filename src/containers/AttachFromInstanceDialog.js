import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { get } from "../utils";
import { Dialog, FlatButton } from "material-ui";
import { SelectField, MenuItem } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
import {
  changeVolume,
  submitAttachFromInstance,
  toggleAttachFromInstance,
  resetAttachFromInstance
} from "../actions/instanceActions";
const styles = {
  TextField: {
    width: "100%",
    maxWidth: "500px"
  }
};
const AttachFromInstanceDialog = ({
  showForm,
  hideForm,
  onChangeVolume,
  submitAttachFromInstance,
  resetAttachFromInstance,
  instanceId,
  volumeId,
  volumes
}) => (
  <Dialog
    open={showForm}
    onRequestClose={() => {
      hideForm();
      resetAttachFromInstance();
    }}
    title="Add Image Project"
    actions={[
      <FlatButton
        label="Cancel"
        onClick={() => {
          hideForm();
          resetAttachFromInstance();
        }}
      />,
      <FlatButton
        primary
        label="Attach To Instance"
        disabled={volumes.length < 1 || !volumeId}
        onClick={() => {
          submitAttachFromInstance(volumeId, instanceId);
          resetAttachFromInstance();
        }}
      />
    ]}
  >
    <InfoBlock text={<P>Text explaining volumes and instances.</P>} />
    {volumes.length > 0 ? (
      <SelectField
        onChange={(e, i, value) => onChangeVolume(value)}
        value={volumeId}
        style={styles.TextField}
        floatingLabelText="Select Volume"
      >
        {volumes.map(volume => (
          <MenuItem value={volume.id} primaryText={volume.name} />
        ))}
      </SelectField>
    ) : (
      <Element typography="body2"> There are no Volumes to attach </Element>
    )}
  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleAttachFromInstance,
      onChangeVolume: changeVolume,
      submitAttachFromInstance,
      resetAttachFromInstance
    },
    dispatch
  );
const mapStateToProps = ({
  volumeList: { data: volumes },
  instanceList,
  attachFromInstance: { showForm, data }
}) => ({
  showForm,
  instanceId: data.instanceId,
  volumeId: data.volumeId,
  volumes: volumes.filter(volume => volume.status === "Detached")
});
export default connect(mapStateToProps, mapDispatchToProps)(
  AttachFromInstanceDialog
);
