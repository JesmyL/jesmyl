import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { CmCom } from '../../com/lib/Com';
import { ICmComOrderListProps } from '../model/ComOrders.model';
import { TheCmComOrderSolid } from './TheOrderSolid';

export function CmComOrderList(props: ICmComOrderListProps) {
  const [exMods, updateExMods] = useState<number[]>(props.com.excludedModulations);

  let specChordedi = 0;
  let specTextedi = 0;

  const content = (
    <StyledOrdList
      className={twMerge('com-ord-list', props.className)}
      ref={props.listRef}
      $fontSize={props.fontSize}
    >
      {props.com.orders?.map((ord, ordi) => {
        if (ord.isInSolidLineWithInvisibles()) return;

        const isExcludedModulation = exMods.includes(ord.wid);
        const specialClassId =
          ord.texti == null ? ` com-chorded-block-${specChordedi++} ` : ` com-texted-block-${specTextedi++} `;

        return (
          <TheCmComOrderSolid
            key={ord.wid}
            {...props}
            specialClassId={specialClassId}
            ord={ord}
            ordi={ordi}
            asContentAfterOrder={props.asContentAfterOrder}
            asHeaderComponent={headerProps => {
              const node = ord.me.style?.isModulation ? (
                <span
                  className={'pointer flex ' + (isExcludedModulation ? 'text-xKO' : 'text-x7')}
                  onClick={event => {
                    event.stopPropagation();
                    updateExMods(props.com.toggleModulationInclusion(ord));
                  }}
                >
                  <LazyIcon
                    className="pointer"
                    icon={isExcludedModulation ? 'View' : 'ViewOffSlash'}
                  />
                  {headerProps.headerNode}
                </span>
              ) : (
                headerProps.headerNode
              );

              if (props.asHeaderComponent === undefined) return node;
              return props.asHeaderComponent({ ...headerProps, headerNode: node });
            }}
          />
        );
      })}
    </StyledOrdList>
  );

  return props.fontSize && props.fontSize > 0 ? (
    content
  ) : (
    <OrdersWithAdaptiveFontSize
      content={content}
      com={props.com}
    />
  );
}

const OrdersWithAdaptiveFontSize = ({ content, com }: { content: ReactNode; com: CmCom }) => {
  const [windowResizes, setWindowResizes] = useState(0);
  const [wrapperRef, contentRef] = useBibleBroadcastScreenFontSizeAdapter(com.name, windowResizes, true);

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
