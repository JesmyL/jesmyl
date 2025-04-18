import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmEditorSokiInvocatorModel } from 'shared/api/invocators/cm/editor-invocators.model';
import { smylib } from 'shared/utils';
import { unwatchEditComBusies, watchEditComBusies } from './complect/edit-com-busy';
import { cmGetResourceHTMLString } from './complect/mp3-rules';
import { cmShareEditorServerInvocatorMethods } from './editor-invocator.shares';
import { chordPackFileStore, cmConstantsConfigFileStore, eePackFileStore, mp3ResourcesData } from './file-stores';
import { cmShareServerInvocatorMethods } from './invocator.shares';

export const cmEditorSokiInvocatorBaseServer =
  new (class CmEditor extends SokiInvocatorBaseServer<CmEditorSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmEditor',
        defaultBeforeEachTool: { minLevel: 50 },
        beforeEachTools: {
          addMp3Rule: { minLevel: 50 },
          requestFreshes: { minVersion: 50 },
        },
        methods: {
          setChords: async ({ chords }) => {
            chordPackFileStore.setValue({ ...chordPackFileStore.getValue(), ...chords });
            const modifiedAt = chordPackFileStore.fileModifiedAt();
            cmShareServerInvocatorMethods.editedChords({ chords, modifiedAt });

            return chords;
          },

          setEEWords: async ({ words }) => {
            eePackFileStore.setValue({ ...eePackFileStore.getValue(), ...words });
            const modifiedAt = eePackFileStore.fileModifiedAt();
            cmShareEditorServerInvocatorMethods.editedEEWords(
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

          requestFreshes: async ({ lastModfiedAt }, { client }) => {
            const eePackModifiedAt = eePackFileStore.fileModifiedAt();
            if (eePackModifiedAt > lastModfiedAt) {
              cmShareEditorServerInvocatorMethods.refreshEEPack(
                {
                  modifiedAt: eePackModifiedAt,
                  pack: eePackFileStore.getValue(),
                },
                client,
              );
            }
          },

          updateConstantsConfig: async ({ config }) => {
            cmConstantsConfigFileStore.updateValue(prev => ({ ...prev, ...config }));
            cmShareEditorServerInvocatorMethods.refreshConstantsConfig({
              config,
              modifiedAt: cmConstantsConfigFileStore.fileModifiedAt(),
            });
          },
        },
        onEachFeedback: {
          setChords: (_, chords) => `Изменены аккорды ${smylib.keys(chords).join(', ')}`,

          getResourceHTMLString: null,
          setEEWords: (_, words) => `Изменены ё/е-правила в словах ${smylib.keys(words).join(', ')}`,

          getMp3RulesList: null,
          addMp3Rule: () => `Добавлено MP3-правило`,
          setMp3Rule: () => `Изменено MP3-правило`,

          watchComBusies: null,
          unwatchComBusies: null,
          requestFreshes: null,
          updateConstantsConfig: null,
        },
      });
    }
  })();
