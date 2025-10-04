import { TAboutComFavoriteItem } from 'shared/api/complect/apps';

export type CmUserStoreTsjrpcModel = {
  setAboutComFavorites: (args: Partial<TAboutComFavoriteItem>) => void;
};
