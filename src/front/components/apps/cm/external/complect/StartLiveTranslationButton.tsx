import { IconButton } from '#shared/ui/icon';
import { CmComBindAttach, IScheduleWidget } from 'shared/api';
import { useScheduleWidgetRightsContext } from '../../../../../widgets/schedule-widget/useScheduleWidget';
import { useSwitchCurrentTranslationTextApp } from '../../../../../widgets/translations/hooks/current-app';

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
