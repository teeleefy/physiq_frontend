import { renderWithRouter, screen } from '../../../../__tests__/test-tools';
import InsuranceCard from '../InsuranceCard'

let insurance={type: 'Medical', company_name: "Medicare", insured_name: "John K. Smith", start_date: "2024-01-01", end_date: "2024-12-31", group_num: "123456", contract_num: "DSA9888DSSFI", notes: "Free health insurance. Remember to fill out paperwork again in November to reapply for free program." }
let memberId=1000;

describe('Insurance', () => {
  it('renders the Insurance component', () => {
    renderWithRouter(<InsuranceCard insurance={insurance} memberId={memberId}/>)
    
    screen.debug(); // prints out the jsx in the Insurance component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<InsuranceCard insurance={insurance} memberId={memberId}/>);
  expect(asFragment()).toMatchSnapshot();
});