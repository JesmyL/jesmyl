import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComCommentCurrentOpenedAltKeyAtom, useCmComCommentBlock } from '$cm/entities/com-comment';
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
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  const { localCommentBlock } = useCmComCommentBlock(comw);

  return (
    <>
      {(localCommentBlock?.d?.[selector] != null ||
        (altCommentKey && localCommentBlock?.alt?.[altCommentKey]?.[selector] != null)) && <SavedLocalLabel />}
    </>
  );
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
