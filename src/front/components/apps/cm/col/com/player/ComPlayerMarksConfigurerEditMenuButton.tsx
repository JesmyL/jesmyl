import { DropdownMenu } from '#shared/components/ui/dropdown-menu';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import { HttpLink } from 'shared/api';
import { ComPlayerMarksConfigurer } from './ComPlayerMarksConfigurer';

const isMarksConfigurerOpenAtom = atom(false);

export const ComPlayerMarksConfigurerEditMenuButton = ({ src, onClick }: { src: HttpLink; onClick: () => void }) => {
  return (
    <>
      <DropdownMenu.Item
        className="flex gap-5"
        onClick={() => {
          isMarksConfigurerOpenAtom.set(true);
          onClick();
        }}
      >
        <LazyIcon icon="Edit02" />
        Редактировать
      </DropdownMenu.Item>

      <FullContent openAtom={isMarksConfigurerOpenAtom}>
        <ComPlayerMarksConfigurer src={src} />
      </FullContent>
    </>
  );
};
