import { renderWithRouter, screen } from '../../../__tests__/test-tools';
import Loading from '../Loading'

describe('Loading', () => {
  it('renders the Loading component', () => {
    renderWithRouter(<Loading />)
    screen.debug(); // prints out the jsx in the Loading component unto the command line
  })
})

it("matches snapshot", function() {
    const { asFragment } = renderWithRouter(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });

