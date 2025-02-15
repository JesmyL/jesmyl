import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { Link, Route, Routes } from 'react-router-dom';
import BrutalItem from '../../../../complect/brutal-item/BrutalItem';
import BrutalScreen from '../../../../complect/brutal-screen/BrutalScreen';
import PhaseContainerConfigurer from '../../../../complect/phase-container/PhaseContainerConfigurer';
import useSelectedComs from '../base/useSelectedComs';
import TheCat from '../col/cat/TheCat';
import { useCats } from '../cols/useCols';
import ExternalList from './ExternalList';
import './Lists.scss';
import FavoriteComs from './favorites/FavoriteComs';
import { TheMeetings } from './meetings/TheMeetings';
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
                    iconNode={<LazyIcon icon="Star" />}
                    title="Избранное"
                  />
                </Link>
                <Link
                  to="events"
                  className="full-width"
                >
                  <BrutalItem
                    iconNode={<LazyIcon icon="Calendar02" />}
                    title="События"
                  />
                </Link>
                {selectedComws.length ? (
                  <Link
                    to="selected"
                    className="full-width"
                  >
                    <BrutalItem
                      iconNode={<LazyIcon icon="CheckmarkBadge01" />}
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
                        <LazyIcon
                          icon="BookOpen02"
                          className="margin-big-gap"
                        />
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
