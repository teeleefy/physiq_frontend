import { renderWithRouter, screen } from '../../../__tests__/test-tools';
import FamilyMember from '../FamilyMember'

let familyMember={firstName: "Sarah", lastName: "Smith", birthday: "1980-09-03"}


describe('FamilyMember', () => {
  it('renders the FamilyMember component', () => {
    renderWithRouter(<FamilyMember familyMember={familyMember} />)
    
    screen.debug(); // prints out the jsx in the FamilyMember component unto the command line
  })

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<FamilyMember familyMember={familyMember} />);
  expect(asFragment()).toMatchSnapshot();
});

})
