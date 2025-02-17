import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBibleScreenTranslationFontSizeAdapter } from '../../../../../../07-shared/hooks/useFontSizeAdapter';
import { Com } from '../Com';
import TheOrder from '../order/TheOrder';
import { IComOrdersProps } from './ComOrders.model';

export default function ComOrders(props: IComOrdersProps) {
  const { com, fontSize, asLineComponent } = props;
  const [exMods, updateExMods] = useState<number[]>(com.excludedModulations);

  let specChordedi = 0;
  let specTextedi = 0;

  const content = (
    <OrdList
      className="com-ord-list"
      ref={props.listRef}
      $fontSize={fontSize}
    >
      {com.orders?.map((orderUnit, orderUniti) => {
        const isExcludedModulation = exMods.includes(orderUnit.wid);
        const specialClassId =
          orderUnit.texti == null ? ` com-chorded-block-${specChordedi++} ` : ` com-texted-block-${specTextedi++} `;

        return (
          <TheOrder
            key={orderUniti}
            {...props}
            specialClassId={specialClassId}
            orderUnit={orderUnit}
            orderUniti={orderUniti}
            asLineComponent={asLineComponent}
            asHeaderComponent={({ headerNode }) => {
              return orderUnit.me.style?.isModulation ? (
                <span
                  className={'pointer flex ' + (isExcludedModulation ? 'color--ko' : 'color--7')}
                  onClick={event => {
                    event.stopPropagation();
                    updateExMods(com.toggleModulationInclusion(orderUnit));
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
    </OrdList>
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

const OrdList = styled.div<{ $fontSize: number | und }>`
  display: inline-block;
  transition: padding 0.2s;
  padding-top: 0.06em;
  padding-bottom: 100px;
  min-height: 100%;
  color: var(--color-far);
  font-size: ${props => props.$fontSize}px;
`;
