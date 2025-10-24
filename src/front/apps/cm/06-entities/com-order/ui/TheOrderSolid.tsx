import { CmComOrder, CmComOrderLine, TheCmComOrder } from '$cm/ext';

export function TheCmComOrderSolid(props: Parameters<typeof TheCmComOrder>[0]) {
  let nextOrd = props.ord.me.next;
  const ords: CmComOrder[] = [props.ord];
  const lineCounts: number[] = [0, props.ord.text.split('\n').length];

  while (nextOrd && (nextOrd.me.isInherit || nextOrd.me.isAnchorInherit || nextOrd.me.isAnchorInheritPlus)) {
    lineCounts.push(lineCounts[lineCounts.length - 1] + nextOrd.text.split('\n').length);
    ords.push(nextOrd);
    nextOrd = nextOrd.me.next;
  }

  return (
    <>
      {ords.map((ord, ordi) => {
        return (
          <TheCmComOrder
            key={ord.wid}
            {...props}
            ord={ord}
            asLineComponent={
              props.asLineComponent
                ? lineProps =>
                    props.asLineComponent?.({
                      ...lineProps,
                      textLinei: lineProps.textLinei + lineCounts[ordi],
                    })
                : lineProps => {
                    return (
                      <CmComOrderLine
                        {...lineProps}
                        textLinei={lineProps.textLinei + lineCounts[ordi]}
                      />
                    );
                  }
            }
          />
        );
      })}
    </>
  );
}
