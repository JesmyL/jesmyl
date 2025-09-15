import { IndexAppUserAccessRightsWithoutInfo } from 'shared/model/index/access-rights';
import { StameskaIconPack } from 'stameska-icon/utils';

export type IndexTsjrpcSharesModel = {
  refreshAccessRights: (args: { rights: IndexAppUserAccessRightsWithoutInfo }) => unknown;
  updateKnownIconPacks: (args: {
    actualIconPacks: PRecord<KnownStameskaIconName, StameskaIconPack | null>;
    iconsMd5Hash: string;
  }) => unknown;
};
