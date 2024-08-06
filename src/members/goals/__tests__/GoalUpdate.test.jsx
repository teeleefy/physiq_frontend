import { renderWithRouterAndMemberContext, screen } from '../../../../__tests__/test-tools';
import GoalUpdate from '../GoalUpdate'


describe('GoalUpdate', () => {
  it('renders the GoalUpdate component', () => {
    renderWithRouterAndMemberContext(<GoalUpdate />)
    
    screen.debug(); // prints out the jsx in the GoalUpdate component unto the command line
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndMemberContext(<GoalUpdate />);
    expect(asFragment()).toMatchSnapshot();
  });

})
