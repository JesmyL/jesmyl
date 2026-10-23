import { pgTable, text } from 'p/d';
import { CmAudioTail, HttpLink, HttpNumLeadLink } from 'shared/api';

export const audioLinkDB = pgTable('audioLinks', {
  key: text('key').primaryKey().$type<CmAudioTail>(),
  md5: text('md5').notNull().unique(),
  link: text('link').notNull().unique().$type<HttpLink | HttpNumLeadLink>(),
});
