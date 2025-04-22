import fs from 'fs';
import { makeNamedRegExp } from './makeNamedRegExp';
import { makeRegExp } from './makeRegExp';
import { prepareNameMakedRegExp } from './utils';

const importTestReg = makeRegExp(`/import \\{\\s*${makeNamedRegExp.name}[^}]*\\}/`);
const makerSplitterReg = makeRegExp(
  `/${makeNamedRegExp.name}\\(\\s*(?:\\s*(?:\\/{2,}.*|\\/\\*[\\w\\W]+?\\*\\/)\\s*\n*)*/gm`,
);
const templatesInStringReg = makeRegExp('/(?<!\\\\)\\${/');
const dirName = __dirname.replace(/\\/g, '/');

const fillTypes = (types: string[], opt: '' | '?', contents: Record<string, string>) =>
  types.length === 0
    ? ''
    : types
        .sort()
        .map(key => `${key}${opt}: ${contents[key] === undefined ? 'string' : `'${contents[key]}'`};`)
        .join(' ');

export const regExpMasterVitePlugin = () => ({
  name: 'regExpMasterVitePlugin',
  enforce: 'pre',
  watchChange: (src: string, change: { event: 'create' | 'update' | 'delete' }) => {
    if (
      !(src.endsWith('.tsx') || src.endsWith('.ts') || src.endsWith('.js') || src.endsWith('.jsx')) ||
      src.startsWith(dirName)
    )
      return;

    const fileName = `${dirName}/generates/${src.split(makeRegExp('/[/\\\\]src[/\\\\]/'))[1]?.replace(makeRegExp('/[^-\\w._$=+]/gi'), '_')}.ts`;

    if (change.event === 'delete') {
      fs.unlinkSync(fileName);
      return;
    }

    fs.readFile(src, (_error, contentBuffer) => {
      const content = '' + contentBuffer;
      if (!importTestReg.test(content)) return;

      try {
        const splits = content.split(makerSplitterReg);
        const types: { name: string; reqTypes: string[]; optTypes: string[]; contents: Record<string, string> }[] = [];

        for (let i = 1; i < splits.length; i++) {
          const bracket = splits[i][0];
          const findFreeBracketReg = makeRegExp(`/(?<!\\\\)\\${bracket}/`);
          const index = splits[i].slice(1).search(findFreeBracketReg);
          const preparedRegStr = splits[i]?.slice(1, index + 1);

          if (templatesInStringReg.test(preparedRegStr)) throw 'Static reg string only';

          const { names, positions, perparedRegStr, contents } = prepareNameMakedRegExp(preparedRegStr as never);
          const optTypes: string[] = [];
          const reqTypes: string[] = ['$0'];
          let isNeedReplace = true;

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
            (replacedPerparedRegStr[position - 1] === '1' ? optTypes : reqTypes).unshift(
              position in names ? names[position] : `$${position}`,
            );
          }

          types.push({ name: `${bracket}${preparedRegStr}${bracket}`, optTypes, reqTypes, contents });
        }

        if (!types.length) {
          fs.unlinkSync(fileName);
          return;
        }

        fs.writeFile(
          fileName,
          `interface TheNamedRegExtMakerRegTypes {${types
            .map(
              ({ name, optTypes, reqTypes, contents }) =>
                `\n  [${name}]: { ${fillTypes(reqTypes, '', contents)} ${fillTypes(optTypes, '?', contents)} }`,
            )
            .join('')}\n}\n`,
          () => {},
        );
      } catch (error) {
        console.error(error);
      }
    });
  },
});
