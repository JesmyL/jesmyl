import { translateBase } from '#basis/locale';
import { FaceItem } from '#basis/ui/FaceItem';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Link } from '@tanstack/react-router';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const GamerGamesListPage = () => {
  return (
    <PageContainerConfigurer
      className="GamerGamesListPage"
      withoutBackButton
      headTitle={translateBase(BaseLocaleKey.GamerGamesList)}
      content={
        <>
          <Link to="/gamer/i/memory-giant">
            <FaceItem.Root>
              <FaceItem.Logo>
                <LazyIcon icon="IceCubes" />
              </FaceItem.Logo>
              <FaceItem.Title>{translateBase(BaseLocaleKey.GamerMemoryGiant)}</FaceItem.Title>
            </FaceItem.Root>
          </Link>
        </>
      }
    />
  );
};
