import { contextCreator } from '#shared/lib/contextCreator';
import { BroadcastViewApp } from './Broadcast.model';

export const [CurrentForceViweAppContext, useCurrentForceViweAppContext] = contextCreator<BroadcastViewApp | und>(
  undefined,
);
