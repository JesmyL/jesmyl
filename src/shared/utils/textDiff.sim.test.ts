/* Симуляция реального рендер-пути сообщений Changes: бэк отдаёт готовый текст, фронт только разворачивает конверт. */
import { describe, expect, it } from 'vitest';
import { Langi } from 'shared/api';
import { backLocalePayload, localizeChangesMessageHtml, translateBackTexts } from 'back/locales/back';
import { makeDashMessageForViewer } from 'back/dash/messageLocalization';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { LocalePayloadKind } from 'shared/model/+locale/model';
import { DashMessageKind, dashMessageSectionSeparator } from 'shared/model/index/visitsDashboard';
import { jsonStringify } from 'shared/utils';
import { makeChangesMessage } from 'shared/utils/changesMessage';
import { throwFormatter } from 'shared/utils/locale/throwFormatter';
import { makeDiffMarkupHtml, makeDiffSectionHtml, stringifyDiffValue } from 'shared/utils/textDiff';
import { makeDashboardMessageSectionHtml } from 'front/basis/locale/backLocaleError';

const makeSong = () => ({
  id: 41,
  w: 1755000000000,
  m: 1755000000000,
  n: 'Тестовая песня',
  t: [
    'Первый куплет начинается здесь',
    'И продолжается вот этой строкой',
    'Третья строка куплета звучит так',
    'Четвёртая строка куплета звучит так',
    'Пятая строка куплета звучит так',
    'Шестая строка куплета звучит так',
    'Припев начинается с этой строки',
    'И повторяется несколько раз подряд',
    'Ещё одна строка припева для объёма',
    'И финальная строка припева',
  ],
  c: ['Am F C G', 'Am F C G', 'Dm G C Am', 'Dm G C Am', 'F G Am', 'F G Am', 'C G Am F', 'C G Am F', 'Dm Am E', 'Dm Am E'],
  c1: ['H7', 'E7', 'A7'],
  b: 1,
  bpm: 92,
  d: 2,
  l: 0,
  p: 2,
  s: 4,
  o: [
    { w: 1, t: [0, 1, 2, 3, 4, 5] },
    { w: 2, t: [6, 7, 8, 9] },
  ],
  al: ['audio-1.mp3', 'audio-2.mp3'],
  nl: { n: 1, t: 1 },
  isRemoved: 0,
  visits: 137,
  am: { marks: [1, 2, 3], pack: 'x' },
  amMod: 1755000000000,
  // Добиваем объём до реалистичных ~300 строк pretty-JSON.
  extra: Array.from({ length: 30 }, (_, index) => ({
    index,
    title: `Служебный блок номер ${index}`,
    values: [index, index + 1, index + 2],
  })),
});

const countTag = (html: string, tag: 's' | 'b') =>
  [...html.matchAll(new RegExp(`<${tag} style="[^"]*">([\\s\\S]*?)</${tag}>`, 'g'))].length;

/** Самая длинная подсвеченная секция: цельный JSON-блок был бы в тысячи символов. */
const takeMaxSegmentLength = (html: string, tag: 's' | 'b') =>
  Math.max(
    0,
    ...[...html.matchAll(new RegExp(`<${tag} style="[^"]*">([\\s\\S]*?)</${tag}>`, 'g'))].map(
      ([, text]) => text.length,
    ),
  );

const makeDiffParts = () => {
  const existing = makeSong();
  const next = { ...makeSong(), t: [...makeSong().t] };
  next.t[2] = 'Третья строка куплета звучит ИНАЧЕ';
  next.m = 1755000009999;

  return { wasText: stringifyDiffValue(existing), newText: stringifyDiffValue(next), name: existing.n };
};

/** Бэк собирает тот же конверт `{t,d}`, что и pull-push: locale-payload заголовка плюс готовый HTML диффа. */
const makePayload = (diffHtml: string, name: string) =>
  makeChangesMessage(
    backLocalePayload(langi => translateBackTexts(langi, BackLocaleKey.CmComSystemChange, { n: name })),
    diffHtml,
  );

/** Payload с сырым JSON диффа в `intr.j` — старые по содержанию строки, которые обязаны остаться читаемыми. */
const makeLegacyPayload = (wasText: string | nil, newText: string | nil, name: string) =>
  throwFormatter(
    LocalePayloadKind.LocaleError,
    jsonStringify({
      title: [
        'Системное изменение песни "$n"\n$j',
        'Системна зміна пісні "$n"\n$j',
        '"$n" әніне жүйелік өзгерту енгізілді\n$j',
        'System change of the song "$n"\n$j',
      ],
      intr: { n: name, j: JSON.stringify({ was: wasText, new: newText }) },
    }),
  );

