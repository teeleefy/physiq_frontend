import { renderWithRouterAndMemberContext, screen } from '../../../__tests__/test-tools';
import MemberNavBar from '../MemberNavBar'


describe('MemberNavBar', () => {
  it('renders the MemberNavBar component', () => {
    renderWithRouterAndMemberContext(<MemberNavBar />)
    
    screen.debug(); 
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndMemberContext(<MemberNavBar />);
    expect(asFragment()).toMatchSnapshot();
  });

})
