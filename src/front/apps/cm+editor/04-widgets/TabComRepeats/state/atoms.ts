import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { IEditableComLineProps } from '$cm+editor/shared/model/Repeats';
import { atom } from 'atomaric';
import { CSSProperties } from 'react';
import { CmComOrderWid, CmComWid, CmComWidZero, OrderRepeats } from 'shared/api';
import { extractNumber } from 'shared/utils';
import { makeCmComOrderRepeatOrSelf } from 'shared/utils/cm/repeat-keys';
import { objectKeys, objectLength } from 'shared/utils/object.utils';

export const cmEditorTabComRepeatsOnLoadAtom = atom(new Set<CmComOrderWid>());

export const cmEditorTabComRepeatsStateAtom = atom(
  {
    start: null as IEditableComLineProps | null,
    pos: { '--x': 0, '--y': 0 } as CSSProperties & { '--x': number; '--y': number },
    isChordBlock: false,
    flashCount: 2,
    comw: CmComWidZero,
  },
  {
    do: (set, get, self) => ({
      reComw: (comw: CmComWid) => {
        set({ ...self.initialValue, comw });
        return () => set({ ...self.initialValue, comw: CmComWidZero });
      },

      $setField: async (...repArgs: [EditableComOrder | nil, OrderRepeats | nil][]) => {
        const comw = get().comw;
        if (comw === CmComWidZero) return;

        const comwRepeatsDict: Record<CmComOrderWid, OrderRepeats> = {};

        new Map(repArgs).forEach((repeatsTop, ord) => {
          if (!ord) return;
          const ordw = ord.me.isAnchorInherit ? ord.wid : (ord.me.leadOrd?.wid ?? ord.wid);
          cmEditorTabComRepeatsOnLoadAtom.do.add(ordw);
          cmEditorTabComRepeatsStateAtom.do.reComw(comw);

          const repeats = { ...makeCmComOrderRepeatOrSelf(repeatsTop) };
          if (repeats['.'] === 0) delete repeats['.'];
          const keys = objectKeys(repeats);

          const value =
            (objectLength(keys) ? (objectLength(keys) === 1 && keys[0] === '.' ? repeats['.'] : repeats) : 0) ?? 0;

          comwRepeatsDict[ord.wid] = value;
        });

        if (!objectLength(comwRepeatsDict)) return;
        await cmEditComOrderClientTsjrpcMethods.setRepeats_v1({ comw, upd: comwRepeatsDict });

        objectKeys(comwRepeatsDict).forEach(key => cmEditorTabComRepeatsOnLoadAtom.do.delete(extractNumber(key)));
      },
    }),
  },
);
