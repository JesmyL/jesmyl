import { Link, Route, Routes } from 'react-router-dom';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import BrutalScreen from '../../../../complect/brutal-screen/BrutalScreen';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import { IconBookOpen02StrokeRounded } from '../../../../complect/the-icon/icons/book-open-02';
import { IconCalendar02StrokeRounded } from '../../../../complect/the-icon/icons/calendar-02';
import { IconCheckmarkBadge01StrokeRounded } from '../../../../complect/the-icon/icons/checkmark-badge-01';
import { IconStarStrokeRounded } from '../../../../complect/the-icon/icons/star';
import useSelectedComs from '../base/useSelectedComs';
import TheCat from '../col/cat/TheCat';
import { useCats } from '../cols/useCols';
import ExternalList from './ExternalList';
import './Lists.scss';
import FavoriteComs from './favorites/FavoriteComs';
import TheMeetings from './meetings/TheMeetings';
import SelectedComs from './selected-coms/SelectedComs';

export default function Lists() {
  const cats = useCats();
  const { selectedComws } = useSelectedComs();

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="lists-container"
            withoutBackButton
            headTitle="Списки"
            contentClass="flex between column padding-gap"
            content={
              <>
                <Link
                  to="fav"
                  className="full-width"
                >
                  <BrutalItem
                    icon={<IconStarStrokeRounded />}
                    title="Избранное"
                  />
                </Link>
                <Link
                  to="events"
                  className="full-width"
                >
                  <BrutalItem
                    icon={<IconCalendar02StrokeRounded />}
                    title="События"
                  />
                </Link>
                {selectedComws.length ? (
                  <Link
                    to="selected"
                    className="full-width"
                  >
                    <BrutalItem
                      icon={<IconCheckmarkBadge01StrokeRounded />}
                      title="Выбранное"
                    />
                  </Link>
                ) : null}
                <BrutalScreen>
                  <div className="title sticky bg-inherit">Тематические:</div>
                  {cats.map(cat => {
                    return !cat.wid ? null : (
                      <Link
                        key={cat.wid}
                        className="pointer item flex"
                        to={`cat/${cat.wid}`}
                      >
                        <IconBookOpen02StrokeRounded className="margin-big-gap" />
                        <div>{cat.name}</div>
                      </Link>
                    );
                  })}
                </BrutalScreen>
              </>
            }
          />
        }
      />
      <Route
        path="events/*"
        element={<TheMeetings />}
      />
      <Route
        path="fav/*"
        element={<FavoriteComs />}
      />
      <Route
        path="selected/*"
        element={<SelectedComs />}
      />
      <Route
        path="cat/:catw/*"
        element={<TheCat />}
      />

      <Route
        path="ext/:comws/*"
        element={<ExternalList />}
      />
    </Routes>
  );
}
