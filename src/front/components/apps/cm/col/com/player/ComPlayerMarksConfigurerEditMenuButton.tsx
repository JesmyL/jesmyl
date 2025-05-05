import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ListItemIcon, MenuItem } from '@mui/material';
import { atom } from 'atomaric';
import { ComPlayerMarksConfigurer } from './ComPlayerMarksConfigurer';

const isMarksConfigurerOpenAtom = atom(false);

export const ComPlayerMarksConfigurerEditMenuButton = ({ src, onClick }: { src: string; onClick: () => void }) => {
  return (
    <>
      <MenuItem
        onClick={() => {
          isMarksConfigurerOpenAtom.set(true);
          onClick();
        }}
      >
        <ListItemIcon>
          <LazyIcon icon="Edit02" />
        </ListItemIcon>
        Редактировать
      </MenuItem>

      <FullContent openAtom={isMarksConfigurerOpenAtom}>{src && <ComPlayerMarksConfigurer src={src} />}</FullContent>
    </>
  );
};
