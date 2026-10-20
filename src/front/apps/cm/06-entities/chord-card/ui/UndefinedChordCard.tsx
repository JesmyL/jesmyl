import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const CmChordCardUndefined = ({ chord }: { chord: string }) => {
  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <div className="text-xKO flex gap-2">
      {translateBase(BaseLocaleKey.CmUnknownChord)}
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
