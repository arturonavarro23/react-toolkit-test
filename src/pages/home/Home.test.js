import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store'

import { wrapper } from '../../utils/test/index';
import * as restaurantListActions from '../../store/actions/restaurantListActions';

import Home from './Home';
import thunk from 'redux-thunk';

function geMockedRestaurants() {
  return [...Array(4).keys()].map((i) => ({
    id: i + 1,
    name: `Restaurant Name ${i + 1}`,
    img: 'Image',
  }));
}

function setup(store) {
  const restaurant = {
    name: 'name',
    img: 'imageURl',
    address: 'address',
    raiting: '4.5',
  };

  const defaultStore = configureStore([thunk])({
    restaurantList:{
      items: geMockedRestaurants(),
      error: null,
      pagination: null,
      loading: 'idle',
      createLoading: 'idle',
      restaurantIsCreated: false,
    },
  });

  const getRestaurantList = jest.fn();
  const createRestaurant = jest.fn();

  jest
    .spyOn(restaurantListActions, 'getRestaurantList')
    .mockImplementation(getRestaurantList);
  jest
    .spyOn(restaurantListActions, 'createRestaurant')
    .mockImplementation(createRestaurant);

  jest
    .spyOn(reactRedux, 'useDispatch')
    .mockImplementation(() => jest.fn());

  const utils = render(
    <MemoryRouter>
      <Home />,
    </MemoryRouter>,
    {
      wrapper: wrapper(store || defaultStore)
    },
  );

  const changeInputValue = (name, value) => {
    userEvent.type(screen.getByRole('textbox', { name }), value);
  };

  const clickSubmit = async () => {
    userEvent.click(screen.getByRole('button', { name: 'Add a Restaurant' }));
  };

  return {
    ...utils,
    restaurant,
    changeInputValue,
    clickSubmit,
    getRestaurantList,
    createRestaurant,
  };
}

function setupWithSuccesfullFormSubmit() {
  const utils = setup();
  utils.changeInputValue(/name/i, utils.restaurant.name);
  utils.changeInputValue(/image/i, utils.restaurant.img);
  utils.changeInputValue(/address/i, utils.restaurant.address);
  utils.changeInputValue(/raiting/i, utils.restaurant.raiting);
  utils.clickSubmit();
  return { ...utils };
}

function setupWithSuccesfullRestaurantsRequest() {
  const utils = setup();

  return { ...utils };
}

function setupWithErrorRestaurantsRequest() {
  const storeWithError = configureStore([thunk])({
    restaurantList:{
      items: [],
      error: 'error',
      pagination: null,
      loading: 'idle',
      crateLoading: 'idle',
      restaurantIsCreated: false,
    },
  });

  const utils = setup(storeWithError);

  return { ...utils };
}

describe('<Home />', () => {
  test('should call createRestaurant', async () => {
    // arrange
    const utils = setupWithSuccesfullFormSubmit();

    // assert
    await waitFor(() => {
      expect(utils.createRestaurant).toHaveBeenCalledTimes(1);
    });
  });

  test('should render a restaurant list', async () => {
    // arrange
    setupWithSuccesfullRestaurantsRequest();

    // assert
    expect(screen.getAllByAltText(/Restaurant Name/i)).toHaveLength(4);
  });

  test('should display the error message', async () => {
    // arrange
    setupWithErrorRestaurantsRequest();

    // assert
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
