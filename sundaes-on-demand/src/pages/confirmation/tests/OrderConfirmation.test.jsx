import { render, screen } from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderConfirmation from '../OrderConfirmation';

describe('OrderConfirmation.jsx tests', () => {
  test('Error response from server for submiting order', async () => {
    server.resetHandlers(
      rest.post('http://localhost:3030/order', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(
      'An unexpected error occured. Please try again later.'
    );
  });
});
