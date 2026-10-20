import { languageSystemCode, translateBase } from '#basis/locale';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeDateLabel } from 'shared/utils/makeDateLabel';

export const StoragesDateTimestampTitle = ({ timestamp }: { timestamp: number | nil }) => {
  return (
    <>
      {timestamp == null ? (
        <span className="text-xKO">{translateBase(BaseLocaleKey.StoragesDateNotSelected)}</span>
      ) : (
        makeDateLabel(timestamp * 100000, languageSystemCode)
      )}
    </>
  );
};
