import mylib from "../../../../../../complect/my-lib/MyLib";
import SourceBased from "../../../../../../complect/SourceBased";
import * as styles from '../../../resources/block-styles.json';
import { IExportableSetts } from "./BlockStyles.model";
import { StyleBlock } from "./StyleBlock";

export class BlockStyles extends SourceBased<IExportableSetts> {
  styles: StyleBlock[];

  constructor(top: IExportableSetts) {
    super(top);
    this.styles = mylib.typ([], top.styles).map(st => new StyleBlock(st));
  }
}


export let blockStyles: BlockStyles | nil = new BlockStyles(styles);

