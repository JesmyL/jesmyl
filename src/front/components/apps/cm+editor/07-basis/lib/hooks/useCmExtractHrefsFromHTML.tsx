import { useEffect } from 'react';
import { makeRegExp } from 'regexpert';
import { CmMp3Rule, HttpLink } from 'shared/api';
import { itIt, itNNull } from 'shared/utils';

export const useCmExtractHrefsFromHTML = (
  html: string | nil,
  mp3Rule: CmMp3Rule | nil,
  setHrefs: (value: React.SetStateAction<HttpLink[]>) => void,
  audioLinks: HttpLink[] | nil,
) => {
  useEffect(() => {
    if (html && mp3Rule) {
      const existsHrefs = new Set(audioLinks);
      const div = document.createElement('div');
      div.innerHTML = html;
      const { attr, query, url, repReg, repText = '' } = mp3Rule;
      let mapSrc = itIt<HttpLink>;

      if (repReg)
        try {
          const regToReplace = makeRegExp(repReg);
          mapSrc = (src: HttpLink) => src.replace(regToReplace, repText) as HttpLink;
        } catch (_error) {
          //
        }

      setHrefs(
        Array.from(
          new Set(
            Array.from(div.querySelectorAll(query))
              .map(e => {
                let attrUrl: URL | und;
                let serverUrl: URL | und;
                const attribute = e.getAttribute(attr);
                if (url)
                  try {
                    serverUrl = new URL(url);
                  } catch (_error) {
                    //
                  }

                if (attribute)
                  try {
                    attrUrl = new URL(attribute);
                  } catch (_e) {
                    try {
                      attrUrl = new URL(url);
                      const [path, ...search] = attribute.split('?');
                      attrUrl.pathname = path;
                      if (search.length) attrUrl.search = search.join('?');
                    } catch (_error) {
                      //
                    }
                  }

                if (attrUrl && serverUrl) {
                  serverUrl.pathname = attrUrl.pathname;
                  serverUrl.search = attrUrl.search;

                  const src = serverUrl.toString() as HttpLink;
                  if (existsHrefs.has(src)) return null;
                  return mapSrc(src);
                }

                return null;
              })
              .filter(itNNull),
          ),
        ),
      );

      div.remove();
    }
  }, [audioLinks, html, mp3Rule, setHrefs]);
};
