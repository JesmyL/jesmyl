import { useDispatch, useSelector } from "react-redux";
import EvaIcon from "../../../../../complect/eva-icon/EvaIcon";
import useFullscreenContent from "../../../../../complect/fullscreen-content/useFullscreenContent";
import mylib from "../../../../../complect/my-lib/MyLib";
import { RootState } from "../../../../../shared/store";
import { setHumanListSortVariant } from "../../Lider.store";
import PrintableBottomItem from "../PrintableBottomItem";
import AdaptationPageList from "../templates/AdaptationPageList";
import { humanFieldTranslations } from "./Human.model";
import HumanMaster from "./HumanMaster";

export default function HumansMore() {
  const { openFullscreenContent } = useFullscreenContent();
  const dispatch = useDispatch();
  const humanListSortVariant = useSelector(
    (state: RootState) => state.lider.humanListSortVariant
  );

  return (
    <>
      <div
        className="abs-item"
        onClick={() =>
          openFullscreenContent((close) => <HumanMaster close={close} />)
        }
      >
        <EvaIcon name="person-add-outline" className="abs-icon" />
        <div>Добавить участника</div>
        <div className="abs-action" />
      </div>
      <PrintableBottomItem
        title="Распечатать Допуска к путешествию"
        node={<AdaptationPageList />}
      />
      <div
        className="abs-item"
        onClick={(event) => {
          event.stopPropagation();
          const next = mylib.findNext(
            mylib.keys(humanFieldTranslations),
            humanListSortVariant
          );
          dispatch(setHumanListSortVariant(next));
        }}
      >
        <EvaIcon name="bar-chart-2-outline" className="abs-icon" />
        <div>Сортировать участников</div>
        <div className="abs-action">
          {humanFieldTranslations[humanListSortVariant]}
        </div>
      </div>
    </>
  );
}
