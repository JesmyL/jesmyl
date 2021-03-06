import { FullScreenContentOpenMode } from "./fullscreen-content/useFullscreenContent";
import { FreeNavRoute } from "./nav-configurer/Navigation.model";


export interface ComplectStorage {
    route: FreeNavRoute;
}

export interface ComplectState extends ComplectStorage {
    fullscreenContentOpenMode: FullScreenContentOpenMode;
    isAbsoluteFloatPopupOpen: boolean;
    isAbsoluteBottomPopupOpen: boolean;
    numAbsoluteBottomPopupUpdates: number;
    isFullscreen: boolean;
    numExerUpdates: number;
}