describe('real changes render path', () => {
  it('sends the localized envelope and keeps the prebuilt diff HTML intact on the front', () => {
    const { wasText, newText, name } = makeDiffParts();
    const diffHtml = makeDiffMarkupHtml(wasText ?? '', newText ?? '');
    const serverMessage = makeDashMessageForViewer(makePayload(diffHtml, name), DashMessageKind.Changes, Langi.En);
    const fromClient = makeDashboardMessageSectionHtml(serverMessage);

    expect(fromClient).toContain(diffHtml);
    expect(countTag(fromClient, 's')).toBeGreaterThan(0);
    expect(countTag(fromClient, 'b')).toBeGreaterThan(0);
    expect(fromClient).toContain('System change of the song "Тестовая песня"');
    expect(fromClient).not.toContain('{"was":');
    expect(fromClient).not.toContain('{"t":');
    expect(serverMessage).not.toContain('{"title"');
    expect(takeMaxSegmentLength(fromClient, 's')).toBeLessThan(200);
    expect(takeMaxSegmentLength(fromClient, 'b')).toBeLessThan(200);
  });

  it('localizes the envelope for email with an escaped title and pre-wrapped ready diff HTML', () => {
    const { wasText, newText } = makeDiffParts();
    const diffHtml = makeDiffMarkupHtml(wasText ?? '', newText ?? '');
    const payload = makePayload(diffHtml, '<script>alert(1)</script>');

    const emailHtml = localizeChangesMessageHtml(payload, Langi.En) ?? '';

    expect(emailHtml).toContain(`<pre style="white-space:pre-wrap">${diffHtml}</pre>`);
    expect(emailHtml).toContain('System change of the song "&lt;script&gt;alert(1)&lt;/script&gt;"');
    expect(emailHtml).not.toContain('<script>alert(1)</script>');
  });

  it('turns a legacy payload with raw JSON diff into ready HTML on the server', () => {
    const { wasText, newText, name } = makeDiffParts();
    const serverMessage = makeDashMessageForViewer(
      makeLegacyPayload(wasText, newText, name),
      DashMessageKind.Changes,
      Langi.En,
    );

    expect(countTag(serverMessage, 's')).toBeGreaterThan(0);
    expect(countTag(serverMessage, 'b')).toBeGreaterThan(0);
    expect(serverMessage).not.toContain('{"title"');
    expect(makeDashboardMessageSectionHtml(serverMessage)).toBe(serverMessage);
  });

  it('converts legacy diff sections and leaves plain pre-formatted messages intact', () => {
    const { wasText, newText } = makeDiffParts();
    const legacySection = JSON.stringify({ was: wasText, new: newText });
    const sectionHtml = makeDashMessageForViewer(legacySection, DashMessageKind.Changes, Langi.En);

    expect(makeDiffSectionHtml(legacySection)).not.toBeNull();
    expect(countTag(sectionHtml, 's')).toBeGreaterThan(0);

    const plainMessage = `Системное изменение песни "Тестовая песня"\nwas:\n<pre>${wasText}</pre>\nnew:\n<pre>${newText}</pre>`;
    expect(makeDashMessageForViewer(plainMessage, DashMessageKind.Changes, Langi.En)).toBe(plainMessage);
    expect(makeDashboardMessageSectionHtml(plainMessage)).toBe(plainMessage);
  });

  it('produces the ready Ru+viewer duo for Errors and keeps both legacy sections working', () => {
    const { wasText, newText, name } = makeDiffParts();
    const legacyMessage = `${makeLegacyPayload(wasText, newText, name)}${dashMessageSectionSeparator}${JSON.stringify({ was: wasText, new: newText })}`;

    const errorMessage = makeDashMessageForViewer(legacyMessage, DashMessageKind.Errors, Langi.En);
    const sections = errorMessage.split(dashMessageSectionSeparator);
    const body = sections.map(makeDashboardMessageSectionHtml);

    expect(errorMessage).toContain('System change of the song "Тестовая песня"');
    expect(errorMessage).toContain('Системное изменение песни');
    expect(errorMessage).not.toContain('{"title"');
    expect(body).toHaveLength(2);
    expect(countTag(body[0], 'b')).toBeGreaterThan(0);
    expect(countTag(body[1], 's')).toBeGreaterThan(0);
  });
});
