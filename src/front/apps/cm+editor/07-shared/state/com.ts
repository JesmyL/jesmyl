import { atom } from 'atomaric';
import {
  CmComAudioMarkEditPack,
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComWid,
  HttpNumLeadLink,
} from 'shared/api';
import { ComEditBusy } from 'shared/api/tsjrpc/cm/editor.tsjrpc.shares.model';
import { checkIsNil } from 'shared/utils/checkIs';
import { forEachObjectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';

export const removedCompositionsAtom = atom<PRecord<CmComWid, string>>({});
export const comEditorBusiesAtom = atom<ComEditBusy[] | nil>(null);

export const cmComEditorAudioMarksEditPacksAtom = atom((): CmComAudioMarkEditPack => ({}), {
  do: (_set, _get, self) => ({
    putMarks: (comw: CmComWid, src: HttpNumLeadLink, cMarks: CmComAudioMarkEditPack[CmComWid]) => {
      self.do.update(prev => {
        (prev[comw] ??= {})[src] ??= {};

        prev[comw][src] = { ...prev[comw][src], ...cMarks };
      });
    },
    removeMark: (comw: CmComWid, src: HttpNumLeadLink, time: CmComAudioMarkPackTime) => {
      self.do.update(prev => {
        const linkPack = ((prev[comw] ??= {})[src] ??= {});

        if (linkPack[time] === `+${time}+`) delete linkPack[time];
        else linkPack[time] = null;
      });
    },
    renameMark: (comw: CmComWid, src: HttpNumLeadLink, time: CmComAudioMarkPackTime, title: string) => {
      self.do.update(prev => (((prev[comw] ??= {})[src] ??= {})[time] = title));
    },
    removeMarks: (comw: CmComWid, cMarks: CmComAudioMarkPack | und) => {
      if (!cMarks) return;

      self.do.update(prev => {
        forEachObjectEntries(cMarks, (src, comMarks) => {
          if (!comMarks) return;

          const linkMarks = ((prev[comw] ??= {})[src] ??= {});

          objectKeys(comMarks).forEach(time => delete linkMarks[time]);

          objectKeys(linkMarks).forEach(time => {
            if (checkIsNil(comMarks[time])) delete linkMarks[time];
          });

          if (!objectLength(linkMarks)) delete prev[comw][src];
        });
      });
    },
  }),
});
