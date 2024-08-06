import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import Allergy from '../Allergy'

let allergy={name: "bees", reaction: "hives", notes: "Carry epipen."}
let memberId=1000;

describe('Allergy', () => {
  it('renders the Allergy component', () => {
    renderWithRouter(<Allergy allergy={allergy} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Allergy component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<Allergy allergy={allergy} memberId={memberId}/>);
  expect(asFragment()).toMatchSnapshot();
});