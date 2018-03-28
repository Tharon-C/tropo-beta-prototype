import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Wizard from "./Wizard";
import CreatInstanceSidebar from "./CreateInstanceSidebar";
import CreatInstanceViews from "./CreateInstanceViews";
import { toggleInstanceForm } from "../../actions/instanceActions";

class CreateInstanceWizard extends Component {
  render() {
    const { show, closeWizard, location } = this.props;
    return (
        <Wizard
            title="Instance Launch"
            show={show}
            close={closeWizard}
            sidebarContent={<CreatInstanceSidebar/>}
            view={<CreatInstanceViews/>}
        />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeWizard: toggleInstanceForm//current => push(backOutURL(current))
    },
    dispatch
  );

  const mapStateToProps = state => ({
    show: state.createInstance.showForm
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(CreateInstanceWizard);