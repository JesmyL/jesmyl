import { ExecutionDict, ExecutionMethod } from "../../../back/complect/executer/Executer.model";
import { CorrectsBox } from "../../components/apps/cm/editor/corrects-box/CorrectsBox";
import { Exec } from "./Exec";

export interface ExecRuleClient {
    action?: string;
    title?: string;
    level?: number;
    args?: Record<string, string | string[]>;
    cloneArgs?: Record<string, string>;
}

export interface ExecRule extends ExecRuleClient {
    track?: (string | string[])[];
    next?: ExecRule[];
    method?: ExecutionMethod;
}

export interface ExerStorage {
    actions: ExecRule[];
}


export const FreeExecDictAntiCallbackStrategy = {
    RemoveNew: [],
    RememberNew: [],
} as const;

export type FreeExecDictAntiCallback<Value> = (exec: Exec<Value>) => (<Key extends keyof typeof FreeExecDictAntiCallbackStrategy>(strategy: typeof FreeExecDictAntiCallbackStrategy) => typeof FreeExecDictAntiCallbackStrategy[Key] | nil) | void | nil;

export interface FreeExecDict<Value> {
    action: string,
    scope?: string,
    prev?: Value,
    value?: Value,
    method: ExecutionMethod,
    args?: Record<string, any>,
    generalId?: string | number,
    createByPath?: boolean,
    del?: boolean,
    muted?: boolean,
    errors?: string[],
    uniq?: FreeExecDictUniq,
    corrects?: CorrectsBox,
    // верни функцию, если нашлось противное `exec` (в таком случае будет удалён противный `exec`)
    anti?: FreeExecDictAntiCallback<Value> | FreeExecDictAntiCallback<Value>[],
    // верни функцию, если нашлось дружественное `exec`
    // (в таком случае, при удалении текущего, будет удалён и дружественный `exec`),
    // которая должна вернуть "удалить ли основное `exec`?"
    friendly?: FreeExecDictAntiCallback<Value> | FreeExecDictAntiCallback<Value>[],

    onSet?: (exec: Exec<Value>) => void,
    onLoad?: (exec: Exec<Value>) => void,
    data?: Record<string, any>,
}

export type FreeExecDictUniq = number | string | (string | number)[];

export interface SetAntiValue<Value> {
    args?: any;
    value?: Value;
}

export interface ClientExecutionDict<Value = any> extends FreeExecDict<Value>, ExecutionDict<Value> {
    method: ExecutionMethod;
    corrects?: CorrectsBox;
}

export type ExecArgs<Value> = ExecArgsDefault<Value>;

export interface ExecArgsDefault<Value> {
    def?: Value | null;
    prev?: Value;
}