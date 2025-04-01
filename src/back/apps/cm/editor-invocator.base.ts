import { FileStore } from 'back/complect/FileStore';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { EeStorePack } from 'shared/api';
import { ChordPack } from 'shared/api/complect/apps/cm/complect/chord-card';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocators.model';
import { smylib } from 'shared/utils';
import { unwatchEditComBusies, watchEditComBusies } from './complect/edit-com-busy';
import { cmGetResourceHTMLString, mp3ResourcesData } from './complect/mp3-rules';
import { cmEditorServerInvocatorShareMethods } from './editor-invocator.shares';
import { cmServerInvocatorShareMethods } from './invocator.shares';

export const chordPackFileStore = new FileStore<ChordPack>('/apps/cm/chordTracks.json', {});
export const eePackFileStore = new FileStore<EeStorePack>('/apps/cm/eeStorage.json', {});

export const cmEditorSokiInvocatorBaseServer =
  new (class CmEditorSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmEditorSokiInvocatorModel> {
    constructor() {
      super({
        className: 'CmEditorSokiInvocatorBaseServer',
        beforeEacheTools: {
          addMp3Rule: { minLevel: 50 },
          requestFreshes: { minVersion: 50 },
        },
        methods: {
          setChords: async ({ chords }) => {
            chordPackFileStore.setValue({ ...chordPackFileStore.getValue(), ...chords });
            const modifiedAt = chordPackFileStore.fileModifiedAt();
            cmServerInvocatorShareMethods.editedChords({ chords, modifiedAt });

            return chords;
          },

          setEEWords: async ({ words }) => {
            eePackFileStore.setValue({ ...eePackFileStore.getValue(), ...words });
            const modifiedAt = eePackFileStore.fileModifiedAt();
            cmEditorServerInvocatorShareMethods.editedEEWords(
              {
                words,
                modifiedAt,
              },
              (_client, auth) => !!auth && auth.level >= 50,
            );

            return words;
          },

          getResourceHTMLString: cmGetResourceHTMLString,
          getMp3RulesList: async () => mp3ResourcesData.getValue(),
          addMp3Rule: async ({ rule }) => {
            mp3ResourcesData.getValueWithAutoSave().push(rule);
          },
          setMp3Rule: async ({ rule }) => {
            const list = mp3ResourcesData.getValueWithAutoSave();
            const index = list.findIndex(r => r.w === rule.w);
            if (index < 0) throw new Error('rule not found');
            list.splice(index, 1, rule);
          },

          watchComBusies: watchEditComBusies,
          unwatchComBusies: unwatchEditComBusies,

          requestFreshes: async ({ lastModfiedAt }, { auth, client }) => {
            if (auth && auth.level >= 50) {
              const eePackModifiedAt = eePackFileStore.fileModifiedAt();
              if (eePackModifiedAt > lastModfiedAt) {
                cmEditorServerInvocatorShareMethods.refreshEEPack(
                  {
                    modifiedAt: eePackModifiedAt,
                    pack: eePackFileStore.getValue(),
                  },
                  client,
                );
              }
            }
          },
        },
        onEachFeedbackTools: {
          setChords: (_, chords) => `Изменены аккорды ${smylib.keys(chords).join(', ')}`,

          getResourceHTMLString: null,
          setEEWords: (_, words) => `Изменены ё/е-правила в словах ${smylib.keys(words).join(', ')}`,

          getMp3RulesList: null,
          addMp3Rule: () => `Добавлено MP3-правило`,
          setMp3Rule: () => `Изменено MP3-правило`,

          watchComBusies: null,
          unwatchComBusies: null,
          requestFreshes: null,
        },
      });
    }
  })();
