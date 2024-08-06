import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import Med from '../Med'

let med={name: "Lisinopril", indication: "High blood pressure", dose: "25mg twice a day", startDate: "2023-12-20", endDate: "2024-12-20", prescriber: "Dr. Jones", notes: "Take with food."}
let memberId=1000;

describe('Med', () => {
  it('renders the Med component', () => {
    renderWithRouter(<Med med={med} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Med component unto the command line
  })
})

it("matches snapshot", function() {
    const { asFragment } = renderWithRouter(<Med med={med} memberId={memberId}/>);
    expect(asFragment()).toMatchSnapshot();
  });