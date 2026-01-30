import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { atom } from 'atomaric';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';
import { CmEditorEditComForSchEventFullContentInner } from './EditorFullContentInner';

const openAtom = atom(false);

export const CmEditorEditComForSchEvent = ({
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
  return (
    <>
      <span onClick={openAtom.do.toggle}>{toolNode}</span>
      <FullContent openAtom={openAtom}>
        {!comw || (
          <CmEditorEditComForSchEventFullContentInner
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
