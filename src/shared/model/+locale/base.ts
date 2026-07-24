import { Langi } from 'shared/api';
import {
  LocaleSatisfies,
  LocaleSimpleString,
  LocaleStrRecord,
  LocaleStrWithInterpolation,
  LocaleStrWithTwoInterpolations,
} from './model';

export type LocaleBase<L extends Langi> = LocaleSatisfies<{
  lng: L;

  cm: {
    com: {
      tool: LocaleStrRecord<'redact'>;
      forEachBlock: LocaleStrWithInterpolation<'n'>;
      showPlayer: LocaleSimpleString;
    };
  };

  /** **каждое** Вступление */
  each0: LocaleSimpleString;
  /** **каждый** Куплет */
  each1: LocaleSimpleString;
  /** **каждая** Модуляция */
  each2: LocaleSimpleString;
  /** **каждое** Продолжение */
  each3: LocaleSimpleString;

  msg: LocaleSimpleString;
  authIncorrect: LocaleSimpleString;
  selProgram: LocaleSimpleString;
  accessRights: LocaleSimpleString;
  inoe: LocaleSimpleString;
  name: LocaleSimpleString;
  role: LocaleSimpleString;
  withoutRole: LocaleSimpleString;
  enterRoleName: LocaleSimpleString;
  newRole: LocaleSimpleString;
  interactive: LocaleSimpleString;
  readQR: LocaleSimpleString;
  myFiles: LocaleSimpleString;
  downloads: LocaleSimpleString;
  constants: LocaleSimpleString;

  jesmylForDesctop: LocaleStrWithTwoInterpolations<'j', 'd'>;
  emailBindedToCurrentAuth: LocaleStrWithInterpolation<'fio'>;
  newVer: LocaleStrWithInterpolation<'v'>;

  settings: LocaleSimpleString;
  aboutApp: LocaleSimpleString;
  otherApps: LocaleSimpleString;
  bindEmail: LocaleSimpleString;
  anims: LocaleSimpleString;
  font: LocaleSimpleString;
  showErrors: LocaleSimpleString;
  chapterEmpty: LocaleSimpleString;
  actualVer: LocaleSimpleString;
  refreshAppConfirm: LocaleSimpleString;
  immediateRefreshOnFinish: LocaleSimpleString;
}>;
