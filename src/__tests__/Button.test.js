import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from '../components/UI/Button/Button';

test('Should render button', () => {
  render(<Button>Button</Button>);
  expect(screen.getByText('Button')).toBeDefined();
});

test('handles onClick', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('applies custom class', () => {
  const customClass = 'my-custom-class';
  const button = render(<Button className={customClass}>Click</Button>);
  expect(button.getByTestId('button-id').className).toContain(customClass);
});
