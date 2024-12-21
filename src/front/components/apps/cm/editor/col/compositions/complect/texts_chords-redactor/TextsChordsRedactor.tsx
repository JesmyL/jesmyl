import { useExerExec } from '../../../../../../../../complect/exer/hooks/useExer';
import { IconPlusSignCircleStrokeRounded } from '../../../../../../../../complect/the-icon/icons/plus-sign-circle';
import EditContainerCorrectsInformer from '../../../../edit-container-corrects-informer/EditContainerCorrectsInformer';
import { useEditableCcom } from '../../useEditableCcom';
import { CutTextRedactor } from './CutText';
import TextAreaRedactor from './TextAreaRedactor';
import TextsChordsRedactorAnchorTitles from './TextsChordsRedactorAnchorTitles';
import TextsChordsRedactorTextActions from './TextsChordsRedactorTextActions';

export default function TextsChordsRedactor({ ccoln }: { ccoln: 'texts' | 'chords' }) {
  const ccom = useEditableCcom();
  const exec = useExerExec();

  if (!ccom) return null;

  const istcoln = ccoln === 'texts';
  const colList = istcoln ? ccom.texts : ccom.transBlocks();

  return (
    <>
      {(colList?.length ? colList : ['']).map((col, coli) => {
        return (
          <EditContainerCorrectsInformer
            className="margin-big-gap-v"
            key={coli}
            corrects={ccom.corrects[`${ccoln}-block-${coli}`]}
          >
            <div>
              {!coli && <IconPlusSignCircleStrokeRounded onClick={() => exec(ccom.insertBlocks(ccoln, -1, ''))} />}
              <div className="flex between">
                <TextsChordsRedactorAnchorTitles
                  ccoln={ccoln}
                  ccom={ccom}
                  coli={coli}
                />
                <TextsChordsRedactorTextActions
                  ccom={ccom}
                  ccoln={ccoln}
                  colText={col}
                  coli={coli}
                />
              </div>
              <TextAreaRedactor
                ccoln={ccoln}
                com={ccom}
                col={col}
                onChange={value => exec(ccom.changeBlock(ccoln, coli, value))}
              />
              <IconPlusSignCircleStrokeRounded onClick={() => exec(ccom.insertBlocks(ccoln, coli, ''))} />
              {istcoln && (
                <CutTextRedactor
                  ccom={ccom}
                  coli={coli}
                  text={col}
                />
              )}
            </div>
          </EditContainerCorrectsInformer>
        );
      })}
    </>
  );
}
