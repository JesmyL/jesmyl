import { FavoriteComsPage } from '#pages/cm';
import { Route, Routes } from 'react-router-dom';
import { cmCompositionRoute } from '../../../../../01-app/router-configs/cm';
import CmTranslationComListContextInMarks from '../../base/translations/InMarks';

export default function FavoriteComs() {
  return (
    <Routes>
      <Route
        index
        element={<FavoriteComsPage />}
      />

      {cmCompositionRoute(children => (
        <CmTranslationComListContextInMarks>{children}</CmTranslationComListContextInMarks>
      ))}
    </Routes>
  );
}
