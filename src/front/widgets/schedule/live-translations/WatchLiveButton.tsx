import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { useEffect } from 'react';
import { IScheduleWidgetWid } from 'shared/api';
import { ScheduleWidgetLiveTranslation } from './Live';

const queryKey = 'follow';

const isOpenAtom = atom(false);
isOpenAtom.set(true);

export const ScheduleWidgetWatchLiveTranslationButton = ({
  schw,
  postfix,
}: {
  schw: IScheduleWidgetWid;
  postfix?: string;
}) => {
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => isOpenAtom.set(!!loc.search[queryKey as never]), [loc.search]);

  useEffect(() => {
    isOpenAtom.subscribe(isOpen => {
      navigate({ to: '.', search: prev => ({ ...prev, [queryKey]: isOpen ? 'inner' : undefined }) });
    });
  }, [navigate]);

  return (
    <>
      <TheIconButton
        icon="ComputerPhoneSync"
        onClick={isOpenAtom.do.toggle}
        className="margin-gap-v"
        postfix={postfix}
      />

      <FullContent
        openAtom={isOpenAtom}
        containerClassName=""
      >
        <ScheduleWidgetLiveTranslation schw={schw} />
      </FullContent>
    </>
  );
};
