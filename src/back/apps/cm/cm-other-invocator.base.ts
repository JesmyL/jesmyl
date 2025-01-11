import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { ChordTrack } from 'front/components/apps/cm/col/com/chord-card/ChordCard.model';
import { mylib } from 'front/utils';
import { CmOtherSokiInvocatorMethods } from 'shared/api/invocators/cm/cm-other-invocators';
import { cmServerInvocatorMethods } from './cm-invocator';

export const chordTracksStore = new FileStore<Record<string, ChordTrack>>('/apps/cm/chordTracks.json', {});

class CmOtherSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmOtherSokiInvocatorMethods> {}
export const cmOtherServerInvocatorBase = new CmOtherSokiInvocatorBaseServer(
  'CmOtherSokiInvocatorBaseServer',
  {
    setChords: () => async chords => {
      const chordPack = chordTracksStore.getValue();
      chordTracksStore.setValue({ ...chordPack, ...chords });
      const modifiedAt = chordTracksStore.setModifiedTimeStamp(null);

      cmServerInvocatorMethods.editedChords(null, { chords, modifiedAt });

      return chords;
    },
  },
  {
    setChords: (_, chords) => `Изменены аккорды ${mylib.keys(chords).join(', ')}`,
  },
);
