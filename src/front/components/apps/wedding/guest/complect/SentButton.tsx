import { WedGuest, WedGuestPropositionSent } from '../../../../../../shared/api/complect/apps/wed/complect/model';
import TheIconSendButton from '../../../../../complect/sends/the-icon-send-button/TheIconSendButton';

export const WedGuestPropositionSentButton = ({
  guest,
  onSend,
}: {
  guest: WedGuest;
  onSend: (go: WedGuestPropositionSent) => void;
}) => {
  if (guest.g)
    return (
      <TheIconSendButton
        icon="MailValidation01"
        className="color--ok margin-gap-v"
        confirm={
          <>
            Удалить пометку "отправлено" для гостя <span className="color--7">{guest.fn}</span>?
          </>
        }
        postfix="Пригласительное отправлено"
        // onSend={() =>
        //   wedExer.send([
        //     {
        //       action: 'setPropositionSentMark',
        //       args: {
        //         guestMi: guest.mi,
        //         value: WedGuestPropositionSent.No,
        //         guestName: WedCleans.makeGuestFullName(guest),
        //       },
        //     },
        //   ])
        // }
        onSuccess={() => onSend(WedGuestPropositionSent.No)}
      />
    );

  return (
    <TheIconSendButton
      icon="MailRemove01"
      className="color--ko margin-gap-v"
      postfix="Пригласительное не было отправлено"
      // onSend={() =>
      //   wedExer.send([
      //     {
      //       action: 'setPropositionSentMark',
      //       args: {
      //         guestMi: guest.mi,
      //         value: WedGuestPropositionSent.Yes,
      //         guestName: WedCleans.makeGuestFullName(guest),
      //       },
      //     },
      //   ])
      // }
      onSuccess={() => onSend(WedGuestPropositionSent.Yes)}
    />
  );
};
