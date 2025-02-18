import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import { mylib } from 'front/utils';
import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { TranslationSlidePreview } from '../../../../+complect/translations/controls/Preview';
import { Com } from '../../../col/com/Com';
import { ComFaceList } from '../../../col/com/face/list/ComFaceList';
import { useTakeActualComw } from '../../../col/com/useCcom';
import { useCmScreenTranslationComNavigations } from '../hooks/com-navigation';
import { useCmScreenTranslationComTextNavigations } from '../hooks/com-texts';
import { CmTranslationControlPanel } from './ControllPanel';
import { CmTranslationSlideLine } from './SlideLine';
import { useScreenKeyDownListen } from './screen/hooks/keydown-listen';
import { CmTranslateScreenConfigurations } from './screens/ScreenConfigurations';

interface Props {
  head?: ReactNode;
  comList?: Com[];
  headTitle?: ReactNode;
  backButtonPath?: string;
}

export default function CmTranslationControlled({ head, comList, headTitle, backButtonPath }: Props) {
  const [, setSearchParams] = useSearchParams();

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
              <StyledComFaceList
                list={comList ?? comPack.list}
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
    width: 50%;
    height: var(--size);
    min-height: var(--min-size);
    max-height: var(--max-size);
    overflow-x: hidden;
    overflow-y: scroll;

    .face-item.current {
      font-weight: bold;
    }
  }
`;
