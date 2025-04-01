import { SokiInvocatorClient } from '#basis/lib/SokiInvocator.client';
import { CmCatSokiInvocatorModel } from 'shared/api/invocators/cm/cat-invocators.model';
import { CmComExternalsSokiInvocatorModel } from 'shared/api/invocators/cm/com-externals-invocators.model';
import { CmComSokiInvocatorModel } from 'shared/api/invocators/cm/com-invocators.model';
import { CmComOrderSokiInvocatorModel } from 'shared/api/invocators/cm/com-order-invocators.model';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocators.model';

export const cmCatClientInvocatorMethods =
  new (class CmCatSokiInvocatorClient extends SokiInvocatorClient<CmCatSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmCatSokiInvocatorClient',
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

export const cmComClientInvocatorMethods =
  new (class CmComSokiInvocatorClient extends SokiInvocatorClient<CmComSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmComSokiInvocatorClient',
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

          printComwVisit: true,
          takeComwVisitsCount: true,
          takeRemovedComs: true,
          getComwVisits: true,
        },
      });
    }
  })();

export const cmComExternalsClientInvocatorMethods =
  new (class CmComExternalsSokiInvocatorClient extends SokiInvocatorClient<CmComExternalsSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmComExternalsSokiInvocatorClient',
        methods: {
          setInScheduleEvent: true,
          getScheduleEventHistory: true,
          removeScheduleEventHistoryItem: true,
        },
      });
    }
  })();

export const cmComOrderClientInvocatorMethods =
  new (class CmComOrderSokiInvocatorClient extends SokiInvocatorClient<CmComOrderSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmComOrderSokiInvocatorClient',
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
  new (class CmEditorSokiInvocatorClient extends SokiInvocatorClient<CmEditorSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmEditorSokiInvocatorClient',
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
