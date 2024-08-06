import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import getDate from "../../../helpers/getDate.jsx"
import VisitNew from '../VisitNew';

describe('VisitNew', () => {
    it('renders the SymptomNew component', () => {
      renderWithRouterAndMemberContext(<VisitNew getDate={getDate}/>);
      screen.debug(); 
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<VisitNew getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });