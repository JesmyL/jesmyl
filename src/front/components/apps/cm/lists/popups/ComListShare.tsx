import { Atom } from '#shared/lib/atom';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/app-actions/cm-app-actions';
import { useComNumbers } from '$cm/basis/lib/useComNumbers';
import { Com } from '$cm/col/com/Com';

export const ComListQrShare = ({ coms, openAtom }: { openAtom: Atom<boolean>; coms: Com[] }) => {
  const comws = coms.map(com => com.wid);
  const comwListLink = cmAppActions.makeLink({ comws });
  const comNumbers = useComNumbers(comws);

  return (
    <QrCodeFullScreen
      openAtom={openAtom}
      text={comwListLink}
      copyText={`${comwListLink}\n\n${coms
        .map(com => `${comNumbers[com.wid] === undefined ? '' : `${comNumbers[com.wid]}. `}${com.name}`)
        .join('\n')}`}
    />
  );
};
