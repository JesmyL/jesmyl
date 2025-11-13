import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';

export const CmChordCardUndefined = ({ chord }: { chord: string }) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <div className="text-xKO flex gap-2">
      Неизвестный аккорд
      {checkAccess('cm', 'CHORD', 'U') && (
        <Link
          to="/cm/edit/chord"
          search={{ newChordName: chord }}
        >
          <LazyIcon icon="Edit02" />
        </Link>
      )}
    </div>
  );
};
