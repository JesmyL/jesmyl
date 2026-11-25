import { Langi } from 'shared/api';
import { DashMessageKind, dashMessageSectionSeparator } from 'shared/model/index/visitsDashboard';
import { makeChangesMessage, parseChangesMessage } from 'shared/utils/changesMessage';
import { checkIsString } from 'shared/utils/checkIs';
import {
  type BackLocaleErrorPayload,
  localizeBackLocalePayloads,
  mapBackLocalePayloadSegments,
  takeBackLocaleErrorTitleHtml,
  takeBackLocaleErrorTitleText,
} from 'shared/utils/locale/backLocaleError';
import { makeDiffSectionHtml } from 'shared/utils/textDiff';

/** HTML заголовка payload: готовый дифф из `intr.j` сохраняется, остальной текст экранируется. */
const makePayloadHtml = (payload: BackLocaleErrorPayload, langi = Langi.Ru) => {
  const titleText = takeBackLocaleErrorTitleText(payload, langi);

  if (checkIsString(payload.intr?.j)) {
    const legacyDiffHtml = makeDiffSectionHtml(titleText, false, true);
    if (legacyDiffHtml !== null) return legacyDiffHtml;
  }

  return takeBackLocaleErrorTitleHtml(payload, langi);
};

/** Дуо ошибок: строка на `Ru`, затем строка на языке зрителя, каждая уже готова к `innerHTML`. */
const makePayloadDuoHtml = (payload: BackLocaleErrorPayload, langi = Langi.Ru) => {
  const ruText = makePayloadHtml(payload, Langi.Ru);
  const viewerText = makePayloadHtml(payload, langi);

  return ruText === viewerText ? ruText : `${ruText}\n${viewerText}`;
};

const localizeSection = (section: string, kind: DashMessageKind, langi = Langi.Ru) => {
  const changes = parseChangesMessage(section);
  if (changes) return makeChangesMessage(localizeBackLocalePayloads(changes.t, langi), changes.d ?? '');

  const legacyDiffHtml = makeDiffSectionHtml(section);
  if (legacyDiffHtml !== null) return legacyDiffHtml;

  return kind === DashMessageKind.Errors
    ? mapBackLocalePayloadSegments(section, payload => makePayloadDuoHtml(payload, langi))
    : mapBackLocalePayloadSegments(section, payload => makePayloadHtml(payload, langi));
};

/**
 * Готовит сохранённое сообщение дашборда к показу на языке зрителя: payload заменяется готовым текстом,
 * у конверта Changes локализуется заголовок, а legacy-секции диффа превращаются в готовый HTML.
 * В БД по-прежнему лежит исходная строка с payload.
 */
export const makeDashMessageForViewer = (message: string, kind: DashMessageKind, langi = Langi.Ru) =>
  message
    .split(dashMessageSectionSeparator)
    .map(section => localizeSection(section, kind, langi))
    .join(dashMessageSectionSeparator);
