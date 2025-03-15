import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { IScheduleWidgetWid } from 'shared/api';
import { ScheduleWidgetLiveTranslation } from './Live';

const queryKey = 'follow';

export const ScheduleWidgetWatchLiveTranslationButton = ({
  schw,
  postfix,
}: {
  schw: IScheduleWidgetWid;
  postfix?: string;
}) => {
  const loc = useLocation();
  const navigate = useNavigate();

  const setIsOpen = (isOpen: unknown) => {
    navigate({ to: '.', search: prev => ({ ...prev, [queryKey]: isOpen ? 'inner' : undefined }) });
  };

  return (
    <>
      <TheIconButton
        icon="ComputerPhoneSync"
        onClick={setIsOpen}
        className="margin-gap-v"
        postfix={postfix}
      />

      {loc.search[queryKey as never] && (
        <FullContent
          onClose={setIsOpen}
          containerClassName=""
        >
          <ScheduleWidgetLiveTranslation
            onClose={setIsOpen}
            schw={schw}
          />
        </FullContent>
      )}
    </>
  );
};
