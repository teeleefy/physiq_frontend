import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import getDate from "../../../helpers/getDate.jsx"
import InsuranceNew from '../InsuranceNew';

describe('InsuranceNew', () => {
    it('renders the InsuranceNew component', () => {
      renderWithRouterAndMemberContext(<InsuranceNew getDate={getDate}/>);
      screen.debug(); 
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<InsuranceNew getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });