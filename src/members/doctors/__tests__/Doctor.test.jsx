import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import Doctor from '../Doctor'

let doctor={name: "Dr. Jones", specialty: "Pulmonology", clinic: "Main Street Pulmonology", address: "100 Main Street", phone: "(555) 555-5555", notes: "See him for asthma management."}
let memberId=1000;

describe('Doctor', () => {
  it('renders the Doctor component', () => {
    renderWithRouter(<Doctor doctor={doctor} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Doctor component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<Doctor doctor={doctor} memberId={memberId}/>);
  expect(asFragment()).toMatchSnapshot();
});