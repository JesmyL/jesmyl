import { CmComWid, MigratableComToolName } from 'shared/api/complect/apps';

export type CmUserStoreTsjrpcModel = {
  comFav_v1: (args: { fav: Record<CmComWid, Bool> }) => void;
  favTools: (args: { tools: MigratableComToolName[] }) => void;
};
