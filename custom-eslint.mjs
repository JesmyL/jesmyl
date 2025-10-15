import fs from 'fs';
import { escapeRegExpSymbols } from 'regexpert';

// HELP: https://astexplorer.net/

const makePathTuple = pathPartName => [`${pathPartName.slice(3)}/`, pathPartName];

const [processesPathAlias, processesPath] = makePathTuple('02-processes');
const [pagesPathAlias, pagesPath] = makePathTuple('03-pages');
const [widgetsPathAlias, widgetsPath] = makePathTuple('04-widgets');
const [featuresPathAlias, featuresPath] = makePathTuple('05-features');
const [entitiesPathAlias, entitiesPath] = makePathTuple('06-entities');
const [sharedPathAlias, sharedPath] = makePathTuple('07-shared');

const aliasesWithMaxImportPathParts = Object.entries({
  [pagesPathAlias]: 3,
  [processesPathAlias]: 3,
  [featuresPathAlias]: 3,
  [entitiesPathAlias]: 3,
  [widgetsPathAlias]: 3,
  [sharedPathAlias]: 4,
});

const knownExportNamesPrefixes = ['I', 'The', 'Styled', 'is', 'make', 'check', 'use', 'take'];
const availablePagePostfix = ['Layout', 'Page'];

const appNames = ['cm', 'cm+editor', 'bible'];

const isNeedReport = true;

const availablePagePostfixRegExp = new RegExp(`(${availablePagePostfix.join('|')})$`);

const meta = {
  type: 'problem',
  docs: { recommended: true },
  schema: [],
};

const definePluginName = (pluginName, cb) => cb(pluginName);

export default () => [
  definePluginName('front-import-aliases', pluginName => {
    const name = 'check';
    const reg = new RegExp(
      `^front/|/\\d\\d-(${aliasesWithMaxImportPathParts.map(([alias]) => alias.slice(0, -1)).join('|')})`,
    );

    const rule = {
      create(context) {
        return {
          ImportDeclaration(node) {
            const match = node.source.value.match(reg);

            if (isNeedReport && match) {
              context.report({
                node,
                message: `Необходимо использование алиасов в пути импорта (${node.source.raw})`,
              });
            }
          },
        };
      },
    };

    return {
      files: ['**/front/**/*.{ts,tsx}'],
      plugins: { [pluginName]: { meta, rules: { [name]: rule } } },
      rules: { [`${pluginName}/${name}`]: 'error' },
    };
  }),

  ...appNames
    .map(appName => {
      return [
        aliasesWithMaxImportPathParts.map(([layerName, maxImportPathParts]) => {
          return definePluginName(`${appName}_${layerName.slice(0, -1)}_import-deep-checker`, pluginName => {
            const name = 'check';

            const rule = {
              create(context) {
                return {
                  ImportDeclaration(node) {
                    if (node.source.value.startsWith(`$${appName}/${layerName}`)) {
                      const pathParts = node.source.value.split('/');

                      if (isNeedReport && pathParts.length > maxImportPathParts) {
                        context.report({
                          node,
                          message: `Импорты глубже ${maxImportPathParts} уровня (${pathParts.slice(0, maxImportPathParts).join('/')}) запрещены для слоя ${layerName}`,
                        });
                      }
                    }
                  },
                };
              },
            };

            return {
              files: [`**/front/apps/${appName}/**/*.{ts,tsx}`],
              plugins: { [pluginName]: { meta, rules: { [name]: rule } } },
              rules: { [`${pluginName}/${name}`]: 'error' },
            };
          });
        }),

        definePluginName(`${appName}_import-other-app-checker`, pluginName => {
          const name = 'check';

          const appNameAliasStartAndNotExtRegExp = new RegExp(
            `^\\$(${appNames
              .filter(appn => appn !== appName)
              .map(escapeRegExpSymbols)
              .join('|')})/(?!ext$)(/.+)?`,
          );

          const rule = {
            create(context) {
              return {
                ImportDeclaration(node) {
                  if (node.source.value.startsWith('$') && node.source.value.match(appNameAliasStartAndNotExtRegExp)) {
                    context.report({
                      node,
                      message: `Импорты в другом приложении могут быть только из /ext файла`,
                    });
                  }
                },
              };
            },
          };

          return {
            files: [`**/front/apps/${appName}/**/*.{ts,tsx}`],
            plugins: { [pluginName]: { meta, rules: { [name]: rule } } },
            rules: { [`${pluginName}/${name}`]: 'error' },
          };
        }),

        definePluginName(`${appName}_deep-and-pages-checker`, pluginName => {
          const name = 'check';

          const rule = {
            create(context) {
              return {
                ImportDeclaration(node) {
                  const pathParts = node.source.value.split('/');

                  if (
                    isNeedReport &&
                    node.source.value.startsWith(pagesPathAlias) &&
                    !availablePagePostfix.some(postfix => pathParts[1].endsWith(postfix))
                  ) {
                    context.report({
                      node,
                      message: `Все папки в слое ${pagesPathAlias} должны заканчиваться на ${availablePagePostfix.join(' или ')} - ${node.source.raw}`,
                    });
                  }
                },
              };
            },
          };

          return {
            files: [`**/front/apps/${appName}/**/*.{ts,tsx}`],
            plugins: { [pluginName]: { meta, rules: { [name]: rule } } },
            rules: { [`${pluginName}/${name}`]: 'error' },
          };
        }),
      ];
    })
    .flat(15),

  ...appNames
    .map(appName => {
      return [
        makeExportedNamePrefixController(appName, entitiesPath),
        makeExportedNamePrefixController(appName, widgetsPath),
        makeExportedNamePrefixController(appName, featuresPath),

        makeExportedNamePrefixController(appName, pagesPath, fileName =>
          fileName.replace(availablePagePostfixRegExp, ''),
        ),
      ];
    })
    .flat(2),
];

