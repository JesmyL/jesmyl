import SourceBased from '../../../../07-shared/lib/SourceBased';

export interface BaseNamedExportables {
  n: string;
  w: number;
}

export class BaseNamed<T extends BaseNamedExportables> extends SourceBased<T> {
  get name() {
    return this.getBasic('n');
  }
  set name(value) {
    this.setExportable('n', value);
  }

  get wid() {
    return this.getBasic('w');
  }
  set wid(value) {
    this.setExportable('w', value);
  }
}
