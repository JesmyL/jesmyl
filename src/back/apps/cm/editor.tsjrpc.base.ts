import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { smylib } from 'shared/utils';
import { unwatchEditComBusies, watchEditComBusies } from './complect/edit-com-busy';
import { cmGetResourceHTMLString } from './complect/mp3-rules';
import { cmShareEditorServerTsjrpcMethods } from './editor.tsjrpc.shares';
import {
  chordPackFileStore,
  cmConstantsConfigFileStore,
  eePackFileStore,
  mp3ResourcesFileStorage,
} from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditorTsjrpcBaseServer = new (class CmEditor extends TsjrpcBaseServer<CmEditorTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditor',
      methods: {
        setChords: async ({ chords }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'CHORD', 'U')) throw '';

          chordPackFileStore.setValue({ ...chordPackFileStore.getValue(), ...chords });
          const modifiedAt = chordPackFileStore.fileModifiedAt();
          cmShareServerTsjrpcMethods.editedChords({ chords, modifiedAt }, null);

          return { value: chords, description: `Изменены аккорды ${smylib.keys(chords).join(', ')}` };
        },

        setEEWords: async ({ words }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'EE', 'U')) throw '';

          eePackFileStore.setValue({ ...eePackFileStore.getValue(), ...words });
          const modifiedAt = eePackFileStore.fileModifiedAt();
          cmShareEditorServerTsjrpcMethods.editedEEWords(
            {
              words,
              modifiedAt,
            },
            (_, auth) => {
              try {
                throwIfNoUserScopeAccessRight(auth, 'cm', 'EDIT', 'R');
              } catch (_) {
                return false;
              }
              return true;
            },
          );

          return { value: words, description: `Изменены ё/е-правила в словах ${smylib.keys(words).join(', ')}` };
        },

        getResourceHTMLString: cmGetResourceHTMLString,
        getMp3RulesList: async () => ({ value: mp3ResourcesFileStorage.getValue() }),
        addMp3Rule: async ({ rule }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'MP3', 'U')) throw '';

          mp3ResourcesFileStorage.modifyValueWithAutoSave(srcs => srcs.push(rule));

          return { description: `Добавлено MP3-правило` };
        },
        setMp3Rule: async ({ rule }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'MP3', 'U')) throw '';

          mp3ResourcesFileStorage.modifyValueWithAutoSave(list => {
            const index = list.findIndex(r => r.w === rule.w);
            if (index < 0) throw new Error('rule not found');
            list.splice(index, 1, rule);
          });

          return { description: `Изменено MP3-правило` };
        },

        watchComBusies: watchEditComBusies,
        unwatchComBusies: unwatchEditComBusies,

        requestFreshes: async ({ lastModfiedAt }, { client, auth }) => {
          try {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'EDIT', 'R')) throw '';
          } catch (_) {
            return;
          }

          const eePackModifiedAt = eePackFileStore.fileModifiedAt();
          if (eePackModifiedAt > lastModfiedAt) {
            cmShareEditorServerTsjrpcMethods.refreshEEPack(
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
          cmShareServerTsjrpcMethods.refreshConstantsConfig(
            {
              config,
              modifiedAt: cmConstantsConfigFileStore.fileModifiedAt(),
            },
            tool => !!(tool && tool.version > 1039),
          );
        },
      },
    });
  }
})();
