import { SourceBased } from '#shared/const/SourceBased';
import { CmComBlockKindKey, IExportableKindProp } from './BlockKind.model';

export class KindBlock extends SourceBased<IExportableKindProp> {
  takeBlockAttributes = (leadKey: CmComBlockKindKey | und) => ({
    'block-kind': leadKey === undefined ? this.key : `${leadKey} ${this.key}`,
    'inherit-block-kind': this.isInherit ? '' : undefined,
  });

  get key() {
    return this.top.key ?? CmComBlockKindKey.One;
  }

  get alt() {
    return this.top.alt;
  }

  get title() {
    return this.top.title;
  }

  get isInherit() {
    return this.top.isInherit;
  }

  get isHeaderNoneForce() {
    return this.top.isHeaderNoneForce;
  }

  get isBlockForTextableOnly() {
    return this.top.isBlockForTextableOnly;
  }

  get isBlockForChordedOnly() {
    return this.top.isBlockForChordedOnly;
  }

  get group() {
    return this.top.group;
  }

  get isModulation() {
    return this.top.isModulation;
  }
  get tags() {
    return this.top.tags;
  }
  get forChordedBlock() {
    return this.top.forChordedBlock;
  }
}
