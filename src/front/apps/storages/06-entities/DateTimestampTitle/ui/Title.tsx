import { languageSystemCode } from '#basis/locale';
import { makeDateLabel } from 'shared/utils/makeDateLabel';

export const StoragesDateTimestampTitle = ({ timestamp }: { timestamp: number | nil }) => {
  return (
    <>
      {timestamp == null ? (
        <span className="text-xKO">Дата не выбрана</span>
      ) : (
        makeDateLabel(timestamp * 100000, languageSystemCode)
      )}
    </>
  );
};
