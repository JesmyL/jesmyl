import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { BrutalScreen } from '#shared/ui/brutal-screen/BrutalScreen';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useSelectedComs } from '$cm/base/useSelectedComs';
import { useCats } from '$cm/basis/lib/hooks/useCats';
import { Link } from '@tanstack/react-router';
import styled from 'styled-components';

export const CmListsPage = () => {
  const cats = useCats();
  const { selectedComws } = useSelectedComs();

  return (
    <StyledPhaseContainerConfigurer
      className="lists-container"
      withoutBackButton
      headTitle="Списки"
      contentClass="flex between column p-2"
      content={
        <>
          <Link
            to="/cm/li/fav"
            className="w-full"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="Star" />}
              title="Избранное"
            />
          </Link>
          <Link
            to="/cm/li/events"
            className="w-full"
          >
            <BrutalItem
              iconNode={<LazyIcon icon="Calendar02" />}
              title="События"
            />
          </Link>
          {selectedComws.length ? (
            <Link
              to="/cm/li/sel"
              className="w-full"
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
                  to="/cm/li/cat/$catw"
                  params={{ catw: `${cat.wid}` }}
                >
                  <LazyIcon
                    icon="BookOpen02"
                    className="m-5"
                  />
                  <div>{cat.name}</div>
                </Link>
              );
            })}
          </BrutalScreen>
        </>
      }
    />
  );
};

const StyledPhaseContainerConfigurer = styled(PageContainerConfigurer)`
  .brutal-screen > .title {
    top: -1px;
  }
`;
