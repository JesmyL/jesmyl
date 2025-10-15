import { ICmComOrderLineProps } from '$cm/entities/com-order-line';
import { cmComChordHardLevelAtom } from '$cm/entities/index';
import { ChordVisibleVariant } from '$cm/shared/model';
import { useAtomValue } from 'atomaric';
import React from 'react';
import { makeRegExp } from 'regexpert';
import { CmComOrderLine } from '../../com-order-line/ui/ComLine';
import { CmCom } from '../../com/lib/Com';
import { CmComOrder } from '../lib/Order';
import { ICmComOrderHeaderProps } from '../model/Order.model';

interface Props {
  asLineComponent?: (props: ICmComOrderLineProps) => React.ReactNode;
  asHeaderComponent?: (props: ICmComOrderHeaderProps) => React.ReactNode;
  isMiniAnchor?: boolean;
  ord: CmComOrder;
  ordi: number;
  visibleOrdi?: number;
  com: CmCom;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  specialClassId?: string;
  isHideRepeats?: boolean;
}

export function TheCmComOrder(props: Props) {
  const ord = props.ord;
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);

  if (
    (props.isMiniAnchor && (ord.me.isAnchorInherit || ord.me.isAnchorInheritPlus)) ||
    (!props.showInvisibles && !ord.isVisible)
  )
    return null;

  const { ordi, com, visibleOrdi } = props;
  const styleAttributes = ord.me.style?.takeBlockAttributes(ord.me.leadOrd?.me.style?.key);

  if (props.isMiniAnchor && ord.isAnchor && !ord.isOpened) {
    return (
      <div
        id={`com-block-${ordi}`}
        className="styled-header anchor"
        {...styleAttributes}
        ref={el => {
          if (el) ord.element = el;
        }}
      >
        {ord.me.header({
          isTexted: false,
          repeats: ord.repeatsTitle,
        })}
        <span className="comment-holder" />
        <span className="comment-holder" />
        <span className="comment-holder" />
        <span className="comment-holder" />
      </div>
    );
  }

  const isTexted =
    ord.texti == null ? !(!props.chordVisibleVariant || (!ord.isMin && props.chordVisibleVariant === 1)) : true;

  const blockHeader = ord.me.isInherit
    ? null
    : ord.me.header({
        isTexted,
        repeats: ord.texti == null ? ord.repeatsTitle : '',
      });

  const chordedOrd = ord.isCanShowChordsInText(props.chordVisibleVariant);

  const headerNode = blockHeader ? (
    <div
      className="styled-header"
      {...styleAttributes}
    >
      {blockHeader}
      <span className="comment-holder" />
      <span className="comment-holder" />
      <span className="comment-holder" />
      <span className="comment-holder" />
    </div>
  ) : (
    !ord.me.style?.isHeaderNoneForce && (
      <div className="styled-header empty">
        <span className="comment-holder" />
        <span className="comment-holder" />
        <span className="comment-holder" />
        <span className="comment-holder" />
      </div>
    )
  );

  const header =
    typeof props.asHeaderComponent === 'function'
      ? props.asHeaderComponent({
          chordedOrd,
          ord,
          ordi,
          visibleOrdi,
          com: props.com,
          isJoinLetters: true,
          headerNode,
        })
      : headerNode;

  if (!ord.text) {
    if (!ord.chords) return null;

    return (
      <div
        id={`com-block-${ordi}`}
        visible-ord-nn={(visibleOrdi ?? ordi) + 1}
        ord-selector={ord.makeSelector()}
        className={
          (props.specialClassId || '') + 'composition-block styled-block' + (ord.isVisible ? '' : ' ord-invisible')
        }
        ref={el => {
          if (el) ord.element = el;
        }}
      >
        {header}
        {isTexted && (
          <div
            key={ordi}
            className="chords-block"
            {...styleAttributes}
          >
            {com.chordLabels[ordi]
              .map((_, linei) => props.ord.lineChordLabels(chordHardLevel, linei, props.ordi))
              .map(line => line.join(' '))
              .join('\n')
              .split(makeRegExp('/(\\|)/'))
              .map((text, texti) => {
                return (
                  <span
                    key={texti}
                    className={text === '|' ? 'text-x7' : undefined}
                  >
                    {text === '|' ? ' | ' : text}
                  </span>
                );
              })}
          </div>
        )}
      </div>
    );
  }

  const lines = (props.isHideRepeats ? ord.text : ord.repeatedText() || '').split(makeRegExp('/\\n/'));

  return (
    <div
      id={`com-block-${ordi}`}
      visible-ord-nn={(visibleOrdi ?? ordi) + 1}
      ord-selector={ord.makeSelector()}
      {...styleAttributes}
      className={
        (props.specialClassId || '') +
        `composition-block styled-block` +
        (ord.isVisible ? '' : ' ord-invisible') +
        (chordedOrd ? ' chorded-block' : ' without-chords')
      }
      ref={el => {
        if (el) ord.element = el;
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
                ord,
                ordi,
                visibleOrdi,
                wordCount: words.length,
                words,
                prevLinesCount: 1,
                com: props.com,
                isJoinLetters: true,
              })
            ) : (
              <CmComOrderLine
                chordedOrd={chordedOrd}
                textLine={textLine}
                textLinei={textLinei}
                prevLinesCount={1}
                textLines={textLinea.length}
                ord={ord}
                ordi={ordi}
                visibleOrdi={visibleOrdi}
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
