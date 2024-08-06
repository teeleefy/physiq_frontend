import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import Goal from '../Goal'

let goal={goalName: "Make appointment with Dr. Jones", goalDetails: "Need to discuss medication and get labs done."}
let memberId=1000;

describe('Goal', () => {
  it('renders the Goal component', () => {
    renderWithRouter(<Goal goal={goal} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Goal component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<Goal goal={goal} memberId={memberId}/>);
  expect(asFragment()).toMatchSnapshot();
});