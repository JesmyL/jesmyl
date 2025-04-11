import fs from 'fs';
import { walkAllFiles } from './utils.mjs';

// 351 kb

let dCount = 0;
const tagReg = /(\<(circle|g|path|rect|ellipse)\s?)([\w\W]*?)(><\/\1>|\/?\>)/g;
const attrCounts = {};
const lineSplitReg = /\s*\n\s*/;
const secondTagReg = /><\/\w+>/g;
const packReg =
  /\{\s*name:\s*(.+)\s*\w+:\s*(.+)\s*\w+:\s*(.+)\s*\w+:\s*(.+)\s*\w+:\s*(.+)\s*\w+:\s*(.+)\s*\w+:\s*(.+)\s*\w+:\s*(.+)\s*\}/;
const nameReg =
  /name=".+? Icon([\w\d]+)(StrokeRounded|DuotoneRounded|TwotoneRounded|SolidRounded|BulkRounded|StrokeSharp|SolidSharp)"/g;

const packRepStr = `[${['', 1, 2, 3, 4, 5, 6, 7, 8].map(num => num && `$${num}`).join('\n  ')}\n]`;

const attrAssociations = {
  c: 'clipRule="evenodd"',
  f: 'fill="var(--icon-fill)"',
  fr: 'fillRule="evenodd"',
  h1: 'height="10"',
  h2: 'height="11"',
  h3: 'height="13"',
  h4: 'height="18"',
  h5: 'height="19"',
  h6: 'height="20"',
  h7: 'height="3"',
  h8: 'height="4"',
  h9: 'height="6"',
  h0: 'height="8.5"',
  o1: 'opacity="0.3"',
  o2: 'opacity="0.34"',
  o3: 'opacity="0.44"',
  o4: 'opacity="0.5"',
  o5: 'opacity="0.54"',
  o6: 'opacity="0.93"',
  o7: 'opacity="var(--icon-opacity)"',
  s: 'stroke="var(--icon-stroke)"',
  s1: 'strokeDasharray="0.5 3"',
  s2: 'strokeDasharray="1 3"',
  s3: 'strokeDasharray="3 2"',
  s4: 'strokeDasharray="3 3"',
  sr: 'strokeLinecap="round"',
  ss: 'strokeLinecap="square"',
  sb: 'strokeLinejoin="bevel"',
  sj: 'strokeLinejoin="round"',
  m1: 'strokeMiterlimit="10"',
  m2: 'strokeMiterlimit="16"',
  sw: 'strokeWidth="var(--icon-stroke-width)"',
  t1: 'transform="matrix(1 0 0 1 16 8)"',
  t2: 'transform="matrix(1 0 0 1 20 2.5)"',
  t3: 'transform="matrix(1 0 0 1 20.5 2)"',
  t4: 'transform="matrix(1 0 0 1 21 16)"',
  t5: 'transform="matrix(1 0 0 1 22 9)"',
  t6: 'transform="matrix(1 0 0 1 8 3)"',
  t7: 'transform="matrix(4.37114e08 1 1 4.37114e08 15 22)"',
  t8: 'transform="matrix(4.37114e08 1 1 4.37114e08 15 8)"',
  t9: 'transform="matrix(4.37114e08 1 1 4.37114e08 15.0005 22)"',
  t0: 'transform="matrix(4.37114e08 1 1 4.37114e08 21 22)"',
  t: 'transform="matrix(4.37114e08 1 1 4.37114e08 9 2)"',
  t_: 'transform="rotate(90 10 6)"',
  w1: 'width="10"',
  w2: 'width="11"',
  w3: 'width="12"',
  w4: 'width="13"',
  w5: 'width="16"',
  w6: 'width="17.5"',
  w7: 'width="18"',
  w8: 'width="19"',
  w9: 'width="19.5"',
  w0: 'width="20"',
  w: 'width="3"',
  w_: 'width="4"',
};

const attrAssociationsValKey = {};
Object.entries(attrAssociations).forEach(([key, value]) => (attrAssociationsValKey[value] = key));

const iconsPath = `src/front/shared/ui/the-icon`;

walkAllFiles(`${iconsPath}/icons`, (filePath, name, _path, isDir) => {
  // if (dCount > 5) return;
  dCount++;

  const content = '' + fs.readFileSync(filePath);
  const lines = Array.from(content.matchAll(tagReg));

  // for (const [, , , attrsStr] of lines) {
  //   const attrLines = attrsStr.split(lineSplitReg);
  //   // console.log(attrLines, '\n\n');

  //   for (const attrLine of attrLines) {
  //     if (attrLine === 'opacity="0.3">') setTimeout(console.log, 100, filePath);
  //     if (
  //       attrLine.startsWith('d=') ||
  //       attrLine.startsWith('cy=') ||
  //       attrLine.startsWith('cx=') ||
  //       attrLine.startsWith('rx=') ||
  //       attrLine.startsWith('ry=') ||
  //       attrLine.startsWith('x=') ||
  //       attrLine.startsWith('y=') ||
  //       attrLine.startsWith('r=')
  //     )
  //       continue;

  //     attrCounts[attrLine] ??= 0;
  //     attrCounts[attrLine]++;
  //   }
  // }

  fs.writeFileSync(
    `${iconsPath}/icons/${name}`,
    content
      .replace(tagReg, (all, before, tagName, attrsStr, after) => {
        const icParts = [];
        const ownAttrs = [];
        const attrs = attrsStr.split(lineSplitReg);

        for (const attrKey of attrs) {
          if (attrKey === '') continue;
          if (attrAssociationsValKey[attrKey] === undefined) ownAttrs.push(attrKey);
          else icParts.push(attrKey);
        }

        if (icParts.length)
          ownAttrs.push(
            `i-c="${icParts
              .map(key => attrAssociationsValKey[key])
              .sort()
              .join(' ')}"`,
          );
        const len = icParts.length + ownAttrs.length;

        return `${before}${len === 1 ? ' ' : '\n        '}${ownAttrs.join('\n        ')}${len === 1 ? '' : '\n      '}${after}`;
      })
      .replace(secondTagReg, '/>')
      .replace(packReg, packRepStr)
      .replace(nameReg, 'the-icon="$1 $2"'),
  );
});

const sortedAttrCounts = {};
Object.keys(attrCounts)
  .sort()
  .forEach(key => (sortedAttrCounts[key] = attrCounts[key]));

console.log(dCount, attrCounts, Object.keys(attrCounts).length);
