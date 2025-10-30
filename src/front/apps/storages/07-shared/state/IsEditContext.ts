import { contextCreator } from '#shared/lib/contextCreator';

const [StoragesIsEditInnersContext, useIsEditContext] = contextCreator<boolean | und>(undefined);

export { StoragesIsEditInnersContext };

export const useStoragesIsEditInnersContext = () => {
  const isEdit = useIsEditContext();
  if (isEdit === undefined) throw 'Is Rack Card Edit Context Not Found';

  return isEdit;
};
