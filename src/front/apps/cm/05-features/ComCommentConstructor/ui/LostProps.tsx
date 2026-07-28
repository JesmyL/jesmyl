import { translateBase } from '#basis/locale';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmComCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmComOrderWid } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorPropsDictSelectorRulePropsKey,
} from 'shared/model/cm/com-comment';
import { itIt } from 'shared/utils';
import { cmComCommentAccentsColorClassNameList } from 'shared/utils/cm';
import { makeCmComCommentConstructorPropsKey } from 'shared/utils/cm/com/makeCommentTextFromRuleProps';
import { objectValues } from 'shared/utils/object.utils';

export const CmComCommentConstructorLostProps = ({ ordw, com }: { ordw: CmComOrderWid; com: CmCom }) => {
  const propsDict = useAtomValue(cmComCommentConstructorRulePropsDictAtom);

  const lostProps = useMemo(() => {
    const solidOrdLine = com.getSolidOrdLine(ordw);
    const usedKeys = new Set<CmComCommentConstructorPropKey>();
    let prevLen = 0;
    const lensAdd: PRecord<CmComCommentConstructorPropsDictSelectorRulePropsKey, number> = {};

    const firstOrd = solidOrdLine.at(0);
    const firstKind = firstOrd?.kind;

    solidOrdLine.forEach(ord => {
      const lines = ord.text.split('\n');

      lensAdd[`s${ord.wid}`] = prevLen;
      if (ord.kind) lensAdd[`k${ord.kind}`] = prevLen;

      lines.forEach((_line, linei) => {
        usedKeys.add(`s${ord.wid}l${linei}`);
        if (firstKind) usedKeys.add(`k${firstKind}l${linei + prevLen}`);
      });

      prevLen = lines.length;
    });

    const each = firstOrd?.me.kind?.top.each;

    return {
      lensAdd,
      usedKeys,
      ordHeader: each ? `${translateBase(it => it[each])} ${firstOrd.me.header({ numered: false })}` : '',
      list: objectValues(propsDict.dict ?? {}).filter(
        props => props && 'linei' in props && !usedKeys.has(`${props.pre}l${props.linei}`),
      ),
    };
  }, [com, ordw, propsDict.dict]);

  const nodes = lostProps.list
    .map(props => {
      if (!props) return;

      let lineTitle = '';
      let wordTitle = '';
      let chordTitle = '';
      let isColorFix = false;

      if ('linei' in props) {
        lineTitle = translateBase(it => it.lineN, { n: props.linei + 1 + (lostProps.lensAdd[props.pre] ?? 0) });

        if ('wordi' in props) {
          const isChord = 'chordi' in props;
          const titlePrefix = isChord ? '' : translateBase(it => it.cm.comm.wordLabel, { p: props.place });
          isColorFix = !isChord && props.place === '^';

          wordTitle = `${titlePrefix || translateBase(it => it.word)} ${props.wordi + 1}`;

          if (isChord) {
            chordTitle = translateBase(it => it.cm.chordN, { n: props.chordi + 1 });
          }
        }
      } else return;

      const propsKey = makeCmComCommentConstructorPropsKey(props, {});
      const joinTitle = (
        <span className={cmComCommentAccentsColorClassNameList[props.type]!}>
          {props.text} (
          {[props.pre.startsWith('k') ? lostProps.ordHeader : '', lineTitle, wordTitle, chordTitle]
            .filter(itIt)
            .join(', ')}
          )
        </span>
      );

      return (
        (props.text || (isColorFix && !!props.type)) && (
          <TheIconButton
            key={propsKey}
            icon="Delete01"
            postfix={joinTitle}
            confirm={
              <>
                {translateBase(it => it.del, { t: '' })}
                {joinTitle}?
              </>
            }
            onClick={() => {
              cmComCommentConstructorRulePropsDictAtom.do.update(dict => {
                const blockDict = dict.dict?.[propsKey];
                if (!blockDict) return;
                if (isColorFix) blockDict.type = 0;
                else blockDict.text = '';
              });
            }}
          />
        )
      );
    })
    .filter(itIt);

  return (
    !nodes.length || (
      <>
        <div>{translateBase(it => it.cm.comm.unreachs)}</div>
        {nodes}
      </>
    )
  );
};
