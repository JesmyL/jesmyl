/* eslint-disable no-constant-condition */
import { cyTestAuthorize, cyTestReauthorize } from './authorize';
import { cyTestCmActionsWithComTools } from './cm/com/actions-with-com-tools';
import { cyTestCmCreateCom } from './cm/com/create-com.cy';
import { cyTestCmEditCom } from './cm/com/edit-com';
import { cyTestCmOpenLastCom } from './cm/com/open-last-com.cy';

const canDo: Record<string, boolean> = {};

describe('all process', () => {
  if ((canDo.isNeedAuth = !true))
    if ((canDo.isAuthInsteedReauth = true)) cyTestAuthorize();
    else cyTestReauthorize();

  if ((canDo.isTestCm = true)) {
    if ((canDo.isTestCmCom = true)) {
      cyTestCmCreateCom();
      const withComWidAction = cyTestCmOpenLastCom(500, '1517638442000'); // 0 to pass this test
      cyTestCmActionsWithComTools(withComWidAction);
      cyTestCmEditCom(withComWidAction);
    }
  }
});
