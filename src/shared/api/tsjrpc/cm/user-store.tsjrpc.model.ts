import { CmComWid, MigratableComToolName } from 'shared/api/complect/apps';

export type CmUserStoreTsjrpcModel = {
  /** TODO: make send after offline */
  comFav: (args: { comw: CmComWid; is: boolean }) => void;
  favTools: (args: { tools: MigratableComToolName[] }) => void;
};
