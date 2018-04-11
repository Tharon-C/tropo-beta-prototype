import React, {Component} from 'react';
import PropTypes from "prop-types";
import { makeSelectable, List} from 'material-ui/List';

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      const { value, defaultValue} = this.props
      this.setState({
        selectedIndex: value || defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      const {value } = this.props
      return (
        <ComposedComponent
          value={ value || this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

export default wrapState(SelectableList);
