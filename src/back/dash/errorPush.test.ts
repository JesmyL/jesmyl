import { describe, expect, it } from 'vitest';
import { backLocaleError } from 'back/locales/back';
import { Langi } from 'shared/api';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { dashMessageSectionSeparator } from 'shared/model/index/visitsDashboard';
import { makeChangesMessage } from 'shared/utils/changesMessage';
import { takeErrorPushSummary } from './errorPush';

const payload = backLocaleError(BackLocaleKey.CmComOrderParentNotFound, { p: 'Parent-1' });

/** Сообщение ровно в том виде, в каком его сохраняет onErrorMessage: payload склеен с секцией auth/visit. */
const errorMessage = `auth\ncom.editCom()\n\n${payload}${dashMessageSectionSeparator}https://example.com\n\n<code>{"url":"https://example.com"}</code>\n\n<code>{"login":"auth"}</code>\n\n\nАргументы:\n{"w":1}`;

describe('takeErrorPushSummary', () => {
  it('localizes the embedded payload and drops the auth/visit envelope with raw JSON', () => {
    const body = takeErrorPushSummary(errorMessage, Langi.Ru);

    expect(body).toContain('Не найден определённый родительский блок Parent-1');
    expect(body).not.toContain('{"title"');
    expect(body).not.toContain('1 {');
    expect(body).not.toContain('{"login"');
    expect(body).not.toContain('https://example.com');
    expect(body).not.toContain('Аргументы');
  });

  it('uses the recipient language for the payload text', () => {
    const body = takeErrorPushSummary(errorMessage, Langi.En);

    expect(body).toContain('The specified parent block Parent-1 was not found');
    expect(body).not.toContain('Не найден');
  });

  it('localizes a Changes envelope instead of pushing its raw JSON', () => {
    const body = takeErrorPushSummary(makeChangesMessage(payload, '<pre>diff</pre>'), Langi.En);

    expect(body).toBe('The specified parent block Parent-1 was not found');
    expect(body).not.toContain('{"t"');
    expect(body).not.toContain('diff');
  });

  it('keeps an envelope-less payload readable and drops the sender name line', () => {
    const body = takeErrorPushSummary(`auth\n${payload}`, Langi.Ru);

    expect(body).toBe('Не найден определённый родительский блок Parent-1');
  });
});
