import React from "react";
import injectSheet, { withTheme } from "react-jss";
import { zIndex } from "../styles/styles";
import { Avatar, Checkbox } from "material-ui";
import {
  ListCard,
  ListCardDetail,
  ListCardHeader,
  ListCardSummary,
  ListCardIdentity,
  Identity,
  SummaryText,
  P,
  Element,
  ShowMoreEllipsis,
  Checkable,
  ActionGroup
} from "../cyverse-ui/";

const styles = {
  wrapper: {
    position: "sticky",
    top: "48px",
    zIndex: zIndex.AssetListHeader
  },
  wrapperCompact: {
    position: "sticky",
    zIndex: zIndex.AssetListHeader
  },
  header: {
    minHeight: "48px"
  },
  checkbox: {
    marginLeft: "6px",
    marginRight: "6px"
  },
  checkboxCompact: {
    marginLeft: "22px",
    marginRight: "22px"
  },
};

export const AssetListHeader = ({
  onBatchClick,
  batchMode,
  summary,
  actions,
  classes,
  isSticky,
  compact
}) => (
  <ListCard className={isSticky && !compact ? classes.wrapper : classes.wrapperCompact} whitespace="mb1">
    <ListCardHeader className={classes.header}>
      {compact ? (
        <Element className={classes.checkboxCompact}>
          <Checkbox onCheck={onBatchClick} />
        </Element>
      ) : (
        <React.Fragment>
          <ListCardIdentity>
            <Element className={classes.checkbox}>
              <Checkbox onCheck={onBatchClick} />
            </Element>

            <Element hide={batchMode} typography="label">
              Name
            </Element>
          </ListCardIdentity>
          <ListCardSummary hide={batchMode}>{summary}</ListCardSummary>
        </React.Fragment>
      )}
      <ActionGroup whitespace="mr3" hide={!batchMode}>
        {actions}
      </ActionGroup>
    </ListCardHeader>
  </ListCard>
);
export default injectSheet(styles)(AssetListHeader);