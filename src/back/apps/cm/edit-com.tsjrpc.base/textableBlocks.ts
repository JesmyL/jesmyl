import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { CmComWid } from 'shared/api';
import { CmEditComTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com.tsjrpc.model';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { trimTextLines } from 'shared/utils';
import { takeTextBlockIncorrects } from 'shared/utils/cm/com/takeTextBlockIncorrects';
import { textLinesLengthIncorrects } from 'shared/utils/cm/com/textLinesLengthIncorrects';
import { transformToClearText } from 'shared/utils/cm/com/transformToClearText';
import { CRUDOperation } from 'shared/utils/index/utils';
import { eePackFileStore } from '../file-stores';
import { modifyCom } from './lib/modifiers';

export const cmEditComServerTsjrpcTextableBlocks = {
  changeChordBlock: modifyCom('COM_CH', (com, { texti, value }) => {
    com.c ??= [];
    const prev = com.c[texti];
    com.c[texti] = trimTextLines(value);

    return `изменён аккордный блок:\n\n${value}\n\nбыло:\n${prev}`;
  }),
  changeTextBlock: modifyCom('COM_TXT', (com, { texti, value }) => {
    const incorrects = textLinesLengthIncorrects(value, constantsConfigFileStore.getValue().maxAvailableComLineLength);

    if (incorrects?.errors?.length) throw incorrects.errors[0].message;

    com.t ??= [];
    const prev = com.t[texti];
    const clearValue = transformToClearText(value);

    com.t[texti] = clearValue;

    return `изменён текстовый блок:\n\n${value}\n\nбыло:\n${prev}`;
  }),
  textCaps: modifyCom('COM_TXT', (com, { texts }) => {
    const newTexts: string[] = [];

    texts.forEach((newText, newTexti) => {
      const lenIncorrects = textLinesLengthIncorrects(
        newText,
        constantsConfigFileStore.getValue().maxAvailableComLineLength,
      );

      if (lenIncorrects?.errors?.length) throw lenIncorrects.errors[0].message;

      const textIncorrects = takeTextBlockIncorrects(newText, eePackFileStore.getValue());
      if (textIncorrects?.errors?.length) throw textIncorrects.errors[0].message;

      newTexts[newTexti] = transformToClearText(newText);
    });

    com.t = newTexts;

    return `изменены текстовые блоки`;
  }),

  insertChordBlock: insertInTextableBlock('c', ['COM_CH', 'C'], ({ value }) => {
    return `вставлен${value ? '' : ' новый'} аккордный блок ${value ? `:\n\n${value}` : ''}`;
  }),
  insertTextBlock: insertInTextableBlock('t', ['COM_TXT', 'C'], ({ value }) => {
    return `вставлен${value ? '' : ' новый'} текстовый блок${value ? `:\n\n${value}` : ''}`;
  }),

  removeChordBlock: removeTextableBlock('c', ['COM_CH', 'D'], ({ value }) => {
    return `удалён${value ? '' : ' новый'} аккордный блок ${value ? `:\n\n${value}` : ''}`;
  }),
  removeTextBlock: removeTextableBlock('t', ['COM_TXT', 'D'], ({ value }) => {
    return `удалён${value ? '' : ' новый'} текстовый блок${value ? `:\n\n${value}` : ''}`;
  }),
} satisfies ServerTsjrpcSatisfy<CmEditComTsjrpcModel>;

function insertInTextableBlock<Props extends { value: string; comw: CmComWid; insertToi: number }>(
  coln: 'c' | 't',
  rightsCheck:
    | keyof OmitOwn<IndexAppAccessRightTitles['cm'], 'info'>
    | [keyof OmitOwn<IndexAppAccessRightTitles['cm'], 'info'>, CRUDOperation],
  dsc: (props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyCom<Props>(rightsCheck, (com, props, tool) => {
    if (com[coln] == null) return '';
    const list = com[coln];

    list.splice(props.insertToi, 0, props.value);
    com.o?.forEach(ord => {
      if (ord[coln] != null && ord[coln] >= props.insertToi) ord[coln]++;
    });

    return dsc(props, tool);
  });
}

function removeTextableBlock<Props extends { comw: CmComWid; removei: number }>(
  coln: 'c' | 't',
  rightsCheck:
    | keyof OmitOwn<IndexAppAccessRightTitles['cm'], 'info'>
    | [keyof OmitOwn<IndexAppAccessRightTitles['cm'], 'info'>, CRUDOperation],
  dsc: (props: Props, tool: ServerTSJRPCTool) => string,
) {
  return modifyCom<Props>(rightsCheck, (com, props, tool) => {
    if (com[coln] == null) return '';
    const list = com[coln];

    list.splice(props.removei, 1);
    com.o?.forEach(ord => {
      if (ord[coln] != null)
        if (ord[coln] > props.removei) ord[coln]--;
        else if (ord[coln] === props.removei) delete ord[coln];
    });

    com.o = com.o?.filter(ord => ord.a != null || ord.c != null || ord.t != null) ?? [];

    return dsc(props, tool);
  });
}
