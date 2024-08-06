import { renderWithRouterAndMemberContext, screen } from '../../../../__tests__/test-tools';
import DoctorNew from '../DoctorNew'


describe('DoctorNew', () => {
  it('renders the DoctorNew component', () => {
    renderWithRouterAndMemberContext(<DoctorNew />)
    
    screen.debug(); // prints out the jsx in the DoctorNew component unto the command line
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndMemberContext(<DoctorNew />);
    expect(asFragment()).toMatchSnapshot();
  });

})
