import * as bibleTitlesJSON from 'bibles/book-titles.json';

export const bibleTitles: { titles: [string, string][] } = { ...bibleTitlesJSON } as never;
