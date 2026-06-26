import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComOrder } from 'shared/const/cm/order/Order';
import { CmBroadcastSlideLine } from 'shared/model/cm/broadcast';
import { EditableComOrders } from './20-Orders';

const itTrim = (it: string) => it.trim();

export class EditableComBlocks extends EditableComOrders {
  changeChordsBlock(coli: number, val: string) {
    const value = this.transposeBlock(val, 12 - (this.transPosition || 0));
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmEditComClientTsjrpcMethods.changeChordBlock({
      texti: coli,
      comw: this.wid,
      value: trimmedLinesValue,
    });
  }

  changeTextBlock(coli: number, value: string) {
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmEditComClientTsjrpcMethods.changeTextBlock({
      texti: coli,
      comw: this.wid,
      value: trimmedLinesValue,
    });
  }

  makeExpandGroupedLines = (isFinalChordedOrd: boolean) => {
    let prevOrd: CmComOrder | null = null;
    let prevTotalLinei = -1;

    const slides: CmBroadcastSlideLine[][] = [];

    this.makeExpandLines(isFinalChordedOrd).forEach(slide => {
      if ((slide.ord !== prevOrd || slide.totalLinei < prevTotalLinei) && !slide.ord.isAnyInherited) slides.push([]);
      slides.at(-1)?.push(slide);

      prevOrd = slide.ord;
      prevTotalLinei = slide.totalLinei;
    });

    return slides;
  };
}
