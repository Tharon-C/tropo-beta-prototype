import React from "react";
import {connect} from "react-redux";
import { get } from "../../utils";
import {
  SummaryText,
  Element
} from "../../cyverse-ui";
import { VolumeIcon } from "../../cyverse-ui/icons";
import {VolumeMenu} from "../../containers/VolumeActions";

const InstanceVolumes = ({ instance:{ volumes }, volumes: volumeList  }) => (
  <React.Fragment>
    
        {volumes.length > 0 ? volumes.map(volume => (
          <Element
            elevation={2}
            whitespace="pl2"
            style={{
              background: "#EFEFEF",
              display: "flex",
              alignItems: "center",
              maxHeight: "32px",
              marginRight: "8px",
              width: "175px",
              justifyContent: "space-between"
            }}
          >
            <VolumeIcon size="24px" style={{ marginRight: "16px" }} />{" "}
            <SummaryText>{get.byId(volume)(volumeList).name}</SummaryText>
            <VolumeMenu volume={volume}/>
          </Element>
        )): "Attach Volumes"}

  </React.Fragment>
);
const mapStateToProps = state => ({
  volumes: state.volumeList.data,
});

export default connect(mapStateToProps, null)(InstanceVolumes);