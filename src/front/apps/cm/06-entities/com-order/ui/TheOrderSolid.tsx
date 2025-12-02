import { CmComOrder, CmComOrderLine, TheCmComOrder } from '$cm/ext';
import React from 'react';

export const TheCmComOrderSolid = (
  props: Parameters<typeof TheCmComOrder>[0] & {
    asContentAfterOrder?: (props: { ord: CmComOrder }) => React.ReactNode;
  },
) => {
  let nextOrd = props.ord.me.next;
  const ords: CmComOrder[] = [props.ord];
  const lineCounts: number[] = [0, props.ord.text.split('\n').length];

  while (nextOrd?.isInSolidLineWithInvisibles()) {
    lineCounts.push(lineCounts[lineCounts.length - 1] + nextOrd.text.split('\n').length);
    ords.push(nextOrd);

    nextOrd = nextOrd.me.next;
  }

  return (
    <div solid-com-order-selector={props.ord.wid}>
      {ords.map((ord, ordIndex) => {
        if (!ord.isVisible) return;
        const ordi = ordIndex + props.ordi;

        return (
          <React.Fragment key={ord.wid}>
            <TheCmComOrder
              {...props}
              ord={ord}
              ordi={ordi}
              asHeaderComponent={
                props.asHeaderComponent ? headerProps => props.asHeaderComponent?.({ ...headerProps, ord }) : undefined
              }
              asLineComponent={
                props.asLineComponent
                  ? lineProps =>
                      props.asLineComponent?.({
                        ...lineProps,
                        ordi,
                        solidTextLinei: lineProps.textLinei + lineCounts[ordIndex],
                      })
                  : lineProps => {
                      return (
                        <CmComOrderLine
                          {...lineProps}
                          ordi={ordi}
                          solid-order-text-linei={lineProps.textLinei + lineCounts[ordIndex]}
                        />
                      );
                    }
              }
            />
          </React.Fragment>
        );
      })}
      {props.asContentAfterOrder?.({ ord: props.ord })}
    </div>
  );
};
