import React from "react";
import _ from "lodash";
import { Input } from "../styledComponents/search";
import { connect } from "react-redux";
import { searchAttractions, emptyQuery, searchStories } from "../../actions";

class SearchBar extends React.Component {
  state = {
    searchBy: "attraction",
    query: "",
  };

  onQueryChange = (e) => {
    this.setState({ query: e.target.value });
    _.debounce(() => {
      this.state.searchBy === "attraction"
        ? this.props.searchAttractions(this.state.query)
        : this.props.searchStories(this.state.query);
    }, 300)();
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", marginBottom: "12px", gap: "20px" }}>
          <div>
            <label style={{ marginRight: "8px" }}>Attraction</label>
            <input
              type="radio"
              name="search-by"
              onChange={() => {
                this.setState({ searchBy: "attraction" });
              }}
              checked={this.state.searchBy === "attraction" ? true : false}
            />
          </div>
          <div>
            <label style={{ marginRight: "8px" }}>Story</label>
            <input
              type="radio"
              name="search-by"
              onChange={() => {
                this.setState({ searchBy: "story" });
              }}
              checked={this.state.searchBy === "story" ? true : false}
            />
          </div>
        </div>
        <Input
          placeholder="Look for your next destination!!"
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
