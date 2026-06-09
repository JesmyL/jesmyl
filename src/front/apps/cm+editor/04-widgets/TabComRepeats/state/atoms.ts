import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { IEditableComLineProps } from '$cm+editor/shared/model/Repeats';
import { atom } from 'atomaric';
import { CSSProperties } from 'react';
import { CmComOrderWid, CmComWid, OrderRepeats } from 'shared/api';
import { makeCmComOrderRepeatOrSelf } from 'shared/utils/cm/repeat-keys';
import { objectKeys, objectLength } from 'shared/utils/object.utils';

export const cmEditorTabComRepeatsOnLoadAtom = atom(new Set<CmComOrderWid>());

export const cmEditorTabComRepeatsStateAtom = atom(
  {
    start: null as IEditableComLineProps | null,
    pos: { '--x': 0, '--y': 0 } as CSSProperties & { '--x': number; '--y': number },
    isChordBlock: false,
    flashCount: 2,
    comw: CmComWid.zero,
  },
  {
    do: (set, get, self) => ({
      reComw: (comw: CmComWid) => {
        set({ ...self.initialValue, comw });
        return () => set({ ...self.initialValue, comw: CmComWid.zero });
      },

      $setField: async (ord: EditableComOrder | nil, repeateds: OrderRepeats | nil, prevs?: OrderRepeats | nil) => {
        const comw = get().comw;
        if (comw === CmComWid.zero || !ord) return;

        const ordw = ord.me.isAnchorInherit ? ord.wid : (ord.me.leadOrd?.wid ?? ord.wid);
        cmEditorTabComRepeatsOnLoadAtom.do.add(ordw);
        cmEditorTabComRepeatsStateAtom.do.reComw(comw);

        const repeats = { ...makeCmComOrderRepeatOrSelf(prevs), ...makeCmComOrderRepeatOrSelf(repeateds) };
        if (repeats['.'] === 0) delete repeats['.'];
        const keys = objectKeys(repeats);

        const value =
          (objectLength(keys) ? (objectLength(keys) === 1 && keys[0] === '.' ? repeats['.'] : repeats) : 0) ?? 0;

        await cmEditComOrderClientTsjrpcMethods.setRepeats({
          comw,
          ordw: ord.wid,
          value,
        });

        cmEditorTabComRepeatsOnLoadAtom.do.delete(ordw);
      },
    }),
  },
);
