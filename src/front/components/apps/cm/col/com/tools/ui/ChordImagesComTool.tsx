import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useCcom } from '$cm/basis/lib/com-selections';
import { useState } from 'react';
import { ChordImagesList } from '../../chord-card/ChordImagesList';
import { ComTool } from '../ComTool';

export const ChordImagesComTool = () => {
  const ccom = useCcom();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ComTool
        title="Изображения аккордов"
        icon="ImageCompositionOval"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && <FullContent onClose={setIsOpen}>{ccom && <ChordImagesList comw={ccom.wid} />}</FullContent>}
    </>
  );
};
