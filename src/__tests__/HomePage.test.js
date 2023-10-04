import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomePage from '../components/HomePage/HomePage';
import { StateProvider } from '../context/StateContext';
import { citizens } from '../utils/mockData.json';


jest.mock('react-toastify');
toast.error = jest.fn();

jest.mock('../utils/localStorage', () => ({
  getLocalStorageItem: jest.fn(),
}));

const finiteStateMachine = {
  transition: jest.fn(),
};


describe('HomePage Component', () => {
  beforeEach(() => {
    render(
      <StateProvider finiteStateMachine={finiteStateMachine}>
        <Router>
          <HomePage />
        </Router>
      </StateProvider>
    );
  });

  test('renders login button and allows user to enter ID', async () => {
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeDefined();

    const textInput = screen.getByTestId('input-id');
    fireEvent.change(textInput, { target: { value: '12345' } });
    expect(textInput.value).toBe('12345');
  });

  test('shows error toast when user has already voted', () => {
    require('../utils/localStorage').getLocalStorageItem.mockReturnValueOnce(
      true
    );

    fireEvent.change(screen.getByTestId('input-id'), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByText('Login'));

    expect(toast.error).toHaveBeenCalledWith(
      `You have already voted.`,
      expect.any(Object)
    );
  });

  test('login success', async () => {
    const mockCitizen = {
      city: 'Jerusalem',
      cityId: 'jerusalem_id',
      id: '12345',
      name: 'Eli Takele',
      preferredCandidate: 'David Cohen',
    };

    const textInput = await screen.getByTestId('input-id');
    fireEvent.change(textInput, {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByText('Login'));
    const citizen = citizens.find(({ id }) => id === textInput.value);
    expect(citizen).toEqual(mockCitizen);
  });
  test('login failed', async () => {
    const textInput = await screen.getByTestId('input-id');
    fireEvent.change(textInput, {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Login'));
    const citizen = citizens.find(({ id }) => id === textInput.value);
    expect(citizen).toBeUndefined();
  });
});
