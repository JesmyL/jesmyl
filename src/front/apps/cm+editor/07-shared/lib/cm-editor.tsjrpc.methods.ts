import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { mylib } from '#shared/lib/my-lib';
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
      methods: {},
    });
  }
})();

const makeOnChangeBlock = (atom: typeof cmEditorComTextsEditsHistoryAtom, col: 't' | 'c') => {
  return async (args: { texti: number; comw: CmComWid; value: string }) => {
    const text = (await cmIDB.tb.coms.get(args.comw))?.[col]?.[args.texti];
    if (!text) return;

    atom.do.setPartial(prev => ({
      [args.comw]: {
        ...prev[args.comw],
        [args.texti]: Array.from(new Set([text].concat(prev[args.comw]?.[args.texti] ?? []))),
      },
    }));
  };
};

export const cmEditComClientTsjrpcMethods = new (class CmEditCom extends TsjrpcClient<CmEditComTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCom',
      methods: {
        changeTextBlock: { beforeSend: makeOnChangeBlock(cmEditorComTextsEditsHistoryAtom, 't') },
        changeChordBlock: { beforeSend: makeOnChangeBlock(cmEditorComChordEditsHistoryAtom, 'c') },

        insertTextBlock: {
          beforeSend: async args => cmEditorComTextsEditsHistoryAtom.do.setPartial({ [args.comw]: {} }),
        },

        insertChordBlock: {
          beforeSend: async args => cmEditorComChordEditsHistoryAtom.do.setPartial({ [args.comw]: {} }),
        },
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
            onResponse: ({ marks, src }) => {
              cmIDB.tb.audioTrackMarks.put({ marks, src });
              cmComEditorAudioMarksEditPacksAtom.do.removeMarks(src, mylib.keys(marks));
            },
          },
          changeAudioMarkTime: {
            onResponse: pack => {
              if (pack == null) return;
              cmIDB.tb.audioTrackMarks.put({ marks: pack.marks, src: pack.src });
              cmComEditorAudioMarksEditPacksAtom.do.removeMarks(pack.src, mylib.keys(pack.marks));
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
        methods: {},
      });
    }
  })();

export const cmEditorClientTsjrpcMethods = new (class CmEditor extends TsjrpcClient<CmEditorTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditor',
      methods: {},
    });
  }
})();
