import { SendButtonContentMakerProps } from '../send-button-content-maker/maker.model';

export interface SendButtonProps<Value> extends SendButtonContentMakerProps<Value> {
  id?: string;
  title: string;
  className?: string;
}
