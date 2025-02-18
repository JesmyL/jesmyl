import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { CmComBindAttach, IScheduleWidget } from 'shared/api';
import { useSwitchCurrentTranslationTextApp } from '../../../+complect/translations/hooks/current-app';
import { useScheduleWidgetRightsContext } from '../../../../../04-widgets/schedule/useScheduleWidget';

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
