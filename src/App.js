import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';

class GithubUser extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
  }

  componentDidMount() {
    console.log('GithubUser did mount');
    if (!this.props.user) {
      return;
    } else {
      console.log(this.props.user);
    }
  }

  render() {
    return (
      <div>
        <h1>Hello {this.props.user.login}</h1>
      </div>
    );
  }

}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      github: null,
      orgName: null,
    };
  }

  apiRequest(org) {
    const githubAPIURL = `https://api.github.com/orgs/${org}/members?client_id=2ee21061ca9ec6085e38&&client_secret=f0f906d1f5f02623a010884370655da4595d301d`;
    const self = this;
    fetch(githubAPIURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      // make we don't both with 404 results
      if (typeof (json) === 'object' && json.message !== "Not Found") {
        self.setState({'github': json});
      }
    });
  }

  handleSearchChange(event)  {
    // set it all empty when a new org is searched
    this.setState({'github': []});
    let org = event.target.value;
    this.apiRequest(org);
  }

  render() {
    // this contains a lot of data, we don't need to pass the whole damn thing.
    const teams = this.state.github;
    let thinTeams = [];
    if (teams !== null) {
      teams.forEach((member, item)=> {
        thinTeams.push({
          'login': member.login,
          'id': member.id
        })
      });

      console.log(thinTeams);
    }

    return (
      <Router>
        <div className="container-fluid">
          <h1>Welcome to Github team viewer</h1>
          <SearchInput textChange={this.handleSearchChange.bind(this)}/>
          <div className="team-display-container container-fluid">
            <div className="col-4 sidebar"><TeamList teams={this.state.github}></TeamList></div>
            <div className="col-8 main">            
            { thinTeams && (
                <Route path="/u/:userId" render={({match})=> (
                  <GithubUser key={match.params.userId} user={thinTeams.find(g=> g.id === parseInt(match.params.userId, 10) )} />
                )} />
            )}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;



class SearchInput extends Component  {
  handleChange =  (event) => {
    this.props.textChange(event);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <input className="form-control search-input pull-left" placeholder="eg: github" onChangeCapture={this.handleChange} />
        </div>
      </div>
    )
  }
}

class TeamList extends Component {
  render() {
    const teams = this.props.teams;
    const teamListContainer = [];

    if (teams) {
      teams.forEach((member, key) => {
        const avatar = member.avatar_url + '&s=30';
        teamListContainer.push(
          <li key={key}>
            <Link to={`/u/${member.id}`}><img src={avatar} className="avatar-image"></img>{member.login}</Link>
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


