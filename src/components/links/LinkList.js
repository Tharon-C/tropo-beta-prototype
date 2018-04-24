import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatButton } from "material-ui";
import { MediaCardGroup, Element } from "../../cyverse-ui/";
import LinkCard, { ProjectListHeader } from "./LinkCard";
import LinkCardCompact from "./LinkCardCompact";

class LinkList extends Component {
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
      filter = () => false,
      links,
      showHeader = true,
      loadMoreEnteries,
      range,
      isSticky,
      isCompact
    } = this.props;
    const { selectedItems } = this.state;
    const batchMode = selectedItems.length > 0;
    return (
      <section style={{ maxWidth: "1000px", margin: "auto" }}>
        <ProjectListHeader
          isCompact={isCompact}
          isSticky={isSticky}
          batchMode={batchMode}
          onBatchClick={(e, isChecked) => {
            this.setState({
              selectedItems: isChecked ? links.map(image => image.id) : []
            });
          }}
        />
        <MediaCardGroup>
          {links.filter(filter).map((image, i) => {
            return isCompact ? (
              <LinkCardCompact
                key={image.id}
                uid={image.id}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(image.id)}
                onCheck={this.onCheck}
                image={image}
              />
            ) : (
              <LinkCard
                key={image.id}
                uid={image.id}
                isCheckable={selectedItems.length > 0}
                checked={selectedItems.includes(image.id)}
                onCheck={this.onCheck}
                image={image}
              />
            );
          })}
        </MediaCardGroup>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  links: state.linkList.data
});
export default connect(mapStateToProps, null)(LinkList);
