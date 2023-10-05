import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Modal from '../components/UI/Modal/Modal';
test('renders modal when show is true', () => {
  render(
    <Modal
      show={true}
      title="Test Modal"
      primaryActionLabel="Confirm"
      secendoryActionLabel="Cancel"
      onClose={() => {}}
      onPrimaryActionClick={() => {}}
      onSeconderyActionClick={() => {}}
    >
      <p>Modal Content</p>
    </Modal>
  );

  expect(screen.getByText('Test Modal')).toBeDefined();
  expect(screen.getByText('Modal Content')).toBeDefined();
  expect(screen.getByText('Confirm')).toBeDefined();
  expect(screen.getByText('Cancel')).toBeDefined();
});

test('does not render modal when show is false', () => {
  render(
    <Modal show={false} onClose={() => {}}>
      <p>Modal Content</p>
    </Modal>
  );
  const modal = screen.queryByText('Modal Content');
  expect(modal).toBeNull();
});

test('call onClose when close icon is clicked', () => {
  const handleClose = jest.fn();

  render(
    <Modal show={true} onClose={handleClose}>
      <p>Modal Content</p>
    </Modal>
  );

  fireEvent.click(screen.getByText('×'));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('calls action handlers when buttons are clicked', () => {
  const handlePrimaryAction = jest.fn();
  const handleSecondaryAction = jest.fn();

  render(
    <Modal
      show={true}
      onClose={() => {}}
      primaryActionLabel="Confirm"
      secendoryActionLabel="Cancel"
      onPrimaryActionClick={handlePrimaryAction}
      onSeconderyActionClick={handleSecondaryAction}
    >
      <p>Modal Content</p>
    </Modal>
  );

  fireEvent.click(screen.getByText('Confirm'));
  expect(handlePrimaryAction).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByText('Cancel'));
  expect(handleSecondaryAction).toHaveBeenCalledTimes(1);
});
