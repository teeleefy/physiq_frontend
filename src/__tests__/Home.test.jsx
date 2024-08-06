import { renderWithRouterAndFamilyContext, renderWithRouterAndLoggedOutContext, screen } from '../../__tests__/test-tools';
import Home from '../Home'

describe('Home when logged out', () => {
  it('renders the Home component when logged out', () => {
    renderWithRouterAndLoggedOutContext(<Home />)
    
    screen.debug(); // prints out the jsx in the Home component unto the command line
  })

  it("matches snapshot when logged out", function() {
    const { asFragment } = renderWithRouterAndLoggedOutContext(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
})

describe('Home with Family Context', () => {
  it('renders the Home component', () => {
    renderWithRouterAndFamilyContext(<Home />)
    
    screen.debug(); // prints out the jsx in the Home component unto the command line
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndFamilyContext(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
})


