import React, { Component } from "react";
import { zIndex } from "../styles/styles";
import { Tabs, Tab } from "material-ui";
import { Element } from "../cyverse-ui";
import ImageList from "../components/images/ImageList";
import CommentLink from "../components/CommentsLink";

class ImageCatalog extends Component {
  state = {
    view: "All"
  };
  currentListFilter = () => {
    switch (this.state.view) {
      case "All":
        return () => true;
      case "Featured":
        return item => item.tags.filter(tag => tag.id === 2).length > 0;
      case "Favorites":
        return item => item.favorited;
      case "Your Images":
        return item => item.isUsers;
    }
  };
  changeView = (item) => {
    console.log(item)
    this.setState( state =>  ({view: item.props.value}))
  }
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            background: "white",
            position: "sticky",
            top: 0,
            boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
            zIndex: zIndex.ViewHeader
          }}
        >
          <Tabs value={this.state.view} style={{ maxWidth: "800px" }}>
            <Tab onActive={this.changeView} value="All" label="All" />
            <Tab onActive={this.changeView} value="Featured" label="Featured" />
            <Tab
              onActive={this.changeView}
              value="Favorites"
              label="Favorites"
            />
            <Tab
              onActive={this.changeView}
              value="Your Images"
              label="Your Images"
            />
          </Tabs>
        </div>
        <Element whitespace={["pv4", "ps13"]}>
          <ImageList filter={this.currentListFilter()} />
        </Element>
        <CommentLink href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285752976/comments" />
      </React.Fragment>
    );
  }
}

export default ImageCatalog;
