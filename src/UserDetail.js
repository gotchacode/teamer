import React, { Component } from 'react';

export default class UserDetail extends Component {
  render() {
    const user = this.props.user;
    const hireable = user.hireable ? 'Yes': 'No';
    console.log('userdetail', user);
    return(
      <div>
        <h1>
          Hello {user.login}
        </h1>
        { user.bio && <p>Bio: {user.bio} </p> }
        <img src={user.avatar_url} alt={user.id}>
        </img>
        <p>
          Github URL: <a href={user.html_url}>{user.html_url}</a>
        </p>
        <p>Type: {user.type}</p>
        { user.company && <p>Company: {user.company}</p> }
        { user.blog && <p>Blog: <a href={user.blog}>{user.blog}</a></p> }
        { user.location && <p>Location: {user.location}</p> }
        { user.hireable && <p>Open for Job: {hireable}</p> }
      </div>
    );
  }
}


