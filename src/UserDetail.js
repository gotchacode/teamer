import React, { Component } from 'react';

export default class UserDetail extends Component {
  render() {
    const user = this.props.user;
    const username = this.props.user.name ? this.props.user.name: this.props.user.login;
    return(
      <div>
        <h1>
          Hello {username}
        </h1>
        <p>Github DB id: {user.databaseId}</p>
        { user.bio && <p>Bio: {user.bio} </p> }
        <img src={user.avatarUrl} alt={user.id}>
        </img>
        <p>
          Github URL: <a href={user.url}>{user.url}</a>
        </p>
        { user.email && <p>Email: <a href="mailto:{user.email}">{user.email}</a></p> }
        { user.company && <p>Company: {user.company}</p> }
        { user.websiteUrl && <p>Blog: <a href={user.websiteUrl}>{user.websiteUrl}</a></p> }
        { user.location && <p>Location: {user.location}</p> }
        { user.isHireable && <p>Open for Job: {user.isHireable ? 'Yes': 'No'}</p> }
        { user.isDeveloperProgramMember && <p>Developer Program Member: {user.isDeveloperProgramMember ? 'Yes': 'No'}</p>}
      </div>
    );
  }
}


