import { useSearchParams } from 'react-router-dom';
import { IScheduleWidgetWid } from 'shared/api';
import { FullContent } from '../../fullscreen-content/FullContent';
import IconButton from '../../the-icon/IconButton';
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
      <IconButton
        icon="ComputerPhoneSync"
        onClick={setIsOpen}
        className="margin-gap-v"
        postfix={postfix}
      />
    </>
  );
};
