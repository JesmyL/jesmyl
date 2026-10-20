import { languageSystemCode, translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeDateLabel } from 'shared/utils/makeDateLabel';

export const CmMeetingEventModLabel = ({ mod }: { mod: number }) => {
  return (
    <div className="text-center opacity-50 text-sm">
      {!mod || translateBase(BaseLocaleKey.ScheduleUpdated, { m: makeDateLabel(mod, languageSystemCode) })}
    </div>
  );
};
