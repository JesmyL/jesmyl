import { CmComWid, TAboutComFavoriteItem } from 'shared/api/complect/apps';

export type CmUserStoreSokiInvocatorModel = {
  setComComment: (comw: CmComWid, comment: string) => void;
  setAboutComFavorites: (value: Partial<TAboutComFavoriteItem>) => void;
};
