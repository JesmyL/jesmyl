import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useEditableCats } from '$cm/editor';
import { PageCmEditorContainer } from '$cm/editor/ui/PageCmEditorContainer';
import { Link } from '@tanstack/react-router';

export const EditCategoriesPage = () => {
  const cats = useEditableCats();

  return (
    <PageCmEditorContainer
      className="edit-categories"
      headTitle="Категории"
      content={
        <>
          {cats?.map(cat => {
            return (
              <Link
                key={cat.wid}
                to="/cm/edit/cats/$catw"
                params={{ catw: `${cat.wid}` }}
                className="full-width"
              >
                <BrutalItem
                  iconNode={<LazyIcon icon="BookOpen01" />}
                  title={`${cat.name || ''}${cat.name !== cat.initialName ? ` (${cat.initialName})` : ''}`}
                />
              </Link>
            );
          })}
        </>
      }
    />
  );
};
