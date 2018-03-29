import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";
import { toggleInstanceForm } from "../actions/instanceActions";
import { toggleVolumeForm } from "../actions/volumeActions";
import { toggleLinkForm } from "../actions/linkActions";
import { toggleProjectForm } from "../actions/projectActions";
import FolderIcon from "material-ui/svg-icons/file/folder";
import {
  FloatingActionButton,
  FloatingActionButtonActions,
  FloatingActionButtonAction
} from "../cyverse-ui";
import { LinkIcon, VolumeIcon } from "../cyverse-ui/icons";
import InstanceIcon from "../icons/InstanceIcon";

const styles = {
  wrapper: {
    position: "absolute",
    right: "24px",
    top: "24px"
  }
};

class AssetsFAB extends Component {
  state = { isOpen: false };
  render() {
    const {
      classes,
      location,
      showInstanceForm,
      showLinkForm,
      showProjectForm,
      showVolumeForm
    } = this.props;
    return (
      <div className={classes.wrapper}>
        <FloatingActionButton
          secondary
          className={classes.FAB}
          isOpen={this.state.isOpen}
          onClick={() => {
            this.setState({
              isOpen: !this.state.isOpen
            });
          }}
        >
          <FloatingActionButtonActions>
            <FloatingActionButtonAction
              tooltip="Create Instance"
              children={<InstanceIcon />}
              onClick={() => showInstanceForm()}
            />
            <FloatingActionButtonAction
              tooltip="Create Volume"
              children={<VolumeIcon />}
              onClick={() => showVolumeForm()}
            />
            <FloatingActionButtonAction
              tooltip="Create Project"
              children={<FolderIcon />}
              onClick={() => showProjectForm()}
            />
            <FloatingActionButtonAction
              tooltip="Create Link"
              children={<LinkIcon />}
              onClick={() => showLinkForm()}
            />
          </FloatingActionButtonActions>
        </FloatingActionButton>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showInstanceForm: toggleInstanceForm,
      showVolumeForm: toggleVolumeForm,
      showLinkForm: toggleLinkForm,
      showProjectForm: toggleProjectForm
    },
    dispatch
  );
export default withRouter(
  connect(null, mapDispatchToProps)(injectSheet(styles)(AssetsFAB))
);
