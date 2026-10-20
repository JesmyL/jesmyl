import { translateBase } from '#basis/locale';
import { SendableDropdown } from '#shared/ui/sends/dropdown/SendableDropdown';
import { makeAttStorage } from '#widgets/schedule/makeAttStorage';
import { useMemo } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { mapObjectEntries } from 'shared/utils/object.utils';

export const ScheduleWidgetCustomAttLocalImagineSelector = ({ id }: { id: `[SCH]:${string}` | nil }) => {
  const localAttsItems = useMemo(() => {
    return mapObjectEntries(makeAttStorage()[0], (id, att) => {
      return {
        id,
        title: <>{translateBase(BaseLocaleKey.ScheduleImageOf, { t: att.title })}</>,
      };
    });
  }, []);

  return (
    <SendableDropdown
      id={id ?? undefined}
      items={localAttsItems}
      nullTitle={translateBase(BaseLocaleKey.ScheduleImageNotSelected)}
      // scope={scope}
      // fieldName="imagine"
      // cud="U"
      onSend={async () => {}}
    />
  );
};
