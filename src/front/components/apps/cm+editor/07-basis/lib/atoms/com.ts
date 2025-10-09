import { MyLib, mylib } from '#shared/lib/my-lib';
import { atom } from 'atomaric';
import { CmComAudioMarkEditPack, CmComWid, HttpLink } from 'shared/api';
import { ComEditBusy } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';

export const removedCompositionsAtom = atom<PRecord<CmComWid, string>>({});
export const comEditorBusiesAtom = atom<ComEditBusy[]>([]);

export const cmComEditorAudioMarksEditPacksAtom = atom({} as PRecord<HttpLink, CmComAudioMarkEditPack>, {
  do: (set, get, self) => ({
    putMarks: (src: HttpLink, marks: CmComAudioMarkEditPack) => {
      self.do.setPartial({ [src]: { ...get()[src], ...marks } });
    },
    removeMark: (src: HttpLink, time: RKey<number>) => {
      const newMarks: CmComAudioMarkEditPack = { ...get()[src] };

      if (newMarks[time] === `+${time}+`) delete newMarks[time];
      else newMarks[time] = null;

      self.do.setPartial({ [src]: newMarks });
    },
    removeMarks: (src: HttpLink, times: RKey<number>[]) => {
      const newMarks: CmComAudioMarkEditPack = { ...get()[src] };
      times.forEach(time => delete newMarks[time]);
      MyLib.entries(newMarks).forEach(([time, selector]) => {
        if (selector == null) delete newMarks[time];
      });

      if (!mylib.keys(newMarks).length) {
        const newMarks = { ...get() };
        delete newMarks[src];
        set(newMarks);
      } else self.do.setPartial({ [src]: newMarks });
    },
  }),
});
