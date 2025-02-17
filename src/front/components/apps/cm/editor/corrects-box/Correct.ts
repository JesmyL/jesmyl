import SourceBased from '../../../../../07-shared/lib/SourceBased';
import { ICorrect } from './CorrectsBox.model';

export default class Correct extends SourceBased<ICorrect> implements ICorrect {
  code?: number;
  message: string;
  onFix?: () => void;
  fixLabel?: string;
  id: string;
  uniq?: string;

  constructor(top: ICorrect) {
    super(top);
    this.message = top.message;
    this.setReals(top, ['code', 'onFix', 'fixLabel', 'uniq']);
    this.id = `correct#${Date.now() + Math.random()}`;
  }
}
