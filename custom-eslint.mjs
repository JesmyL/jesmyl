import fs from 'fs';

// HELP: https://astexplorer.net/

const makePathTuple = pathPartName => [`${pathPartName.slice(3)}/`, pathPartName];

const [processesPathAlias, processesPath] = makePathTuple('02-processes');
const [pagesPathAlias, pagesPath] = makePathTuple('03-pages');
const [widgetsPathAlias, widgetsPath] = makePathTuple('04-widgets');
const [featuresPathAlias, featuresPath] = makePathTuple('05-features');
const [entitiesPathAlias, entitiesPath] = makePathTuple('06-entities');
const [basisPathAlias, basisPath] = makePathTuple('07-basis');
const [sharedPathAlias, sharedPath] = makePathTuple('07-shared');

const layersWithDirsOnly = [pagesPath, featuresPath, entitiesPath, basisPath];

const aliasesWithMaxImportPathParts = Object.entries({
  [pagesPathAlias]: 3,
  [processesPathAlias]: 3,
  [featuresPathAlias]: 3,
  [entitiesPathAlias]: 3,
  [widgetsPathAlias]: 3,
  [basisPathAlias]: 3,
  [sharedPathAlias]: 3,
});

const knownExportNamesPrefixes = ['I', 'The', 'Styled', 'is', 'make', 'check', 'use', 'take'];
const availablePagePostfix = ['Layout', 'Page'];

const availablePagePostfixRegExp = new RegExp(`(${availablePagePostfix.join('|')})$`);

const meta = {
  type: 'problem',
  docs: { recommended: true },
  schema: [],
};

const definePluginName = (pluginName, cb) => cb(pluginName);

export default () => [
  definePluginName('basic-custom-config', pluginName => {
    const name = 'tsconfig-import-aliases';

    const rule = {
      create(context) {
        return {
          ImportDeclaration(node) {
            const match = node.source.value.match(/\/\d\d-/);
            const pathParts = node.source.value.split('/');

            if (match) {
              context.report({
                node,
                message: `Слой ${match[0]} должен иметь алиас при импорте (${node.source.raw})`,
              });
            }

            if (node.source.value.startsWith(pagesPathAlias)) {
              if (!availablePagePostfix.some(postfix => pathParts[1].endsWith(postfix))) {
                context.report({
                  node,
                  message: `Все папки в слое ${pagesPathAlias} должны заканчиваться на ${availablePagePostfix.join(' или ')} - ${node.source.raw}`,
                });
              }
            }

            aliasesWithMaxImportPathParts.forEach(([alias, maxImportPathParts]) => {
              if (node.source.value.startsWith(`$cm/${alias}`)) {
                if (pathParts.length > maxImportPathParts) {
                  context.report({
                    node,
                    message: `Импорты глубже ${maxImportPathParts} уровня (${pathParts.slice(0, maxImportPathParts).join('/')}) запрещены для слоя ${alias}`,
                  });
                }
              }
            });
          },
        };
      },
    };

    return {
      files: ['**/front/apps/cm/**/*.{ts,tsx}'],
      plugins: { [pluginName]: { meta, rules: { [name]: rule } } },
      rules: { [`${pluginName}/${name}`]: 'error' },
    };
  }),

  ...makeExportedNamePrefixController('cm', entitiesPath),
  ...makeExportedNamePrefixController('cm', widgetsPath),
  ...makeExportedNamePrefixController('cm', featuresPath),
  ...makeExportedNamePrefixController('cm', pagesPath, 'index.{ts,tsx}', fileName =>
    fileName.replace(availablePagePostfixRegExp, ''),
  ),
];

const makeExportedNamePrefixController = (appName, pathPart, deepPath = '**/*.{ts,tsx}', fileNameMapper = it => it) => {
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
          const normName = mappedFileName
            .replace(/[^a-z0-9$]+/gi, '_')
            .replace(/_[a-z0-9]/g, all => all[1].toUpperCase());

          const lowerStartsNormName = `${appName[0].toLowerCase()}${appName.slice(1)}${normName[0].toUpperCase()}${normName.slice(1)}`;
          const upperStartsNormName = `${appName[0].toUpperCase()}${appName.slice(1)}${normName[0].toUpperCase()}${normName.slice(1)}`;

          const nameRegExp = new RegExp(
            `^(${lowerStartsNormName}|((${knownExportNamesPrefixes.join('|')})?${upperStartsNormName}))([A-Z0-9]|$)`,
          );

          const checkName = (node, name) => {
            if (name && !name.match(nameRegExp))
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

      return definePluginName(`${pathPart}_${fileName}-scoped-export-names`, pluginName => {
        return {
          files: [`**/front/**/${pathPart}/${fileName}/${deepPath}`],
          plugins: { [pluginName]: { meta, rules: { [name]: rule } } },
          rules: { [`${pluginName}/${name}`]: 'error' },
        };
      });
    })
    .filter(it => it != null);
};
