import { IconButton } from '#shared/ui/the-icon/IconButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { useSwitchCurrentTranslationTextApp } from 'front/components/apps/+complect/translations/hooks/current-app';
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
