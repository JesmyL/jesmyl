import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { useEffect } from 'react';

export const ConfirmListeners = ({
  confirmationResolvers,
  onClose,
}: {
  confirmationResolvers: PromiseWithResolvers<boolean>;
  onClose: (is: false) => void;
}) => {
  useEffect(() => {
    return ThrowEvent.listenKeyDown('Enter', event => {
      event.stopPropagation();
      confirmationResolvers.resolve(true);
      onClose(false);
    });
  }, [confirmationResolvers, onClose]);

  return <></>;
};
