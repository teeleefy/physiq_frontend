import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import getDate from "../../../helpers/getDate.jsx"
import SymptomUpdate from '../SymptomUpdate';

describe('SymptomUpdate', () => {
    it('renders the SymptomNew component', () => {
      renderWithRouterAndMemberContext(<SymptomUpdate getDate={getDate}/>);
      screen.debug(); 
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<SymptomUpdate getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });