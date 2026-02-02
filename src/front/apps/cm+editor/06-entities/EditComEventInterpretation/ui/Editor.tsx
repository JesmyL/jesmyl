import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { Atom, atom } from 'atomaric';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';
import { CmEditorEditComEventInterpretationFullContentInner } from './EditorFullContentInner';

let openAtom: Atom<boolean>;

export const CmEditorEditComEventInterpretation = ({
  schw,
  comw,
  toolNode,
  linkNode,
}: {
  schw: IScheduleWidgetWid;
  comw: CmComWid | nil;
  toolNode: React.ReactNode;
  linkNode: React.ReactNode;
}) => {
  openAtom ??= atom(false);

  return (
    <>
      <span onClick={openAtom.do.toggle}>{toolNode}</span>
      <FullContent openAtom={openAtom}>
        {!comw || (
          <CmEditorEditComEventInterpretationFullContentInner
            comw={comw}
            schw={schw}
            linkNode={
              <div
                className="mb-10"
                onClick={openAtom.reset}
              >
                {linkNode}
              </div>
            }
          />
        )}
      </FullContent>
    </>
  );
};
