import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { comDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { eq } from 'drizzle-orm';
import {
  CmComAudioMarkPack,
  CmComAudioMarkPackTime,
  CmComAudioMarkPackTimeZero,
  CmComWid,
  HttpNumLeadLink,
} from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { CmBroadcastMonolineSlideSelectorId } from 'shared/model/cm/broadcast';
import { extractNumber, itNumSort } from 'shared/utils';
import { checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import { objectEntries, objectKeys } from 'shared/utils/object.utils';
import { makeCmComHttpLinkFromNumLead, makeCmComNumLeadLinkFromHttp } from '../complect/com-http-links';

export const cmEditComExternalsTsjrpcAudioMarks = {
  updateAudioMarks_v2: async args => {
    const comw = args.comw;
    let description: string | null = null;

    const retPack: CmComAudioMarkPack = {};
    const packEntries = objectEntries('marks' in args ? args.marks : { [args.src]: { [args.time]: args.sel } });
    const comMarks = (await db.select({ am: comDB.am }).from(comDB).where(eq(comDB.w, comw)).limit(1)).at(0)?.am ?? {};

    for (const [src, newPack] of packEntries) {
      if (!newPack) continue;

      const numLink = makeCmComNumLeadLinkFromHttp(src);
      let firstOrdw;

      if (checkIsNil(comMarks[numLink])) {
        description = `Создан новый пак аудио-маркеров для ссылки ${makeCmComHttpLinkFromNumLead(numLink)}`;

        const comTiny = (
          await db
            .select({ n: comDB.n, o: comDB.o })
            .from(comDB)
            .where(eq(comDB.w, extractNumber(comw)))
            .limit(1)
        ).at(0);

        if (comTiny) {
          description += `\n\nпесня:\n${comTiny.n}`;
          const ordw = comTiny.o?.[0].w;

          if (checkIsNotNil(ordw))
            firstOrdw = { [CmComAudioMarkPackTimeZero]: [ordw] as CmBroadcastMonolineSlideSelectorId };
        }
      }

      const srcPackMarks = comMarks[numLink] ?? firstOrdw ?? {};

      srcPackMarks[CmComAudioMarkPackTimeZero] ??= '';

      objectEntries(newPack).forEach(([time, selector]) => {
        if (checkIsNil(selector)) {
          delete srcPackMarks[time];
          return;
        }

        let timeScalar = +time;
        if (timeScalar === 0.11) timeScalar = 0;

        timeScalar = +timeScalar.toFixed(2);
        if (timeScalar !== 0 && Math.trunc(timeScalar) === timeScalar) timeScalar += 0.11;

        time = timeScalar as CmComAudioMarkPackTime;

        srcPackMarks[time] = selector;
      });

      const sortedMarksPack: CmComAudioMarkPack[HttpNumLeadLink] = (retPack[src] = {});

      objectKeys(srcPackMarks)
        .map(extractNumber)
        .sort(itNumSort)
        .forEach(time => (sortedMarksPack[time] = srcPackMarks[time]));
    }

    const marks = { ...comMarks, ...retPack };
    await updateComPack(comw, marks);

    return { value: { marks, comw }, description };
  },

  changeAudioMarkTime_v1: async ({ newTime, src, time, comw }) => {
    const numLeadSrc = makeCmComNumLeadLinkFromHttp(src);

    const comMarks = (await db.select({ am: comDB.am }).from(comDB).where(eq(comDB.w, comw)).limit(1)).at(0)?.am ?? {};
    const linkMarks = comMarks[numLeadSrc];

    if (checkIsNil(linkMarks)) return { value: null };
    if (checkIsNotNil(linkMarks[newTime])) throw 'Такое время уже зарегистрировано';

    linkMarks[newTime] = linkMarks[time];
    delete linkMarks[time];

    const sortedMarksPack: CmComAudioMarkPack[HttpNumLeadLink] = {};

    objectKeys(linkMarks)
      .map(extractNumber)
      .sort(itNumSort)
      .forEach(time => (sortedMarksPack[time] = linkMarks[time]));

    const marks = { ...comMarks, [src]: sortedMarksPack };
    await updateComPack(comw, marks);

    return { value: { marks, comw } };
  },
} satisfies ServerTsjrpcSatisfy<CmEditComExternalsTsjrpcModel>;

const updateComPack = (comw: CmComWid, sortedMarksPack: CmComAudioMarkPack) =>
  dbUpdate(comDB, { am: sortedMarksPack, amMod: Date.now() }, eq(comDB.w, comw));
