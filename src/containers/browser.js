import React from "react";
import { connect } from "react-redux";
import { isMobile } from "../selectors/browser"

const mapStateToprops = (state) => ({
    isMobile: isMobile(state)
})
export default connect(mapStateToprops, null);