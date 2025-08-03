import { CmComWid, TAboutComFavoriteItem } from 'shared/api/complect/apps';

export type CmUserStoreTsjrpcModel = {
  /** @deprecated */
  setComComment: (args: { comw: CmComWid; comment: string }) => void;
  setAboutComFavorites: (args: Partial<TAboutComFavoriteItem>) => void;
};
