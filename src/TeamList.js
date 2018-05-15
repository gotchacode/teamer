import React, { Component } from 'react';
import { Link} from 'react-router-dom';

export default class TeamList extends Component {
  render() {
    const teams = this.props.teams;
    const teamListContainer = [];

    if (teams) {
      teams.forEach((node, key) => {
        const avatar = node.node.avatarUrl + '&s=30';
        let username = node.node.name ? node.node.name: node.node.login;
        teamListContainer.push(
          <li key={key}>
            <Link to={`/u/${node.node.id}`}><img src={avatar} className="avatar-image" alt={node.node.id}></img>{username}</Link>
          </li>
        )
      });
    }

    return(
      <ul className="team-list">
        {teamListContainer}
      </ul>
    );
  }
}
