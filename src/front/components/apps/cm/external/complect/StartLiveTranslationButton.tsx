import { useSwitchCurrentTranslationTextApp } from '#features/translations/lib/hooks/current-app';
import { IconButton } from '#shared/ui/icon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule-widget/useScheduleWidget';
import { CmComBindAttach, IScheduleWidget } from 'shared/api';

interface Props {
  value: CmComBindAttach;
  schedule: IScheduleWidget;
}

export const CmAttComStartLiveTranslationButton = (props: Props) => {
  const switchCurrApp = useSwitchCurrentTranslationTextApp();
  const rights = useScheduleWidgetRightsContext();

  if (!rights.isCanRedact) return;

  return (
    <>
      <IconButton
        icon="Computer"
        postfix="Транслировать"
        className="margin-gap-l margin-gap-v"
        onClick={() => {
          switchCurrApp('cm');
        }}
      />
    </>
  );
};
