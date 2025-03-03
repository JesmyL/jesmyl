import { useAuth } from 'front/components/index/atoms';
import { Route, Routes } from 'react-router-dom';
import { TheMeetings } from '../../lists/meetings/TheMeetings';
import { cmEditorSokiInvocatorBaseClient } from '../lib/cm-editor-invocator.base';
import { EditCategoriesPage } from '../pages/categories/ui/EditCategories';
import { ChordRedactorPage } from '../pages/chord';
import { EditCompositionsPage } from '../pages/compositions/ui/EditCompositions';
import { EERulesPage } from '../pages/ee-rules';
import { Mp3RulesRedactorPage } from '../pages/mp3-rule/ui/Mp3RulesRedactor';
import { EditorPage } from './EditorPage';

export const EditorRoutes = () => {
  const auth = useAuth();

  return (
    <Routes>
      <Route
        index
        element={<EditorPage />}
      />

      <Route
        path="coms/*"
        element={<EditCompositionsPage />}
      />
      {auth.level > 49 && (
        <>
          <Route
            path="cats/*"
            element={<EditCategoriesPage />}
          />
          <Route
            path="events/*"
            element={<TheMeetings />}
          />
          <Route
            path="chord"
            element={<ChordRedactorPage />}
          />
          <Route
            path="mp3Rules"
            element={<Mp3RulesRedactorPage />}
          />
          <Route
            path="e-e"
            element={<EERulesPage />}
          />
        </>
      )}
    </Routes>
  );
};

cmEditorSokiInvocatorBaseClient.$$register();
