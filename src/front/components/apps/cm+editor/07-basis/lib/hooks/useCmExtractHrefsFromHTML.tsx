import { useEffect } from 'react';
import { CmMp3Rule } from 'shared/api';
import { itIt } from 'shared/utils';

export const useCmExtractHrefsFromHTML = (
  html: string | nil,
  mp3Rule: CmMp3Rule | nil,
  setHrefs: (value: React.SetStateAction<string[]>) => void,
  audio: string | nil,
) => {
  useEffect(() => {
    if (html && mp3Rule) {
      const existsHrefs = new Set(audio?.split('\n'));
      const div = document.createElement('div');
      div.innerHTML = html;
      const { attr, query, url } = mp3Rule;

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

                  const src = serverUrl.toString();
                  if (existsHrefs.has(src)) return '';
                  return src;
                }

                return '';
              })
              .filter(itIt),
          ),
        ),
      );

      div.remove();
    }
  }, [audio, html, mp3Rule, setHrefs]);
};
