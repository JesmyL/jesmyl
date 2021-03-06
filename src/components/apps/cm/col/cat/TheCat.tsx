import { useRef, useState } from "react";
import DebouncedInput from "../../../../../complect/DebouncedInput";
import LoadIndicatedContent from "../../../../../complect/load-indicated-content/LoadIndicatedContent";
import mylib from "../../../../../complect/my-lib/MyLib";
import useLaterComList from "../../base/useLaterComList";
import PhaseCmContainer from "../../complect/phase-container/PhaseCmContainer";
import ComFace from "../com/face/ComFace";
import { useCcom } from "../com/useCcom";
import "./Cat.scss";
import { useCcat } from "./useCcat";

export default function TheCat({ all }: { all?: boolean }) {
  const [ccat, , zeroCat] = useCcat();
  const [ccom] = useCcom();
  const { laterComs } = useLaterComList();

  const listRef = useRef<HTMLDivElement>(null);
  const categoryTitleRef = useRef<HTMLDivElement>(null);
  const cat = all ? zeroCat : ccat;

  const [term, setTerm] = useState(cat?.term || "");

  const scrollToCurrent = () => {
    if (ccom) {
      setTimeout(() => {
        const currentFace = document.querySelector(
          `.face-item.com-of-cat.current.wid_${ccom.wid}`
        );
        if (listRef.current)
          if (listRef.current.scrollTop > 0) listRef.current.scrollTop = 0;
          else if (currentFace && categoryTitleRef.current) {
            mylib.scrollToView(currentFace, "top", {
              parent: listRef.current,
              top: categoryTitleRef.current.clientHeight,
            });
          }
      });
    }
  };

  return (
    <LoadIndicatedContent isLoading={!cat} onLoad={scrollToCurrent}>
      <PhaseCmContainer
        topClass="cat-content"
        withoutBackButton={all}
        head={
          !cat ? null : (
            <DebouncedInput
              uniq={`search in cat ${cat.wid}`}
              icon="search-outline"
              placeholder="Поиск песен"
              className="debounced-searcher round-styled"
              initialTerm={term}
              onSearch={(term) => cat.search(term)}
              debounce={500}
              onDebounced={() => {
                if (listRef.current) listRef.current.scrollTop = 0;
              }}
              onTermChange={(term) => setTerm(term)}
            />
          )
        }
        contentRef={listRef}
        content={
          !cat ? null : (
            <>
              <div
                className={`later-com-list ${
                  all && !term && laterComs.length ? "" : "hidden"
                }`}
                onClick={scrollToCurrent}
              >
                <div className="list-title sticky">Последние:</div>
                {laterComs.map((com) => (
                  <ComFace
                    key={`later-com-${com.wid}`}
                    com={com}
                    rejectScrollToView
                  />
                ))}
              </div>
              <div
                className="flex between sticky list-title"
                ref={categoryTitleRef}
                onClick={scrollToCurrent}
              >
                <div>{cat.name}:</div>
                {cat.wraps && (
                  <div>
                    {`${
                      cat.coms.length === cat.wraps.length
                        ? ""
                        : `${cat.wraps.length} / `
                    }${cat.coms.length}`}
                  </div>
                )}
              </div>
              <div className="com-list">
                {cat.wraps.map((wrap) => (
                  <ComFace
                    key={`com-face ${wrap.com.wid}`}
                    {...wrap}
                    rejectScrollToView
                    groupClass="com-of-cat"
                  />
                ))}
              </div>
            </>
          )
        }
      />
    </LoadIndicatedContent>
  );
}
