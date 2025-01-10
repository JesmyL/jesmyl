import {
  IExportableMeetings,
  IExportableMeetingsEvent,
  MeetingsContext,
  MeetingsContextMap,
} from '../../../../../../shared/api/complect/apps/cm/complect/Meetings';
import { ClientExecutionDict } from '../../../../../complect/exer/Exer.model';
import { cmExer } from '../../CmExer';
import { Meetings } from '../../lists/meetings/Meetings';
import { EditableCom } from '../col/compositions/com/EditableCom';
import { EditableMeetingsEvent } from './EditableMeetingsEvent';

export class EditableMeetings extends Meetings {
  event?: EditableMeetingsEvent;
  stack?: IExportableMeetingsEvent[];
  events?: EditableMeetingsEvent[];
  contexts: MeetingsContextMap;
  names: string[];

  constructor(
    public coms: EditableCom[],
    meetings?: IExportableMeetings,
  ) {
    const { events, contexts, names } = meetings || ({} as IExportableMeetings);

    super(meetings);

    this.stack = events;
    this.contexts = this.takeContexts(contexts);
    this.names = [...(names ?? [])];
    this.events = events?.map(event => new EditableMeetingsEvent(event, coms));
    this.event = this.events?.[0];
  }

  scope(action: string, uniq?: number) {
    return `${action}.${uniq || '[no-uniq]'}`;
  }

  exec(bag: ClientExecutionDict, uniq?: number) {
    return cmExer.set({
      scope: this.scope(bag.action, uniq),
      ...bag,
      args: {
        ...bag.args,
      },
    });
  }

  addContext(name: string, groupPath: number[], bindEvents: EditableMeetingsEvent[]) {
    let contexti = this.names.indexOf(name);

    if (contexti < 0) {
      this.exec({
        action: 'addMeetingsName',
        method: 'push',
        args: {
          value: name,
        },
      });
      contexti = this.names.push(name) - 1;
    }

    const contextw = Date.now();
    const context = groupPath.concat(contexti);

    this.exec(
      {
        action: 'addMeetingsContext',
        method: 'set',
        value: context,
        args: {
          contextw,
          value: context,
        },
      },
      contextw,
    );

    this.contexts[contextw] = new MeetingsContext({ c: context });

    bindEvents.forEach(event => event.setContext(contextw));
  }

  addEvent(name: string, contextw: number) {
    const event = new EditableMeetingsEvent(
      {
        n: name,
        b: 0,
        e: 0,
        c: contextw,
        r: 0,
        s: [],
        w: Date.now(),
      },
      this.coms,
    );

    this.exec({
      action: 'addMeetingsEvent',
      method: 'push',
      args: event.execArgs(),
    });

    this.events?.push(event);
  }
}
