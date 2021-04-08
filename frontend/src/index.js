import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import {deepOrange, lightGreen} from '@material-ui/core/colors/';

// ******** THEME STYLING ************
const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: deepOrange,
  },
});

ReactDOM.render(
  <React.StrictMode>
    {/* insert theme provider */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
