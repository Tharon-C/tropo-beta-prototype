import React from "react";
import { connect } from "react-redux";
import { isMobile, isLarge } from "../selectors/browser"

const mapStateToprops = (state) => ({
    isMobile: isMobile(state),
    isLarge: isLarge(state)
})
export default connect(mapStateToprops, null);