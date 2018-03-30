import React, { Component } from "react";
import injectSheet from "react-jss";
import { Checkbox, Toggle } from "material-ui";
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
    padding: "0 120px 0 16px"
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

class Instances extends Component {
  state = {
    expandedView: false,
    showInstances: true,
    showVolumes: true,
    showLinks: true,
    showProjects: true
  };
  render() {
    const { classes } = this.props;
    const { expandedView } = this.state;
    return (
      <React.Fragment>
        <div className={classes.viewHeader}>
          <div className={classes.filters}>
            {expandedView ? (
              <React.Fragment>
                <Element className={classes.filtersLabel} typography="label">
                  Show:
                </Element>
                <Checkbox
                  checked={this.state.showInstances}
                  onCheck={() =>
                    this.setState({ showInstances: !this.state.showInstances })
                  }
                  style={styles.filter}
                  label="Instances"
                />
                <Checkbox
                  checked={this.state.showVolumes}
                  onCheck={() =>
                    this.setState({ showVolumes: !this.state.showVolumes })
                  }
                  style={styles.filter}
                  label="Volumes"
                />
                <Checkbox
                  checked={this.state.showProjects}
                  onCheck={() =>
                    this.setState({ showProjects: !this.state.showProjects })
                  }
                  style={styles.filter}
                  label="Projects"
                />
                <Checkbox
                  checked={this.state.showLinks}
                  onCheck={() =>
                    this.setState({ showLinks: !this.state.showLinks })
                  }
                  style={styles.filter}
                  label="Links"
                />
              </React.Fragment>
            ) : null}
          </div>
          <Toggle
            style={{ width: "160px" }}
            toggled={this.state.expandedView}
            onToggle={() => this.setState({ expandedView: !expandedView })}
            label="Expanded View"
          />
          <AssetsFAB />
        </div>
        <Element whitespace={["pv4", "ps13"]}>
          {!expandedView ? (
            <AllAssetList isSticky />
          ) : (
            <AllAssetsFlatList {...this.state} isSticky />
          )}
        </Element>
        <CommentLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285754476/comments" />
      </React.Fragment>
    );
  }
}

export default injectSheet(styles)(Instances);
