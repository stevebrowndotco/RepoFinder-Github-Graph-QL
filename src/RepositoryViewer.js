//React
import React, { Component } from 'react';
import 'whatwg-fetch';

//GraphQL
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Repo } from './Repo';

//Query

const GetRepositoryInfoQuery = gql`
      query GetUser($login: String!) {
        user(login: $login) {
          name,
          avatarUrl,
          bio,
          email,
          websiteUrl
          repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              name,
              createdAt,
              description,
              url
            }
          }
        }
      }
    `;

const withInfo = graphql(GetRepositoryInfoQuery, {
  options: ({ login }) => {
    return {
      variables: {
        login: login
      }
    }
  },
  props: ({ data }) => {
    if (data.error) {
      console.error(data.error);
    }
    return { data };
  },
});

//App

class RepositoryViewer extends Component {

  constructor(props) {

    super(props);

    this.state = {
      login: props.login
    };

  }

  componentWillReceiveProps(newProps) {

    if(newProps.login) {
      this.setState({login: newProps.login})
    }

    if(newProps.data.user) {
      this.setState({user: newProps.data.user})
    }

  }

  render() {

    let RepoList = [];

    if(this.state.user) {
      RepoList = this.state.user.repositories.nodes.map((repo, i) =>
        <Repo key={i} repo={repo}/>
      );
    }

    return (
      <div>
        <h1>First 10 repositores for user {this.state.login}</h1>
        <table>
          <thead>
            <tr>
              <th>Repository Name</th>
              <th>Date Created</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {RepoList}
          </tbody>
        </table>
        <h2>Profile Info</h2>
        {this.state.user ? <img src={this.state.user.avatarUrl} /> : null}
        <p>Name: {this.state.user ? this.state.user.name : null}</p>
        <p>Bio: {this.state.user ? this.state.user.bio : null}</p>
        <p>Url: {this.state.user ? <a href={this.state.user.websiteUrl}>{this.state.user.websiteUrl}</a> : null}</p>
      </div>
    );
  }

}

const RepositoryWithInfo = withInfo(RepositoryViewer);
export default RepositoryWithInfo;
