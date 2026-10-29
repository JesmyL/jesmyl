import { Langi } from 'shared/api/complect/enums';
import { LocaleBase } from 'shared/model/+locale/base';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { LocaleCmEditor } from 'shared/model/+locale/editor';
import { ConstantsConfig } from 'shared/model/constantsConfig';
import { IndexAccessScopeRules } from 'shared/model/index/access-rights';
import { DashMessage } from 'shared/model/index/visitsDashboard';
import { toast } from 'sonner';
import { StameskaIconKind, StameskaIconPack } from 'stameska-icon/utils';

export type IndexTsjrpcSharesModel = {
  refreshAccessRights: (args: { rights: IndexAccessScopeRules; mod: number }) => unknown;
  updateKnownIconPacks: (args: {
    actualIconPacks: PRecord<KnownStameskaIconName, StameskaIconPack | null>;
    iconsMd5Hash: string;
  }) => unknown;

  /** from v1041 */
  userModal: (args: { text: string; header?: string; footer?: string }) => void;

  /** from v1041 */
  userToast: (args: {
    text: string;
    icon?: KnownStameskaIconName;
    iconKind?: StameskaIconKind;
    mood?: 'ko' | 'ok';
    config?: Parameters<typeof toast>[1];
  }) => void;

  constConfig: (args: { config: Partial<ConstantsConfig>; mod: number }) => unknown;

  visitsOnline: (args: { count: number }) => unknown;

  dashMessage: (args: { message: DashMessage }) => unknown;

  baseLocConf: (args: { base: LocaleBase<Langi>; mod: number }) => unknown;
  editorLocConf: (args: { editor: LocaleCmEditor; mod: number }) => unknown;
  dynLocConf: (args: { dyns: LocaleDynamic<Langi>[]; mod: number }) => unknown;
};
