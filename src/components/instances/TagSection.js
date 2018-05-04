import React from "react";
import injectSheet, { withTheme } from "react-jss";
import { connect} from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "ramda";
import tagList from "../../TAG_DATA";
import { get } from "../../utils";
import { removeTagFromInstance } from "../../actions/instanceActions";
import PlusIcon from "material-ui/svg-icons/content/add-circle";
import { IconButton } from "material-ui";

import {Element } from "../../cyverse-ui";
import Tag from "../Tag";
const styles = ({

})
const TagSection = ({classes, theme, removeTag, instance}) => {
    const { tags, id } = instance;
    return (
    <React.Fragment>
    <Element typography="label" whitespace="mb1">
    Tags
  </Element>
  <Element
    style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      marginLeft: "-4px"
    }}
  >
    { tags.length > 0 ? tags.map(({ id: tagId }) => {
      return <Tag onRemove={() => removeTag(id, tagId)} label={get.byId(tagId)(tagList).name} />;
    }): <div style={{marginLeft: "8px"}}>Add Tags</div>}
    <IconButton tooltip="Add Tag">
      <PlusIcon color={theme.palette.primary1Color} />
    </IconButton>
  </Element>
  </React.Fragment>
)};
const mapDispatchToProps = dispatch => bindActionCreators({
    removeTag: removeTagFromInstance,
  }, dispatch);
  
export default compose(connect(null, mapDispatchToProps), withTheme, injectSheet(styles))(TagSection);