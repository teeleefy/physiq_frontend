import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import getDate from "../../../helpers/getDate.jsx"
import InsuranceUpdate from '../InsuranceUpdate';

describe('InsuranceUpdate', () => {
    it('renders the InsuranceUpdate component', () => {
      renderWithRouterAndMemberContext(<InsuranceUpdate getDate={getDate}/>);
      screen.debug(); 
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<InsuranceUpdate getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });