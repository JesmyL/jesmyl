import { Route } from 'react-router-dom';
import { ScheduleWidgetListPage } from './ListPage';

export const scheduleWidgetListPageRoute = (
  <Route
    path="schs/*"
    element={<ScheduleWidgetListPage />}
  />
);
