import { MyLib, mylib } from '#shared/lib/my-lib';
import { atom } from 'atomaric';
import { CmComAudioMarkEditPack, CmComAudioMarkPack, CmComAudioMarkPackTime, CmComWid, HttpLink } from 'shared/api';
import { ComEditBusy } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';

export const removedCompositionsAtom = atom<PRecord<CmComWid, string>>({});
export const comEditorBusiesAtom = atom<ComEditBusy[]>([]);

export const cmComEditorAudioMarksEditPacksAtom = atom({} as PRecord<HttpLink, CmComAudioMarkEditPack>, {
  do: (set, get, self) => ({
    putMarks: (comw: CmComWid, src: HttpLink, cMarks: CmComAudioMarkEditPack[CmComWid]) => {
      self.do.setPartial({ [src]: { ...get()[src], [comw]: { ...get()[src]?.[comw], ...cMarks } } });
    },
    removeMark: (comw: CmComWid, src: HttpLink, time: RKey<CmComAudioMarkPackTime>) => {
      const newMarks: CmComAudioMarkEditPack = { ...get()[src] };
      newMarks[comw] = { ...get()[src]?.[comw] };

      if (newMarks[comw][time] === `+${time}+`) delete newMarks[comw][time];
      else newMarks[comw][time] = null;

      self.do.setPartial({ [src]: newMarks });
    },
    renameMark: (comw: CmComWid, src: HttpLink, time: RKey<number>, title: string) => {
      self.do.setPartial({ [src]: { ...get()[src], [comw]: { [time]: title } } });
    },
    removeMarks: (src: HttpLink, cMarks: CmComAudioMarkPack | und) => {
      if (cMarks == null) return;

      MyLib.entries(cMarks).forEach(([comwStr, comMarks]) => {
        if (comMarks == null) return;

        const newMarks: CmComAudioMarkEditPack = { ...get()[src] };
        const comNewMarks: CmComAudioMarkEditPack[CmComWid] = (newMarks[comwStr] = { ...get()[src]?.[comwStr] });

        mylib.keys(comMarks).forEach(time => delete comNewMarks[time]);

        mylib.keys(comNewMarks).forEach(time => {
          if (comMarks[time] == null) delete comNewMarks[time];
        });

        if (!mylib.keys(comNewMarks).length) {
          const newMarks = { ...get() };
          delete newMarks[src];
          set(newMarks);
        } else self.do.setPartial({ [src]: newMarks });
      });
    },
  }),
});
