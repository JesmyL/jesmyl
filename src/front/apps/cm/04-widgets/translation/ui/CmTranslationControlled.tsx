import { TranslationSlidePreview } from '#features/translations/controls/Preview';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { CmCom, useCmComOpenComLinkRendererContext } from '$cm/entities/com';
import { CmComFaceList } from '$cm/entities/com-face';
import { cmComIsShowFavouritesInTranslationsAtom } from '$cm/entities/index';
import {
  useCmTranslationScreenComNavigations,
  useCmTranslationScreenComTextNavigations,
} from '$cm/features/translation';
import { useAtom } from 'atomaric';
import { ReactNode } from 'react';
import { itNIt } from 'shared/utils';
import styled from 'styled-components';
import { useCmTranslationScreenKeyDownListen } from '../lib/keydown-listen';
import { CmTranslationControlPanel } from './ControllPanel';
import { CmTranslationScreenConfigurations } from './ScreenConfigurations';
import { CmTranslationSlideLine } from './SlideLine';

interface Props {
  head?: ReactNode;
  comList?: CmCom[];
  headTitle?: ReactNode;
  backButtonPath?: string;
}

export function CmTranslationControlled(props: Props) {
  const [isShowFavouritesList, setIsShowFavouritesList] = useAtom(cmComIsShowFavouritesInTranslationsAtom);

  const { comPack, coms } = useCmTranslationScreenComNavigations();
  const setTexti = useCmTranslationScreenComTextNavigations().setTexti;
  const linkToCom = useCmComOpenComLinkRendererContext();

  useCmTranslationScreenKeyDownListen();

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
                className="flex gap-2  pl-5 py-2 sticky pointer bg-x5"
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
          <CmTranslationScreenConfigurations />
        </Container>
      }
    />
  );
}

const StyledComFaceList = styled(CmComFaceList)`
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
