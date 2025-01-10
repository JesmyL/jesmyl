import { contextCreator } from '../../../../../complect/contextCreator';
import { Com } from '../../col/com/Com';

type Titles = Record<number, string>;

export type CmComListContextValue = {
  list?: Com[] | nil;
  pageTitlePostfix?: string;
  titles?: Titles;
};

export const [CmComListContext, useCmTranslationComListContext] = contextCreator<CmComListContextValue>({});
