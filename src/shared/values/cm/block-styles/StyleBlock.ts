import { SourceBased } from '#shared/lib/SourceBased';
import { CmBlockStyleKey, IExportableStyleProp } from './BlockStyles.model';

export class StyleBlock extends SourceBased<IExportableStyleProp> {
  static blockStyleAttribute = 'block-style' as const;
  static inheritBlockStyleAttribute = 'inherit-block-style' as const;

  takeBlockAttributes(leadKey: CmBlockStyleKey | und) {
    return {
      [StyleBlock.blockStyleAttribute]: leadKey === undefined ? this.key : `${leadKey} ${this.key}`,
      [StyleBlock.inheritBlockStyleAttribute]: this.isInherit ? '' : undefined,
    };
  }

  get key() {
    return this.getBasicOr('key', CmBlockStyleKey.One);
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
