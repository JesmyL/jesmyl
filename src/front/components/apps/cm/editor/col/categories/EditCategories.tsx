import BrutalItem from '../../../../../../complect/brutal-item/BrutalItem';
import useCmNav from '../../../base/useCmNav';
import PhaseCmEditorContainer from '../../phase-editor-container/PhaseCmEditorContainer';
import { useEditableCols } from '../useEditableCols';

export default function EditCategories() {
  const cols = useEditableCols();
  const { goTo } = useCmNav();

  return (
    <PhaseCmEditorContainer
      className="edit-categories"
      headTitle="Категории"
      content={
        <>
          {cols?.cats.map(cat => {
            return (
              <BrutalItem
                key={cat.wid}
                icon="book-open-outline"
                title={`${cat.name || ''}${cat.name !== cat.initialName ? ` (${cat.initialName})` : ''}`}
                onClick={() => goTo({ place: 'cat', data: { ccatw: cat.wid } })}
              />
            );
          })}
        </>
      }
    />
  );
}
