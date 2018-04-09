import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { get } from "../utils";
import { Dialog, FlatButton } from "material-ui";
import { SelectField, MenuItem } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
import {
  changeInstance,
  submitAttachToInstance,
  toggleAttachToInstance,
  resetAttachToInstance,
  submitDetachFromInstance,
} from "../actions/volumeActions";
const styles = {
  TextField: {
    width: "100%",
    maxWidth: "500px"
  }
};
const AddImageToProjectDialog = ({
  showForm,
  hideForm,
  onChangeInstance,
  submitAttachToInstance,
  submitDetachFromInstance,
  resetAttachToInstance,
  goToInstances,
  instanceId,
  volume,
  instances,
}) => (
  <Dialog
    open={showForm}
    onRequestClose={() => {
      hideForm();
      resetAttachToInstance();
    }}
    title="Add Image Project"
    actions={[
      <FlatButton
        label="Cancel"
        onClick={() => {
          hideForm();
          resetAttachToInstance();
        }}
      />,
      <FlatButton
        primary
        label="Attach To Instance"
        onClick={() => {
          submitAttachToInstance(volume.id, instanceId );
          volume.instance
            ? submitDetachFromInstance(volume.id, volume.instance)
            : null
          resetAttachToInstance();
          goToInstances();
        }}
      />
    ]}
  >
    <InfoBlock text={<P>Text explaining volumes and instances.</P>} />
    <SelectField
      onChange={(e, i, value) => onChangeInstance(value)}
      value={instanceId}
      style={styles.TextField}
      floatingLabelText="Select Instance"
    >
    { instances.map( instance =>
      <MenuItem value={instance.id} primaryText={instance.name}/>
    )}
    </SelectField>
  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleAttachToInstance,
      onChangeInstance: changeInstance,
      submitAttachToInstance,
      submitDetachFromInstance,
      resetAttachToInstance,
      goToInstances: () => push(`/instances`)
    },
    dispatch
  );
const mapStateToProps = ({ volumeList: { data: volumes }, instanceList, attachToInstance: { showForm, data } }) => ({
  showForm,
  instanceId: data.instanceId,
  volume: get.byId(data.volumeId)(volumes),
  instances: instanceList.data
});
export default connect(mapStateToProps, mapDispatchToProps)(
  AddImageToProjectDialog
);
