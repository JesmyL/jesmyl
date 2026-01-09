import { useCmCatList } from '$cm/entities/cat';
import { CmCom } from '$cm/ext';
import React from 'react';

export const CmComCatMentions = ({ com }: { com: CmCom }) => {
  const cats = useCmCatList();

  return com.catMentions(cats).map((mention, mentioni) => (
    <React.Fragment key={mentioni}>
      {mentioni ? ', ' : ''}
      <span className="nowrap">{mention}</span>
    </React.Fragment>
  ));
};