const makeExportedNamePrefixController = (appName, pathPart, fileNameMapper = it => it) => {
  const path = `./src/front/apps/${appName}/${pathPart}`;
  const fileNames = fs.readdirSync(path);

  return fileNames
    .map(fileName => {
      const wholePath = `${path}/${fileName}`;

      if (!fs.statSync(wholePath).isDirectory()) return null;

      const name = 'check';
      const rule = {
        create(context) {
          const mappedFileName = fileNameMapper(fileName);
          const normalizeName = name =>
            name.replace(/[^a-z0-9$]+/gi, '_').replace(/_[a-z0-9]/g, all => all[1].toUpperCase());

          const normName = normalizeName(mappedFileName);
          const normAppName = normalizeName(appName);

          const lowerStartsNormName = `${normAppName[0].toLowerCase()}${normAppName.slice(1)}${normName[0].toUpperCase()}${normName.slice(1)}`;
          const upperStartsNormName = `${normAppName[0].toUpperCase()}${normAppName.slice(1)}${normName[0].toUpperCase()}${normName.slice(1)}`;

          const nameRegExp = new RegExp(
            `^(${lowerStartsNormName}|((${knownExportNamesPrefixes.join('|')})?${upperStartsNormName}))([A-Z0-9]|$)`,
          );

          const checkName = (node, name) => {
            if (isNeedReport && name && !name.match(nameRegExp))
              context.report({
                node,
                message: `Экспортируемые данные в контексте ${fileName} должны начинаться с ${lowerStartsNormName} или ${upperStartsNormName} (возможно использование префиксов - ${knownExportNamesPrefixes.join(', ')})`,
              });
          };

          const result = {
            ExportNamedDeclaration: node => {
              node.declaration?.declarations?.forEach(decl => {
                checkName(node, decl.id.name);
                decl.id.elements?.forEach(elem => checkName(node, elem.name));
              });

              checkName(node, node.declaration?.id?.name);

              node.specifiers?.forEach(spec => {
                if (spec.local && spec.exported.name === 'default') checkName(node, spec.local.name);
                else checkName(node, spec.exported.name);
              });
            },
            ExportDefaultDeclaration: node => checkName(node, node.declaration.name),
          };

          return result;
        },
      };

      return definePluginName(`${appName}_${pathPart}_${fileName}-scoped-export-names`, pluginName => {
        return {
          files: [`**/front/**/${appName}/${pathPart}/${fileName}/**/*.{ts,tsx}`],
          plugins: { [pluginName]: { meta, rules: { [name]: rule } } },
          rules: { [`${pluginName}/${name}`]: 'error' },
        };
      });
    })
    .filter(it => it != null);
};
