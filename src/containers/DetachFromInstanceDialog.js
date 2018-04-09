import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { get } from "../utils";
import { Dialog, FlatButton } from "material-ui";
import { SelectField, MenuItem } from "material-ui";
import { Element, InfoBlock, P } from "../cyverse-ui";
import {
  toggleDetachFromInstance,
  resetDetachFromInstance,
  submitDetachFromInstance,
} from "../actions/volumeActions";

const AddImageToProjectDialog = ({
  showForm,
  hideForm,
  submitDetachFromInstance,
  resetDetachFromInstance,
  instanceId,
  volume,
}) => (
  <Dialog
    open={showForm}
    onRequestClose={() => {
      hideForm();
      resetDetachFromInstance();
    }}
    title="Detach From Instance"
    actions={[
      <FlatButton
        label="Cancel"
        onClick={() => {
          hideForm();
          resetDetachFromInstance();
        }}
      />,
      <FlatButton
        primary
        label="Detach from Instance"
        onClick={() => {
          submitDetachFromInstance(volume.id, instanceId );
          resetDetachFromInstance();
        }}
      />
    ]}
  >
    <InfoBlock text={<P>Detach from Instance? Warn user about detaching here.</P>} />
  </Dialog>
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideForm: toggleDetachFromInstance,
      submitDetachFromInstance,
      resetDetachFromInstance,
    },
    dispatch
  );
const mapStateToProps = ({ volumeList: { data: volumes }, instanceList, detachFromInstance: { showForm, data } }) => ({
  showForm,
  instanceId: data.instanceId,
  volume: get.byId(data.volumeId)(volumes),
});
export default connect(mapStateToProps, mapDispatchToProps)(
  AddImageToProjectDialog
);
