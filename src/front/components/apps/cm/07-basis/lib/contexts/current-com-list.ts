import { contextCreator } from '#shared/lib/contextCreator';
import { CmOpenComLinkRenderer } from '$cm/basis/model/com';
import { retNull } from 'shared/utils';
import { Com } from '../../../col/com/Com';

type Titles = Record<number, string>;

export type CmComListContextValue = {
  list: Com[];
  pageTitlePostfix?: string;
  titles?: Titles;
};

export const [CmCurrentComPackContext, useCmCurrentComPackContext] = contextCreator<CmComListContextValue>({
  list: [],
});

export const [CmOpenComLinkRendererContext, useCmOpenComLinkRendererContext] =
  contextCreator<CmOpenComLinkRenderer>(retNull);
