import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store/configureStore";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ThemeProvider } from "react-jss";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import cyverseTheme from "./cyverse-ui/styles/cyverseTheme";

import "./index.css";
import App from "./App";
import CreateInstanceWizard from "./components/wizards/CreateInstanceWizard";
import CreateVolumeDialog from "./containers/CreateVolumeDialog";
import CreateProjectDialog from "./containers/CreateProjectDialog";
import CreateLinkDialog from "./containers/CreateLinkDialog";
import registerServiceWorker from "./registerServiceWorker";
import injectTapEventPlugin from "react-tap-event-plugin";
import AddImageToProjectDialog from "./containers/AddImageToProjectDialog";
import MoveToProjectDialog from "./containers/MoveToProjectDialog";
injectTapEventPlugin();

const appTheme = getMuiTheme(cyverseTheme);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider muiTheme={appTheme}>
        <ThemeProvider theme={appTheme}>
          <div>
            <App />
            <CreateInstanceWizard />
            <CreateVolumeDialog />
            <CreateProjectDialog />
            <CreateLinkDialog />
            <AddImageToProjectDialog />
            <MoveToProjectDialog />
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
