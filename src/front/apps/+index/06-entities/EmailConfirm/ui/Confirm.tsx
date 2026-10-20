import { translateBase } from '#basis/locale';
import { constantsConfigAtom } from '#basis/state/constantsAtom';
import { Button } from '#shared/components';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { constantsConfigurator } from 'shared/const/cm/constants.def';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { toast } from 'sonner';
import { twJoin } from 'tailwind-merge';

export const IndexEmailConfirm = ({
  onConfirm,
  onSend,
}: {
  onConfirm: (code: number) => void;
  onSend: (email: string) => Promise<{ email: string }>;
}) => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const otpLabel = translateBase(BaseLocaleKey.OneTimeCode);
  const { availEmailDomainZone } = useAtomValue(constantsConfigAtom);
  const availEmailDomainZoneError = constantsConfigurator.availEmailDomainZone.error?.(availEmailDomainZone, email);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <TextInput
          label={translateBase(BaseLocaleKey.EmailLabel)}
          type="email"
          className="w-full"
          autoComplete="bind-email"
          value={email}
          onInput={setEmail}
        />
        <Button
          icon="Sent"
          className={twJoin('mt-[1.7em]', availEmailDomainZoneError && 'opacity-50')}
          disabled={!email}
          onClick={async () => {
            const result = await onSend(email);
            toast(
              translateBase(BaseLocaleKey.EmailCodeSent, { e: result.email }),
              makeToastOKMoodConfig(),
            );
          }}
        />
      </div>
      {availEmailDomainZoneError && <div className="text-xKO">{availEmailDomainZoneError}</div>}

      <div className="flex gap-3">
        <TextInput
          label={otpLabel}
          type="tel"
          className="w-full"
          value={otp}
          onInput={setOTP}
        />
        <Button
          icon="Sent"
          className="mt-[1.7em]"
          disabled={!otp}
          onClick={() => onConfirm(+otp)}
        />
      </div>
    </div>
  );
};
