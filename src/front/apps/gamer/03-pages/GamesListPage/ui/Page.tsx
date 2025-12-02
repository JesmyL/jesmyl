import { FaceItem } from '#basis/ui/FaceItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';

export const GamerGamesListPage = () => {
  return (
    <PageContainerConfigurer
      className="GamerGamesListPage"
      withoutBackButton
      headTitle="Список игр"
      content={
        <>
          <Link to="/gamer/i/memory-giant">
            <FaceItem.Root>
              <FaceItem.Logo>
                <LazyIcon icon="IceCubes" />
              </FaceItem.Logo>
              <FaceItem.Title>Мемори-гигант</FaceItem.Title>
            </FaceItem.Root>
          </Link>
        </>
      }
    />
  );
};
