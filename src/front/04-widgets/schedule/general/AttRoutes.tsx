import { MyLib } from 'front/utils';
import React from 'react';
import { Routes } from 'react-router-dom';
import { makeAttStorage } from '../useScheduleWidget';

export const ScheduleWidgetAttRoutes = () => {
  const [atts] = makeAttStorage();

  return (
    <Routes>
      {MyLib.keys(atts).map(key => (
        <React.Fragment key={key}>{atts[key].routes}</React.Fragment>
      ))}
    </Routes>
  );
};
