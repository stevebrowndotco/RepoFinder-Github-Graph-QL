//React
import React, { Component } from 'react';

//Dependencies
import 'whatwg-fetch';

//Apollo
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client'

//App Components
import RepositoryViewer from './RepositoryViewer';
import { Search } from './Search';
import { PAT } from './config.js';

// Global.Apollo
const networkInterface = createNetworkInterface('https://api.github.com/graphql');

networkInterface.use([
  {
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {} // Create the header object if needed.
      }

      // Send the login token in the Authorization header
      req.options.headers.authorization = `Bearer ${PAT}`
      next()
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

//App

class App extends Component {

  constructor() {

    super();

    this.state= {
      login: 'stevebrowndotco'
    }

  }

  handleSubmit(query) {
    this.setState({
      login: query
    })
  }

  render() {

    let app =
        <div>
          <Search onSubmit={(value)=>this.handleSubmit(value)} login={this.state.login} />
          <ApolloProvider client={client}>
            <RepositoryViewer login={this.state.login} />
          </ApolloProvider>
        </div>

    let reminder =
      <div>
        <h1>Thank you for viewing my demo.</h1>
        <p>Please make sure you enter in your Github Personal Access Token before beginning</p>
        <p>Add the token to config.js by replacing null, then restart the app.</p>
      </div>

    return PAT ? app : reminder;
  }

}

export default App;
