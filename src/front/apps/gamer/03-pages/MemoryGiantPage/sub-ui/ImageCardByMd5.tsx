import { gamerIDB } from '$gamer/shared/state/gamerIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { HTMLAttributes } from 'react';
import { GamerMemoryGiantImageCard } from './ImageCard';

export const GamerMemoryGiantImageCardByMd5 = ({
  imageMd5,
  ...attrs
}: { imageMd5: string; size?: string } & HTMLAttributes<HTMLDivElement>) => {
  const image = useLiveQuery(() => gamerIDB.tb.memoryGiantImages.get(imageMd5), [imageMd5]);
  return (
    image && (
      <GamerMemoryGiantImageCard
        image={image}
        {...attrs}
      />
    )
  );
};
