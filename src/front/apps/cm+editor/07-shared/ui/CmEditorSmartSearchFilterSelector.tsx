import { translateBase, translateEditorBase } from '#basis/locale';
import { smartSearchComwsAtom, smartSearchFilterIdAtom } from '#basis/state/isNumberSearchAtom';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { StyledLoadingSpinner } from '#shared/ui/the-icon/IconLoading';
import { TextInput } from '#shared/ui/TextInput';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useCmEditorSmartSearchFilters } from '$cm+editor/shared/lib/useCmEditorSmartSearchFilters';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';
import { useDebounceCallback } from 'shared/utils/useDebounceCallback';
import { toast } from 'sonner';

const paramFilterIds = new Set([
  BackLocaleKey.CmSmartSearchLineLengthMore,
  BackLocaleKey.CmSmartSearchRepeatsByRegExp,
  BackLocaleKey.CmSmartSearchMatchInRepeated,
]);

export const CmEditorSmartSearchFilterSelector = () => {
  const selectedId = useAtomValue(smartSearchFilterIdAtom);
  const filters = useCmEditorSmartSearchFilters();
  const [param, setParam] = useState('');
  const prevSelectedId = useRef<BackLocaleKey | nil>(null);
  const debounce = useDebounceCallback(300);

  useEffect(() => {
    smartSearchComwsAtom.set(null);

    if (selectedId == null) return;

    let isActual = true;
    const loadComws = () => {
      cmEditorClientTsjrpcMethods
        .getSmartSearchComws_1({ filterId: selectedId, param })
        .then(({ comws }) => {
          if (isActual) smartSearchComwsAtom.set(comws);
        })
        .catch(error => {
          if (isActual) toast('' + error, makeToastKOMoodConfig());
        });
    };

    if (prevSelectedId.current === selectedId) debounce(loadComws);
    else {
      prevSelectedId.current = selectedId;
      loadComws();
    }

    return () => {
      isActual = false;
    };
  }, [selectedId, param, debounce]);

  if (!filters) return <StyledLoadingSpinner icon="Loading03" />;

  return (
    <>
      <Dropdown
        id={selectedId}
        placeholder={translateBase(BaseLocaleKey.CmSmartSearch)}
        onSelectId={smartSearchFilterIdAtom.set}
        items={filters}
      />
      {selectedId != null && paramFilterIds.has(selectedId) && (
        <TextInput
          value={param}
          onInput={setParam}
          maxLength={100}
          placeholder={translateEditorBase(EditorLocaleKey.CmEditorSmartSearchParam)}
        />
      )}
    </>
  );
};
