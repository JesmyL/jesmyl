import { FileStore } from 'back/complect/FileStore';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { EeStorePack } from 'shared/api';
import { ChordPack } from 'shared/api/complect/apps/cm/complect/chord-card';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocators.model';
import { smylib } from 'shared/utils';
import { unwatchEditComBusies, watchEditComBusies } from './complect/edit-com-busy';
import { cmGetMp3RulesList, cmGetResourceHTMLString } from './complect/mp3-rules';
import { cmEditorServerInvocatorShareMethods } from './editor-invocator.shares';
import { cmServerInvocatorShareMethods } from './invocator.shares';

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});

class CmEditorSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmEditorSokiInvocatorModel> {}
export const cmEditorSokiInvocatorBaseServer = new CmEditorSokiInvocatorBaseServer(
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
    addMp3Rule: () => async rule => {
      (await cmGetMp3RulesList()).push(rule);
    },
    setMp3Rule: () => async rule => {
      const list = await cmGetMp3RulesList();
      const index = list.findIndex(r => r.w === rule.w);
      if (index < 0) throw new Error('rule not found');
      list.splice(index, 1, rule);
    },

    watchComBusies: watchEditComBusies,
    unwatchComBusies: unwatchEditComBusies,
  },
  {
    setChords: (_, chords) => `Изменены аккорды ${smylib.keys(chords).join(', ')}`,

    getResourceHTMLString: () => ``,
    setEEWords: (_, words) => `Изменены ё/е-правила в словах ${smylib.keys(words).join(', ')}`,

    getMp3RulesList: () => ``,
    addMp3Rule: () => `Добавлено MP3-правило`,
    setMp3Rule: () => `Изменено MP3-правило`,

    watchComBusies: () => ``,
    unwatchComBusies: () => ``,
  },
);
