import { FileRoutesByPath } from '@tanstack/react-router';
import { SokiAppName } from 'shared/api';

const placeLsPrefix = 'nav-link:';
const lastAppPlaceLsPrefix = 'nav-last-place:';
const lastVisitedRouteLsName = 'nav-last-visited-route';

export class FooterPlacementManager {
  private static makePlaceLsPrefix = (appName: SokiAppName | '!other', place: string) => {
    return `${placeLsPrefix}/${appName}/${place}/`;
  };

  static get lastVisitedRouteUrl() {
    return (localStorage.getItem(lastVisitedRouteLsName) as never) || '/cm/i';
  }

  static getLastAppLink = (appName: SokiAppName) => {
    const place = localStorage.getItem(`${lastAppPlaceLsPrefix}/${appName}/`) ?? 'i';

    return (
      localStorage.getItem(this.makePlaceLsPrefix(appName, place)) ||
      `/${appName}/${localStorage.getItem(`${lastAppPlaceLsPrefix}/${appName}/`) || 'i'}`
    );
  };

  static onPlaceUrlChange = (appName: SokiAppName | '!other', place: string, url: string) => {
    if (url === `/${appName}/${place}`) localStorage.removeItem(this.makePlaceLsPrefix(appName, place));
    else localStorage.setItem(this.makePlaceLsPrefix(appName, place), url);

    localStorage.setItem(`${lastAppPlaceLsPrefix}/${appName}/`, place);
    localStorage.setItem(lastVisitedRouteLsName, url);
  };

  static makePlaceLink = (to: string): keyof FileRoutesByPath => {
    return (localStorage.getItem(placeLsPrefix + to) ?? localStorage.getItem(placeLsPrefix + `${to}/`) ?? to) as never;
  };
}
