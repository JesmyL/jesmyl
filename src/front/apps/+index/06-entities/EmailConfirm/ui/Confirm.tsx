import { Button } from '#shared/components';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useState } from 'react';
import { toast } from 'sonner';

export const IndexEmailConfirm = ({ onConfirm }: { onConfirm: (code: number) => void }) => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const otpLabel = 'Одноразовый код';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <TextInput
          label="E-mail"
          type="email"
          className="w-full"
          autoComplete="bind-email"
          value={email}
          onInput={setEmail}
        />
        <Button
          icon="Sent"
          className="mt-[1.7em]"
          disabled={!email}
          onClick={async () => {
            const result = await indexTsjrpcClientMethods.sendEmailOTP({ email });
            toast(`${otpLabel} отправлен на почту ${result.email}`, makeToastOKMoodConfig());
          }}
        />
      </div>

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
