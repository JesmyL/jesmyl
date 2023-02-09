import { NavigationConfig } from "../../../../complect/nav-configurer/Navigation";
import {
  INavigationRouteChildItem,
  NavigationStorage,
  NavPhasePoint,
  UseNavAction
} from "../../../../complect/nav-configurer/Navigation.model";
import useNavConfigurer from "../../../../complect/nav-configurer/useNavConfigurer";
import CmApplication from "../Cm";
import { CmNavData, CmQRData, CmStorage } from "../Cm.model";
import { cmExer } from "../Cm.store";
import TheCat from "../col/cat/TheCat";
import TheComposition from "../col/com/TheComposition";
import { editorNav } from "../editor/editorNav";
import Lists from "../lists/Lists";
import Marks from "../lists/marks/Marks";
import TheMeetings from "../lists/meetings/TheMeetings";
import TheMeetingsEvent from "../lists/meetings/TheMeetingsEvent";
import SelectedComs from "../lists/selected-coms/SelectedComs";
import Translations from "../translation/Translation";

export const translationNavPoint: NavPhasePoint = ["translation"];
const translationNav: INavigationRouteChildItem<CmNavData> = {
  phase: translationNavPoint,
  node: <Translations />,
};

export const comNavPhasePoint: NavPhasePoint = ["com"];

const comNav: INavigationRouteChildItem<CmNavData> = {
  phase: comNavPhasePoint,
  node: <TheComposition />,
  next: [translationNav],
};

const comNext = [comNav, translationNav];

const navigation: NavigationConfig<
  CmStorage,
  NavigationStorage<CmStorage>,
  CmNavData
> = new NavigationConfig({
  root: (content) => <CmApplication content={content} />,
  rootPhase: "all",
  logo: "book-open",
  exer: cmExer,
  routes: [
    {
      icon: "list",
      phase: ["all"],
      title: "Все",
      node: <TheCat all />,
      markBadge: (qrData?: CmQRData) => !!qrData?.com,
      next: [comNav],
    },
    {
      icon: "folder",
      phase: ["lists"],
      title: "Списки",
      node: <Lists />,
      markBadge: (qrData?: CmQRData) => !!qrData?.comws,
      next: [
        {
          phase: ["marks"],
          node: <Marks />,
          next: [...comNext],
        },
        {
          phase: ["cat"],
          node: <TheCat />,
          next: [...comNext],
        },
        {
          phase: ["selected"],
          node: <SelectedComs />,
          slideBackOn: (data) => !data?.selectedComws.length,
          next: [...comNext],
        },
        {
          phase: ["meetings"],
          node: <TheMeetings />,
          next: [
            {
              phase: ["event"],
              node: <TheMeetingsEvent />,
              next: [...comNext],
            },
          ],
        },
      ],
    },
    editorNav,
  ],
});

const actions: UseNavAction[] = [];

export default function useCmNav() {
  return useCmNavConfigurer();
}

const useCmNavConfigurer = () =>
  useNavConfigurer<CmStorage, NavigationStorage<CmStorage>, CmNavData>(
    'cm',
    actions,
    navigation,
  );
export { useCmNavConfigurer };