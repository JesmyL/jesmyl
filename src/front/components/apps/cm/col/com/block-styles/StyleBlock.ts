import { SourceBased } from '#shared/lib/SourceBased';
import { makeRegExp } from 'shared/utils';
import { Order } from '../order/Order';
import { IExportableStyleProp } from './BlockStyles.model';

export class StyleBlock extends SourceBased<IExportableStyleProp> {
  get key() {
    return this.getBasicOr('key', '');
  }

  normName(name: string) {
    return name
      .replace(makeRegExp('/ /g'), '_')
      .replace(makeRegExp('/\\+/g'), '_plus')
      .replace(makeRegExp('/>/g'), '_shift');
  }

  getStyleName(ord: Order) {
    return `${this.normName(this.key)} ${this.isInherit ? 'inherit' : ''} ${this.normName(
      ord.me.leadOrd?.me.style?.key || '',
    )}`;
  }

  get title() {
    return this.getBasic('title');
  }

  get isInherit() {
    return this.getBasic('isInherit');
  }

  get isHeaderNoneForce() {
    return this.getBasic('isHeaderNoneForce');
  }

  get isBlockForTextableOnly() {
    return this.getBasic('isBlockForTextableOnly');
  }

  get isBlockForChordedOnly() {
    return this.getBasic('isBlockForChordedOnly');
  }

  get group() {
    return this.getBasic('group');
  }

  get isModulation() {
    return this.getBasic('isModulation');
  }
  get tags() {
    return this.getBasic('tags');
  }
  get forChordedBlock() {
    return this.getBasic('forChordedBlock');
  }
}
