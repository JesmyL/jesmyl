import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { cmIDB } from '$cm/ext';
import { CmComWid } from 'shared/api';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { CmEditComOrderTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-order.tsjrpc.model';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { cmEditorComChordEditsHistoryAtom, cmEditorComTextsEditsHistoryAtom } from '../state/atoms';
import { cmComEditorAudioMarksEditPacksAtom } from '../state/com';

export const cmEditCatClientTsjrpcMethods = new (class CmEditCat extends TsjrpcClient<CmEditCatTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCat',
    });
  }
})();

const makeOnChangeBlock = (atom: typeof cmEditorComTextsEditsHistoryAtom, col: 'c' | 't') => {
  return async (args: { texti: number; comw: CmComWid }) => {
    const text = (await cmIDB.tb.coms.get(args.comw))?.[col]?.[args.texti];
    if (!text) return;

    atom.do.setDeepPartial(`value/${args.comw}/${args.texti}`, prev => Array.from(new Set([text].concat(prev ?? []))), {
      value: { [args.comw]: {} },
    });
  };
};

const makeCleaner = (atom: typeof cmEditorComTextsEditsHistoryAtom) => {
  return (args: { comw: CmComWid }) => atom.do.setDeepPartial(`value/${args.comw}`, {}, { value: {} });
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
        scope: 'CmEditComExternals',
        methods: {
          updateAudioMarks: {
            onResponse: ({ cMarks, src }) => {
              cmIDB.tb.comAudioTrackMarks.put({ cMarks, src });
              cmComEditorAudioMarksEditPacksAtom.do.removeMarks(src, cMarks);
            },
          },
          changeAudioMarkTime: {
            onResponse: pack => {
              if (pack == null) return;
              cmIDB.tb.comAudioTrackMarks.put({ cMarks: pack.cMarks, src: pack.src });
              cmComEditorAudioMarksEditPacksAtom.do.removeMarks(pack.src, pack.cMarks);
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
    });
  }
})();
