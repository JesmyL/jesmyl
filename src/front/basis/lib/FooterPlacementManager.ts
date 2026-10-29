import { FileRoutesByPath } from '@tanstack/react-router';
import { SokiAppName } from 'shared/api';
import { checkIsNaN } from 'shared/utils/checkIs';

const placeLsPrefix = 'nav-link:';
const lastAppPlaceLsPrefix = 'nav-last-place:';
const lastVisitedRouteLsName = 'nav-last-visited-route';
const lastVisitedSchwLsName = 'nav-last-visited-schw';

export class FooterPlacementManager {
  private static lastRegisteredUrl: string | null = null;

  private static makePlaceLsPrefix = (appName: SokiAppName | '!other', place: string) => {
    return `${placeLsPrefix}/${appName}/${place}/`;
  };

  static get lastVisitedRouteUrl() {
    return (localStorage.getItem(lastVisitedRouteLsName) as never) || '/cm/i';
  }

  static get lastVisitedSchw(): nil | number {
    const value = localStorage.getItem(lastVisitedSchwLsName);
    if (value == null) return null;

    const schw = +value;

    return checkIsNaN(schw) ? null : schw;
  }

  static set lastVisitedSchw(schw: number) {
    localStorage.setItem(lastVisitedSchwLsName, `${schw}`);
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

  static registerVisitedUrl = (href: string) => {
    if (href === this.lastRegisteredUrl) return;
    this.lastRegisteredUrl = href;

    const { pathname, search, hash, searchParams } = new URL(href, location.href);
    const [, appName, place] = pathname.split('/') as ['', SokiAppName | '!other' | und, string | und];

    if (!appName || !place) return;

    this.onPlaceUrlChange(appName, place, `${pathname}${search}${hash}`);

    const schw = +`${searchParams.get('schw')}`;
    if (!checkIsNaN(schw)) this.lastVisitedSchw = schw;
  };

  static makePlaceLink = (to: string): keyof FileRoutesByPath => {
    const lsPath = localStorage.getItem(`${placeLsPrefix}${to}`);

    if (lsPath != null) {
      return (
        lsPath.startsWith(to) || lsPath.startsWith(`${to.slice(0, -1)}?`) || lsPath.startsWith(`${to.slice(0, -1)}#`)
          ? lsPath
          : to
      ) as never;
    }

    return to as never;
  };
}
