import React from "react";
import { connect } from "react-redux";
import { get } from '../../utils';
import { MediaCardGroup } from "../../cyverse-ui/";
import NotificationCard from "./NotificationCard";

const ImageList = ({ notifications, instances }) => {
  return (
    <section style={{ maxWidth: "1000px", margin: "auto" }}>
      <MediaCardGroup>
         { notifications.slice().reverse().map( notification => 
            <NotificationCard key={notification.id}
              notification={notification}
            />
        ) }
      </MediaCardGroup>
    </section>
  );
};
const mapStatToProps = state => ({
  notifications: state.notificationList.data,
  instances: state.instanceList.data,
})
export default connect(mapStatToProps, null)(ImageList);
