import React from "react";
import PropTypes from "prop-types";
import injectSheet, { withTheme } from "react-jss";

import { IconButton } from "material-ui";
import SearchIcon from "material-ui/svg-icons/action/search";
import CloseIcon from "material-ui/svg-icons/navigation/close";

const styles = () => ({
  wrapper: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    height: "40px",
    background: "rgba(255,255,255,.1)",
    position: "relative",
    transition: "box-shadow 350ms ease",
    padding: "0 16px",
    borderRadius: "3px"
  },
  Input: {
    flex: "1 1 100%",
    border: "none",
    boxShadow: "none",
    color: "white",
    background: "none",
    outline: "none",
    fontSize: "16px",
    "&::placeholder": {
      color: "white"
    }
  },
  Icon: {
    marginRight: "16px",
    opacity: 1 
  },
})
/**
 * The SearchBar is used for searches. It has an active state that helps to inform the user a search is affecting the list in question. An optional onClear prop allows the query to be cleared when the user presses the clear button.
 */
class SearchBar extends React.Component {
  static displayName = "SearchBar";

  static propTypes = {
    /**
     * The current value or query.
     */
    value: PropTypes.string,
    /**
     * The placeholder or hint text.
     */
    placeholder: PropTypes.string,
    /**
     * Callback when a change is made.
     */
    onChange: PropTypes.func,
    /**
     * Callback when clear button is pressed. Note, no clear button renders if not set.
     */
    onClear: PropTypes.func
  };

  static defaultProps = {
    placeholder: "Search"
  };

  render() {
    const { value, placeholder, onChange, onClear, classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <SearchIcon className={classes.Icon} color="white" />
        <input
          className={classes.Input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={this.onFocus}
        />
      </div>
    );
  }
}

export default withTheme(injectSheet(styles)(SearchBar));
