import { SokiInvocatorClient } from 'front/SokiInvocator.client';
import { CmCatSokiInvocatorMethods } from 'shared/api/invocators/cm/cat-invocators.model';
import { CmComSokiInvocatorMethods } from 'shared/api/invocators/cm/com-invocators.model';
import { CmComOrderSokiInvocatorMethods } from 'shared/api/invocators/cm/com-order-invocators.model';
import { CmOtherSokiInvocatorMethods } from 'shared/api/invocators/cm/other-invocators.model';

class CmCatSokiInvocatorClient extends SokiInvocatorClient<CmCatSokiInvocatorMethods> {}
export const cmCatClientInvocatorMethods = new CmCatSokiInvocatorClient('CmCatSokiInvocatorClient', {
  rename: true,

  toggleComExistence: true,
  removeNativeComNum: true,
  setNativeComNum: true,
  setKind: true,
  clearStack: true,

  remove: true,
  bringBackToLife: true,
});

class CmComSokiInvocatorClient extends SokiInvocatorClient<CmComSokiInvocatorMethods> {}
export const cmComClientInvocatorMethods = new CmComSokiInvocatorClient('CmComSokiInvocatorClient', {
  newCom: true,

  rename: true,
  setBpM: true,
  setMeterSize: true,
  changeLanguage: true,
  changeTon: true,
  makeBemoled: true,
  changePushKind: true,
  setAudioLinks: true,

  changeChordBlock: true,
  changeTextBlock: true,

  insertChordBlock: true,
  insertTextBlock: true,

  removeChordBlock: true,
  removeTextBlock: true,

  remove: true,
  bringBackToLife: true,
});

class CmComOrderSokiInvocatorClient extends SokiInvocatorClient<CmComOrderSokiInvocatorMethods> {}
export const cmComOrderClientInvocatorMethods = new CmComOrderSokiInvocatorClient('CmComOrderSokiInvocatorClient', {
  setRepeats: true,
  clearOwnRepeats: true,
  setType: true,
  bindChordBlock: true,
  toggleVisibility: true,
  toggleAnchorInheritVisibility: true,
  moveOrdAfter: true,
  addAnchorOrder: true,
  setTexti: true,
  toggleVisibilityInMiniMode: true,
  toggleTitleVisibility: true,
  remove: true,
  insertNewBlock: true,
  setPositionsLine: true,
  setModulationValue: true,
});

class CmOtherSokiInvocatorClient extends SokiInvocatorClient<CmOtherSokiInvocatorMethods> {}
export const cmOtherClientInvocatorMethods = new CmOtherSokiInvocatorClient('CmOtherSokiInvocatorClient', {
  setChords: true,
  setEEWords: true,
  getMp3RulesList: true,
  getResourceHTMLString: true,
});
