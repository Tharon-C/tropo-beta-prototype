import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import InstanceCard, { InstanceListHeader } from "./InstanceCard";
import InstanceCardCompact, {InstanceListHeaderCompact} from "./InstanceCardCompact";

class InstanceList extends Component {
  state = {
    batchMode: false,
    selectedItems: []
  };
  onCheck = (e, state, item) => {
    const list = this.state.selectedItems;
    // We can set or use any prop we want for this check
    const curr = item.props.uid;
    const selectedItems = list.includes(curr)
      ? list.filter(i => curr !== i)
      : [...list, curr];
    this.setState({ selectedItems });
  };
  render() {
    const {
      filter = () => true,
      deleteInstance,
      instances,
      showHeader = true,
      loadMoreEnteries,
      range,
      isSticky,
      FAB,
      isMobile,
    } = this.props;

    const { selectedItems } = this.state;
    const batchMode = selectedItems.length > 0;
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        {!showHeader ? null : isMobile ? (
         <InstanceListHeaderCompact
         FAB={FAB}
         isSticky={isSticky}
         batchMode={batchMode}
         onBatchClick={(e, isChecked) => {
           this.setState({
             selectedItems: isChecked ? instances.map(image => image.id) : []
           });
         }}
       /> 
        ) :(
          <InstanceListHeader
            FAB={FAB}
            isSticky={isSticky}
            batchMode={batchMode}
            onBatchClick={(e, isChecked) => {
              this.setState({
                selectedItems: isChecked ? instances.map(image => image.id) : []
              });
            }}
          />
        )}
        <MediaCardGroup>
          {instances.filter(filter).map((image, i) => {
            return isMobile ? (
              <InstanceCardCompact
                key={image.id}
                uid={image.id}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(image.id)}
                onCheck={this.onCheck}
                image={image}
                onDelete={deleteInstance} 
              />
            ) : (
              <InstanceCard
                key={image.id}
                uid={image.id}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(image.id)}
                onCheck={this.onCheck}
                image={image}
                onDelete={deleteInstance}
              />
            );
          })}
        </MediaCardGroup>
      </section>
    );
  }
}

function mapStateToProps(store) {
  return {
    instances: store.instanceList.data,
  };
}

export default connect(mapStateToProps, null)(InstanceList);
