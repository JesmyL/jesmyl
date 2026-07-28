import { SendableDropdown } from '#shared/ui/sends/dropdown/SendableDropdown';
import { makeAttStorage } from '#widgets/schedule/makeAttStorage';
import { useMemo } from 'react';
import { mapObjectEntries } from 'shared/utils/object.utils';

export const ScheduleWidgetCustomAttLocalImagineSelector = ({ id }: { id: `[SCH]:${string}` | nil }) => {
  const localAttsItems = useMemo(() => {
    return mapObjectEntries(makeAttStorage()[0], (id, att) => {
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
