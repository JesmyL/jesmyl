import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { mylib } from 'front/utils';
import { EeStorePack } from 'shared/api';
import { ChordPack } from 'shared/api/complect/apps/cm/complect/chord-card';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocators.model';
import { smylib } from 'shared/utils';
import { cmGetMp3RulesList, cmGetResourceHTMLString } from './complect/mp3-rules';
import { cmEditorServerInvocatorShareMethods } from './editor-invocator.shares';
import { cmServerInvocatorShareMethods } from './invocator.shares';

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});

class CmEditorSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmEditorSokiInvocatorModel> {
  constructor() {
    super(
      'CmEditorSokiInvocatorBaseServer',
      {
        setChords: () => async chords => {
          chordPackFileStore.setValue({ ...chordPackFileStore.getValue(), ...chords });
          const modifiedAt = chordPackFileStore.fileModifiedAt();
          cmServerInvocatorShareMethods.editedChords(null, { chords, modifiedAt });

          return chords;
        },

        setEEWords: () => async words => {
          eePackFileStore.setValue({ ...eePackFileStore.getValue(), ...words });
          const modifiedAt = eePackFileStore.fileModifiedAt();
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
  }
}
export const cmEditorSokiInvocatorBaseServer = new CmEditorSokiInvocatorBaseServer();
