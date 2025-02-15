import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { WedGuest } from '../../../../../shared/api/complect/apps/wed/complect/model';
import IconButton from '../../../../complect/the-icon/IconButton';

interface Props {
  onClick?: () => void;
  guest: WedGuest;
}

export const WedGuestFace = ({ onClick, guest }: Props) => {
  return (
    <IconButton
      key={guest.mi}
      className="margin-gap"
      icon="UserCircle02"
      postfix={
        <>
          <span>{guest.ln} </span>
          <span className="color--7">{`${guest.fn}${guest.wn ? ` и ${guest.wn}` : ''}`}</span>
          {guest.t && <LazyIcon icon="Message01" />}
          {guest.g ? (
            <LazyIcon
              icon="MailValidation01"
              className="color--ok"
            />
          ) : (
            <LazyIcon
              icon="MailRemove01"
              className="color--ko"
            />
          )}
        </>
      }
      onClick={onClick}
    />
  );
};
