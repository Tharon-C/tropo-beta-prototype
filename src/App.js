import React, { Component } from "react";
import "./App.css";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Route } from 'react-router-dom'
import Sidebar from "./containers/SideBar";
import AppBar from "./containers/AppBar";
import ImageCatalog from "./views/ImageCatalog";
import Instances from './views/Instances';
import Volumes from './views/Volumes';
import Projects from './views/Projects';
import Notifications from './views/Notifications';
import AllAssets from './views/AllAssets';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({ uri: "http://localhost:7700/graphql" }),
  cache: new InMemoryCache()
});
class App extends Component {
  render() {
    return (
            <div>
              <AppBar />
              <div
                style={{
                  display: "flex",
                  height: "calc(100vh - 56px)",
                }}
              >
                <Sidebar />
                <main
                  style={{
                    background: "#F2F2F2",
                    flexGrow: 1,
                    width: 0,
                    overflowX: "scroll"
                  }}
                >
                  <Route exact path="/image-catalog" component={ImageCatalog} />
                  <Route exact path="/all-assets" component={AllAssets} />
                  <Route exact path="/instances" component={Instances} />
                  <Route exact path="/volumes" component={Volumes} />
                  <Route exact path="/projects" component={Projects} />
                  <Route exact path="/notifications" component={Notifications} />
                </main>
              </div>
            </div>
    );
  }
}

export default App;
