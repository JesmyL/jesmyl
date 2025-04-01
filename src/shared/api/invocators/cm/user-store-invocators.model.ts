import { CmComWid, TAboutComFavoriteItem } from 'shared/api/complect/apps';

export type CmUserStoreSokiInvocatorModel = {
  setComComment: (args: { comw: CmComWid; comment: string }) => void;
  setAboutComFavorites: (args: Partial<TAboutComFavoriteItem>) => void;
};
