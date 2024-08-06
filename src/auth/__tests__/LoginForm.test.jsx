import { renderWithRouter, screen } from '../../../__tests__/test-tools';
import LoginForm from '../LoginForm'

describe('LoginForm', () => {
  it('renders the LoginForm component', () => {
    renderWithRouter(<LoginForm />)
    
    screen.debug(); // prints out the jsx in the LoginForm component unto the command line
  })
})

it("matches snapshot", function() {
  const { asFragment } = renderWithRouter(<LoginForm />);
  expect(asFragment()).toMatchSnapshot();
});