import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import React from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

type Props = { children: React.ReactNode };
type State = { error: unknown };

export class RemoteBroadcastErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    if (this.state.error == null) return this.props.children;

    return (
      <div className="flex center column gap-3 p-4 text-center text-sm text-xKO">
        <div>{translateBase(BaseLocaleKey.Oops)}</div>
        <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap break-all text-left text-xs">
          {String(this.state.error)}
        </pre>
        <Button onClick={() => this.setState({ error: null })}>{translateBase(BaseLocaleKey.Update)}</Button>
      </div>
    );
  }
}
