import React from "react";
import { Tabs, Tab } from "material-ui";
import NotificationList from "../components/notifications/NotificationList";
import { Element } from "../cyverse-ui";
import CommentLink from "../components/CommentsLink";
export default () => (
  <React.Fragment>
    <Element whitespace={["pv4", "ps13"]}>
      <NotificationList />
    </Element>
    <CommentLink href=" https://projects.invisionapp.com/share/BXGE8OWQZ62#/screens/285754823/comments" />
  </React.Fragment>
);
