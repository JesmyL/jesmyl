import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { cmIDB } from '$cm/_db/cm-idb';
import { useCmOpenComLinkRendererContext } from '$cm/basis/lib/contexts/current-com-list';
import { Com } from '$cm/col/com/Com';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { TranslationSlidePreview } from 'front/components/apps/+complect/translations/controls/Preview';
import { ReactNode } from 'react';
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

export function CmTranslationControlled(props: Props) {
  const [isShowFavouritesList, setIsShowFavouritesList] = cmIDB.use.isShowFavouritesInTranslations();

  const { comPack, coms } = useCmScreenTranslationComNavigations();
  const setTexti = useCmScreenTranslationComTextNavigations().setTexti;
  const linkToCom = useCmOpenComLinkRendererContext();

  useScreenKeyDownListen();

  return (
    <PageContainerConfigurer
      className=""
      backButtonRender={(linkRef, backButtonNode) =>
        linkToCom({
          linkRef,
          children: backButtonNode,
          search: {
            comw: coms[0]?.wid,
            tran: undefined,
          },
        })
      }
      headTitle={
        props.headTitle ? (
          <>
            {props.headTitle}
            {comPack.pageTitlePostfix}
          </>
        ) : (
          'Трансляция' + (comPack.pageTitlePostfix || '')
        )
      }
      head={props.head}
      content={
        <Container>
          <div className="flex">
            <TranslationSlidePreview />

            <div className="translation-com-list">
              <div
                className="flex flex-gap  pl-5 py-2 sticky pointer bg-x5"
                onClick={() => setIsShowFavouritesList(itNIt)}
              >
                <span className={isShowFavouritesList ? undefined : 'text-x7'}>Список</span>/
                <span className={isShowFavouritesList ? 'text-x7' : undefined}>Избранные</span>
              </div>
              <StyledComFaceList
                list={props.comList ?? coms}
                titles={comPack.titles}
                importantOnClick={({ defaultClick }) => {
                  defaultClick();
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
