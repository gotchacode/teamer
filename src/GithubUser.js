import React, { Component, Fragment } from 'react';
import UserDetail from './UserDetail';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const USER = gql`
query($id: ID!) {
  node(id: $id) {
    ... on User {
      databaseId
      login
      id
      name
      avatarUrl
      bio
      company
      email
      location
      isHireable
      isDeveloperProgramMember
      url
      websiteUrl
    }
  }
}
`;

export default class GithubUser extends Component {
  render() {
    return (
      <Fragment>
        { this.props.user &&
        <Query query={USER} variables={{ "id": this.props.user.node.id }}>
           {({data, error, loading}) => {
            if (error) return <span>Something went wrong..!</span>
            if (loading || !data) return <span>Loading User details...</span>
            if (!loading && data) return <UserDetail user={data.node} />
           }}
        </Query>
        }
        <p></p>
      </Fragment>
    );
  }

}
