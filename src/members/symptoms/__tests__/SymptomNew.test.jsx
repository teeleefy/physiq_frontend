import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import getDate from "../../../helpers/getDate.jsx"
import SymptomNew from '../SymptomNew';

describe('SymptomNew', () => {
    it('renders the SymptomNew component', () => {
      renderWithRouterAndMemberContext(<SymptomNew getDate={getDate}/>);
      screen.debug(); 
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<SymptomNew getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });