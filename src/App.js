import React, { Component } from 'react';
import GithubUser from './GithubUser';
import SearchInput from './SearchInput';
import TeamList from './TeamList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const MEMBERS = gql`
query($organization_name: String!) {
    organization(login: $organization_name) {
    members(first: 100) {
      edges {
        node {
          name
          avatarUrl
          id
          login
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

  handleSearchChange(event)  {
    // set it all empty when a new org is searched
    this.setState({'github': []});
    let org = event.target.value;
    this.setState({orgName: org });
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
    let organization_name = this.state.orgName;

    return (
      <Router>
        <div className="container-fluid">
          <h1 className="app-header">Welcome to Teamer</h1>
          <p> Discover teams on github, just search for the name. For eg: github</p>
          <SearchInput textChange={this.handleSearchChange.bind(this)}/>
            {this.state.orgName  &&
            <Query query={MEMBERS} variables={{ "organization_name": organization_name  }}>
              {({data, loading}) => {
                if (loading) return <span>Loading data...</span>
                if (!loading && data) return <div className="team-display-container row"><div className="col-4 sidebar"><TeamList teams={data.organization.members.edges}></TeamList></div> <div className="col-8 main"> <Route path="/u/:userId" render={({match})=> (<GithubUser key={match.params.userId} user={data.organization.members.edges.find(g=> g.node.id === match.params.userId )} />
                )} /></div></div>
              }}
            </Query>
            }
        </div>
      </Router>
    );
  }
}

export default App;

