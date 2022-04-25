import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  render(<App />);

  // add scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const chocolateInput = screen.getByRole('spinbutton', {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '1');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  userEvent.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsTotal = screen.getByRole('heading', {
    name: 'Scoops: $4.00',
  });
  expect(scoopsTotal).toBeInTheDocument();

  const toppingstotal = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingstotal).toBeInTheDocument();

  const grandTotal = screen.getByRole('heading', {
    name: 'Total $5.50',
  });
  expect(grandTotal).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('1 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // accept terms and conditions and click confirm order button
  const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditionsCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  });
  userEvent.click(confirmOrderButton);

  // confirm "loading" text is on the screen
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // confirm "loading" text is not on the screen
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal2 = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal2).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('Toppings header is not on summary page if no toppings ordered', async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  userEvent.click(orderButton);

  // check summary information based on order
  const scoopsTotal = screen.getByRole('heading', {
    name: 'Scoops: $2.00',
  });
  expect(scoopsTotal).toBeInTheDocument();

  // expect toppings element to not display
  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
