import { renderWithRouterAndFamilyContext, renderWithRouterAndLoggedOutContext, screen } from '../../../__tests__/test-tools';
import NavBar from '../NavBar'

describe('NavBar when logged out', () => {
  it('renders the NavBar component when logged out', () => {
    renderWithRouterAndLoggedOutContext(<NavBar />)
    
    screen.debug(); // prints out the jsx in the Home component unto the command line
  })

  it("matches snapshot when logged out", function() {
    const { asFragment } = renderWithRouterAndLoggedOutContext(<NavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
})

describe('NavBar with Family Context', () => {
  it('renders the NavBar component', () => {
    renderWithRouterAndFamilyContext(<NavBar />)
    
    screen.debug(); // prints out the jsx in the Home component unto the command line
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndFamilyContext(<NavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
})

