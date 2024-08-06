import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import AllergyUpdate from '../AllergyUpdate';

describe('AllergyUpdate', () => {
    it('renders the AllergyUpdate component', () => {
      renderWithRouterAndMemberContext(<AllergyUpdate/>);
      screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<AllergyUpdate />);
      expect(asFragment()).toMatchSnapshot();
    });

  });
