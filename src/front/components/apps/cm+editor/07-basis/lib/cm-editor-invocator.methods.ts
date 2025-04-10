import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmEditCatSokiInvocatorModel } from 'shared/api/invocators/cm/edit-cat-invocators.model';
import { CmEditComExternalsSokiInvocatorModel } from 'shared/api/invocators/cm/edit-com-externals-invocators.model';
import { CmEditComSokiInvocatorModel } from 'shared/api/invocators/cm/edit-com-invocators.model';
import { CmEditComOrderSokiInvocatorModel } from 'shared/api/invocators/cm/edit-com-order-invocators.model';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocators.model';

export const cmEditCatClientInvocatorMethods =
  new (class CmEditCat extends SokiInvocatorClient<CmEditCatSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmEditCat',
        methods: {
          rename: true,

          toggleComExistence: true,
          removeNativeComNum: true,
          setNativeComNum: true,
          setKind: true,
          clearStack: true,

          remove: true,
          bringBackToLife: true,
        },
      });
    }
  })();

export const cmEditComClientInvocatorMethods =
  new (class CmEditCom extends SokiInvocatorClient<CmEditComSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmEditCom',
        methods: {
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

          takeRemovedComs: true,
        },
      });
    }
  })();

export const cmEditComExternalsClientInvocatorMethods =
  new (class CmEditComExternals extends SokiInvocatorClient<CmEditComExternalsSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmEditComExternals',
        methods: {
          setInScheduleEvent: true,
          getScheduleEventHistory: true,
          removeScheduleEventHistoryItem: true,
        },
      });
    }
  })();

export const cmEditComOrderClientInvocatorMethods =
  new (class CmEditComOrder extends SokiInvocatorClient<CmEditComOrderSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmEditComOrder',
        methods: {
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
        },
      });
    }
  })();

export const cmEditorClientInvocatorMethods =
  new (class CmEditor extends SokiInvocatorClient<CmEditorSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmEditor',
        methods: {
          requestFreshes: true,

          setChords: true,
          setEEWords: true,
          getMp3RulesList: true,
          setMp3Rule: true,
          addMp3Rule: true,
          getResourceHTMLString: true,
          watchComBusies: true,
          unwatchComBusies: true,
        },
      });
    }
  })();
