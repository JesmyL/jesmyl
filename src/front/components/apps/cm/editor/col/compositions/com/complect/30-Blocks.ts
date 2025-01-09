import { cmComClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator';
import { Order } from 'front/components/apps/cm/col/com/order/Order';
import { mylib } from 'front/utils';
import { makeRegExp } from 'shared/utils';
import { EditableComOrders } from './20-Orders';

const itTrim = (it: string) => it.trim();

export class EditableComBlocks extends EditableComOrders {
  changeBlock(coln: 'texts' | 'chords', coli: number, val: string, isInsert = false) {
    const value = coln === 'texts' ? val : this.transBlock(val, 12 - (this.transPosition || 0));

    if (value == null) throw new Error();

    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');
    // const corrects = this.setBlockCorrects(coln, coli, val);
    // const colnLiteral = coln === 'texts' ? 't' : 'c';

    // this.exec({
    //   uniq: [coln, coli],
    //   prev: (coln === 'texts' ? this.texts : this.chords)?.[coli]?.replace(makeRegExp('/^\\s+|\\s+$/gm'), ''),
    //   value: execValue,
    //   method: 'set',
    //   action: 'changeBlocks',
    //   corrects,
    //   args: {
    //     value: execValue,
    //     coln: colnLiteral,
    //     index: coli,
    //   },
    //   data: {
    //     isInsert,
    //   },
    // });

    if (coln === 'texts' && this.texts) this.texts[coli] = value;
    else if (this.chords) {
      this.chords[coli] = value;
      this.resetChordLabels();
    }
  }

  changeChordsBlock(coli: number, val: string) {
    const value = this.transBlock(val, 12 - (this.transPosition || 0));
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmComClientInvocatorMethods.changeChordBlock(null, coli, this.wid, trimmedLinesValue);
  }

  changeTextBlock(coli: number, value: string) {
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmComClientInvocatorMethods.changeTextBlock(null, coli, this.wid, trimmedLinesValue);
  }

  add(fieldn: 'texts' | 'chords', value: string | string[], isInsert = false) {
    const emptyIndex = (mylib.findLastIndex(fieldn === 'texts' ? this.texts : this.chords, ch => ch) || 0) - -1;

    [value].flat().forEach((block, blocki) => {
      this.changeBlock(fieldn, emptyIndex + blocki, block, isInsert);
    });

    if (fieldn === 'chords') this.resetChordLabels();

    return this;
  }

  removeBlock(coln: 'texts' | 'chords', coli: number) {
    if (coln === 'texts') {
      const { indexes } = this.getOrdersOnBlockDeletion(coln, coli);

      indexes?.forEach(({ ord }) => {
        this.removeOrderBlock(ord);
      });
    }

    this.updateOrderSticks(coln, coli, -1, coln === 'chords');
    const colnLiteral = coln === 'texts' ? 't' : 'c';
    const currLen = this[coln]?.length;

    this.exec({
      action: 'removeBlock',
      method: 'remove',
      uniq: `${coln}-${coli}`,
      args: {
        value: coli,
        coln: colnLiteral,
      },
      anti: exec => {
        const { action, args, data } = exec;
        if (action === 'changeBlocks' && args && args.coln === colnLiteral && args.comw === this.wid) {
          if (args.index === coli)
            return data?.isInsert
              ? strategy => strategy.RemoveNew
              : args.value === ''
                ? strategy => strategy.RememberNew
                : null;
          else if (currLen !== undefined && args.index === currLen - 1) return strategy => strategy.RememberNew;
        }
      },
    });
    this[coln]?.splice(coli, 1);

    if (coln === 'chords') this.resetChordLabels();
  }

  insertBlocks(coln: 'texts' | 'chords', coli: number, value = '', prev = '...') {
    this[coln]?.concat(value).forEach((_, ccoli, ccola) => {
      if (ccoli <= coli) return;
      const val = ccoli - 1 === coli ? value : ccoli === coli ? prev : '' + ccola[ccoli - 1];

      this.changeBlock(coln, ccoli, val, true);
    });

    this.updateOrderSticks(coln, coli, 1);

    if (coln === 'chords') this.resetChordLabels();
  }

  verticalDivideBlockRender = (() => {
    type Attrs = Partial<{ disabledReason: string; disabled: boolean; confirm: string; onClick: () => void }>;
    type Render = <Elem>(render: (isCanShow: boolean, attrs?: Attrs) => Elem) => Elem;
    const splitter = '\n\n';

    return (exec: <Value>(value?: Value) => Value | und, text: string, txti: number): Render => {
      const texts = this.texts;

      if (!texts) return render => render(false);

      if (!text?.includes(splitter)) return render => render(false);

      const textOrder = this.ords.find(ord => ord.top.t === txti);
      const attrs: Attrs = { disabled: true };
      const textSplittedBlockLengths = text.split(splitter).map(block => block.split('\n').length);
      const linesCount = textSplittedBlockLengths.reduce((acc, count) => acc + count, 0);

      do {
        if (textOrder === undefined) {
          attrs.disabledReason = 'Текст не прикреплён ни к одному блоку';
          break;
        }

        if (this.ords.reduce((acc, ord) => acc + (ord.top.t === txti ? 1 : 0), 0) > 1) {
          attrs.disabledReason = 'Текст должен быть прикреплён только к одному блоку';
          break;
        }

        if (
          this.ords.some(
            ord =>
              ord.top.c === textOrder.top.c &&
              ord.top.t != null &&
              ord.top.t !== textOrder.top.t &&
              texts[ord.top.t].split('\n').length !== linesCount,
          )
        ) {
          attrs.confirm =
            'Не все аналогичные тексты (с такими же аккордами) имеют такое же количество строк. Продолжить?';
        }

        attrs.disabled = false;
      } while (false);

      if (!attrs.disabled && textOrder?.top.c != null && textOrder.top.t != null) {
        const chordi = textOrder.top.c;

        attrs.onClick = () => {
          const splitBlock = (text: string | nil) => {
            const textLines = text?.split(makeRegExp('/\n+/')) ?? [];
            let addedLinesCount = 0;

            const blockLines = textSplittedBlockLengths.map(linesCount => {
              addedLinesCount += linesCount;

              return textLines.slice(addedLinesCount - linesCount, addedLinesCount);
            });

            blockLines[blockLines.length - 1]?.push(...textLines.slice(addedLinesCount));

            return blockLines;
          };

          splitBlock(this.chords?.[chordi]).forEach((blockLines, blockLinesi) => {
            if (!blockLines.length) return;
            const block = blockLines.join('\n').trim();

            if (blockLinesi === 0) this.changeBlock('chords', chordi, block);
            else this.insertBlocks('chords', chordi + blockLinesi - 1, block);
          });

          this.ords.forEach((ord, ordi, orda) => {
            if (ord.top.t == null || ord.top.c !== chordi) return;
            const texti = ord.top.t;
            const textBlocks = splitBlock(Order.makeRepeatedText(texts[ord.top.t], ord.top.r));
            const nextOrder = orda[ordi + 1];
            let startSlicePositionsLinei = textBlocks[0].length;

            textBlocks.forEach((blockLines, blockLinesi, blockLinesa) => {
              if (!blockLines.length) return;
              const block = blockLines.join('\n').trim().replace(makeRegExp('/&nbsp;/g'), '');

              if (blockLinesi === 0) this.changeBlock('texts', texti, block);
              else {
                const txti = texti + blockLinesi;
                this.insertBlocks('texts', txti - 1, block);

                this.addOrder(
                  {
                    t: txti,
                    c: chordi + blockLinesi,
                    s: '++',
                    p:
                      blockLinesa.length - 1 === blockLinesi
                        ? ord.top.p?.slice(startSlicePositionsLinei)
                        : ord.top.p?.slice(startSlicePositionsLinei, (startSlicePositionsLinei += blockLines.length)),
                  },
                  true,
                  nextOrder?.top?.w,
                );
              }
            });
          });

          exec();
        };
      }

      return render => render(true, attrs);
    };
  })();
}
