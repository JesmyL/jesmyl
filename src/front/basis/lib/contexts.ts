import { AppName } from '#basis/model/App.model';
import { contextCreator } from '#shared/lib/contextCreator';

export const [AppNameContext, useAppNameContext] = contextCreator<AppName>('cm');
