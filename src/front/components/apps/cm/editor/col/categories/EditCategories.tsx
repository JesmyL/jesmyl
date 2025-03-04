import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { Link, Route, Routes } from 'react-router-dom';
import BrutalItem from '../../../../../../complect/brutal-item/BrutalItem';
import PhaseCmEditorContainer from '../../phase-editor-container/PhaseCmEditorContainer';
import { useEditableCats } from '../useEditableCols';
import EditCategory from './EditCategory';

export default function EditCategories() {
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
