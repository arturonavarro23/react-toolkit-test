import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools'

import Header from './components/header';
import Home from './pages/home';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default App;
