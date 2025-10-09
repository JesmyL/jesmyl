import { Button } from '#shared/components/ui/button';
import { cmComEditorAudioMarksEditPacksAtom } from '$cm+editor/basis/lib/atoms/com';
import { useComPlayerCurrentTime } from '$cm/basis/lib/control/current-play-com';
import { HttpLink } from 'shared/api';

export const CmEditorTabWithComAudioMarks_AddMarkButton = ({ src }: { src: HttpLink }) => {
  const currentTime = useComPlayerCurrentTime();

  return (
    <Button
      icon="PlusSign"
      className="flex justify-center gap-2 px-2 py-1 min-w-35 border-x2! border-4! rounded-lg mt-2!"
      disabled={currentTime === 0}
      onClick={() => {
        const fixedTime = +currentTime.toFixed(3);
        cmComEditorAudioMarksEditPacksAtom.do.putMarks(src, { [fixedTime]: `+${fixedTime}+` });
      }}
    >
      {currentTime}
    </Button>
  );
};
