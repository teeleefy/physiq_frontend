import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import getDate from "../../../helpers/getDate.jsx"
import MedNew from '../MedNew';

describe('MedNew', () => {
    it('renders the MedNew component', () => {
      renderWithRouterAndMemberContext(<MedNew getDate={getDate}/>);
      screen.debug(); // prints out the jsx in the App component unto the command line
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<MedNew getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });