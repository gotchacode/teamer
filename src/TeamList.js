import React, { Component } from 'react';
import { Link} from 'react-router-dom';

export default class TeamList extends Component {
  render() {
    const teams = this.props.teams;
    const teamListContainer = [];

    if (teams) {
      teams.forEach((member, key) => {
        const avatar = member.avatar_url + '&s=30';
        teamListContainer.push(
          <li key={key}>
            <Link to={`/u/${member.id}`}><img src={avatar} className="avatar-image" alt={member.id}></img>{member.login}</Link>
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
