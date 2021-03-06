import { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../shared/store";
import { JStorage } from "../JStorage";
import useFullScreen from "../useFullscreen";
import { NavigationConfig } from "./Navigation";
import { FreeNavRoute, NavigationStorage, NavPhase, NavPhasePoint, UseNavAction } from "./Navigation.model";

export default function useNavConfigurer<T, Storage extends NavigationStorage<T>, NavData = {}>(
    actions: UseNavAction[],
    setPhaseAction: (payload: NavigationStorage<T>) => PayloadAction<NavigationStorage<T>>,
    nav: NavigationConfig<Storage, Storage, NavData>,
    storage: JStorage<Storage>,
    routeSelector: (state: RootState) => FreeNavRoute,
) {

    const dispatch = useDispatch();
    const [isFullScreen, switchFullscreen] = useFullScreen();

    const ret = {
        nav,
        route: useSelector(routeSelector),
        navigateToRoot: () => nav.rootPhase && ret.navigate([nav.rootPhase]),
        navigate: (topRoute: FreeNavRoute, isPreventSave?: boolean) => {
            const route = topRoute && nav.getGoToRoute([], topRoute);

            if (route || topRoute === null) {
                dispatch(setPhaseAction({ route } as never));
                if (isPreventSave) return;
                storage.set('route', route || null);
            }
        },
        goTo: (phase: NavPhase | NavPhase[], relativePoint?: NavPhasePoint | nil, isPreventSave?: boolean) => {
            const newRoute = nav.getGoToRoute(ret.route || [], phase, relativePoint);
            if (newRoute) ret.navigate(newRoute, isPreventSave);
        },
        jumpTo: (phasePoint: NavPhasePoint, isPreventSave?: boolean) => {
            const newRoute = nav.getJumpToRoute(ret.route, phasePoint);
            if (newRoute) ret.navigate(newRoute, isPreventSave);
        },
        registerBackAction: (action: UseNavAction) => {
            actions.unshift(action);
            return () => actions.splice(actions.findIndex(ac => ac !== action), 1);
        },
        goBack: (isForceBack = false) => {
            if (actions.length) {
                if (actions.some(action => {
                    actions.shift();
                    return action?.(isForceBack);
                }) && !isForceBack) return;
            }

            if (isFullScreen) {
                switchFullscreen(false);
                return;
            }

            if (ret.route) {
                const line = nav.getGoBackRoute(ret.route);
                if (line.length) ret.navigate(line);
                else ret.navigate(nav.rootPhase === null ? null : [nav.rootPhase]);
            }
        }
    };

    return ret;
}
