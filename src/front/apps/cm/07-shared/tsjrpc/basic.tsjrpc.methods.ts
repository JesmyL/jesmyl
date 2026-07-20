import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { extractNumber, itNumSort } from 'shared/utils';
import { forEachObjectEntries, objectKeys } from 'shared/utils/object.utils';
import { cmIDB } from '../state/cmIDB';

export const cmTsjrpcClient = new (class Cm extends TsjrpcClient<CmTsjrpcModel> {
  constructor() {
    super({
      scope: 'Cm',
      methods: {
        takeFreshComAudioMarksPack_v1: {
          onResponse: pack => {
            if (pack) {
              const marks: typeof pack.marks = {};

              forEachObjectEntries(pack.marks, (key, srcPack) => {
                if (!srcPack) return;

                marks[key] ??= {};

                objectKeys(srcPack)
                  .map(extractNumber)
                  .sort(itNumSort)
                  .forEach(time => {
                    if (marks[key]) marks[key][time] = srcPack[time];
                  });
              });

              cmIDB.tb.comAudioTrackMarks_v3.put({ ...pack, marks });
            }
          },
        },
        pullComComments: {
          onResponse: comments => {
            if (comments) cmIDB.tb.comCommentBlocks.put(comments);
          },
        },
      },
    });
  }
})();
