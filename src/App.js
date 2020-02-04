import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './style/theme';
import './index.css'
import Routes from 'routes/Routes';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router basename={'/portal'}>
          <Routes/>
        </Router>
      </ThemeProvider>
    );
  }
};

export default App
