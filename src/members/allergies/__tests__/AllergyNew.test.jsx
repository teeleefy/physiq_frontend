import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import AllergyNew from '../AllergyNew';

describe('AllergyNew', () => {
    it('renders the AllergyNew component', () => {
      renderWithRouterAndMemberContext(<AllergyNew/>);
      screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<AllergyNew />);
      expect(asFragment()).toMatchSnapshot();
    });

  });
