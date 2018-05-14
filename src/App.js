import React, { Component } from 'react';
import GithubUser from './GithubUser';
import SearchInput from './SearchInput';
import TeamList from './TeamList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const REPOSITORY = gql`
{
  repository(owner: "vinitkumar", name: "node-twitter") {
    pullRequest(number:208) {
      commits(first: 200) {
        edges {
          node {
            commit {
              oid
              message
            }
          }
        }
      }
      comments(first: 10) {
        edges {
          node {
            body
            author {
              login
            }
          }
        }
      }
      reviews(first: 10) {
        edges {
          node {
            state
          }
        }
      }
    }
  }
}
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      github: null,
      orgName: null,
    };
  }

  apiRequest(org) {
    const githubAPIURL = `https://api.github.com/orgs/${org}/members?client_id=2ee21061ca9ec6085e38&client_secret=f0f906d1f5f02623a010884370655da4595d301d`;
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
          <h1 className="app-header">Welcome to Teamer</h1>
          <p> Discover teams on github, just search for the name. For eg: github</p>
          <SearchInput textChange={this.handleSearchChange.bind(this)}/>
          <div className="team-display-container row">

            <Query query={REPOSITORY} variables={{}}>
              {({data, loading}) => (
                loading ? <span>Loading data...</span> :
                <p>data is here </p>
              )}
            </Query>
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

