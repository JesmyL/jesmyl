import { contextCreator } from '#shared/lib/contextCreator';
import { emptyFunc } from 'shared/utils';

export const [CmComSetListLimitsExtracterContext, useCmComSetListLimitsExtracterContext] = contextCreator<{
  current: (start: number | nil, finish: number | nil) => void;
}>({ current: emptyFunc });
