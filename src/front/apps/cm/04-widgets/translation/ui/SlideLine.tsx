import { useCmTranslationCurrentComTexts, useCmTranslationScreenComTextNavigations } from '$cm/features/translation';
import styled from 'styled-components';
import { useCmTranslationCurrentScreenConfig } from '../hooks/configs';

export const CmTranslationSlideLine = () => {
  const { currTexti, setTexti } = useCmTranslationScreenComTextNavigations();
  const currentConfig = useCmTranslationCurrentScreenConfig();
  const texts = useCmTranslationCurrentComTexts(currentConfig?.pushKind);

  return (
    <>
      {texts && (
        <Line className="no-scrollbar">
          {texts.map((text, texti) => {
            return (
              <LineItem
                key={texti}
                id={`translation-window-line-${texti}`}
                onClick={() => setTexti(texti)}
              >
                <div>{texti + 1}</div>
                <CmSlideLineItemInnerStyle className={'pointer ' + (currTexti === texti ? 'active' : '')}>
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </CmSlideLineItemInnerStyle>
              </LineItem>
            );
          })}
        </Line>
      )}
    </>
  );
};

const CmSlideLineItemInnerStyle = styled.div`
  display: flex;
  border: solid 1px transparent;
  background: black;
  padding: 5px;
  height: calc(100% - 1.5em);
  overflow: hidden;
  color: var(--color-far);
  font-size: 14px;
  user-select: none;
  text-align: center;
  white-space: pre;

  &.active {
    border-color: var(--color-far);
  }
`;

const LineItem = styled.div`
  margin: 0 7px;
  scroll-snap-align: center;
`;

const Line = styled.div`
  display: flex;
  margin: 1em 0;
  border-radius: var(--radius);
  background: black;
  padding: 1em 0;
  overflow: auto;
  scroll-snap-type: x mandatory;
  color: white;
  white-space: nowrap;
`;
