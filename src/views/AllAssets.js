import React, { Component } from "react";
import injectSheet from "react-jss";
import browserState from "../containers/browser";
import {
  Checkbox,
  Toggle,
  SelectField,
  MenuItem,
  IconButton,
  IconMenu
} from "material-ui";
import FilterIcon from "material-ui/svg-icons/content/filter-list";
import { FloatingActionButton, Element } from "../cyverse-ui";
import AssetsFAB from "../containers/AssetsFAB";
import AllAssetList from "../components/allAssets/AllAssetsList";
import AllAssetsFlatList from "../components/allAssets/AllAssetsFlatList";
import CommentLink from "../components/CommentsLink";

const styles = {
  viewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    position: "sticky",
    top: 0,
    boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
    height: "48px",
    zIndex: "900",
    padding: "0 16px"
  },
  filters: {
    display: "flex",
    alignItems: "center"
  },
  filtersLabel: {
    margin: "0 16px 0 0"
  },
  filter: {
    width: "150px"
  }
};

const assets = ["Instances", "Projects", "Volumes", "Links"];
class Instances extends Component {
  state = {
    values: assets,
  };

  handleChange = (event, values) => {
    this.setState({ values });
  };

  render() {
    const { classes, isMobile, isLarge } = this.props;
    const { expandedView, values } = this.state;
    return (
      <React.Fragment>
        <div className={classes.viewHeader}>
          <div className={classes.filters}>
            {expandedView ? (
              <React.Fragment>
                <Element typography="label">Filter List:</Element>
                <IconMenu
                  iconButtonElement={
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                  }
                  value={values}
                  onChange={this.handleChange}
                  multiple={true}
                  clickCloseDelay={0}
                >
                  {assets.map(asset => (
                    <MenuItem
                      checked={values.includes(asset)}
                      value={asset}
                      primaryText={asset}
                    />
                  ))}
                </IconMenu>
              </React.Fragment>
            ) : null}
          </div>
          <Toggle
            style={{ width: "160px", marginRight: !isMobile ? 130 : 0 }}
            toggled={this.state.expandedView}
            onToggle={() => this.setState({ expandedView: !expandedView })}
            label="Expanded View"
          />
          <AssetsFAB isMobile={isMobile} />
        </div>
        <Element whitespace={isMobile ? "ps2" : ["pv4", "ps13"]}>
          {!expandedView ? (
            <AllAssetList isCompact={isMobile} isSticky />
          ) : (
            <AllAssetsFlatList {...this.state} isCompact={isMobile} isSticky />
          )}
        </Element>
        <CommentLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285754476/comments" />
      </React.Fragment>
    );
  }
}

export default browserState(injectSheet(styles)(Instances));
