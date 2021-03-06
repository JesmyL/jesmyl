import { ReactNode, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import EvaIcon from "../../../../../complect/eva-icon/EvaIcon";
import mylib from "../../../../../complect/my-lib/MyLib";
import { cmStorage } from "../../../../../shared/jstorages";
import { RootState } from "../../../../../shared/store";
import ComFace from "../../col/com/face/ComFace";
import { ExecVision } from "../CmEditor.model";
import { EditableCom } from "../col/compositions/EditableCom";
import { useEditableCols } from "../col/useEditableCols";
import { useEditableMeetings } from "../meetings/useEditableMeetings";
import PhaseCmEditorContainer from "../phase-editor-container/PhaseCmEditorContainer";
import "./ExecsVisor.scss";

export default function ExecsVisor() {
  const [lookList, setLookList] = useState<(number | nil)[]>([]);
  const execs = useSelector((state: RootState) => state.cm.execs);
  const [cols] = useEditableCols();
  const { meetings, goToEvent } = useEditableMeetings();
  const list: ExecVision[] | nil = useMemo(() => {
    const actions = cmStorage.get("actions");
    let flowCom: EditableCom | nil = null;

    const setAsNode = (value: any, fieldn: string | nil) => {
      return fieldn === "comw"
        ? cols &&
            [value]
              .flat()
              .map((comw: number) => {
                flowCom = cols.coms.find((com) => com.wid === comw);
                return (
                  flowCom && (
                    <ComFace
                      key={`com-${comw}`}
                      com={flowCom}
                      rejectScrollToView
                    />
                  )
                );
              })
              .filter((val) => val != null)
        : fieldn === "tonLevel"
        ? flowCom
          ? flowCom.transChord(flowCom.getFirstSimpleChord() || "?", value)
          : value
        : fieldn === "eventw"
        ? meetings &&
          [value]
            .flat()
            .map((eventw: number) => {
              if (eventw == null) return null;
              const event = meetings.events.find(
                (event) => event.wid === eventw
              );
              return (
                <div
                  key={`event-${eventw}`}
                  className={event ? "" : "error-message"}
                  onClick={() => eventw && goToEvent(eventw)}
                >
                  <EvaIcon
                    name="calendar-outline"
                    className="vertical-middle margin-gap"
                  />
                  <span className={`vertical-middle `}>
                    {event ? event.name : "?????????????????????? ??????????????"}
                  </span>
                </div>
              );
            })
            .filter((val) => val != null)
        : JSON.stringify(value, null, 2);
    };

    return (
      actions &&
      execs
        ?.map((exec): ExecVision => {
          const action = actions.find(({ action }) => exec.action === action);
          let prevNode: ReactNode;
          let valueNode: ReactNode;

          if (
            exec.args &&
            (typeof exec.args.value === "string" ||
              typeof exec.args.prev === "string")
          ) {
            prevNode = <pre>{exec.args?.prev}</pre>;
            valueNode = <pre>{exec.args?.value}</pre>;
          } else if (action) {
            prevNode = setAsNode(exec.args?.prev, action.valueAs);
            valueNode = setAsNode(exec.args?.value, action.valueAs);
          }
          return action
            ? {
                ...action,
                ...exec,
                specials: (
                  <>
                    {setAsNode(exec.args?.eventw, "eventw")}
                    {setAsNode(exec.args?.comw, "comw")}
                  </>
                ),
                prevNode,
                valueNode,
              }
            : { action: "", title: "?????????????????????? ??????????????????", level: 0 };
        })
        .sort((a, b) => (b.ts || 0) - (a.ts || 0))
    );
  }, [cols, execs, meetings]);

  return (
    <PhaseCmEditorContainer
      topClass="e-e-rules-editor"
      headClass="flex between"
      headTitle="??????????????????"
      content={list?.map((exec) => {
        return (
          <div
            key={`exec-${exec.ts}`}
            className="exec-visor margin-big-gap-v pointer padding-gap full-width"
          >
            <div className="flex between full-width">
              <span>{exec.author}</span>
              <span
                onClick={() => {
                  setLookList(
                    lookList.indexOf(exec.ts) < 0
                      ? [...lookList, exec.ts]
                      : lookList.filter((ts) => ts !== exec.ts)
                  );
                }}
              >
                {
                  <EvaIcon
                    name={
                      lookList.indexOf(exec.ts) < 0
                        ? "eye-outline"
                        : "eye-off-outline"
                    }
                  />
                }
              </span>
            </div>
            {exec.ts && <div>{new Date(exec.ts * 1000).toLocaleString()}</div>}
            <div>
              <strong>
                {mylib.stringTemplater(exec.title || "", exec.args)}
              </strong>
            </div>
            <div>{exec.specials}</div>
            {lookList.indexOf(exec.ts) < 0 ? null : (
              <>
                <div>??????????????????:</div>
                {exec.prevNode}
                <EvaIcon name="arrow-forward-outline" />
                {exec.valueNode}
              </>
            )}
          </div>
        );
      })}
    />
  );
}
