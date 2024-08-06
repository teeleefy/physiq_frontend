import { renderWithRouter, screen } from '../../../__tests__/test-tools';
import NotFound from '../NotFound'

describe('NotFound', () => {
  it('renders the NotFound component', () => {
    renderWithRouter(<NotFound />)
    screen.debug(); // prints out the jsx in the NotFound component unto the command line
  })
})

it("matches snapshot", function() {
    const { asFragment } = renderWithRouter(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });

