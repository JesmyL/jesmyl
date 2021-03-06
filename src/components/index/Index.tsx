import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { indexStorage } from "../../shared/jstorages";
import { IndexApplication } from "./Index.model";
import "./Index.scss";
import { setApps } from "./Index.store";

export default function Index({ content }: { content: ReactNode }) {
  const dispatch = useDispatch();

  const listener = indexStorage.listen("apps", "index-listener", (val) => {
    dispatch(setApps(val as IndexApplication[]));
  });

  useEffect(() => {
    indexStorage.update("apps", listener);
    return () => indexStorage.mute("apps", "index-listener");
  });

  return <>{content}</>;
}
