import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmCatSokiInvocatorModel } from 'shared/api/invocators/cm/cat-invocators.model';
import { CmComExternalsSokiInvocatorModel } from 'shared/api/invocators/cm/com-externals-invocators.model';
import { CmComSokiInvocatorModel } from 'shared/api/invocators/cm/com-invocators.model';
import { CmComOrderSokiInvocatorModel } from 'shared/api/invocators/cm/com-order-invocators.model';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocators.model';

class CmCatSokiInvocatorClient extends SokiInvocatorClient<CmCatSokiInvocatorModel> {}
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

class CmComSokiInvocatorClient extends SokiInvocatorClient<CmComSokiInvocatorModel> {}
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
  destroy: true,
  bringBackToLife: true,

  printComwVisit: true,
  takeComwVisitsCount: true,
  takeRemovedComs: true,
});

class CmComExternalsSokiInvocatorClient extends SokiInvocatorClient<CmComExternalsSokiInvocatorModel> {}
export const cmComExternalsClientInvocatorMethods = new CmComExternalsSokiInvocatorClient(
  'CmComExternalsSokiInvocatorClient',
  {
    setInScheduleEvent: true,
    getScheduleEventHistory: true,
    removeScheduleEventHistoryItem: true,
  },
);

class CmComOrderSokiInvocatorClient extends SokiInvocatorClient<CmComOrderSokiInvocatorModel> {}
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
  removeRepeats: true,
});

class CmEditorSokiInvocatorClient extends SokiInvocatorClient<CmEditorSokiInvocatorModel> {}
export const cmEditorClientInvocatorMethods = new CmEditorSokiInvocatorClient('CmEditorSokiInvocatorClient', {
  requestFreshes: true,

  setChords: true,
  setEEWords: true,
  getMp3RulesList: true,
  setMp3Rule: true,
  addMp3Rule: true,
  getResourceHTMLString: true,
  watchComBusies: true,
  unwatchComBusies: true,
});
