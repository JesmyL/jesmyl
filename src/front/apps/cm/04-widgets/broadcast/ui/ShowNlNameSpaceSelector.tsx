import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { cmBroadcastCurrentNameSpaceiAtom } from '$cm/entities/broadcast';
import { useAtomValue } from 'atomaric';

export const CmBroadcastShowNlNameSpaceSelector = () => {
  const showMode = useAtomValue(cmBroadcastCurrentNameSpaceiAtom);

  return (
    <>
      <Dropdown
        label={translateBase(it => it.cm.bro.lineSep)}
        id={showMode}
        onSelectId={cmBroadcastCurrentNameSpaceiAtom.set}
        items={[
          {
            id: 0,
            title: translateBase(it => it.cm.bro.five),
          },
          {
            id: 1,
            title: translateBase(it => it.cm.bro.duo),
          },
        ]}
      />
    </>
  );
};
