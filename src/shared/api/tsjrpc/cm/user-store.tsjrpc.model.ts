import { CmComWid, MenuComToolName } from 'shared/api/complect/apps';

export type CmUserStoreTsjrpcModel = {
  comFav_v1: (args: { fav: Record<CmComWid, Bool> }) => void;
  favTools_v1: (args: { tools: MenuComToolName[] }) => void;
};
