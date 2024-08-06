import { renderWithRouter, screen } from '../../__tests__/test-tools';
import App from '../App'

describe('App', () => {
  it('renders the App component', () => {
    renderWithRouter(<App />)
    screen.debug(); // prints out the jsx in the App component unto the command line
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouter(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
})




