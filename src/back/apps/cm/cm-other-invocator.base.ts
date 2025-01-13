import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { mylib } from 'front/utils';
import { EeStorePack } from 'shared/api';
import { ChordPack } from 'shared/api/complect/apps/cm/complect/chord-card';
import { CmOtherSokiInvocatorMethods } from 'shared/api/invocators/cm/other-invocators.model';
import { smylib } from 'shared/utils';
import { cmEditorServerInvocatorShareMethods } from './cm-editor-invocator.shares';
import { cmServerInvocatorShareMethods } from './cm-invocator.shares';
import { cmGetMp3RulesList, cmGetResourceHTMLString } from './mp3-rules';

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});

class CmOtherSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmOtherSokiInvocatorMethods> {}
export const cmOtherServerInvocatorBase = new CmOtherSokiInvocatorBaseServer(
  'CmOtherSokiInvocatorBaseServer',
  {
    setChords: () => async chords => {
      chordPackFileStore.setValue({ ...chordPackFileStore.getValue(), ...chords });
      const modifiedAt = chordPackFileStore.getFileModifiedAt();
      cmServerInvocatorShareMethods.editedChords(null, { chords, modifiedAt });

      return chords;
    },

    setEEWords: () => async words => {
      eePackFileStore.setValue({ ...eePackFileStore.getValue(), ...words });
      const modifiedAt = eePackFileStore.getFileModifiedAt();
      cmEditorServerInvocatorShareMethods.editedEEWords(null, { words, modifiedAt });

      return words;
    },

    getResourceHTMLString: () => cmGetResourceHTMLString,
    getMp3RulesList: () => cmGetMp3RulesList,
  },
  {
    setChords: (_, chords) => `Изменены аккорды ${mylib.keys(chords).join(', ')}`,

    getResourceHTMLString: (_, src) => `Запрос HTML-кода ресурcа ${src}`,
    getMp3RulesList: () => `Запрос MP3-правил`,
    setEEWords: (_, words) => `Изменены ё/е-правила в словах ${smylib.keys(words).join(', ')}`,
  },
);
