import React from "react";
import { Tabs, Tab } from "material-ui";
import { Element } from "../cyverse-ui";
import ImageList from "../components/images/ImageList";
import CommentLink from "../components/CommentsLink";

export default () => (
  <React.Fragment>
    <div
      style={{
        background: "white",
        position: "sticky",
        top: 0,
        boxShadow: "1px 1px 3px 1px rgba(0,0,0,.3)",
        zIndex: "9999"
      }}
    >
      <Tabs style={{ maxWidth: "800px" }}>
        <Tab label="All" />
        <Tab label="Featured" />
        <Tab label="Favorites" />
        <Tab label="Your Images" />
      </Tabs>
    </div>
    <Element whitespace={["pv4", "ps13"]}>
      <ImageList />
    </Element>
    <CommentLink
      href="https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285752976/comments"
    />
  </React.Fragment>
);
