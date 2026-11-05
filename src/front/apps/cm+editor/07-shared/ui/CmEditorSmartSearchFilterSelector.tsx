import { translateBase } from '#basis/locale';
import { smartSearchComwsAtom, smartSearchFilterIdAtom } from '#basis/state/isNumberSearchAtom';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmEditorTsjrpcModel } from 'shared/api/tsjrpc/cm/editor.tsjrpc.model';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
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

export const CmEditorSmartSearchFilterSelector = () => {
  const selectedId = useAtomValue(smartSearchFilterIdAtom);
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

  useEffect(() => {
    smartSearchComwsAtom.set(null);

    if (selectedId == null) return;

    let isActual = true;

    cmEditorClientTsjrpcMethods
      .getSmartSearchComws({ filterId: selectedId })
      .then(({ comws }) => {
        if (isActual) smartSearchComwsAtom.set(comws);
      })
      .catch(error => {
        if (isActual) toast('' + error, makeToastKOMoodConfig());
      });

    return () => {
      isActual = false;
    };
  }, [selectedId]);

  if (!filters) return <StyledLoadingSpinner icon="Loading03" />;

  return (
    <Dropdown
      id={selectedId}
      placeholder={translateBase(BaseLocaleKey.CmSmartSearch)}
      onSelectId={smartSearchFilterIdAtom.set}
      items={filters}
    />
  );
};
