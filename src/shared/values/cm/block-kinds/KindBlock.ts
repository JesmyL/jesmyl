import { SourceBased } from '#shared/lib/SourceBased';
import { CmComBlockKindKey, IExportableKindProp } from './BlockKind.model';

export class KindBlock extends SourceBased<IExportableKindProp> {
  static blockKindAttribute = 'block-kind' as const;
  static inheritBlockKindAttribute = 'inherit-block-kind' as const;

  takeBlockAttributes(leadKey: CmComBlockKindKey | und) {
    return {
      [KindBlock.blockKindAttribute]: leadKey === undefined ? this.key : `${leadKey} ${this.key}`,
      [KindBlock.inheritBlockKindAttribute]: this.isInherit ? '' : undefined,
    };
  }

  get key() {
    return this.getBasicOr('key', CmComBlockKindKey.One);
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
