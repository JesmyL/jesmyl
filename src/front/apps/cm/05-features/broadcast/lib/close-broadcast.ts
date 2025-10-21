import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

export const useCmBroadcastClose = () => {
  const navigate = useNavigate();

  return useCallback(
    (event?: PropagationStopperEvent) => {
      event?.stopPropagation();
      navigate({ to: '.', search: prev => ({ ...(prev as object), tran: undefined }) });
      if (document.fullscreenElement) document.exitFullscreen();
      return false;
    },
    [navigate],
  );
};
