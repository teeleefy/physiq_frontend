import {renderWithRouterAndFamilyContext, screen} from '../../../__tests__/test-tools';
import FamilyMemberNew from '../FamilyMemberNew';

describe('FamilyMemberNew', () => {
    it('renders the FamilyMemberNew component', () => {
      renderWithRouterAndFamilyContext(<FamilyMemberNew/>);
      screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndFamilyContext(<FamilyMemberNew />);
      expect(asFragment()).toMatchSnapshot();
    });

  });
