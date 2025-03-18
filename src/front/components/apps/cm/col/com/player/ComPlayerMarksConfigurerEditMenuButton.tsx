import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ListItemIcon, MenuItem } from '@mui/material';
import { useState } from 'react';
import { ComPlayerMarksConfigurer } from './ComPlayerMarksConfigurer';

export const ComPlayerMarksConfigurerEditMenuButton = ({ src, onClick }: { src: string; onClick: () => void }) => {
  const [isMarksConfigurerOpen, setIsMarksConfigurerOpen] = useState(false);

  return (
    <>
      <MenuItem
        onClick={() => {
          setIsMarksConfigurerOpen(true);
          onClick();
        }}
      >
        <ListItemIcon>
          <LazyIcon icon="Edit02" />
        </ListItemIcon>
        Редактировать
      </MenuItem>

      {src && isMarksConfigurerOpen && (
        <FullContent onClose={() => setIsMarksConfigurerOpen(false)}>
          <ComPlayerMarksConfigurer src={src} />
        </FullContent>
      )}
    </>
  );
};
