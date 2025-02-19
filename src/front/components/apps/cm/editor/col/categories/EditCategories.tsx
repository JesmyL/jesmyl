import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/icon';
import { Link, Route, Routes } from 'react-router-dom';
import { PhaseCmEditorContainer } from '../../phase-editor-container/PhaseCmEditorContainer';
import { useEditableCats } from '../useEditableCols';
import { EditCategory } from './EditCategory';

export function EditCategories() {
  const cats = useEditableCats();

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseCmEditorContainer
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
}
