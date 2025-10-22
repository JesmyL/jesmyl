import { FileRoutesByPath } from '@tanstack/react-router';
import { SokiAppName } from 'shared/api';

const placeLsPrefix = 'nav-link:';
const lastAppPlaceLsPrefix = 'nav-last-place:';
const lastVisitedRouteLsName = 'nav-last-visited-route';

export class FooterPlacementManager {
  static get lastVisitedRouteUrl() {
    return (localStorage.getItem(lastVisitedRouteLsName) as never) || '/cm/i';
  }

  static getLastAppLink = (appName: SokiAppName) => {
    const place = localStorage.getItem(`${lastAppPlaceLsPrefix}/${appName}/`) ?? 'i';

    return localStorage.getItem(`${placeLsPrefix}/${appName}/${place}/`);
  };

  static onPlaceUrlChange = (appName: SokiAppName, place: string, url: string) => {
    const lsName = `${placeLsPrefix}/${appName}/${place}/`;

    if (url === `/${appName}/${place}`) localStorage.removeItem(lsName);
    else localStorage.setItem(lsName, url);

    localStorage.setItem(`${lastAppPlaceLsPrefix}/${appName}/`, place);

    localStorage.setItem(lastVisitedRouteLsName, url);
  };

  static makePlaceLink = (to: string): keyof FileRoutesByPath => {
    return (localStorage.getItem(placeLsPrefix + to) ?? localStorage.getItem(placeLsPrefix + `${to}/`) ?? to) as never;
  };
}
