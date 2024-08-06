import {renderWithRouterAndFamilyContext, screen} from '../../../__tests__/test-tools';
import FamilyProfile from '../FamilyProfile';

describe('FamilyProfile', () => {
    it('renders the FamilyProfile component', () => {
      renderWithRouterAndFamilyContext(<FamilyProfile/>);
      screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndFamilyContext(<FamilyProfile />);
      expect(asFragment()).toMatchSnapshot();
    });

  });
