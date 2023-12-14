import { useOnSendPromiseCallback } from "../useOnSendPromiseCallback";
import { SendButtonContentMakerProps } from "./maker.model";

interface PropsWithClick {
    onClick: () => void,
}

export const SendButtonContentMakerBody = <Value,>(props: SendButtonContentMakerProps<Value> & PropsWithClick) => {
    const [onClick, error, isLoading]
        = useOnSendPromiseCallback(props.onClick, props.onSuccess, props.onFailure);

    return <>
        {props.anchorNodes}
        {props.content?.(onClick, error, isLoading)}
    </>;
}
