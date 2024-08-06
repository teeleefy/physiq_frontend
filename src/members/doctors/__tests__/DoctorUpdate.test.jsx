import { renderWithRouterAndMemberContext, screen } from '../../../../__tests__/test-tools';
import DoctorUpdate from '../DoctorUpdate'


describe('DoctorUpdate', () => {
  it('renders the DoctorUpdate component', () => {
    renderWithRouterAndMemberContext(<DoctorUpdate />)
    
    screen.debug(); 
  })

  it("matches snapshot", function() {
    const { asFragment } = renderWithRouterAndMemberContext(<DoctorUpdate />);
    expect(asFragment()).toMatchSnapshot();
  });

})
