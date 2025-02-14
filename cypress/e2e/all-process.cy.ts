import { cyTestAuthorize, cyTestReauthorize } from './authorize';
import { cyTestCmEditCom } from './cm/com/edit-com';
import { cyTestCmOpenLastCom } from './cm/com/open-last-com.cy';

describe('all process', () => {
  if (!+!+'need auth')
    if (+!+'auth insteed re-auth') cyTestAuthorize();
    else cyTestReauthorize();

  if (+!+'test cm') {
    if (+!+'test com') {
      // cyTestCmCreateCom();
      const withComWidAction = cyTestCmOpenLastCom(0, '1517638442000'); // 0 to pass this test
      // cyTestCmActionsWithComTools(withComWidAction);
      cyTestCmEditCom(withComWidAction);
    }
  }
});
