import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmBroadcastCurrentNameSpaceiAtom } from '$cm/entities/broadcast';
import { useAtomValue } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmBroadcastShowNlNameSpaceSelector = () => {
  const nameSpacei = useAtomValue(cmBroadcastCurrentNameSpaceiAtom);

  return (
    <>
      <Dropdown
        label={translateBase(BaseLocaleKey.CmBroadcastLineSeparator)}
        id={nameSpacei}
        onSelectId={cmBroadcastCurrentNameSpaceiAtom.set}
        items={[
          {
            id: 0,
            title: translateBase(BaseLocaleKey.CmBroadcastFive),
          },
          {
            id: 1,
            title: translateBase(BaseLocaleKey.CmBroadcastDuo),
          },
        ]}
      />
    </>
  );
};
