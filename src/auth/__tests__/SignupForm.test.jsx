import { renderWithRouter, screen } from '../../../__tests__/test-tools';
import SignupForm from '../SignUpForm.jsx';

describe('SignupForm', () => {
  it('renders the LoginForm component', () => {
    renderWithRouter(<SignupForm />)
    
    screen.debug(); // prints out the jsx in the LoginForm component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<SignupForm />);
  expect(asFragment()).toMatchSnapshot();
});