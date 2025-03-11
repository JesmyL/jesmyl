import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { useEffect } from 'react';

export const ConfirmListeners = ({
  isModalOpen,
  confirmationResolvers,
  onClose,
}: {
  isModalOpen: boolean;
  confirmationResolvers: PromiseWithResolvers<boolean>;
  onClose: (is: false) => void;
}) => {
  useEffect(() => {
    if (!isModalOpen) return;

    return ThrowEvent.listenKeyDown('Enter', event => {
      event.stopPropagation();
      confirmationResolvers.resolve(true);
      onClose(false);
    });
  }, [isModalOpen, confirmationResolvers, onClose]);

  return <></>;
};
