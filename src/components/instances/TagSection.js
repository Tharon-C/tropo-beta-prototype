import React, { Component } from "react";
import injectSheet, { withTheme } from "react-jss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "ramda";
import tagList from "../../TAG_DATA";
import { get } from "../../utils";
import {
  removeTagFromInstance,
  setNewTagsOnInstance
} from "../../actions/instanceActions";
import PlusIcon from "material-ui/svg-icons/content/add-circle";
import { IconButton } from "material-ui";

import { Element } from "../../cyverse-ui";
import AddTagForm from "../AddTagForm";

import Tag from "../Tag";
const styles = {
  tagList: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    marginLeft: "-4px"
  },
  addButtonWrapper: {
    display: "flex",
    alignItems: "center",
    height: "28px"
  }
};

class TagSection extends Component {
  state = {
    manageTags: false
  };
  onRemoveTag = (e, tagId) => {
    const {
      instance: { id },
      removeTag
    } = this.props;
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
    removeTag(id, tagId);
  };
  onManageTags = e => {
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
    this.setState({ manageTags: true });
  };
  render() {
    const {
      classes,
      theme,
      removeTag,
      instance,
      currentTags,
      editTags
    } = this.props;
    const { tags, id } = instance;
    const { manageTags } = this.state;
    return (
      <React.Fragment>
        <Element typography="label" whitespace="mb1">
          Tags
        </Element>
        {manageTags ? (
          <AddTagForm
            currentTags={tags}
            onSubmit={newTags => editTags(instance.id, newTags)}
            onClose={() => this.setState({ manageTags: false })}
          />
        ) : (
          <Element className={classes.tagList}>
            {tags.length > 0 ? (
              tags.map(({ id: tagId }) => {
                return (
                  <Tag
                    onRemove={e => this.onRemoveTag(e, tagId)}
                    label={get.byId(tagId)(tagList).name}
                  />
                );
              })
            ) : (
              <div style={{ marginLeft: "8px" }}>Add Tags</div>
            )}
            <div className={classes.addButtonWrapper}>
              <IconButton tooltip="Add Tag">
                <PlusIcon
                  onClick={this.onManageTags}
                  color={theme.palette.primary1Color}
                />
              </IconButton>
            </div>
          </Element>
        )}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeTag: removeTagFromInstance,
      editTags: setNewTagsOnInstance
    },
    dispatch
  );

export default compose(
  connect(null, mapDispatchToProps),
  withTheme,
  injectSheet(styles)
)(TagSection);
