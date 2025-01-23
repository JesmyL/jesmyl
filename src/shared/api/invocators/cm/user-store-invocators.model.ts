import { CmComWid } from 'shared/api/complect/apps';

export type CmUserStoreSokiInvocatorModel = {
  setComComment: (comw: CmComWid, comment: string) => void;
  setComFavorites: (list: CmComWid[]) => void;
};
