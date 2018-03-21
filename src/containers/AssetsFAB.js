import React, {Component} from "react";import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import injectSheet from "react-jss";
import FolderIcon from "material-ui/svg-icons/file/folder";
import {
  FloatingActionButton,
  FloatingActionButtonActions,
  FloatingActionButtonAction,
} from "../cyverse-ui";
import { LinkIcon, VolumeIcon } from "../cyverse-ui/icons";
import InstanceIcon from "../icons/InstanceIcon";

const styles = {
    wrapper: {
        position: "absolute",
        right: "24px",
        top: "24px"
      },
}

class AssetsFAB extends Component {
    state = {isOpen: false}
    render() {
        const {classes, location, pushInstanceLaunch} = this.props;
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
                onClick={() => {pushInstanceLaunch(location.pathname)}}
              />
              <FloatingActionButtonAction
                tooltip="Create Volume"
                children={<VolumeIcon />}
              />
              <FloatingActionButtonAction
                tooltip="Create Project"
                children={<FolderIcon />}
              />
              <FloatingActionButtonAction
                tooltip="Create Link"
                children={<LinkIcon />}
              />
            </FloatingActionButtonActions>
          </FloatingActionButton>
          </div>
        )
    }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      pushInstanceLaunch: (current) => push(current + "/instance-launch"),
    },
    dispatch
  );
export default withRouter(connect(null, mapDispatchToProps)(injectSheet(styles)(AssetsFAB)));