import { IndexAppUserAccessRightsWithoutInfo } from 'shared/model/index/access-rights';
import { toast } from 'sonner';
import { StameskaIconKind, StameskaIconPack } from 'stameska-icon/utils';

export type IndexTsjrpcSharesModel = {
  refreshAccessRights: (args: { rights: IndexAppUserAccessRightsWithoutInfo }) => unknown;
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
};
