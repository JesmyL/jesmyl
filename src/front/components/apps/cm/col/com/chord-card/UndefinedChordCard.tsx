import { IconLink } from 'front/08-shared/ui/the-icon/IconLink';
import { useAuth } from 'front/components/index/atoms';
import { useToNewChordSearches } from './chord-redactor-searches';

export const CmUndefinedChordCard = ({ chord }: { chord: string }) => {
  const auth = useAuth();
  const [, , makeChordParams] = useToNewChordSearches();

  return (
    <div className="error-message flex flex-gap">
      Неизвестный аккорд
      {auth.level > 49 && (
        <IconLink
          icon="Edit02"
          to={`/cm/edit/chord?${makeChordParams({ newChordName: chord })}`}
        />
      )}
    </div>
  );
};
