import React, { Component } from "react";
import injectSheet, { withTheme } from "react-jss";
import { compose } from "ramda";
import { get } from "../utils";
import Downshift from "downshift";
import { FlatButton, TextField, ListItem, List, Popover } from "material-ui";
import { Element } from "../cyverse-ui";
import Tag from "./Tag";
import tagList from "../TAG_DATA";
import IconButton from "material-ui/IconButton/IconButton";
import AddIcon from "material-ui/svg-icons/content/add-circle";

const styles = theme => ({});
class ManageTagsForm extends Component {
  state = {
    newTagList: this.props.currentTags,
    openList: false
  };
  onAdd = tag => {
    const newTagList = [...this.state.newTagList, { id: tag }];
    this.setState({
      newTagList,
      openList: false
    });
  };
  onRemove = tag => {
    console.log(tag);
    const newTagList = [...this.state.newTagList.filter(i => i.id !== tag.id)];
    this.setState({
      newTagList
    });
  };
  onSubmit = () => {
    this.props.onSubmit(this.state.newTagList);
    this.props.onClose();
  };
  setEl = e => {
    e.preventDefault();
    this.setState({ anchorEl: e.currentTarget });
  };
  render() {
    const { onClose, theme } = this.props;
    const { newTagList } = this.state;
    return (
      <Element
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Downshift itemToString={i => i.name}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex,
            clearSelection
          }) => (
            <div onClick={this.setEl}>
              <Element style={{ display: "flex" }}>
                <TextField
                  style={{ width: "100%" }}
                  {...getInputProps({
                    placeholder: "Enter a Tag name"
                  })}
                  onFocus={() => this.setState({ openList: true })}
                  onBlur={() => this.setState({ openList: false })}
                />
                <IconButton
                  disabled={!selectedItem}
                  onClick={() => {
                    this.onAdd(selectedItem.id);
                    clearSelection();
                  }}
                >
                  <AddIcon
                    color={selectedItem ? theme.palette.primary1Color : null}
                  />
                </IconButton>
              </Element>
              <Popover
                anchorEl={this.state.anchorEl}
                useLayerForClickAway={false}
                open={this.state.openList}
              >
                <List
                  onClick={e => {
                    e.nativeEvent.stopImmediatePropagation();
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  style={{ minWidth: "300px", maxHeight: "200px" }}
                >
                  {tagList
                    .filter(
                      i =>
                        !inputValue ||
                        i.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map(
                      (item, index) =>
                        item.name ? (
                          <ListItem
                            {...getItemProps({
                              item,
                              onClick: () => this.setState({ openList: false })
                            })}
                            key={item}
                            style={{
                              backgroundColor:
                                highlightedIndex === index
                                  ? "rgba(0,0,0,.2)"
                                  : "white",
                              fontWeight:
                                selectedItem === item ? "bold" : "normal"
                            }}
                          >
                            {item.name}
                          </ListItem>
                        ) : (
                          <ListItem key={item}>No Matching Tags</ListItem>
                        )
                    )}
                </List>
              </Popover>
            </div>
          )}
        </Downshift>
        <br />
        {newTagList.map(tag => (
          <Tag
            onRemove={() => this.onRemove(tag)}
            label={get.byId(tag.id)(tagList).name}
          />
        ))}
        <Element
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
          onClick={e => {
            e.nativeEvent.stopImmediatePropagation();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <FlatButton onClick={onClose} label="Cancel" />
          <FlatButton onClick={this.onSubmit} primary label="Confirm" />
        </Element>
      </Element>
    );
  }
}

export default compose(injectSheet(styles), withTheme)(ManageTagsForm);
