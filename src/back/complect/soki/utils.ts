import { smylib } from 'shared/utils';

export class SokiAutherUtils {
  static makePassw(id: number | und, nick: string | und) {
    return smylib.md5(`{${id}.${nick}} `);
  }

  static makeLoginFromId = (id: number) => 'T' + smylib.md5('' + id).slice(1);
}
