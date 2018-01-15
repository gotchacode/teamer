import React, { Component } from 'react';
import UserDetail from './UserDetail';

export default class GithubUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const self = this;
    if (!this.props.user) {
      return;
    } else {
      const URL = `https://api.github.com/users/${this.props.user.login}?client_id=2ee21061ca9ec6085e38&client_secret=f0f906d1f5f02623a010884370655da4595d301d`;
      fetch(URL)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          self.setState({user: json});
        });
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.user && <UserDetail user={this.state.user}></UserDetail>}
        </div>
      </div>
    );
  }

}
