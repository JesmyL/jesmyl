import { CmComOrder, CmComOrderLine, TheCmComOrder } from '$cm/ext';
import React from 'react';

export const TheCmComOrderSolid = ({
  asLineNode,
  asHeaderNode,
  asAfterSolidOrdNode,
  asAfterOrdNode,
  ...props
}: Parameters<typeof TheCmComOrder>[0] & {
  asAfterSolidOrdNode?: (props: { ord: CmComOrder }) => React.ReactNode;
  asAfterOrdNode?: (props: { ord: CmComOrder }) => React.ReactNode;
}) => {
  let nextOrd = props.ord.me.next;
  const ords: CmComOrder[] = [props.ord];
  const lineCounts: number[] = [0, props.ord.text.split('\n').length];

  while (nextOrd?.isInSolidLineWithInvisibles()) {
    lineCounts.push(lineCounts[lineCounts.length - 1] + nextOrd.text.split('\n').length);
    ords.push(nextOrd);

    nextOrd = nextOrd.me.next;
  }

  return (
    <div
      solid-ord-selector={props.ord.wid}
      solid-block-kind={`k${props.ord.kind}`}
    >
      {ords.map((ord, ordIndex) => {
        if (!ord.isVisible) return;
        const ordi = ordIndex + props.ordi;

        return (
          <React.Fragment key={ord.wid}>
            <TheCmComOrder
              {...props}
              ord={ord}
              ordi={ordi}
              asHeaderNode={asHeaderNode && (headerProps => asHeaderNode({ ...headerProps, ord }))}
              asLineNode={
                asLineNode
                  ? lineProps =>
                      asLineNode({
                        ...lineProps,
                        ordi,
                        solidLinei: lineProps.linei + lineCounts[ordIndex],
                      })
                  : lineProps => (
                      <CmComOrderLine
                        {...lineProps}
                        ordi={ordi}
                        solid-ord-linei={lineProps.linei + lineCounts[ordIndex]}
                      />
                    )
              }
            />
            {asAfterOrdNode?.({ ord })}
          </React.Fragment>
        );
      })}
      {asAfterSolidOrdNode?.({ ord: props.ord })}
    </div>
  );
};
