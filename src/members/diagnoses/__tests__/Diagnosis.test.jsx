import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import Diagnosis from '../Diagnosis'

let diagnosis={name: "Hypertension", dateReceived: "2010/01/01", notes: "Controlled by lisinopril."}
let memberId=1000;

describe('Diagnosis', () => {
  it('renders the Diagnosis component', () => {
    renderWithRouter(<Diagnosis diagnosis={diagnosis} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Diagnosis component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<Diagnosis diagnosis={diagnosis} memberId={memberId}/>);
  expect(asFragment()).toMatchSnapshot();
});