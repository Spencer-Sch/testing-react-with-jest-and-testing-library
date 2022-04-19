import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

describe('Checkbox and button tests', () => {
  test('Checkbox is present and unchecked, button is pressent and disabled', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });

    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole('button', { name: 'Confirm order' });

    expect(button).toBeDisabled();
  });

  test('Checkbox enables button on first click and siables on second click', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: 'Confirm order' });

    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});

describe('Popover tests', () => {
  test('popover responds to hover', () => {
    render(<SummaryForm />);

    // popover starts out hidden

    // popover appears upon mouseover of checkbox label

    // popover disapears when we mouse out
  });
});
