import React from "react";
import _ from "lodash";
import { Input } from "../styledComponents/search";
import { connect } from "react-redux";
import { searchAttractions, emptyQuery } from "../../actions";

class SearchBar extends React.Component {
  state = {
    query: "",
  };

  onQueryChange = (e) => {
    this.setState({ query: e.target.value });
    _.debounce(() => {
      this.props.searchAttractions(this.state.query);
    }, 300)();
  };

  render() {
    return (
      <Input
        placeholder='Look for your next destination!!'
        onChange={this.onQueryChange}
        value={this.state.query}
        type="text"
        onBlur={() => {
          this.setState({ query: "" });
          this.props.emptyQuery()
        }}
      />
    );
  }
}

export default connect(null, { searchAttractions, emptyQuery })(SearchBar);
