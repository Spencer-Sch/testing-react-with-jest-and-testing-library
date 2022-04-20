import { render, screen } from '@testing-library/react';

import Options from '../Options';

describe('Options.jsx Tests', () => {
  test('display image from each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((img) => img.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  test('display image from each topping option from server', async () => {
    render(<Options optionType="toppings" />);

    // find images
    const toppingImages = await screen.findAllByRole('img', {
      name: /topping$/i,
    });
    expect(toppingImages).toHaveLength(3);

    // confirm alt text of images
    const altText = toppingImages.map((img) => img.alt);
    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });
});
