import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import images from "../../IMAGE_DATA.json"
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import NotificationCard, {NotificationListHeader} from "./NotificationCard";

const ImageList = ({ loadMoreEnteries }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <MediaCardGroup>
        
       
        <NotificationCard key={"2"} notificationType="attachVolume" summaryMessage='The Volume "Vault" attached to "Green Lantern" succesfully'/>
        <NotificationCard key={"3"} notificationType="launchInstance" summaryMessage='The instance "Green Lantern" failed incountered a build error'/>
        <NotificationCard key={"1"} isError notificationType="launchInstance" summaryMessage='The instance "T-rex" failed incountered a build error'/>
        <NotificationCard key={"6"} notificationType="detachVolume" summaryMessage='The Volume "Vault" detached from "Batman" succesfully'/>
        <NotificationCard key={"4"} notificationType="launchInstance" summaryMessage='The instance "Batman" failed incountered a build error'/>
        <NotificationCard key={"5"} notificationType="launchInstance" summaryMessage='The instance "Superman" failed incountered a build error'/>
      </MediaCardGroup>
    </section>
  );
};

export default ImageList;
