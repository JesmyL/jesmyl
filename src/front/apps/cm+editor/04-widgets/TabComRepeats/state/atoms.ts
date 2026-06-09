import { EditableComOrder } from '$cm+editor/shared/classes/EditableComOrder';
import { cmEditComOrderClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { IEditableComLineProps } from '$cm+editor/shared/model/Repeats';
import { atom } from 'atomaric';
import { CSSProperties } from 'react';
import { CmComWid, OrderRepeats } from 'shared/api';
import { makeCmComOrderRepeatOrSelf } from 'shared/utils/cm/repeat-keys';
import { objectKeys, objectLength } from 'shared/utils/object.utils';

export const cmEditorTabComRepeatsStateAtom = atom(
  {
    start: null as IEditableComLineProps | null,
    pos: { '--x': 0, '--y': 0 } as CSSProperties & { '--x': number; '--y': number },
    isChordBlock: false,
    flashCount: 2,
    comw: CmComWid.def,
  },
  {
    do: (set, get, self) => ({
      reComw: (comw: CmComWid) => set({ ...self.initialValue, comw }),
      $setField: async (ord?: EditableComOrder | null, repeateds?: OrderRepeats | nil, prevs?: OrderRepeats | nil) => {
        const comw = get().comw;
        if (comw === CmComWid.def || !ord) return;

        const repeats = { ...makeCmComOrderRepeatOrSelf(prevs), ...makeCmComOrderRepeatOrSelf(repeateds) };
        if (repeats['.'] === 0) delete repeats['.'];
        const keys = objectKeys(repeats);

        const value =
          (objectLength(keys) ? (objectLength(keys) === 1 && keys[0] === '.' ? repeats['.'] : repeats) : 0) ?? 0;

        await cmEditComOrderClientTsjrpcMethods.setRepeats({
          ordw: ord.wid,
          comw: comw,
          value,
        });

        self.do.reComw();
      },
    }),
  },
);
