import { CmComWid } from 'shared/api';
import { Bool } from 'shared/enums';
import { chordsBlockIncorrectMessage } from 'shared/utils/cm/com/chordsBlockIncorrectMessage';

export const cmComChordsErrorDict: Record<CmComWid, string | nil> = {};

const takeBlocksErrorMessages = (blocks: string[] | nil, isHard: Bool): string[] =>
  blocks?.flatMap((block, blocki) => {
    const message = chordsBlockIncorrectMessage(block, isHard).errors?.[0]?.message.trim();

    return message ? [`${blocki + 1}: ${message}`] : [];
  }) ?? [];

export const takeChordsErrorDictValue = (c: string[] | nil, c1: string[] | nil): string =>
  [...takeBlocksErrorMessages(c, Bool.False), ...takeBlocksErrorMessages(c1, Bool.True)].join('\n');
