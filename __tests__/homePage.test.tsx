import {
  render,
  screen
} from '@testing-library/react';
import HomePage from '../src/ui/pages/HomePage';

describe('HomePage', () => {
  it('Renders a heading about front-end tech', () => {
    render(<HomePage />);

    const feHeading = screen.getByRole('heading', {
      name: 'FRONT-END: Material UI v5 with Next.js 12.1.6 and emotion/styled 11.10 in TypeScript.',
    });
    expect(feHeading).toBeInTheDocument();
  });

  it('Renders a heading about dev ops tech', () => {
    render(<HomePage />);

    const opsHeading = screen.getByRole('heading', {
      name: 'CI ACTIONS: ESLint (Airbnb) integration with Next and Jest/React testing libraries integration with Next.',
    });
    expect(opsHeading).toBeInTheDocument();
  });

  it('Renders a heading about boilerplate code', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', {
      name: 'Boilerplate for building faster.',
    });
    expect(heading).toBeInTheDocument();
  });
});
