import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { makeToastKOMoodConfig, makeToastOKMoodConfig, usePrompt } from '#shared/ui/modal';
import { indexDashTsjrpcClient } from '$index/shared/tsjrpc';
import { useState } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { toast } from 'sonner';

export const IndexVisitsDashboardDownFilesRemoveButton = () => {
  const prompt = usePrompt();
  const [isDeleting, setIsDeleting] = useState(false);

  const removeAllFiles = async () => {
    setIsDeleting(true);

    try {
      const code = 100 + Math.floor(Math.random() * 900);
      const answer = await prompt(translateBase(BaseLocaleKey.DownFilesRemoveConfirm, { c: code }));

      if (answer === null) return;

      if (answer !== String(code)) {
        toast(translateBase(BaseLocaleKey.IncorrectCode), makeToastKOMoodConfig());
        return;
      }

      await indexDashTsjrpcClient.removeAllDownFiles();
      toast(translateBase(BaseLocaleKey.DownFilesRemoved), makeToastOKMoodConfig());
    } catch (error) {
      toast('' + error, makeToastKOMoodConfig());
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isDeleting}
      onClick={removeAllFiles}
    >
      {translateBase(BaseLocaleKey.DownFilesRemoveAllButton)}
    </Button>
  );
};
