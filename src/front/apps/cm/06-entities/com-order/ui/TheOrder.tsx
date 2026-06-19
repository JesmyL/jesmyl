import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { ICmComOrderHeaderAsComponentProps } from '#shared/model/cm/order/regions';
import { CmComOrderLine, ICmComOrderLineAsComponentProps } from '$cm/entities/com-order-line';
import { cmComChordHardLevelAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import React from 'react';
import { makeRegExp } from 'regexpert';
import { CmCom } from 'shared/const/cm/Com';
import { commentHolderNodes } from 'shared/const/cm/commentHolderNodes';
import { CmComOrder } from 'shared/const/cm/order/Order';

interface Props {
  asLineNode?: (props: ICmComOrderLineAsComponentProps) => React.ReactNode;
  asHeaderNode?: (props: ICmComOrderHeaderAsComponentProps) => React.ReactNode;
  isMiniAnchor?: boolean;
  ord: CmComOrder;
  ordi: number;
  com: CmCom;
  chordVisibleVariant: ChordVisibleVariant;
  showInvisibles?: boolean;
  specialClassId?: string;
  isHideRepeats?: boolean;
  chordHardLevel: 1 | 2 | 3;
}

export function TheCmComOrder(props: Props) {
  const ord = props.ord;
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);

  if (
    (props.isMiniAnchor && (ord.me.isAnchorInherit || ord.me.isAnchorInheritPlus)) ||
    (!props.showInvisibles && !ord.isVisible)
  )
    return null;

  const { ordi, com } = props;
  const styleAttributes = ord.me.kind?.takeBlockAttributes(ord.me.leadOrd?.me.kind?.key);

  if (props.isMiniAnchor && ord.isAnchor && !ord.isOpened) {
    return (
      <div
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
        {commentHolderNodes}
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

  const node = blockHeader ? (
    <div
      className="styled-header"
      {...styleAttributes}
    >
      {blockHeader}
      {commentHolderNodes}
    </div>
  ) : (
    !ord.me.kind?.isHeaderNoneForce && <div className="styled-header empty">{commentHolderNodes}</div>
  );

  const header = props.asHeaderNode
    ? props.asHeaderNode({
        chordedOrd,
        ord,
        ordi,
        com: props.com,
        isJoinLetters: true,
        node,
      })
    : node;

  if (!ord.text) {
    if (!ord.chords) return null;

    return (
      <div
        ord-selector={ord.wid}
        anchor-ord={ord.anchor}
        className={
          (props.specialClassId || '') + 'composition-block styled-block' + (ord.isVisible ? '' : ' opacity-30')
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
                    className={text === '|' ? 'text-x7' : ''}
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
      ord-selector={ord.wid}
      anchor-ord={ord.anchor}
      {...styleAttributes}
      className={
        (props.specialClassId || '') +
        `composition-block styled-block` +
        (ord.isVisible ? '' : ' opacity-30') +
        (chordedOrd ? ' chorded-block' : ' without-chords')
      }
      ref={el => {
        if (el) ord.element = el;
      }}
    >
      {header}
      {lines.map((textLine, textLinei, textLinea) => {
        const words = textLine?.split(makeRegExp('/ +/'));

        const lineProps: ICmComOrderLineAsComponentProps = {
          chordedOrd,
          line: textLine,
          linei: textLinei,
          solidLinei: -1,
          linesLen: textLinea.length,
          ord,
          ordi,
          wordCount: words.length,
          words,
          prevLinesCount: 1,
          com: props.com,
          isJoinLetters: true,
          chordHardLevel: props.chordHardLevel,
        };

        return (
          <React.Fragment key={textLinei}>
            {props.asLineNode ? props.asLineNode(lineProps) : <CmComOrderLine {...lineProps} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
