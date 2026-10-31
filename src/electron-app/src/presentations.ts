import fs from 'fs';
import path from 'path';
import { parse } from 'pptxtojson';
import {
  PresentationImageItem,
  PresentationSlide,
  PresentationSlideBg,
  PresentationSlideCss,
  PresentationSlideItem,
  PresentationTextAlign,
  PresentationTextItem,
} from '../../shared/api/tsjrpc.electtron/presentations';
import { checkIsArray, checkIsNumber, checkIsObject, checkIsString } from '../../shared/utils/checkIs';
import { lazyInit } from '../../shared/utils/lazyInit';
import { objectKeys, objectLength } from '../../shared/utils/object.utils';
import { parseAllowedWorkDirPath } from './tsjrpc/bases/basic.server.base';

const presentationExtension = '.pptx';
const presentationParseOptions = {
  imageMode: 'base64',
  videoMode: 'none',
  audioMode: 'none',
  singleLineSpacingFactor: 1.2,
} as const;
const fullBleedTolerance = 0.02;
const designSlideWidth = 1920;
const designSlideHeight = 1080;
const defaultFontSizePt = 18;

const titleNameRegExp = /^(title|заголов)/i;
const htmlLineBreakRegExp = /<br\s*\/?>|<\/p>/gi;
const htmlTagRegExp = /<[^>]+>/g;
const fontSizeValueRegExp = /font-size:\s*(-?\d*\.?\d+)pt/gi;
const fontSizePtRegExp = /(-?\d*\.?\d+)pt\b/gi;
const paragraphHtmlRegExp = /<p\b([^>]*)>([\s\S]*?)<\/p>/g;
const fontSizePxValueRegExp = /font-size:\s*(-?\d*\.?\d+)px/gi;
const marginEmRegExp = /margin-(top|bottom):\s*(-?\d*\.?\d+)em\b/gi;
const fontFamilyRegExp = /font-family:\s*([^;"]+)/gi;
const genericFontFamilyRegExp = /\b(?:sans-serif|serif|monospace|cursive|fantasy|system-ui)\b/i;
const serifFontPrefixes = 'times georgia garamond cambria book palatino'.split(' ');
const monoFontPrefixes = 'consolas courier lucida monaco'.split(' ');
const nbspEntityRegExp = /&nbsp;/g;
const textShadowObjectRegExp = /text-shadow:\s*\[object Object\];?/gi;
const unsafeHtmlRegExp =
  /<(script|style|iframe|object|embed|link|meta|img)\b[^>]*>[\s\S]*?<\/\1\s*>|<(?:script|style|iframe|object|embed|link|meta|img)\b[^>]*\/?>|\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)|javascript:/gi;

const htmlEntityDict: PRecord<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

const decodeHtmlTextLazy = lazyInit(() => {
  const entityRegExp = new RegExp(`&(${objectKeys(htmlEntityDict).join('|')});`, 'g');
  const replaceEntity = (entity: string, name: string) => htmlEntityDict[name] ?? entity;

  return (text: string) => text.replace(entityRegExp, replaceEntity);
});

type PptFill = {
  type: string;
  value?: unknown;
};

type PptElement = {
  type: string;
  name?: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  rotate?: number;
  isFlipH?: boolean;
  isFlipV?: boolean;
  isVertical?: boolean;
  wrap?: boolean;
  vAlign?: string;
  content?: string;
  base64?: string;
  picBase64?: string;
  fill?: PptFill | nil;
  borderColor?: string;
  borderWidth?: number;
  borderType?: string;
  shapType?: string;
  strokeOnly?: boolean;
  textInset?: { l?: number; t?: number; r?: number; b?: number };
  autoFit?: { type?: string; fontScale?: number };
  order?: number;
  elements?: PptElement[];
};

type PptSlide = {
  fill?: PptFill | nil;
  elements?: PptElement[];
  layoutElements?: PptElement[];
};

type SlideSize = {
  width: number;
  height: number;
};

type FillPaint = {
  color?: string;
  image?: string;
  gradient?: string;
};

const round = (value: number) => Math.round(value * 100) / 100;

const takeDesignScale = ({ width, height }: SlideSize) => {
  if (!(width > 0) || !(height > 0)) throw `Invalid presentation slide size: ${width}x${height}`;

  return Math.min(designSlideWidth / width, designSlideHeight / height);
};

const takeHtmlLines = (html: string) =>
  decodeHtmlTextLazy()(html.replace(htmlLineBreakRegExp, '\n').replace(htmlTagRegExp, ''))
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

const takeFontScale = (element: PptElement) =>
  element.autoFit?.type === 'text' && checkIsNumber(element.autoFit.fontScale) && element.autoFit.fontScale
    ? element.autoFit.fontScale
    : 1;

/** Keeps the declared typeface but adds a matching generic fallback for hosts that lack PowerPoint fonts. */
const takeFontFamilyWithFallback = (fontFamily: string) => {
  const name = fontFamily.trim().toLowerCase();
  if (genericFontFamilyRegExp.test(name)) return fontFamily;

  const fallback = monoFontPrefixes.some(prefix => name.startsWith(prefix))
    ? 'monospace'
    : serifFontPrefixes.some(prefix => name.startsWith(prefix))
      ? 'serif'
      : 'Carlito, Noto Sans, sans-serif';

  return `${fontFamily}, ${fallback}`;
};

/** Gives every paragraph the strut and line pitch of PowerPoint's single spacing, independent of host font metrics. */
const applyParagraphFontSize = (html: string) =>
  html.replace(paragraphHtmlRegExp, (all, attributes: string, inner: string) => {
    let largestFontSize = 0;

    for (const match of inner.matchAll(fontSizePxValueRegExp)) {
      const fontSize = Number(match[1]);
      if (fontSize > largestFontSize) largestFontSize = fontSize;
    }

    if (!largestFontSize) return all;

    const paragraphCss = `font-size:${round(largestFontSize)}px;${
      attributes.includes('line-height:') ? '' : 'line-height:1.2;'
    }`;
    const paragraphAttributes = attributes.includes('style="')
      ? attributes.replace('style="', `style="${paragraphCss}`)
      : `${attributes} style="${paragraphCss}"`;

    return `<p${paragraphAttributes}>${inner}</p>`;
  });

/** Converts the parser's pt-based HTML into design-space px and removes active content at the boundary. */
const takeContentHtml = (content: string, scale: number, fontScale: number) => {
  const safeHtml = content
    .replace(unsafeHtmlRegExp, '')
    .replace(textShadowObjectRegExp, '')
    .replace(nbspEntityRegExp, ' ');
  let baseFontPt = 0;

  for (const match of safeHtml.matchAll(fontSizeValueRegExp)) baseFontPt = Math.max(baseFontPt, Number(match[1]));

  const baseFont = (baseFontPt || defaultFontSizePt) * fontScale * scale;
  const html = applyParagraphFontSize(
    safeHtml
      .replace(
        marginEmRegExp,
        (_all, side: string, value: string) => `margin-${side}: ${round((Number(value) / 100) * baseFont)}px`,
      )
      .replace(fontSizePtRegExp, (_all, value: string) => `${round(Number(value) * fontScale * scale)}px`)
      .replace(fontFamilyRegExp, (_all, fontFamily: string) => `font-family:${takeFontFamilyWithFallback(fontFamily)}`),
  );

  return { html, baseFont: round(baseFont) };
};

const takeFillPaint = (fill: PptFill | nil): FillPaint | nil => {
  if (!fill) return null;

  if (fill.type === 'color' && checkIsString(fill.value) && fill.value) return { color: fill.value };

  if (fill.type === 'image') {
    const image = fill.value;
    return checkIsObject(image) && checkIsString(image.base64) && image.base64 ? { image: image.base64 } : null;
  }

  if (fill.type === 'gradient') {
    const gradient = takeGradientCss(fill.value);
    return gradient ? { gradient } : null;
  }

  if (fill.type === 'pattern') {
    const pattern = fill.value;
    return checkIsObject(pattern) && checkIsString(pattern.foregroundColor) && pattern.foregroundColor
      ? { color: pattern.foregroundColor }
      : null;
  }

  return null;
};

const takeGradientCss = (value: unknown) => {
  if (!checkIsObject(value) || !checkIsArray(value.colors)) return null;

  const stops: string[] = [];

  for (const item of value.colors) {
    if (checkIsObject(item) && checkIsString(item.color) && checkIsString(item.pos)) stops.push(`${item.color} ${item.pos}`);
  }

  if (!stops.length) return null;

  const rot = checkIsNumber(value.rot) ? value.rot : 0;

  return value.path === 'circle' || value.path === 'rect'
    ? `radial-gradient(circle, ${stops.join(', ')})`
    : `linear-gradient(${round(rot + 90)}deg, ${stops.join(', ')})`;
};

const takeElementCss = (element: PptElement, scale: number): PresentationSlideCss | nil => {
  const css: PresentationSlideCss = {};
  const paint = takeFillPaint(element.fill);

  if (paint?.color) css.backgroundColor = paint.color;
  if (paint?.image) {
    css.backgroundImage = `url("${paint.image}")`;
    css.backgroundSize = '100% 100%';
  }
  if (paint?.gradient) css.backgroundImage = paint.gradient;

  if (checkIsNumber(element.borderWidth) && element.borderWidth > 0) {
    css.border = `${round(element.borderWidth * scale)}px ${element.borderType || 'solid'} ${
      element.borderColor || '#000000'
    }`;
  }

  if (element.shapType === 'ellipse') css.borderRadius = '50%';
  else if (element.shapType?.includes('round')) {
    const minSide = Math.min(element.width ?? 0, element.height ?? 0);
    if (minSide > 0) css.borderRadius = `${round(minSide * 0.1667 * scale)}px`;
  }

  return objectLength(css) ? css : null;
};

const isWhiteColor = (color: string) => {
  const normalized = color.toLowerCase().replace('#', '');
  return normalized === '' || normalized === 'fff' || normalized === 'ffffff' || normalized === 'white';
};

const isFullBleed = (element: PptElement, { width, height }: SlideSize) => {
  const left = element.left ?? 0;
  const top = element.top ?? 0;
  const elementWidth = element.width ?? 0;
  const elementHeight = element.height ?? 0;

  return (
    left <= width * fullBleedTolerance &&
    top <= height * fullBleedTolerance &&
    left + elementWidth >= width * (1 - fullBleedTolerance) &&
    top + elementHeight >= height * (1 - fullBleedTolerance)
  );
};

const flattenElements = (elements: PptElement[] | nil): PptElement[] =>
  (elements ?? []).flatMap(element =>
    element.elements ? flattenElements(element.elements) : element.type === 'group' ? [] : [element],
  );

const takeElementBg = (element: PptElement): PresentationSlideBg | nil => {
  if (element.type === 'image' && element.base64) return { image: element.base64 };

  return takeFillPaint(element.fill);
};

const takeLayoutBg = (elements: PptElement[] | nil, size: SlideSize): PresentationSlideBg | nil => {
  for (const element of flattenElements(elements)) {
    if (!isFullBleed(element, size)) continue;

    const bg = takeElementBg(element);
    if (bg && !(bg.color && isWhiteColor(bg.color))) return bg;
  }

  return null;
};

const takeSlideBg = (slide: PptSlide, size: SlideSize): PresentationSlideBg | nil => {
  const directBg = takeFillPaint(slide.fill);
  if (directBg && !(directBg.color && isWhiteColor(directBg.color))) return directBg;

  return takeLayoutBg(slide.layoutElements, size) ?? directBg;
};

const takeSlideTitle = (elements: PptElement[]) => {
  const blocks = elements
    .flatMap(element => {
      const lines = element.content ? takeHtmlLines(element.content) : [];
      return lines.length
        ? [{ name: element.name ?? '', top: element.top ?? 0, left: element.left ?? 0, lines }]
        : [];
    })
    .toSorted((left, right) => left.top - right.top || left.left - right.left);

  const namedTitleBlock = blocks.find(block => titleNameRegExp.test(block.name));

  return namedTitleBlock?.lines.join(' ') ?? blocks[0]?.lines[0] ?? '';
};

const takeElementBox = (element: PptElement, scale: number) => ({
  left: round((element.left ?? 0) * scale),
  top: round((element.top ?? 0) * scale),
  width: round((element.width ?? 0) * scale),
  height: round((element.height ?? 0) * scale),
});

const takeElementRotate = (element: PptElement) =>
  checkIsNumber(element.rotate) && element.rotate ? round(((element.rotate % 360) + 360) % 360) : 0;

const takeVerticalAlign = (vAlign: string | nil): PresentationTextAlign =>
  vAlign === 'mid' ? 'center' : vAlign === 'down' ? 'flex-end' : 'flex-start';

const takeTextInset = (element: PptElement, scale: number) => {
  const inset = element.textInset;
  if (!inset) return null;

  const top = round((inset.t ?? 0) * scale);
  const right = round((inset.r ?? 0) * scale);
  const bottom = round((inset.b ?? 0) * scale);
  const left = round((inset.l ?? 0) * scale);

  return top || right || bottom || left ? { top, right, bottom, left } : null;
};

const takeElementItems = (element: PptElement, scale: number): PresentationSlideItem[] => {
  const box = takeElementBox(element, scale);
  const rotate = takeElementRotate(element);

  if (element.type === 'image') {
    const src = element.base64;
    if (!src) return [];

    const item: PresentationImageItem = { kind: 'image', box, src };
    if (rotate) item.rotate = rotate;
    if (element.isFlipH) item.flipH = true;
    if (element.isFlipV) item.flipV = true;

    return [item];
  }

  if (element.type === 'math') {
    const src = element.picBase64;
    return src ? [{ kind: 'image', box, src }] : [];
  }

  if (element.type !== 'text' && element.type !== 'shape') return [];

  const boxCss = takeElementCss(element, scale);
  const content = element.content ? takeContentHtml(element.content, scale, takeFontScale(element)) : null;
  const hasText = content ? takeHtmlLines(content.html).length > 0 : false;
  const items: PresentationSlideItem[] = [];

  if (element.type === 'shape' && boxCss && !element.strokeOnly) {
    const shape: PresentationSlideItem = { kind: 'shape', box, css: boxCss };
    if (rotate) shape.rotate = rotate;
    items.push(shape);
  }

  if (!hasText || !content) {
    if (element.type === 'text' && boxCss) {
      const shape: PresentationSlideItem = { kind: 'shape', box, css: boxCss };
      if (rotate) shape.rotate = rotate;
      items.push(shape);
    }

    return items;
  }

  const text: PresentationTextItem = {
    kind: 'text',
    box,
    align: takeVerticalAlign(element.vAlign),
    contentHtml: content.html,
    baseFont: content.baseFont,
  };
  const inset = takeTextInset(element, scale);

  if (inset) text.inset = inset;
  if (element.wrap === false) text.nowrap = true;
  if (element.isVertical) text.vertical = true;
  if (rotate) text.rotate = rotate;
  if (element.type === 'text' && boxCss) text.boxCss = boxCss;

  items.push(text);

  return items;
};

const takePresentationSlide = (slide: PptSlide, slid: number, size: SlideSize, scale: number): PresentationSlide => {
  const elements = flattenElements(slide.elements).toSorted(
    (left, right) => (left.order ?? 0) - (right.order ?? 0),
  );
  const layoutItems = flattenElements(slide.layoutElements)
    .filter(element => !isFullBleed(element, size) && !(element.content && takeHtmlLines(element.content).length))
    .flatMap(element => takeElementItems(element, scale));
  const bg = takeSlideBg(slide, size);
  const result: PresentationSlide = {
    slid,
    title: takeSlideTitle(elements),
    width: round(size.width * scale),
    height: round(size.height * scale),
    items: [...layoutItems, ...elements.flatMap(element => takeElementItems(element, scale))],
  };

  if (bg) result.bg = bg;

  return result;
};

const isPresentationFilePath = (filePath: string) =>
  path.extname(filePath).toLowerCase() === presentationExtension;

/** Resolves a renderer-supplied WorkDir path — arbitrary filesystem paths are rejected by the allowed-root check. */
const takePresentationPath = (inputPath: string) => {
  const filePath = parseAllowedWorkDirPath(inputPath);
  if (!filePath) throw `Presentation path is outside the allowed WorkDir: ${inputPath}`;

  if (!isPresentationFilePath(filePath)) throw `Invalid presentation file path: ${inputPath}`;

  let isFile = false;

  try {
    isFile = fs.statSync(filePath).isFile();
  } catch {
    // Missing file — reported by the guard below with the same descriptive error.
  }

  if (!isFile) throw `Presentation not found: ${inputPath}`;

  return filePath;
};

const parsePresentationSlides = async (filePath: string): Promise<PresentationSlide[]> => {
  const fileBuffer = fs.readFileSync(filePath);
  const arrayBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);
  const { slides, size } = await parse(arrayBuffer, presentationParseOptions);
  const scale = takeDesignScale(size);

  return slides.map((slide, index) => takePresentationSlide(slide, index + 1, size, scale));
};

export const readPresentationSlides = (filePath: string): Promise<PresentationSlide[]> =>
  parsePresentationSlides(takePresentationPath(filePath));

/** Cheap tile thumbnail — the parser builds every slide anyway, so only slide 1 is kept. */
export const readPresentationPreview = async (filePath: string): Promise<PresentationSlide | nil> =>
  (await readPresentationSlides(filePath))[0] ?? null;
