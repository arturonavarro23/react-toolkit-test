import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/core';
import { Provider } from 'react-redux';
import createStore from './store';
import Header from './components/header';
import Home from './pages/home';
import Details from './pages/details';
import RestaurantCounter from './components/restaurantCounter';
import SearchByName from './components/searchByName';

const store = createStore();

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Provider store={store}>
        <Router>
          <Header />
          <Flex direction={{ xs: 'column-reverse', lg: 'row' }}>
            <Flex flex={1} p={5} pr={0} direction="column" align="flex-start">
              <RestaurantCounter />
              <SearchByName />
            </Flex>
            <Flex flex={3} p={5} direction="column">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/restaurants/:id" component={Details} />
              </Switch>
            </Flex>
          </Flex>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
