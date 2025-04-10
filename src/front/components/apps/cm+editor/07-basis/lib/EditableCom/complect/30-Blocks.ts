import { cmEditComClientInvocatorMethods } from '../../cm-editor-invocator.methods';
import { EditableComOrders } from './20-Orders';

const itTrim = (it: string) => it.trim();

export class EditableComBlocks extends EditableComOrders {
  changeChordsBlock(coli: number, val: string) {
    const value = this.transposeBlock(val, 12 - (this.transPosition || 0));
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmEditComClientInvocatorMethods.changeChordBlock({
      texti: coli,
      comw: this.wid,
      value: trimmedLinesValue,
    });
  }

  changeTextBlock(coli: number, value: string) {
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmEditComClientInvocatorMethods.changeTextBlock({
      texti: coli,
      comw: this.wid,
      value: trimmedLinesValue,
    });
  }
}
