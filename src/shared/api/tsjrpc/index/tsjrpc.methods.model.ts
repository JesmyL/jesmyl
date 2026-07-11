import { ConstantsConfig } from 'shared/model/constantsConfig';
import { IndexAccessScopeRules } from 'shared/model/index/access-rights';
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
};
