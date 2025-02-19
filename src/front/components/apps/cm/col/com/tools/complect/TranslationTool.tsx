import { useAtomSet } from '../../../../../../../shared/lib/atom';
import { translationBlockAtom } from '../../../../atoms';
import { useCcom } from '../../useCcom';
import { ComTool } from '../ComTool';

export const TranslationTool = () => {
  const ccom = useCcom();
  const setCurrTexti = useAtomSet(translationBlockAtom);

  return (
    ccom && (
      <ComTool
        title="Слайды"
        icon="Computer"
        path={`../@tran?comw=${ccom.wid}`}
        onClick={() => setCurrTexti(0)}
      />
    )
  );
};
