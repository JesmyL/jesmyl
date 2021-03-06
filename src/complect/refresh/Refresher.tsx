import { useState } from "react";
import EvaIcon from "../eva-icon/EvaIcon";
import { Refresh } from "./Refresh";
import { RefreshState } from "./Refresh.model";
import "./Refresher.scss";

export const refresh = new Refresh();

refresh.check();

export default function Refresher() {
  const [state, setState] = useState<RefreshState>("inactive");

  refresh.onStateChange((state: RefreshState) => setState(state));

  return (
    <div className={`refresher ${state}`} onClick={() => refresh.pull()}>
      <EvaIcon name="sync-outline" />
    </div>
  );
}
