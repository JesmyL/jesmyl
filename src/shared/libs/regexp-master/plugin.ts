import fs from 'fs';
import { makeNamedRegExp } from './makeNamedRegExp';
import { makeRegExp } from './makeRegExp';
import { prepareNameMakedRegExp } from './utils';

export const regExpMasterVitePlugin = ({ srcDir = 'src' }: { srcDir?: string } = {}) => {
  const filePathSplitterReg = makeRegExp(`/[/\\\\]${srcDir}[/\\\\]/`);

  const importTestReg = makeRegExp(`/import \\{\\s*${makeNamedRegExp.name}[^}]*\\}/`);
  const makerSplitterReg = makeRegExp(
    `/${makeNamedRegExp.name}\\(\\s*(?:\\s*(?:\\/{2,}.*|\\/\\*[\\w\\W]+?\\*\\/)\\s*\n*)*/gm`,
  );
  const templatesInStringReg = makeRegExp('/(?<!\\\\)\\${/');
  const dirName = __dirname.replace(/\\/g, '/');

  const fillTypes = (types: string[], isOptionalParam: boolean, insertableLiteralContents: Record<string, string>) =>
    types.length === 0
      ? ''
      : types
          .sort()
          .map(
            key =>
              `${key}${isOptionalParam ? '?' : ''}: ${insertableLiteralContents[key] === undefined ? 'string' : insertableLiteralContents[key]};`,
          )
          .join(' ');

  const knownFilesFilePath = `${dirName}/generates/generatedFiles.json`;
  const knownFiles: string[] = JSON.parse('' + fs.readFileSync(knownFilesFilePath));
  const knownFilesSet = new Set(knownFiles);

  const saveKnownFiles = (_result: boolean | Set<string>) => {
    fs.writeFileSync(knownFilesFilePath, JSON.stringify(Array.from(knownFilesSet), null, 4));
  };

  const removeFile = (generatedTypeFilePath: string, fileSrc: string) => {
    try {
      fs.unlinkSync(generatedTypeFilePath);
    } catch (_error) {
      //
    }
    if (knownFilesSet.has(fileSrc)) saveKnownFiles(knownFilesSet.delete(fileSrc));
  };
  const toCharCodeReplacer = (all: string) => '' + all.charCodeAt(0);

  const slashedBracketsReplacer = (all: string, $1: string, $2: string) =>
    all.length % 2 ? `${$1}\\\\${$2}` : $2 === '`' ? all : `${$1.slice(0, -1)}${$2}`;

  const readFileAsync = (src: string) => {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(src, (error, contentBuffer) => {
        if (error) reject(error);
        else resolve('' + contentBuffer);
      });
    });
  };

  //////////////////
  // region: opts //
  //////////////////

  return {
    name: 'regExpMasterVitePlugin',
    enforce: 'pre',
    watchChange: async (src: string, change: { event: 'create' | 'update' | 'delete' }) => {
      if (!(src.endsWith('.tsx') || src.endsWith('.ts') || src.endsWith('.js') || src.endsWith('.jsx'))) return;
      if (src.startsWith(dirName)) return;
      const fileSrc = src.split(filePathSplitterReg)[1];

      const modelFilePath = `${dirName}/generates/${src.split(filePathSplitterReg)[1]?.replace(makeRegExp('/[^-a-z.$=+_]/gi'), toCharCodeReplacer)}.ts`;

      if (change.event === 'delete') {
        removeFile(modelFilePath, fileSrc);
        return;
      }

      const content = await readFileAsync(src);

      if (!importTestReg.test(content)) {
        removeFile(modelFilePath, fileSrc);
        return;
      }

      try {
        const splits = content.split(makerSplitterReg);
        const nameErrors: string[] = [];
        const generatedRegsSet = new Set<string>();

        const types: {
          typeKeyRegStr: string;
          requiredTypes: string[];
          optionalTypes: string[];
          nameErrors: string[];
          duplicateNameErrors: string[];
          insertableLiteralContents: Record<string, string>;
        }[] = [];

        for (let i = 1; i < splits.length; i++) {
          const bracket = splits[i][0];
          const findFreeBracketReg = makeRegExp(`/(?<!\\\\)\\${bracket}/`);
          const index = splits[i].slice(1).search(findFreeBracketReg);
          const userWritedRegStr = splits[i]?.slice(1, index + 1);
          const typeKeyRegStr = `\`${
            bracket === '`'
              ? userWritedRegStr
              : userWritedRegStr.replace(makeRegExp('/(\\\\*?)\\\\([`\'"])/g'), slashedBracketsReplacer)
          }\``;

          if (generatedRegsSet.has(typeKeyRegStr)) continue;
          if (templatesInStringReg.test(userWritedRegStr)) throw 'Static reg string only';
          generatedRegsSet.add(typeKeyRegStr);

          let isNeedReplace = true;
          const optionalTypes: string[] = [];
          const requiredTypes: string[] = ['$0'];
          const insertableLiteralContents: Record<string, string> = {};
          const { positionedNames, positions, perparedRegStr, restContents } = prepareNameMakedRegExp(
            userWritedRegStr as never,
            nameErrors,
          );

          if (nameErrors.length === 0) {
            let replacedPerparedRegStr = perparedRegStr
              .replace(makeRegExp('/\\\\\\\\[()]/g'), '')
              .replace(makeRegExp('/[^)*]\\?/g'), '')
              .replace(makeRegExp('/[^()*?]/g'), '');

            while (isNeedReplace) {
              isNeedReplace = false;
              replacedPerparedRegStr = replacedPerparedRegStr.replace(
                makeRegExp('/(?<!\\\\)\\(((?:(?!\\\\)[^(])*?)\\)\\*?\\??/g'),
                (all, $1) => {
                  isNeedReplace = true;
                  return all.endsWith('?') || all.endsWith('*') ? `[${$1}]` : '0' + ($1 || '');
                },
              );
            }

            isNeedReplace = true;

            replacedPerparedRegStr = replacedPerparedRegStr.replace(makeRegExp('/[^[\\]0]/'), '');

            while (isNeedReplace) {
              isNeedReplace = false;

              replacedPerparedRegStr = replacedPerparedRegStr.replace(makeRegExp('/\\[[01]*\\]/g'), all => {
                isNeedReplace = true;
                return '1'.repeat(all.length - 1);
              });
            }

            for (const position of positions) {
              (replacedPerparedRegStr[position - 1] === '1' ? optionalTypes : requiredTypes).push(
                position in positionedNames ? positionedNames[position] : `$${position}`,
              );
            }

            for (const key in restContents) {
              const restContent = restContents[key]
                .split(makeRegExp('/((?!\\\\)[)])/'))[0]
                .split(makeRegExp('/(\\[\\d[-\\d]*\\d][?*]?|\\+|(?:\\\\+[wd][?*]?)|.[?*]|\\()/'), 3);

              const isFirstNumber =
                restContent[1] === '\\\\d' || makeRegExp('/\\[\\d[-\\d]*\\d]/').test(restContent[1]);
              const optionalNumber =
                restContent[1] && (restContent[1].endsWith('?') || restContent[1].endsWith('*')) ? " | ''" : '';

              insertableLiteralContents[key] =
                restContent.length === 1
                  ? `'${restContent[0].replace(makeRegExp("/'/g"), "\\'")}'`
                  : `\`${restContent[0].replace(makeRegExp('/`/g'), '\\`')}\${${isFirstNumber ? (!restContent[2] ? `number${optionalNumber}` : `number${optionalNumber}}\${string`) : 'string'}}\``;

              if (insertableLiteralContents[key] === '`${string}`') insertableLiteralContents[key] = 'string';
            }
          }

          const names = Object.values(positionedNames);
          const exclusiveNames = new Set(names);

          types.push({
            typeKeyRegStr,
            optionalTypes,
            requiredTypes,
            insertableLiteralContents,
            nameErrors,
            duplicateNameErrors: names.filter(name => {
              const isInclusive = !exclusiveNames.has(name);
              exclusiveNames.delete(name);
              return isInclusive;
            }),
          });
        }

        if (!types.length) {
          removeFile(modelFilePath, fileSrc);
          return;
        }

        if (!knownFilesSet.has(fileSrc)) saveKnownFiles(knownFilesSet.add(fileSrc));

        fs.writeFile(
          modelFilePath,
          `interface TheNamedRegExtMakerRegTypes {${types
            .map(props => {
              const typeContent =
                props.duplicateNameErrors.length !== 0
                  ? `'Duplicate name${props.duplicateNameErrors.length === 1 ? ` <${props.duplicateNameErrors[0]}>` : `s: <${props.duplicateNameErrors.join('>, <')}>`}'`
                  : props.nameErrors.length !== 0
                    ? `'Invalid group name${props.nameErrors.length === 1 ? ` <${props.nameErrors[0]}>` : `s: <${props.nameErrors.join('>, <')}>`}'`
                    : `{ ${fillTypes(props.requiredTypes, false, props.insertableLiteralContents)} ${fillTypes(props.optionalTypes, true, props.insertableLiteralContents)} }`;

              return `\n  [${props.typeKeyRegStr}]: ${typeContent};`;
            })
            .join('')}\n}\n`,
          () => {},
        );
      } catch (error) {
        console.error(error);
      }
    },
  };
};
