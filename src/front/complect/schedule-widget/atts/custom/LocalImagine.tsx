import { MyLib } from 'front/utils';
import { useMemo } from 'react';
import SendableDropdown from '../../../sends/dropdown/SendableDropdown';
import { makeAttStorage } from '../../useScheduleWidget';

export const ScheduleWidgetCustomAttLocalImagineSelector = ({ id }: { id: `[SCH]:${string}` | nil }) => {
  const localAttsItems = useMemo(() => {
    return MyLib.entries(makeAttStorage()[0]).map(([id, att]) => {
      return {
        id,
        title: <>Образ "{att.title}"</>,
      };
    });
  }, []);

  return (
    <SendableDropdown
      id={id ?? undefined}
      items={localAttsItems}
      nullTitle="Образ не выбран"
      // scope={scope}
      // fieldName="imagine"
      // cud="U"
      onSend={async () => {}}
    />
  );
};
