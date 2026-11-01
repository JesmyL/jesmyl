import { BibleBroadcastScreenScreen } from '$bible/entities/broadcast-screen';
import { BibleAddressTextContext, BibleTextMapBlocksContentContext } from '$bible/shared/contexts/texts';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';

export const BibleBroadcastSlide = ({
  config,
  texts,
  addressText,
}: Required<IndexSchWBroadcastLiveDataValue>['bible']) => {
  return (
    <div className="flex center full-size overflow-hidden m-auto">
      <BibleTextMapBlocksContentContext value={texts}>
        <BibleAddressTextContext value={addressText}>
          <BibleBroadcastScreenScreen
            win={window}
            isVisible
            bibleConfig={config}
          />
        </BibleAddressTextContext>
      </BibleTextMapBlocksContentContext>
    </div>
  );
};
