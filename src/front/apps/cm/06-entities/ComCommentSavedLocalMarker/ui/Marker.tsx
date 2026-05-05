import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComCommentCurrentComw2OpenAltiDictAtom, useCmComCommentBlock } from '$cm/entities/com-comment';
import { useAtomValue } from 'atomaric';
import { useEffect, useState } from 'react';
import { CmComCommentBlockSimpleSelector, CmComWid } from 'shared/api';

export const CmComCommentSavedLocalMarker = ({
  selector,
  comw,
}: {
  selector: CmComCommentBlockSimpleSelector;
  comw: CmComWid;
}) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentComw2OpenAltiDictAtom);
  const commentAlti = altCommentKeys[comw] ?? altCommentKeys.lasti;

  const { localCommentBlock } = useCmComCommentBlock(comw);

  return localCommentBlock?.dl?.[commentAlti]?.[selector] && <SavedLocalLabel />;
};

const SavedLocalLabel = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(setTimeoutPipe(() => setIsShow(true), 2500))
      .effect();
  }, []);

  return (
    isShow && (
      <>
        Сохранено локально
        <LazyIcon
          icon="FileValidation"
          className="text-xOK"
        />
      </>
    )
  );
};
