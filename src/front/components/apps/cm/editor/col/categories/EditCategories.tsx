import { Link, Route, Routes } from 'react-router-dom';
import BrutalItem from '../../../../../../complect/brutal-item/BrutalItem';
import { IconBookOpen01StrokeRounded } from '../../../../../../complect/the-icon/icons/book-open-01';
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
                        icon={<IconBookOpen01StrokeRounded />}
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
