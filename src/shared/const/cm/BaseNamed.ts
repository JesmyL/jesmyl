import { SourceBased } from '#shared/const/SourceBased';

export interface BaseNamedExportables {
  n: string;
  w: number;
}

export class BaseNamed<T extends BaseNamedExportables> extends SourceBased<T> {
  get name() {
    return this.top.n;
  }

  get wid(): T['w'] {
    return this.top.w;
  }
}
