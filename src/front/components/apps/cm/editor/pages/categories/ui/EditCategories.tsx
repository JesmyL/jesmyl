import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { PageCmEditorContainer } from '@cm/editor/ui/PhaseCmEditorContainer';
import { Link, Route, Routes } from 'react-router-dom';
import { useEditableCats } from '../lib/useEditableCat';
import { EditCategory } from './EditCategory';

export const EditCategoriesPage = () => {
  const cats = useEditableCats();

  return (
    <Routes>
      <Route
        index
        element={
          <PageCmEditorContainer
            className="edit-categories"
            headTitle="Категории"
            content={
              <>
                {cats?.map(cat => {
                  return (
                    <Link
                      key={cat.wid}
                      to={'' + cat.wid}
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
        }
      />

      <Route
        path=":catw"
        element={<EditCategory />}
      />
    </Routes>
  );
};
