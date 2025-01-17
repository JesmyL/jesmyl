import useToast from '../modal/useToast';
import EvaSendButton from '../sends/eva-send-button/EvaSendButton';
import { EvaSendButtonProps } from '../sends/eva-send-button/EvaSendButton.model';

export default function StrongEvaButton(props: EvaSendButtonProps<unknown>) {
  const [modalNode, toast] = useToast();

  return (
    <>
      {modalNode}
      <EvaSendButton
        {...props}
        onFailure={errorMessage => toast(errorMessage, { mood: 'ko' })}
      />
    </>
  );
}
