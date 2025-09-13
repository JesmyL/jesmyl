import { makeRegExp } from 'regexpert';

export const convertMd2HTMLMaker = (isForTg: boolean) => {
  const headersReplacer = isForTg ? '<b>$2</b>' : baseHeadersReplacer;

  return (mdText: string) => {
    if (!mdText) return '';

    return (
      // replaces
      replaceSimples(mdText.replace(ecransReg, ecransEncoderReplacer))
        .replace(tildasReg, tagsReplacer)
        .replace(supReg, tagsReplacer)
        .replace(headersReg, headersReplacer as never)
        .replace(symbolSearchReg, ecransDecoderReplacer)
    );
  };
};

export const escapeText = (text: string) =>
  text.replace(/(%[0-9a-f]{2})+/gi, a => {
    try {
      return decodeURIComponent(a);
    } catch (_error) {
      return a;
    }
  });

export const transcriptEnToRuDict = {
  q: 'й',
  w: 'ц',
  e: 'у',
  r: 'к',
  t: 'е',
  y: 'н',
  u: 'г',
  i: 'ш',
  o: 'щ',
  p: 'з',
  '[': 'х',
  '{': 'х',
  ']': 'ъ',
  '}': 'ъ',
  a: 'ф',
  s: 'ы',
  d: 'в',
  f: 'а',
  g: 'п',
  h: 'р',
  j: 'о',
  k: 'л',
  l: 'д',
  ';': 'ж',
  ':': 'ж',
  "'": 'э',
  '"': 'э',
  z: 'я',
  x: 'ч',
  c: 'с',
  v: 'м',
  b: 'и',
  n: 'т',
  m: 'ь',
  ',': 'б',
  '<': 'б',
  '.': 'ю',
  '>': 'ю',
};

export const transcriptEnToRuText = (text: string) => {
  let transcriptedText = '';
  text = text.toLowerCase();

  for (const letter of text) {
    transcriptedText += transcriptEnToRuDict[letter as 'a'] ?? letter;
  }

  return transcriptedText;
};

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// #region vars
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

const tags: Record<string, [string, string]> = {
  '***': ['<i><b>', '</b></i>'],
  '**': ['<b>', '</b>'],
  '*': ['<i>', '</i>'],

  ___: ['<i><b>', '</b></i>'],
  __: ['<b>', '</b>'],
  _: ['<i>', '</i>'],

  '~~': ['<s>', '</s>'],
  '^': ['<sup>', '</sup>'],

  '######': ['<h6>', '</h6>'],
  '#####': ['<h5>', '</h5>'],
  '####': ['<h4>', '</h4>'],
  '###': ['<h3>', '</h3>'],
  '##': ['<h2>', '</h2>'],
  '#': ['<h1>', '</h1>'],
};

const tagsReplacer = (_all: string, $1: string, $2: string) => tags[$1][0] + $2 + tags[$1][1];
const simpleReplacer = (_all: string, $1: string, $2: string) => tags[$1][0] + replaceSimples($2) + tags[$1][1];

const starsReg = makeRegExp(`/(\\*{1,3})(?<!\\\\)(.+?)\\1/g`);
const underscoresReg = makeRegExp(`/(\\_{1,3})(?<!\\\\)(.+?)\\1/g`);
const tildasReg = makeRegExp(`/(\\~{2})(.+?)\\1/g`);
const supReg = makeRegExp(`/(\\^)(.+?)\\1/g`);
const ecransReg = makeRegExp(`/\\\\./g`);
const headersReg = makeRegExp('/(#{1,6}) *(.+)/');

const replaceSimples = (text: string): string =>
  text.replace(starsReg, simpleReplacer).replace(underscoresReg, simpleReplacer);

const baseCharCode = 100000;
const baseSymbol = String.fromCharCode(baseCharCode);

const chars: Record<string, string> = {};
let currCharCode = baseCharCode;

let symbolSearchReg = makeRegExp(`/${baseSymbol}/g`);

const ecransDecoderReplacer = (all: string) => chars[all];

const ecransEncoderReplacer = (all: string) => {
  if (tags[all[1]] === undefined) return all[1];

  if (chars[all] === undefined) {
    chars[all] = String.fromCharCode(currCharCode++);
    chars[chars[all]] = all[1];

    if (currCharCode !== baseCharCode)
      symbolSearchReg = makeRegExp(`/[${baseSymbol}-${String.fromCharCode(currCharCode)}]/g`);
  }

  return chars[all];
};

const baseHeadersReplacer = (_all: string, $1: string, $2: string) => tags[$1][0] + $2 + tags[$1][1];

////////////////////////////////////////////////
////////////////////////////////////////////////
// #region mini funcs
////////////////////////////////////////////////
////////////////////////////////////////////////

export const itIt = <It>(it: It) => it;
export const itTrim = (it: string) => it.trim();
export const itNIt = <It>(it: It) => !it;
export const isNIs = (is: boolean) => !is;
export const itIs = <It>(it: It): it is Exclude<It, FalsyValue> => !!it;
export const itNumSort = (a: number, b: number) => a - b;
export const itNumSortReverse = (a: number, b: number) => b - a;
export const emptyFunc = () => {};
export const emptyAsyncFunc = async () => {};
export const emptyArray = [];
export const emptyObject = {} as const;
export const retUnd = () => undefined;
export const itNUnd = <It>(it: It) => it !== undefined;
export const retNull = () => null;
export const itNNull = <It>(it: It) => it !== null;
export const itNNil = <It>(it: It) => it != null;
export const itNNaN = (it: number) => typeof it !== 'number' || !isNaN(it);
export const itInvokeIt = <Ret>(it: () => Ret) => it();
export const wait = (waitTime = 100) => new Promise(resolve => setTimeout(resolve, waitTime));
