import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/shared/const';
import { Atom, useAtomValue } from 'atomaric';
import { CmCom } from '../lib/Com';
import { cmComWidNumberDictAtom } from '../state/atoms';

export const CmComListQrShare = ({ coms, openAtom }: { openAtom: Atom<boolean>; coms: CmCom[] }) => {
  const comws = coms.map(com => com.wid);
  const comwListLink = cmAppActions.makeLink({ comws });
  const comNumbers = useAtomValue(cmComWidNumberDictAtom);

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
