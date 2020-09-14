import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Flex, Heading } from '@chakra-ui/core';

import Header from './components/header';
import Home from './pages/home';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Header />
      <Router>
        <Flex direction={{ xs: 'column-reverse', lg: 'row' }}>
          <Flex flex={1} p={5} pr={0}>
            <Heading as="h6" textAlign="center" fontSize="1.2em">
              Restaurant Counter
            </Heading>
          </Flex>
          <Flex flex={3} p={5} direction="column">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Flex>
        </Flex>
      </Router>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default App;
