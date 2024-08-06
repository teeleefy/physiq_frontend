import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import Visit from '../Visit'

let visit={title: "Follow-up visit", date: "2023-04-10", doctor: "Dr. Trent", clinic: "Main Street Cardio", notes: "Followed up after open heart surgery."}
let memberId=1000;

describe('Visit', () => {
  it('renders the Visit component', () => {
    renderWithRouter(<Visit visit={visit} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Visit component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<Visit visit={visit} memberId={memberId}/>);
  expect(asFragment()).toMatchSnapshot();
});