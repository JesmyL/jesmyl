import { WedGuest, WedGuestPropositionSent } from '../../../../../../shared/api/complect/apps/wed/complect/model';
import EvaSendButton from '../../../../../complect/sends/eva-send-button/EvaSendButton';
import { IconMailRemove01StrokeRounded } from '../../../../../complect/the-icon/icons/mail-remove-01';
import { IconMailValidation01StrokeRounded } from '../../../../../complect/the-icon/icons/mail-validation-01';

export const WedGuestPropositionSentButton = ({
  guest,
  onSend,
}: {
  guest: WedGuest;
  onSend: (go: WedGuestPropositionSent) => void;
}) => {
  if (guest.g)
    return (
      <EvaSendButton
        Icon={IconMailValidation01StrokeRounded}
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
    <EvaSendButton
      Icon={IconMailRemove01StrokeRounded}
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
