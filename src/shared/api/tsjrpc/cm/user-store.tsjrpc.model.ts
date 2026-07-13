import { CmComWid, MigratableComToolName } from 'shared/api/complect/apps';

export type CmUserStoreTsjrpcModel = {
  comFav: (args: { comw: CmComWid; is: boolean }) => void;
  favTools: (args: { tools: MigratableComToolName[] }) => void;
};
