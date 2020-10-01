import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';

import useCreateRestaurant from '../../hooks/useCreateRestaurant';
import Home from './Home';

jest.mock('../../hooks/useCreateRestaurant.js');

function setup() {
  const createRestaurant = jest.fn();

  useCreateRestaurant.mockImplementationOnce(() => [
    createRestaurant,
    { isLoading: false, isSuccess: false },
  ]);

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

  const clickSubmit = async() => {
    userEvent.click(screen.getByRole('button', 'Add a Restaurant'));
  };

  return {
    ...utils,
    createRestaurant,
    restaurant,
    changeInputValue,
    clickSubmit,
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

test('should call createRestaurant', async() => {
  const utils = setupWithSuccesfullFormSubmit();

  await waitFor(() => {
    expect(utils.createRestaurant).toHaveBeenCalledTimes(1)
  });
});
