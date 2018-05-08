import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "ramda";
import injectSheet, { withTheme } from "react-jss";
import {
  toggleAttachFromInstance,
  removeTagFromInstance
} from "../../actions/instanceActions";
import get from "../../utils/get";
import {
  Element,
  P,
  Code,
  CopyButton,
  FlatButtonCompact,
  Link
} from "../../cyverse-ui";
import Status from "../Status";
import InstanceVolumes from "./InstanceVolumes";
import TagSection from "./TagSection";
import cropPortrait from "material-ui/svg-icons/image/crop-portrait";
import PlusIcon from "material-ui/svg-icons/content/add-circle";
import { IconButton } from "material-ui";

const styles = theme => ({
  listItem: {
    display: "flex",
    aliginItems: "center",
    ...theme.whitespace["mb2"],
    "@media(max-width: 780px)": {
      display: "block",
      ...theme.whitespace["mb3"]
    }
  },
  label: {
    width: "100px"
  },
  details: {
    maxWidth: "50%",
    paddingRight: "36px",
    "@media(max-width: 1400px)": {
      maxWidth: "100%"
    }
  }
});
const InstanceInfo = ({
  removeTag,
  attachVolume,
  instance,
  classes,
  theme
}) => {
  const { id, tags, activity, provider, description, image} = instance;
  let statusColor;
  switch (activity) {
    case "Active":
      statusColor = "success";
      break;
    case "Error":
      statusColor = "danger";
      break;
    default:
      statusColor = "inactive";
  }
  return (
    <Element className={classes.details}>
      <Element whitespace="mb4">
        <Element typography="body2" whitespace="mb4">
          InstanceDetails
        </Element>

        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            Status
          </Element>
          <Status color={statusColor} label={activity} />
        </div>
        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            Based on
          </Element>
          <Link to={`./image-catalog/${image.id}`} typography="body1">
            {image.name}
          </Link>
        </div>
        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            Size
          </Element>
          <Element typography="body1">
            Large1 (5 CPU, 8GB Memory, 100GB Disc)
          </Element>
        </div>
        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            Provider
          </Element>
          <Element typography="body1">{`${provider.name} (${
            provider.code
          })`}</Element>
        </div>
        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            SSH Key
          </Element>
          <Element typography="body1" whitespace="mr3">
            Office Desktop
          </Element>
          <FlatButtonCompact primary label="Manage" />
        </div>
        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            IP Adress
          </Element>
          128.196.65.334
          <CopyButton text="128.196.65.334" />
        </div>
        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            ID
          </Element>
          19737
          <CopyButton text="19737" />
        </div>
        <div className={classes.listItem}>
          <Element
            className={classes.label}
            typography="label"
            whitespace="mb1"
          >
            Identifier
          </Element>
          {id}
          <CopyButton text={id} />
        </div>
      </Element>
      <Element typography="label" whitespace="mb1">
        Notes
      </Element>
      <P whitespace="mb4">{description}</P>
      <Element whitespace="mb4">
        <TagSection currentTags={tags} instance={instance} />
      </Element>
      <Element typography="label" whitespace="mb1">
        Volumes
      </Element>
      <Element
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "4px"
        }}
      >
        <InstanceVolumes instance={instance} />{" "}
        <IconButton onClick={() => attachVolume(id)} tooltip="Attach Volume">
          <PlusIcon color={theme.palette.primary1Color} />
        </IconButton>
      </Element>
    </Element>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      attachVolume: toggleAttachFromInstance,
      removeTag: removeTagFromInstance
    },
    dispatch
  );

export default compose(
  connect(null, mapDispatchToProps),
  withTheme,
  injectSheet(styles)
)(InstanceInfo);
