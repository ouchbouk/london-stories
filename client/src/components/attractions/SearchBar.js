import React from "react";
import _ from "lodash";
import { Input } from "../styledComponents/search";
import { connect } from "react-redux";
import { searchAttractions, emptyQuery, searchStories } from "../../actions";

class SearchBar extends React.Component {
  state = {
    query: "",
  };

  onQueryChange = (e) => {
    this.setState({ query: e.target.value });
    _.debounce(() => {
      this.props.searchBy === "attraction"
        ? this.props.searchAttractions(this.state.query)
        : this.props.searchStories(this.state.query);
    }, 300)();
  };

  render() {
    return (
      <div>
        <Input
          placeholder="Search"
          onChange={this.onQueryChange}
          value={this.state.query}
          type="text"
          onBlur={() => {
            this.setState({ query: "" });
            this.props.emptyQuery();
          }}
        />
      </div>
    );
  }
}

export default connect(null, { searchAttractions, emptyQuery, searchStories })(
  SearchBar
);
