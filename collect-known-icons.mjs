import fs from 'fs';
import { replaceFileContent, walkAllFiles } from './utils.mjs';

const regStr = `import \\{ Icon.+? \\} from '.+?\\/icons\\/(.+?)';`;
const lineReg = new RegExp(regStr, 'g');
const matchReg = new RegExp(`^${regStr}$`, 'gm');

const iconNamesStore = new Set();

walkAllFiles('src/front', (filePath, name, _path, isDir) => {
  if (name === 'icons') return true;
  if (isDir) return;

  const content = '' + fs.readFileSync(filePath);

  if (!content.includes('/icons/')) return;

  content.match(matchReg)?.forEach(line => {
    Array.from(line.matchAll(lineReg)).forEach(([, fileName]) => {
      iconNamesStore.add(
        fileName.replace(/^\w/, all => all.toUpperCase()).replace(/-(\w)/g, (_, $1) => $1.toUpperCase()),
      );
    });
  });
});

const iconNames = [];

replaceFileContent('src/front/complect/the-icon/pack.tsx', content => {
  content
    .replace(/^[\s\S]+?export const theIconKnownPack:.+([^}]+)/, '$1')
    .split(/\s*\n\s*/)
    .forEach(line => {
      const parts = line.split(': ');
      if (parts.length < 2) return;
      iconNamesStore.add(parts[0]);
    });

  const importsNames = [];

  Array.from(iconNamesStore)
    .sort()
    .forEach(iconName => {
      const iconFileName =
        iconName[0].toLowerCase() + iconName.slice(1).replace(/([A-Z]|\d+)/g, all => '-' + all.toLowerCase());

      importsNames.push(`import { iconPackOf${iconName} } from './icons/${iconFileName}';`);
      iconNames.push(iconName);
    });

  return `${importsNames.join('\n')}
import { TheIconSelfPack } from './model';

export const theIconKnownPack: Record<TheIconKnownName, TheIconSelfPack> = {
${iconNames.map(iconName => `  ${iconName}: iconPackOf${iconName},`).join('\n')}
};
`;
});

replaceFileContent('src/shared/values/knownIconNames.ts', content =>
  content.replace(
    /(export const knownIconNames = \[)[\s\S]+?(\s+\] as const;)/,
    (_, $1, $2) => `${$1}\n${iconNames.map(name => `  '${name}',`).join('\n')}${$2}`,
  ),
);
