import { contextCreator } from '#shared/lib/contextCreator';
import { CmComWid } from 'shared/api';

type Titles = Record<number, string>;

export type CmComListContextValue = {
  comws: CmComWid[];
  pageTitlePostfix?: string;
  titles?: Titles;
};

export const [CmComCurrentComPackContext, useCmComCurrentComPackContext] = contextCreator<CmComListContextValue>({
  comws: [],
});
