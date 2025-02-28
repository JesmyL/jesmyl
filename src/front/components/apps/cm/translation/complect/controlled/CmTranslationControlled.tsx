import { mylib } from '#shared/lib/my-lib';
import { PhaseContainerConfigurer } from '#shared/ui/phase-container/PhaseContainerConfigurer';
import { Com } from '@cm/col/com/Com';
import { ComFaceList } from '@cm/col/com/face/list/ComFaceList';
import { useTakeActualComw } from '@cm/col/com/useCcom';
import { useFavouriteComs } from '@cm/lists/favourites/useFavouriteComs';
import { TranslationSlidePreview } from 'front/components/apps/+complect/translations/controls/Preview';
import { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { itNIt } from 'shared/utils';
import styled from 'styled-components';
import { useCmScreenTranslationComNavigations } from '../hooks/com-navigation';
import { useCmScreenTranslationComTextNavigations } from '../hooks/com-texts';
import { CmTranslationControlPanel } from './ControllPanel';
import { useScreenKeyDownListen } from './screen/hooks/keydown-listen';
import { CmTranslateScreenConfigurations } from './screens/ScreenConfigurations';
import { CmTranslationSlideLine } from './SlideLine';

interface Props {
  head?: ReactNode;
  comList?: Com[];
  headTitle?: ReactNode;
  backButtonPath?: string;
}

export function CmTranslationControlled({ head, comList, headTitle, backButtonPath }: Props) {
  const [, setSearchParams] = useSearchParams();
  const { favouriteComws } = useFavouriteComs();
  const [isShowFavouritesList, setIsShowFavouritesList] = useState(false);

  const { comPack } = useCmScreenTranslationComNavigations();
  const setTexti = useCmScreenTranslationComTextNavigations().setTexti;

  useScreenKeyDownListen();
  const ccomw = useTakeActualComw();

  return (
    <PhaseContainerConfigurer
      className=""
      backButtonPath={backButtonPath ?? mylib.isNaN(ccomw) ? undefined : `../${ccomw}`}
      headTitle={
        headTitle ? (
          <>
            {headTitle}
            {comPack.pageTitlePostfix}
          </>
        ) : (
          'Трансляция' + (comPack.pageTitlePostfix || '')
        )
      }
      head={head}
      content={
        <Container>
          <div className="flex">
            <TranslationSlidePreview />

            <div className="translation-com-list">
              <div
                className="flex flex-gap padding-gap padding-big-gap-l sticky bgcolor--5"
                onClick={() => setIsShowFavouritesList(itNIt)}
              >
                <span className={isShowFavouritesList ? undefined : 'color--7'}>Список</span>/
                <span className={isShowFavouritesList ? 'color--7' : undefined}>Избранные</span>
              </div>
              <StyledComFaceList
                list={isShowFavouritesList ? favouriteComws : comList ?? comPack.list}
                titles={comPack.titles}
                importantOnClick={com => {
                  setSearchParams(prev => ({ ...prev, comw: com.wid }));
                  setTexti(0);
                }}
              />
            </div>
          </div>

          <CmTranslationSlideLine />
          <CmTranslationControlPanel />
          <CmTranslateScreenConfigurations />
        </Container>
      }
    />
  );
}

const StyledComFaceList = styled(ComFaceList)`
  min-height: calc(var(--max-size) + 1px);
`;

const Container = styled.div`
  --size: 50vmin;
  --max-size: 300px;
  --min-size: 200px;

  .translation-com-list {
    width: calc(100vw - var(--max-size));
    height: 50vmin;
    min-height: 200px;
    max-height: var(--max-size);
    overflow-x: hidden;
    overflow-y: auto;

    .face-item.current {
      font-weight: bold;
    }
  }
`;
