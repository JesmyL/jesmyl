import { ContextFieldBlankImportable } from '../groups/fields/Blanks.model';
import { LeaderGroupImportable } from '../groups/Groups.model';

export interface LeaderContextsImportable {
  list?: LeaderContextImportable[];
}

export interface LeaderContextImportable extends LeaderContextExportable {
  w: number;
  groups?: LeaderGroupImportable[];
  blanks?: ContextFieldBlankImportable[];
}

export interface LeaderContextExportable extends LeaderContextCreatable {}

export interface LeaderContextCreatable {
  name: string;
  members: number[];
  mentors: number[];
}
