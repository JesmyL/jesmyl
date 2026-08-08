import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { cmAppActions } from '$cm/shared/const';
import { Atom, useAtomValue } from 'atomaric';
import { IExportableCom } from 'shared/api';
import { cmComWidNumberDictAtom } from '../state/atoms';

export const CmComListQrShare = ({ icoms, openAtom }: { openAtom: Atom<boolean>; icoms: IExportableCom[] }) => {
  const comws = icoms.map(com => com.w);
  const comwListLink = cmAppActions.makeLink({ comws });
  const comNumbers = useAtomValue(cmComWidNumberDictAtom);

  return (
    <QrCodeFullScreen
      openAtom={openAtom}
      text={comwListLink}
      copyText={`${comwListLink}\n\n${icoms
        .map(com => `${!comNumbers[com.w] ? '' : `${comNumbers[com.w]}. `}${com.n}`)
        .join('\n')}`}
    />
  );
};
