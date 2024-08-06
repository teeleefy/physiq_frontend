import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import Symptom from '../Symptom'

let symptom={name: "Headache", startDate: "2024-07-20", endDate: "2024-08-01", notes: "Moderate to severe. On and off every day. Worse at night."}
let memberId=1000;

describe('Symptom', () => {
  it('renders the Symptom component', () => {
    renderWithRouter(<Symptom symptom={symptom} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Symptom component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<Symptom symptom={symptom} memberId={memberId}/>);
  expect(asFragment()).toMatchSnapshot();
});