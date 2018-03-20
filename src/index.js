import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store/configureStore'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ThemeProvider } from "react-jss";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import cyverseTheme from "./cyverse-ui/styles/cyverseTheme";

import './index.css';
import App from './App';
import LaunchWizard from "./components/launchWizard/LaunchWizard";
import registerServiceWorker from './registerServiceWorker';
const appTheme = getMuiTheme(cyverseTheme);
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
        <MuiThemeProvider muiTheme={appTheme}>
        <ThemeProvider theme={appTheme}>
            <div>
            <App />
            <Route path="*/instance-launch" component={LaunchWizard}/>
            </div>
        </ThemeProvider>
        </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root')
);

registerServiceWorker();
