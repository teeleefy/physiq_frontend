import { renderWithRouterAndMemberContext, screen } from '../../../../__tests__/test-tools';
import GoalNew from '../GoalNew'


describe('Goal New', () => {
  it('renders the GoalNew component', () => {
    renderWithRouterAndMemberContext(<GoalNew />)
    
    screen.debug(); // prints out the jsx in the GoalNew component unto the command line
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndMemberContext(<GoalNew />);
    expect(asFragment()).toMatchSnapshot();
  });

})
