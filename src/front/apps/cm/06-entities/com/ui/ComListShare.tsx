import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/shared/const';
import { useComNumbers } from '$cm/shared/lib';
import { Atom } from 'atomaric';
import { CmCom } from '../lib/Com';

export const CmComListQrShare = ({ coms, openAtom }: { openAtom: Atom<boolean>; coms: CmCom[] }) => {
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
