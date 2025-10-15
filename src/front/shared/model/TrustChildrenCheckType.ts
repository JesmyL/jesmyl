export type TrustChildrenCheckType<Value, TrustValue extends Value = never> = {
  checkIsOpen?: ((value: Value) => value is TrustValue) | ((value: Value) => boolean);
  children: ((value: TrustValue) => React.ReactNode) | React.ReactNode;
};

// can`t include as default check without checkIsOpen()
// Exclude<Value, nil | '' | false>
