import {renderWithRouterAndMemberContext, screen} from '../../../__tests__/test-tools';
import getDate from "../../helpers/getDate.jsx"
import Member from '../Member';

describe('Member', () => {
    it('renders the Member component', () => {
      renderWithRouterAndMemberContext(<Member getDate={getDate}/>);
      screen.debug(); 
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<Member getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });