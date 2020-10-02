import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';

import * as CreateHook from '../../hooks/useCreateRestaurant';
import * as PaginatedHook from '../../hooks/useGetPaginatedRestaurants';
import Home from './Home';

function geMockedRestaurants() {
  return [...Array(4).keys()].map((i) => ({
    id: i + 1,
    name: `Restaurant Name ${i + 1}`,
    img: 'Image',
  }));
}

function setup() {
  const restaurant = {
    name: 'name',
    img: 'imageURl',
    address: 'address',
    raiting: '4.5',
  };

  const utils = render(
    <ThemeProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </ThemeProvider>
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
  };
}

function setupWithSuccesfullFormSubmit() {
  const createRestaurant = jest.fn();
  jest
    .spyOn(CreateHook, 'useCreateRestaurant')
    .mockImplementationOnce(() => [
      createRestaurant,
      { isLoading: false, isSuccess: false },
    ]);

  jest
    .spyOn(PaginatedHook, 'useGetPaginatedRestaurants')
    .mockImplementationOnce(() => ({}));

  const utils = setup();
  utils.changeInputValue(/name/i, utils.restaurant.name);
  utils.changeInputValue(/image/i, utils.restaurant.img);
  utils.changeInputValue(/address/i, utils.restaurant.address);
  utils.changeInputValue(/raiting/i, utils.restaurant.raiting);
  utils.clickSubmit();
  return { createRestaurant, ...utils };
}

function setupWithSuccesfullRestaurantsRequest() {
  jest
    .spyOn(CreateHook, 'useCreateRestaurant')
    .mockImplementationOnce(() => [jest.fn(), {}]);

  jest
    .spyOn(PaginatedHook, 'useGetPaginatedRestaurants')
    .mockImplementationOnce(() => ({
      status: 'success',
      resolvedData: { restaurants: [...geMockedRestaurants()] },
      latestData: {
        pagination: { prev: null, current: 1, pages: 1, next: null },
      },
      isFetching: false,
    }));

  const utils = setup();

  return { ...utils };
}

function setupWithErrorRestaurantsRequest() {
  jest
    .spyOn(CreateHook, 'useCreateRestaurant')
    .mockImplementationOnce(() => [jest.fn(), {}]);

  jest
    .spyOn(PaginatedHook, 'useGetPaginatedRestaurants')
    .mockImplementationOnce(() => ({
      status: 'error',
      resolvedData: { restaurants: [] },
      latestData: {},
      isFetching: false,
    }));

  const utils = setup();

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
