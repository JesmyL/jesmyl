import { languageSystemCode, translateBase } from '#basis/locale';
import { makeDateLabel } from 'shared/utils/makeDateLabel';

export const CmMeetingEventModLabel = ({ mod }: { mod: number }) => {
  return (
    <div className="text-center opacity-50 text-sm">
      {!mod || translateBase(it => it.sch.evMod, { m: makeDateLabel(mod, languageSystemCode) })}
    </div>
  );
};
