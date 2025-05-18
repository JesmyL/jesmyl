import { cmChordHardLevelAtom } from '$cm/atoms';
import { useAtomValue } from 'atomaric';
import React from 'react';
import { makeRegExp } from 'regexpert';
import { ChordVisibleVariant } from '../../../Cm.model';
import { Com } from '../Com';
import { ComLine } from '../line/ComLine';
import { Order } from './Order';
import { IComLineProps, IComOrdHeaderProps } from './Order.model';

interface Props {
  asLineComponent?: (props: IComLineProps) => React.ReactNode;
  asHeaderComponent?: (props: IComOrdHeaderProps) => React.ReactNode;
  isMiniAnchor?: boolean;
  orderUnit: Order;
  orderUniti: number;
  com: Com;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  specialClassId?: string;
  isHideRepeats?: boolean;
}

export function TheOrder(props: Props) {
  const orderUnit = props.orderUnit;
  const chordHardLevel = useAtomValue(cmChordHardLevelAtom);

  if (
    (props.isMiniAnchor && (orderUnit.me.isAnchorInherit || orderUnit.me.isAnchorInheritPlus)) ||
    (!props.showInvisibles && !orderUnit.isVisible)
  )
    return null;

  const { orderUniti, com } = props;
  const styleAttributes = orderUnit.me.style?.takeBlockAttributes(orderUnit.me.leadOrd?.me.style?.key);

  if (props.isMiniAnchor && orderUnit.isAnchor && !orderUnit.isOpened) {
    return (
      <div
        id={`com-block-${orderUniti}`}
        className="styled-header anchor"
        {...styleAttributes}
        ref={el => {
          if (el) orderUnit.element = el;
        }}
      >
        {orderUnit.me.header({
          isTexted: false,
          repeats: orderUnit.repeatsTitle,
        })}
      </div>
    );
  }

  const isTexted =
    orderUnit.texti == null
      ? !(!props.chordVisibleVariant || (!orderUnit.isMin && props.chordVisibleVariant === 1))
      : true;

  const blockHeader = orderUnit.me.isInherit
    ? null
    : orderUnit.me.header({
        isTexted,
        repeats: orderUnit.texti == null ? orderUnit.repeatsTitle : '',
      });

  const chordedOrd = orderUnit.isCanShowChordsInText(props.chordVisibleVariant);

  const headerNode = blockHeader ? (
    <div
      className="styled-header"
      {...styleAttributes}
    >
      {blockHeader}
    </div>
  ) : (
    !orderUnit.me.style?.isHeaderNoneForce && <div className="styled-header empty" />
  );

  const header =
    typeof props.asHeaderComponent === 'function'
      ? props.asHeaderComponent({
          chordedOrd,
          orderUnit,
          orderUniti,
          com: props.com,
          isJoinLetters: true,
          headerNode,
        })
      : headerNode;

  if (!orderUnit.text) {
    if (!orderUnit.chords) return null;

    return (
      <div
        id={`com-block-${orderUniti}`}
        ord-nn={orderUniti + 1}
        className={
          (props.specialClassId || '') +
          'composition-block styled-block flex flex-baseline' +
          (orderUnit.isVisible ? '' : ' ord-invisible')
        }
        ref={el => {
          if (el) orderUnit.element = el;
        }}
      >
        {header}
        {isTexted && (
          <div
            key={orderUniti}
            className="chords-block vertical-middle"
            {...styleAttributes}
          >
            {com.chordLabels[orderUniti]
              .map((_, linei) => props.orderUnit.lineChordLabels(chordHardLevel, linei, props.orderUniti))
              .map(line => line.join(' '))
              .join('\n')}
          </div>
        )}
      </div>
    );
  }

  const lines = (props.isHideRepeats ? orderUnit.text : orderUnit.repeatedText() || '').split(makeRegExp('/\\n/'));

  return (
    <div
      id={`com-block-${orderUniti}`}
      ord-nn={orderUniti + 1}
      {...styleAttributes}
      className={
        (props.specialClassId || '') +
        `composition-block styled-block` +
        (orderUnit.isVisible ? '' : ' ord-invisible') +
        (chordedOrd ? ' chorded-block' : ' without-chords')
      }
      ref={el => {
        if (el) orderUnit.element = el;
      }}
    >
      {header}
      {lines.map((textLine, textLinei, textLinea) => {
        const words = textLine?.split(makeRegExp('/ +/'));

        return (
          <React.Fragment key={textLinei}>
            {typeof props.asLineComponent === 'function' ? (
              props.asLineComponent({
                chordedOrd,
                textLine,
                textLinei,
                textLines: textLinea.length,
                orderUnit,
                orderUniti,
                wordCount: words.length,
                words,
                prevLinesCount: 1,
                com: props.com,
                isJoinLetters: true,
              })
            ) : (
              <ComLine
                chordedOrd={chordedOrd}
                textLine={textLine}
                textLinei={textLinei}
                prevLinesCount={1}
                textLines={textLinea.length}
                orderUnit={orderUnit}
                orderUniti={orderUniti}
                wordCount={words.length}
                words={words}
                com={props.com}
                isJoinLetters
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
