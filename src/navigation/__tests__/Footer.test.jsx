import { renderWithRouter, screen } from '../../../__tests__/test-tools';
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the Footer component', () => {
    renderWithRouter(<Footer />)
    screen.debug(); // prints out the jsx in the Footer component unto the command line
  })
})

it("matches snapshot", function() {
    const { asFragment } = renderWithRouter(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

