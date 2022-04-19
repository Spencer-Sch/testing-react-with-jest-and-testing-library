import { fireEvent } from '@testing-library/react';
import { render, screen } from '@testing-library/react';

import SummaryForm from '../SummaryForm';

describe('Initial app conditions', () => {
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

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
