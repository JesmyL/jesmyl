import { HttpLink, HttpNumLeadLink, HttpNumLeadLinkKey } from 'shared/api';
import { SMyLib } from 'shared/utils';

const numLeadToHttpLinks: Record<HttpNumLeadLinkKey, HttpLink> = {
  '1~': 'https://holychords.pro/uploads/music/',
  '2~': 'https://holychords.pro/storage/music/',
  '3~': 'https://ps.vkuseraudio.net/audio/ee/',
  '4~': 'https://fonki.pro/plugin/sounds/uploads/',
  '5~': 'https://kg-music.club/wp-content/uploads/',
  '6~': 'https://hvalite.com/uploads/audio/examples/',
  '7~': 'https://alliluya.com/attachments/article/',
  '8~': 'https://ia801205.us.archive.org/13/items/songsofrevival/',
  '9~': 'https://livepleer.com/uploaded/mp3/',
};

const httpToNumLeadLinks: Record<HttpLink, HttpNumLeadLinkKey> = {};
const timeSeparator = '~~';

SMyLib.entries(numLeadToHttpLinks)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([key, value]) => (httpToNumLeadLinks[value] = key));

export const makeCmComNumLeadLinkFromHttp = (httpLink: HttpLink): HttpNumLeadLink => {
  for (const httpLinkPrefix in httpToNumLeadLinks) {
    if (httpLink.startsWith(httpLinkPrefix)) {
      const numLead = httpToNumLeadLinks[httpLinkPrefix as never];
      let linkPostfix = httpLink.slice(httpLinkPrefix.length);

      if (numLead === '1~') {
        const [firstRoute, routePostfix] = linkPostfix.split('/', 2);

        if (routePostfix.startsWith(firstRoute)) {
          linkPostfix = `${firstRoute}${timeSeparator}${linkPostfix.slice(firstRoute.length * 2 + 1)}`;
        }
      }

      return `${numLead}${linkPostfix}`;
    }
  }

  return httpLink as never;
};

export const makeCmComHttpLinkFromNumLead = (numLeadLink: HttpNumLeadLink): HttpLink => {
  if (numLeadLink.startsWith('http')) return numLeadLink as never;

  const prefix = `${parseFloat(numLeadLink)}~` as const;
  if (numLeadToHttpLinks[prefix] === undefined) throw `Unknown link prefix ${prefix}`;

  let postfix = numLeadLink.slice(prefix.length);

  if (prefix === '1~') {
    const [firstRoute, routePostfix] = postfix.split(timeSeparator);

    if (routePostfix != null) {
      postfix = `${firstRoute}/${firstRoute}${routePostfix}`;
    }
  }

  return `${numLeadToHttpLinks[prefix]}${postfix}`;
};

export const makeCmComNumLeadToHttpAudioLinks = (nulLeadLinks: HttpNumLeadLink[] | HttpNumLeadLink | nil) => {
  const links = nulLeadLinks ? [nulLeadLinks].flat().map(makeCmComHttpLinkFromNumLead) : [];
  return !links.length ? undefined : links;
};

export const makeCmComHttpToNumLeadAudioLinks = (httpLinks: HttpLink[] | nil) => {
  const links = httpLinks ? httpLinks.flat().map(makeCmComNumLeadLinkFromHttp) : [];
  return links.length === 1 ? links[0] : !links.length ? undefined : links;
};
