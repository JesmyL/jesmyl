import { propagationStopper } from '#shared/lib/event-funcs';
import { useBibleBroadcastScreenFontSizeAdapter } from '#shared/lib/hooks/useFontSizeAdapter';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode, useEffect, useState } from 'react';
import { CmCom } from 'shared/const/cm/Com';
import { twMerge } from 'tailwind-merge';
import { ICmComOrderListProps } from '../model/ComOrders.model';
import { TheCmComOrderSolid } from './TheOrderSolid';

export function CmComOrderList(props: ICmComOrderListProps) {
  const [excludedModulations, setExcludedModulations] = useState(props.com.excludedModulations);

  let specChordedi = 0;
  let specTextedi = 0;

  const content = (
    <div
      className={twMerge(
        'com-ord-list inline-block pt-[0.06em] pb-[100px] min-h-full text-x3 transition-[padding] duration-200',
        props.className,
      )}
      ref={props.listRef}
      style={{ fontSize: props.fontSize }}
    >
      {props.com.orders?.map((ord, ordi) => {
        if (ord.isInSolidLineWithInvisibles()) return;

        const specialClassId =
          ord.texti == null ? ` com-chorded-block-${specChordedi++} ` : ` com-texted-block-${specTextedi++} `;

        const node = (
          <TheCmComOrderSolid
            key={ord.wid}
            {...props}
            specialClassId={specialClassId}
            ord={ord}
            ordi={ordi}
            asHeaderNode={headerProps => {
              const node = headerProps.ord.isModulated ? (
                <div
                  className={
                    'pointer flex gap-2 min-h-[1lh] ' +
                    (excludedModulations.has(headerProps.ord.wid) ? 'text-xKO' : 'text-x7')
                  }
                >
                  <span
                    className="relative -mt-[1em]"
                    onClick={event => {
                      propagationStopper(event);
                      setExcludedModulations(props.com.toggleModulationExclusion(headerProps.ord));
                    }}
                  >
                    <LazyIcon icon={excludedModulations.has(headerProps.ord.wid) ? 'View' : 'ViewOffSlash'} />
                  </span>
                  {headerProps.node}
                </div>
              ) : (
                headerProps.node
              );

              return props.asHeaderNode ? props.asHeaderNode({ ...headerProps, node }) : node;
            }}
          />
        );

        return props.asOrderNode
          ? props.asOrderNode({
              com: props.com,
              ord,
              ordi,
              node,
            })
          : node;
      })}
    </div>
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
      <div
        className="w-max"
        ref={contentRef}
      >
        {content}
      </div>
    </div>
  );
};
