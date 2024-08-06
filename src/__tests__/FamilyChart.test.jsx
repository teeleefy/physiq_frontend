import { renderWithRouterAndFamilyContext, renderWithRouterAndLoggedOutContext, screen } from '../../__tests__/test-tools';
import FamilyChart from '../FamilyChart'

describe('FamilyChart when logged out', () => {
  it('renders the FamilyChart component when logged out', () => {
    renderWithRouterAndLoggedOutContext(<FamilyChart />)
    
    screen.debug(); // prints out the jsx in the FamilyChart component unto the command line
  })

  it("matches snapshot when logged out", function() {
    const { asFragment } = renderWithRouterAndLoggedOutContext(<FamilyChart />);
    expect(asFragment()).toMatchSnapshot();
  });
})

describe('FamilyChart with Family Context', () => {
  it('renders the FamilyChart component', () => {
    renderWithRouterAndFamilyContext(<FamilyChart />)
    
    screen.debug(); // prints out the jsx in the FamilyChart component unto the command line
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndFamilyContext(<FamilyChart />);
    expect(asFragment()).toMatchSnapshot();
  });
})


