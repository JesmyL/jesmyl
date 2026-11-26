import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useEffect, useState } from 'react';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { toast } from 'sonner';

type SmartSearchFilter = ReturnType<CmEditorTsjrpcModel['getSmartSearchFilters']>['filters'][number];

let filtersCache: SmartSearchFilter[] | nil = null;
let filtersPromise: Promise<SmartSearchFilter[]> | nil = null;

const takeSmartSearchFilters = () => {
  if (filtersCache) return Promise.resolve(filtersCache);

  return (filtersPromise ??= cmEditorClientTsjrpcMethods
    .getSmartSearchFilters()
    .then(({ filters }) => (filtersCache = filters))
    .catch(error => {
      filtersPromise = null;
      throw error;
    }));
};

export const useCmEditorSmartSearchFilters = () => {
  const [filters, setFilters] = useState(filtersCache);

  useEffect(() => {
    if (filtersCache) return;

    let isActual = true;
    takeSmartSearchFilters()
      .then(filters => {
        if (isActual) setFilters(filters);
      })
      .catch(error => {
        if (isActual) toast('' + error, makeToastKOMoodConfig());
      });

    return () => {
      isActual = false;
    };
  }, []);

  return filters;
};
