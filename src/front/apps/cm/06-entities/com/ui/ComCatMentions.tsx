import { useCmCatList } from '$cm/entities/cat';
import React from 'react';
import { CmCom } from '../lib/Com';

export const CmComCatMentions = ({ com }: { com: CmCom }) => {
  const cats = useCmCatList();

  return com.catMentions(cats).map((mention, mentioni) => (
    <React.Fragment key={mentioni}>
      {mentioni ? ', ' : ''}
      <span className="nowrap">{mention}</span>
    </React.Fragment>
  ));
};
