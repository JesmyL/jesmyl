import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { cmIDB } from '$cm/ext';
import { CmComWid } from 'shared/api';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { cmEditorComChordEditsHistoryAtom, cmEditorComTextsEditsHistoryAtom } from '../state/atoms';
import { cmComEditorAudioMarksEditPacksAtom, comEditorBusiesAtom } from '../state/com';

export const cmEditCatClientTsjrpcMethods = new (class CmEditCat extends TsjrpcClient<CmEditCatTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCat',
    });
  }
})();

const makeOnChangeBlock = (atom: typeof cmEditorComTextsEditsHistoryAtom, col: 'c' | 't') => {
  return async ({ comw, texti }: { texti: number; comw: CmComWid }) => {
    const text = (await cmIDB.tb.coms.get(comw))?.[col]?.[texti];
    if (!text) return;

    atom.do.update(history => {
      history[comw] ??= {};
      history[comw][texti] = Array.from(new Set([text].concat(history[comw][texti] ?? [])));
    });
  };
};

const makeCleaner = (atom: typeof cmEditorComTextsEditsHistoryAtom) => {
  return (args: { comw: CmComWid }) => atom.do.update(history => (history[args.comw] = {}));
};

export const cmEditComClientTsjrpcMethods = new (class CmEditCom extends TsjrpcClient<CmEditComTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCom',
      methods: {
        changeTextBlock: { beforeSend: makeOnChangeBlock(cmEditorComTextsEditsHistoryAtom, 't') },
        insertTextBlock: { beforeSend: makeCleaner(cmEditorComTextsEditsHistoryAtom) },
        removeTextBlock: { beforeSend: makeCleaner(cmEditorComTextsEditsHistoryAtom) },

        changeChordBlock: { beforeSend: makeOnChangeBlock(cmEditorComChordEditsHistoryAtom, 'c') },
        insertChordBlock: { beforeSend: makeCleaner(cmEditorComChordEditsHistoryAtom) },
        removeChordBlock: { beforeSend: makeCleaner(cmEditorComChordEditsHistoryAtom) },
      },
    });
  }
})();

export const cmEditComExternalsClientTsjrpcMethods =
  new (class CmEditComExternals extends TsjrpcClient<CmEditComExternalsTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComExt',
        methods: {
          updateAudioMarks_v2: {
            onResponse: ({ marks, comw }) => {
              cmIDB.tb.comAudioTrackMarks_v2.put({ marks, comw });
              cmComEditorAudioMarksEditPacksAtom.do.removeMarks(comw, marks);
            },
          },
          changeAudioMarkTime_v1: {
            onResponse: pack => {
              if (!pack) return;
              cmIDB.tb.comAudioTrackMarks_v2.put({ marks: pack.marks, comw: pack.comw });
              cmComEditorAudioMarksEditPacksAtom.do.removeMarks(pack.comw, pack.marks);
            },
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
      });
    }
  })();

export const cmEditorClientTsjrpcMethods = new (class CmEditor extends TsjrpcClient<CmEditorTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditor',
      methods: {
        watchComBusies: { onResponse: () => comEditorBusiesAtom.set([]) },
      },
    });
  }
})();
