import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { useEditableCcom } from '$cm+editor/shared/lib/useEditableCom';
import { ChordVisibleVariant, TheCmComOrder } from '$cm/ext';
import { useIndexSchedules } from '$index/shared/state';
import { atom } from 'atomaric';
import { CmComWid, IScheduleWidgetWid } from 'shared/api';

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
  const ccom = useEditableCcom(comw ?? CmComWid.def);
  const schedule = useIndexSchedules()?.find(sch => sch.w === schw);

  return (
    <>
      <span onClick={openAtom.do.toggle}>{toolNode}</span>
      <FullContent openAtom={openAtom}>
        <div>
          Редактирование интерпритации для мероприятия
          <span className="text-x7"> {schedule?.title}</span>
        </div>

        <span onClick={openAtom.reset}>{linkNode}</span>

        {ccom?.orders?.map((ord, ordi) => {
          return (
            <TheCmComOrder
              key={ordi}
              ord={ord}
              ordi={ordi}
              com={ccom}
              showInvisibles
              chordVisibleVariant={ChordVisibleVariant.Maximal}
              asHeaderComponent={({ headerNode }) => headerNode}
            />
          );
        })}
      </FullContent>
    </>
  );
};
