import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { CmComWid } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { trimTextLines } from 'shared/utils';
import { slavicLowerLettersStr } from 'shared/utils/cm/com/const';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';
import { transformToClearText } from 'shared/utils/cm/com/transformToClearText';
import { cmConstantsConfigFileStore } from '../file-stores';
import { modifyCom } from './lib/modifiers';

export const cmEditComServerTsjrpcTextableBlocks = {
  changeChordBlock: modifyCom((com, { texti, value }, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'U')) throw '';

    com.c ??= [];
    const prev = com.c[texti];
    com.c[texti] = trimTextLines(value);

    return `изменён аккордный блок:\n\n${value}\n\nбыло:\n${prev}`;
  }),
  changeTextBlock: modifyCom((com, { texti, value }, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'U')) throw '';

    const incorrects = textLinesLengthIncorrects(
      value,
      cmConstantsConfigFileStore.getValue().maxAvailableComLineLength,
    );

    if (incorrects?.errors?.length) throw incorrects.errors[0].message;

    com.t ??= [];
    const prev = com.t[texti];
    const clearValue = transformToClearText(value);

    com.t[texti] = clearValue;

    return `изменён текстовый блок:\n\n${value}\n\nбыло:\n${prev}`;
  }),
  textCaps: modifyCom((com, { texts }, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'U')) throw '';
    const newTexts: string[] = [];
    const comTexts = (com.t ??= []);
    const notRuLettersReg = makeRegExp(`/[^${slavicLowerLettersStr}]/gi`);

    texts.forEach((newText, newTexti) => {
      if (
        newText.replace(notRuLettersReg, '').toLowerCase() !==
        comTexts[newTexti]?.replace(notRuLettersReg, '').toLowerCase()
      )
        throw 'Редактировать можно только заглавные буквы';

      const incorrects = textLinesLengthIncorrects(
        newText,
        cmConstantsConfigFileStore.getValue().maxAvailableComLineLength,
      );

      if (incorrects?.errors?.length) throw incorrects.errors[0].message;

      newTexts[newTexti] = transformToClearText(newText);
    });

    com.t = newTexts;

    return `изменены текстовые блоки`;
  }),

  removeVerticalBarsFromTexts: modifyCom((com, _, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM', 'D')) throw '';

    const texts = com.t;

    if (texts) texts.forEach((text, texti) => (texts[texti] = text.replace(makeRegExp('/[|]/g'), '')));

    return `вырезаны столбики из текстов`;
  }),

  insertChordBlock: insertInTextableBlock('c', ({ value }, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'C')) throw '';

    return `вставлен${value ? '' : ' новый'} аккордный блок ${value ? `:\n\n${value}` : ''}`;
  }),
  insertTextBlock: insertInTextableBlock('t', ({ value }, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'C')) throw '';

    return `вставлен${value ? '' : ' новый'} текстовый блок${value ? `:\n\n${value}` : ''}`;
  }),

  removeChordBlock: removeTextableBlock('c', ({ value }, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_CH', 'D')) throw '';

    return `удалён${value ? '' : ' новый'} аккордный блок ${value ? `:\n\n${value}` : ''}`;
  }),
  removeTextBlock: removeTextableBlock('t', ({ value }, { auth }) => {
    if (throwIfNoUserScopeAccessRight(auth, 'cm', 'COM_TXT', 'D')) throw '';

    return `удалён${value ? '' : ' новый'} текстовый блок${value ? `:\n\n${value}` : ''}`;
  }),
} satisfies ServerTsjrpcSatisfy<CmEditComTsjrpcModel>;

function insertInTextableBlock<Props extends { value: string; comw: CmComWid; insertToi: number }>(
  coln: 'c' | 't',
  text: (props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyCom<Props>((com, props, tool) => {
    if (com[coln] == null) return '';
    const list = com[coln];

    list.splice(props.insertToi, 0, props.value);
    com.o?.forEach(ord => {
      if (ord[coln] != null && ord[coln] >= props.insertToi) ord[coln]++;
    });

    return text(props, tool);
  });
}

function removeTextableBlock<Props extends { comw: CmComWid; removei: number }>(
  coln: 'c' | 't',
  text: (props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyCom<Props>((com, props, tool) => {
    if (com[coln] == null) return null;
    const list = com[coln];

    list.splice(props.removei, 1);
    com.o?.forEach(ord => {
      if (ord[coln] != null)
        if (ord[coln] > props.removei) ord[coln]--;
        else if (ord[coln] === props.removei) delete ord[coln];
    });

    com.o = com.o?.filter(ord => ord.a != null || ord.c != null || ord.t != null);

    return text(props, tool);
  });
}
