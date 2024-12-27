import { IconLink } from 'front/complect/the-icon/IconLink';
import { IconEdit02StrokeRounded } from 'front/complect/the-icon/icons/edit-02';
import { useAuth } from 'front/components/index/molecules';
import { useToNewChordSearches } from './chord-redactor-searches';

export const CmUndefinedChordCard = ({ chord }: { chord: string }) => {
  const auth = useAuth();
  const [, , makeChordParams] = useToNewChordSearches();

  return (
    <div className="error-message flex flex-gap">
      Неизвестный аккорд
      {auth.level > 49 && (
        <IconLink
          Icon={IconEdit02StrokeRounded}
          to={`/cm/edit/chord?${makeChordParams({ newChordName: chord })}`}
        />
      )}
    </div>
  );
};
