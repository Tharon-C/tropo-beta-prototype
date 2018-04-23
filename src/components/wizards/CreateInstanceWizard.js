import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobile } from "../../selectors/browser";
import Wizard from "./Wizard";
import CreatInstanceSidebar from "./CreateInstanceSidebar";
import CreatInstanceViews from "./CreateInstanceViews";
import { toggleInstanceForm } from "../../actions/instanceActions";
import CreateInstanceSidebarCompact from "./CreateInstanceSidebarCompact";

class CreateInstanceWizard extends Component {
  render() {
    const { show, closeWizard, location, isMobile } = this.props;
    return (
      <Wizard
        title="Instance Launch"
        show={show}
        close={closeWizard}
        sidebarContent={
          isMobile ? <CreateInstanceSidebarCompact /> : <CreatInstanceSidebar />
        }
        view={<CreatInstanceViews />}
      />
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeWizard: toggleInstanceForm //current => push(backOutURL(current))
    },
    dispatch
  );

const mapStateToProps = state => ({
  show: state.createInstance.showForm,
  isMobile: isMobile(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateInstanceWizard
);
