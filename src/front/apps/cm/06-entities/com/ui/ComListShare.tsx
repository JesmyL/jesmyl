import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/shared/const';
import { Atom, useAtomValue } from 'atomaric';
import { CmComWid } from 'shared/api';
import { cmComWidNumberDictAtom } from '../state/atoms';

export const CmComListQrShare = ({ comws, openAtom }: { openAtom: Atom<boolean>; comws: CmComWid[] }) => {
  const comwListLink = cmAppActions.makeLink({ comws });
  const comNumbers = useAtomValue(cmComWidNumberDictAtom);

  return (
    <QrCodeFullScreen
      openAtom={openAtom}
      text={comwListLink}
      copyText={`${comwListLink}\n\n${comws
        .flatMap(comw => (comNumbers[comw] ? [`${comNumbers[comw].i}. ${comNumbers[comw].n}`] : []))
        .join('\n')}`}
    />
  );
};
