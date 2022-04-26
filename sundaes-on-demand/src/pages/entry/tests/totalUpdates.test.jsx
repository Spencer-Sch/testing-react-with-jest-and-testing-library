import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

describe('subtotal update tests', () => {
  test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    // make sure total start out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and chekc the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
  });

  test('update toppings subtotal when toppings are updated', async () => {
    render(<Options optionType="toppings" />);

    const toppingsSubtotal = screen.getByText('Toppings total: $', {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });
});

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('6.00');

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '1');
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '0');
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
