import { useBibleScreenTranslationFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Com } from '../Com';
import { ComBlockCommentMakerCleans } from '../complect/comment-parser/Cleans';
import { TheOrder } from '../order/TheOrder';
import { IComOrdersProps } from './ComOrders.model';

export function ComOrders(props: IComOrdersProps) {
  const { com, fontSize, asLineComponent } = props;
  const [exMods, updateExMods] = useState<number[]>(com.excludedModulations);

  let specChordedi = 0;
  let specTextedi = 0;
  let visibleOrdi = -1;

  const content = (
    <StyledOrdList
      className="com-ord-list"
      ref={props.listRef}
      $fontSize={fontSize}
    >
      {com.orders?.map((ord, ordi) => {
        if (ComBlockCommentMakerCleans.withHeaderTextOrderFilter(ord)) visibleOrdi++;
        const isExcludedModulation = exMods.includes(ord.wid);
        const specialClassId =
          ord.texti == null ? ` com-chorded-block-${specChordedi++} ` : ` com-texted-block-${specTextedi++} `;

        return (
          <TheOrder
            key={ordi}
            {...props}
            specialClassId={specialClassId}
            ord={ord}
            ordi={visibleOrdi}
            asLineComponent={asLineComponent}
            asHeaderComponent={({ headerNode }) => {
              return ord.me.style?.isModulation ? (
                <span
                  className={'pointer flex ' + (isExcludedModulation ? 'color--ko' : 'color--7')}
                  onClick={event => {
                    event.stopPropagation();
                    updateExMods(com.toggleModulationInclusion(ord));
                  }}
                >
                  <LazyIcon
                    className="pointer"
                    icon={isExcludedModulation ? 'View' : 'ViewOffSlash'}
                  />
                  {headerNode}
                </span>
              ) : (
                headerNode
              );
            }}
          />
        );
      })}
    </StyledOrdList>
  );

  return fontSize && fontSize > 0 ? (
    content
  ) : (
    <OrdersWithAdaptiveFontSize
      content={content}
      com={com}
    />
  );
}

const OrdersWithAdaptiveFontSize = ({ content, com }: { content: ReactNode; com: Com }) => {
  const [windowResizes, setWindowResizes] = useState(0);
  const [wrapperRef, contentRef] = useBibleScreenTranslationFontSizeAdapter(com.name, windowResizes, true);

  useEffect(() => {
    const onResize = () => setWindowResizes(num => num + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div ref={wrapperRef}>
      <FlexFontSizeContent ref={contentRef}>{content}</FlexFontSizeContent>
    </div>
  );
};

const FlexFontSizeContent = styled.div`
  width: max-content;
`;

const StyledOrdList = styled.div<{ $fontSize: number | und }>`
  display: inline-block;
  transition: padding 0.2s;
  padding-top: 0.06em;
  padding-bottom: 100px;
  min-height: 100%;
  color: var(--color-far);
  font-size: ${props => props.$fontSize}px;
`;
