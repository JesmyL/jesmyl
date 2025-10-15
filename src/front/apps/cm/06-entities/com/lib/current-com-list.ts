import { contextCreator } from '#shared/lib/contextCreator';
import { retNull } from 'shared/utils';
import { CmComOpenLinkRenderer } from '../model/com';
import { CmCom } from './Com';

type Titles = Record<number, string>;

export type CmComListContextValue = {
  list: CmCom[];
  pageTitlePostfix?: string;
  titles?: Titles;
};

export const [CmComCurrentComPackContext, useCmComCurrentComPackContext] = contextCreator<CmComListContextValue>({
  list: [],
});

export const [CmComOpenComLinkRendererContext, useCmComOpenComLinkRendererContext] =
  contextCreator<CmComOpenLinkRenderer>(retNull);
