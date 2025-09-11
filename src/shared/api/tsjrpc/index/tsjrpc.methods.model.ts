import { IndexAppUserAccessRightsWithoutInfo } from 'shared/model/index/access-rights';

export type IndexTsjrpcSharesModel = {
  refreshAccessRights: (args: { rights: IndexAppUserAccessRightsWithoutInfo }) => unknown;
};
