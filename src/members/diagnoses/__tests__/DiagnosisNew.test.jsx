import {renderWithRouterAndMemberContext, screen} from '../../../../__tests__/test-tools';
import getDate from "../../../helpers/getDate.jsx"
import DiagnosisNew from '../DiagnosisNew';

describe('DiagnosisNew', () => {
    it('renders the DiagnosisNew component', () => {
      renderWithRouterAndMemberContext(<DiagnosisNew getDate={getDate}/>);
      screen.debug(); 
    });

    it("matches snapshot", function() {
      const { asFragment } = renderWithRouterAndMemberContext(<DiagnosisNew getDate={getDate}/>);
      expect(asFragment()).toMatchSnapshot();
    });

  });
