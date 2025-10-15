import { CmCom } from '$cm/ext';

export type ICmEditorCompositionsCatSpecialSearches = {
  title: string;
  map: (coms: CmCom[], term: string) => Promise<CmCom[]>;
  isRerenderOnInput?: boolean;
};
