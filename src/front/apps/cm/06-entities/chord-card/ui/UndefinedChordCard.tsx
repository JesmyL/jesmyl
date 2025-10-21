import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAuth } from '$index/shared/state';
import { Link } from '@tanstack/react-router';

export const CmChordCardUndefined = ({ chord }: { chord: string }) => {
  const auth = useAuth();

  return (
    <div className="text-xKO flex gap-2">
      Неизвестный аккорд
      {auth.level > 49 && (
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
