import { remoteBroadcastInfoAtom } from '#features/broadcast/remote/controller';
import { useTranslateRemote } from '#features/broadcast/remote/remote-locale';
import { useAtomValue } from 'atomaric';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';

export const RemoteBroadcastTabTitle = () => {
  const tRemote = useTranslateRemote();
  const controllersCount = useAtomValue(remoteBroadcastInfoAtom).controllers.length;

  return (
    <>
      {tRemote(RemoteLocaleKey.Control)}
      {controllersCount > 0 ? ` ${controllersCount}` : ''}
    </>
  );
};
