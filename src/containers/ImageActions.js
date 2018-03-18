import React from "react";
import injectSheet from "react-jss";
import { IconButton, MenuItem } from "material-ui";
import ShareIcon from "material-ui/svg-icons/social/share";
import FavoriteIcon from "material-ui/svg-icons/action/favorite-border";
import EditIcon from "material-ui/svg-icons/image/edit";
import AddIcon from "material-ui/svg-icons/content/add"
import { LaunchIcon, IntercomIcon } from "cyverse-ui/es/icons";
import { ActionGroup, VerticalMenu } from "../cyverse-ui";
const styles = {
    wrapper: {
        position: "absolute",
        right: 0,
        background: "linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 20%,rgba(255,255,255,1) 56%);",
        paddingLeft: "50px" 
    },
    quickActions: {

    }
}
const ImageActions = ({hideQuickActions, classes}) => (
    <ActionGroup className={classes.wrapper} stopPropagation>
        <ActionGroup hide={hideQuickActions}
            className={classes.quickActions}
        >
            <IconButton>
                <FavoriteIcon/>
            </IconButton>
            <IconButton>
                <ShareIcon/>
            </IconButton>
            <IconButton>
                <LaunchIcon/>
            </IconButton>
        </ActionGroup>
        <VerticalMenu>
            <MenuItem
                primaryText="Edit Image"
            />
            <MenuItem
                primaryText="Add to Project"
            />
            <MenuItem
                primaryText="Report"
            />
        </VerticalMenu>
    </ActionGroup>
)

export default injectSheet(styles)(ImageActions);