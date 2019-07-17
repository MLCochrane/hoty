import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './scss/theme.scss';
import {
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

// import deepPurple from '@material-ui/core/colors/deepPurple';

import store from './store';

import App from './view/App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: 'sofia pro',
    },
    h2: {
      fontFamily: 'sofia pro',
    },
    h5: {
      fontFamily: 'sofia pro',
    },
  },
  palette: {
    primary: {
      main: '#6200EE',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
