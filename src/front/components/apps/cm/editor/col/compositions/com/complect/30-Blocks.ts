import { cmComClientInvocatorMethods } from 'front/components/apps/cm/editor/cm-editor-invocator.methods';
import { EditableComOrders } from './20-Orders';

const itTrim = (it: string) => it.trim();

export class EditableComBlocks extends EditableComOrders {
  changeChordsBlock(coli: number, val: string) {
    const value = this.transBlock(val, 12 - (this.transPosition || 0));
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmComClientInvocatorMethods.changeChordBlock(null, coli, this.wid, trimmedLinesValue);
  }

  changeTextBlock(coli: number, value: string) {
    const trimmedLinesValue = value.split('\n').map(itTrim).join('\n');

    return cmComClientInvocatorMethods.changeTextBlock(null, coli, this.wid, trimmedLinesValue);
  }
}
