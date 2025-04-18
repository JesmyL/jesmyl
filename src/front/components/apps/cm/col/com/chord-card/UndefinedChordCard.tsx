import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAuth } from '$index/atoms';
import { Link } from '@tanstack/react-router';

export const CmUndefinedChordCard = ({ chord }: { chord: string }) => {
  const auth = useAuth();

  return (
    <div className="error-message flex flex-gap">
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
