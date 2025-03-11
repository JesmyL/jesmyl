import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const setIsOpen = (isOpen: unknown) => {
    setSearchParams(prev => {
      if (isOpen) return { ...prev, [queryKey]: 'inner' };

      prev.delete(queryKey);

      return prev;
    });
  };

  return (
    <>
      {searchParams.has(queryKey) && (
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
      <TheIconButton
        icon="ComputerPhoneSync"
        onClick={setIsOpen}
        className="margin-gap-v"
        postfix={postfix}
      />
    </>
  );
};
