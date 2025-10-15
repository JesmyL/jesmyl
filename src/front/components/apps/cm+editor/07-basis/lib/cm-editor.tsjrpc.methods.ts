import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { mylib } from '#shared/lib/my-lib';
import { cmIDB } from 'front/apps/cm/07-shared/state/cmIDB';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { cmComEditorAudioMarksEditPacksAtom } from './atoms/com';

export const cmEditCatClientTsjrpcMethods = new (class CmEditCat extends TsjrpcClient<CmEditCatTsjrpcModel> {
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

export const cmEditComClientTsjrpcMethods = new (class CmEditCom extends TsjrpcClient<CmEditComTsjrpcModel> {
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
        toggleAudioLink: true,

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

export const cmEditComExternalsClientTsjrpcMethods =
  new (class CmEditComExternals extends TsjrpcClient<CmEditComExternalsTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComExternals',
        methods: {
          setInScheduleEvent: true,
          getScheduleEventHistory: true,
          getScheduleEventHistoryStatistic: true,
          removeScheduleEventHistoryItem: true,
          updateAudioMarks: ({ marks, src }) => {
            cmIDB.tb.audioTrackMarks.put({ marks, src });
            cmComEditorAudioMarksEditPacksAtom.do.removeMarks(src, mylib.keys(marks));
          },
          changeAudioMarkTime: pack => {
            if (pack == null) return;
            cmIDB.tb.audioTrackMarks.put({ marks: pack.marks, src: pack.src });
            cmComEditorAudioMarksEditPacksAtom.do.removeMarks(pack.src, mylib.keys(pack.marks));
          },
        },
      });
    }
  })();

export const cmEditComOrderClientTsjrpcMethods =
  new (class CmEditComOrder extends TsjrpcClient<CmEditComOrderTsjrpcModel> {
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
          trimOverPositions: true,
          setModulationValue: true,
          removeRepeats: true,
        },
      });
    }
  })();

export const cmEditorClientTsjrpcMethods = new (class CmEditor extends TsjrpcClient<CmEditorTsjrpcModel> {
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
        updateConstantsConfig: true,
      },
    });
  }
})();
