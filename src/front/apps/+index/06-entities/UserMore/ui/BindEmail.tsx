import { translateBase } from '#basis/locale';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { IndexEmailConfirm } from '$index/entities/EmailConfirm';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { Atom } from 'atomaric';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { toast } from 'sonner';

export const IndexUserMoreBindEmailModal = ({ openAtom }: { openAtom: Atom<boolean> }) => (
  <FullContent openAtom={openAtom}>
    <IndexEmailConfirm
      onSend={email => indexTsjrpcClientMethods.sendBindEmailOTP({ email })}
      onConfirm={async otp => {
        const { fioOrNick } = await indexTsjrpcClientMethods.bindEmailByOTP({ otp });
        toast(translateBase(BaseLocaleKey.EmailBoundToCurrentAccount, { fio: fioOrNick }), makeToastOKMoodConfig());
        openAtom.set(false);
      }}
    />
  </FullContent>
);
