import React, {Component} from "react";
import {SelectField, MenuItem} from "material-ui";
import CloudIcon from "material-ui/svg-icons/file/cloud-circle";
import { Element, P, Hr, ActionGroup, VerticalMenu, ListCardHeader, } from "../../cyverse-ui";
import AUGraph from "../../AUGraph.svg"

class DashboardWidgets extends Component {
    state = {
        value: 1,
      };
      handleChange = (event, index, value) => this.setState({value});
    render() {
        return (
            <Element elevation={3}
            style={{
                background: "white",
                width: "400px",
                borderRadius: 3,
            }}
        >
        <ListCardHeader>
          <Element whitespace="ps3" typography="body2" > 
          Allocation</Element>
          <ActionGroup>
        <CloudIcon style={{ marginRight: 8}}/>
          <SelectField
          style={{width: "120px"}}
          value={this.state.value}
          onChange={this.handleChange}
        >
              <MenuItem value={1} primaryText="CYMAR" />
              <MenuItem value={2} primaryText="CYWRK" />
        </SelectField>
              <VerticalMenu/>
            </ActionGroup>
        </ListCardHeader>

          <Hr/>
          <Element whitespace={["ps3", "pv2"]}>
          <img src={AUGraph}/>
          </Element>
        </Element>
        )
    }
}

export default DashboardWidgets;