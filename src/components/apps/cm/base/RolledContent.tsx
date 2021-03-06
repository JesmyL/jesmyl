import { HTMLAttributes, PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import EvaIcon from "../../../../complect/eva-icon/EvaIcon";
import useFullScreen from "../../../../complect/useFullscreen";
import { cmStorage } from "../../../../shared/jstorages";
import { RootState } from "../../../../shared/store";
import { CmRollMode } from "../Cm.model";
import { changeRollMode } from "../Cm.store";
import useCmNav from "./useCmNav";

export default function RollControled(
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>
) {
  const { toggleRoll, rollMode } = useRoll();
  const [isFullscreen] = useFullScreen();

  return (
    <div
      {...props}
      onClick={() => toggleRoll()}
      ref={(element) => element && (container = element.parentElement)}
      className={`roll-controled-container full-width full-height ${
        isFullscreen ? "fullscreen" : ""
      }`}
    >
      <div
        className={`roll-controls flex column center ${
          rollMode === "play" ? "open" : ""
        }`}
      >
        <EvaIcon
          name="minus"
          onClick={(event) => {
            event.stopPropagation();
            updateSpeedRollKf(-1);
          }}
        />
        <div
          ref={(element) => {
            if (element) {
              speedScreen = element;
              updateSpeedRollKf(0);
            }
          }}
        />
        <EvaIcon
          name="plus"
          onClick={(event) => {
            event.stopPropagation();
            updateSpeedRollKf(1);
          }}
        />
      </div>
      {props.children}
    </div>
  );
}

const setRollInterval = (): number =>
  (interval = (20 - speedRollKf || 0.7) * 30);

let speedRollKf = cmStorage.getOr("speedRollKf", 10);
let container: HTMLElement | null = null;
let speedScreen: HTMLDivElement | null = null;
let interval: number;
let rollMode: CmRollMode = null;

export function useRoll() {
  const dispatch = useDispatch();
  const { registerBackAction } = useCmNav();

  const ret = {
    rollModeMarks: useSelector((state: RootState) => state.cm.rollModeMarks),
    rollMode: useSelector((state: RootState) => state.cm.rollMode),
    switchRollMode: (topRollMode: CmRollMode) => {
      rollMode = topRollMode;
      dispatch(changeRollMode(topRollMode));
    },
    speedRollKf,
    toggleRoll: () => {
      if (rollMode !== "play") {
        ret.switchRollMode("play");
        startRoll(ret.switchRollMode);

        registerBackAction(() => {
          const was = rollMode === "play";
          ret.switchRollMode(null);
          return was;
        });
      } else {
        ret.switchRollMode("pause");
      }
    },
  };
  return ret;
}

const updateSpeedRollKf = (delta: 1 | -1 | 0) => {
  if (
    !speedScreen ||
    (delta && (delta < 0 ? speedRollKf <= 1 : speedRollKf >= 20))
  )
    return;
  speedRollKf += delta;
  setRollInterval();
  cmStorage.set("speedRollKf", speedRollKf);
  speedScreen.innerText = (speedRollKf / 10).toFixed(1);
};

const startRoll = (switchRollMode: (rollMode: CmRollMode) => void) => {
  if (!container) return;

  const scroll = (dec: number, container: HTMLElement) =>
    setTimeout(() => {
      if (rollMode !== "play") return;
      const prevScrollTop = container.scrollTop;
      container.scrollTop += 1;
      const diff = container.scrollTop === prevScrollTop ? 1 : 0;

      if (dec > 0) scroll(dec - diff, container);
      else switchRollMode("pause");
    }, interval);

  scroll(10, container);
};
