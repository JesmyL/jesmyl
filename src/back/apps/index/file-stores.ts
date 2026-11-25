import { FileStore } from 'back/complect/FileStore';
import { NounPronsType } from 'back/complect/model';
import { translateBackTexts } from 'back/locales/back';
import { DeviceId, Langi, LocalSokiAuth } from 'shared/api';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { IndexValues } from 'shared/model/index/other';
import { iife } from 'shared/utils';
import { mapObjectEntries, objectFromEntries, objectKeys } from 'shared/utils/object.utils';
import { StameskaIconName, stameskaIconPack } from 'stameska-icon/pack';

export const nounsFileStorage = new FileStore<NounPronsType>('/apps/index/nouns.json', { words: {} });
export const pronounsFileStorage = new FileStore<NounPronsType>('/apps/index/pronouns.json', { words: {} });

/**
 * Форма заголовков прав доступа повторяет rightTitles.json,
 * но каждое значение — ключ серверной локали, из которого берётся текст.
 * Тип обязывает набор scope/rule совпадать с JSON.
 */
type AccessRightTitleLocaleKeys = {
  [Scope in keyof IndexAppAccessRightTitles]: {
    info: { title: BackLocaleKey };
  } & {
    [Rule in Exclude<keyof IndexAppAccessRightTitles[Scope], 'info'>]: BackLocaleKey;
  };
};

// Карта серверных locale-ключей для каждого scope/rule из rightTitles.json.
const accessRightTitleLocaleKeys: AccessRightTitleLocaleKeys = {
  general: { info: { title: BackLocaleKey.AccessRightScopeGeneralTitle }, ALL: BackLocaleKey.AccessRightRuleAll },

  cm: {
    info: { title: BackLocaleKey.AccessRightScopeCmTitle },

    EDIT: BackLocaleKey.AccessRightRuleCmEdit,

    CAT: BackLocaleKey.AccessRightRuleCmCat,

    COM: BackLocaleKey.AccessRightRuleCmCom,
    COM_MAIN: BackLocaleKey.AccessRightRuleCmComMain,
    COM_APPS: BackLocaleKey.AccessRightRuleCmComApps,
    COM_ORD: BackLocaleKey.AccessRightRuleCmComOrd,
    COM_TXT: BackLocaleKey.AccessRightRuleCmComTxt,
    COM_CH: BackLocaleKey.AccessRightRuleCmComCh,
    COM_AUDIO: BackLocaleKey.AccessRightRuleCmComAudio,
    COM_CAT: BackLocaleKey.AccessRightRuleCmComCat,
    COM_REP: BackLocaleKey.AccessRightRuleCmComRep,
    COM_AMARK: BackLocaleKey.AccessRightRuleCmComAmark,
    COM_TR: BackLocaleKey.AccessRightRuleCmComTr,
    COM_REF: BackLocaleKey.AccessRightRuleCmComRef,
    COM_INTP: BackLocaleKey.AccessRightRuleCmComIntp,

    CHORD: BackLocaleKey.AccessRightRuleCmChord,
    EVENT: BackLocaleKey.AccessRightRuleCmEvent,
    MP3: BackLocaleKey.AccessRightRuleCmMp3,
    EE: BackLocaleKey.AccessRightRuleCmEe,
    CONST: BackLocaleKey.AccessRightRuleCmConst,
  },

  sch: { info: { title: BackLocaleKey.AccessRightScopeSchTitle }, SCH: BackLocaleKey.AccessRightRuleSchSch },

  q: { info: { title: BackLocaleKey.AccessRightScopeQTitle }, EDIT: BackLocaleKey.AccessRightRuleQEdit },

  storages: {
    info: { title: BackLocaleKey.AccessRightScopeStoragesTitle },
    LIST: BackLocaleKey.AccessRightRuleStoragesList,
  },

  dash: { info: { title: BackLocaleKey.AccessRightScopeDashTitle }, DASH: BackLocaleKey.AccessRightRuleDashDash },
};

/**
 * Собирает заголовки прав доступа в форме rightTitles.json,
 * подставляя тексты серверной локали на язык подключения;
 * приведение к типу формы безопасно, потому что карта ключей типизирована по его scope/rule.
 */
export const takeAccessRightTitles = (langi = Langi.Ru): IndexAppAccessRightTitles =>
  objectFromEntries(
    mapObjectEntries(accessRightTitleLocaleKeys, (scope, { info, ...ruleKeys }) => [
      scope,
      {
        info: { title: translateBackTexts(langi, info.title) },
        ...objectFromEntries(mapObjectEntries(ruleKeys, (rule, key) => [rule, translateBackTexts(langi, key)])),
      },
    ]),
  ) as IndexAppAccessRightTitles;

export const indexStameskaIconsFileStore = new FileStore<typeof stameskaIconPack>('/stameska-icons', null as never);

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', {});

export const sentEmailOTPFileStorage = new FileStore<
  { otp: number; ts: number; deviceId: DeviceId | nil; auth: LocalSokiAuth }[]
>('/apps/index/sentEmailOTP', []);

export const dashReportRecipientsFileStorage = new FileStore<PRecord<string, Langi>>(
  '/apps/index/dashReportRecipients',
  {},
);

export const otherFooterIconFileStore = new FileStore<{
  iconNames: StameskaIconName[];
  icon: StameskaIconName | nil;
  m: number;
}>('/apps/index/otherFooterIcon.json', { iconNames: [], icon: null, m: 0 });

iife(() => {
  const store = otherFooterIconFileStore.getValue();
  const existingIconNames = new Set(objectKeys(stameskaIconPack));
  const iconNames = store.iconNames.filter(iconName => existingIconNames.has(iconName));
  let isStoreChanged = iconNames.length !== store.iconNames.length;

  if (store.icon && !existingIconNames.has(store.icon)) {
    store.icon = null;
    isStoreChanged = true;
  }

  if (!isStoreChanged) return;

  store.iconNames = iconNames;
  otherFooterIconFileStore.saveValue();
});
