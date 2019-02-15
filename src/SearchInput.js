import React, { Component } from "react";

export default class SearchInput extends Component {
  handleChange = event => {
    this.props.textChange(event);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input
            className="form-control search-input pull-left"
            placeholder="eg: github"
            onChangeCapture={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
