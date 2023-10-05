import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import MainTitle from '../components/UI/MainTitle/MainTitle';

test('Should render MainTitle', () => {
  const text = 'hello world';
  render(<MainTitle text={text} />);
  expect(screen.getByTestId('mainTitle-id')).toBeDefined();
});
