import { SourceBased } from '#shared/lib/SourceBased';

export interface BaseNamedExportables {
  n: string;
  w: number;
}

export class BaseNamed<T extends BaseNamedExportables> extends SourceBased<T> {
  get name() {
    return this.getBasic('n');
  }

  get wid() {
    return this.getBasic('w');
  }
}
