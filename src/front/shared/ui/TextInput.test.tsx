import { act, fireEvent, render } from '@testing-library/react';
import { atom, configureAtomaric } from 'atomaric';
import { useSyncExternalStore } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

configureAtomaric({ useSyncExternalStore, keyPathSeparator: '/' });

const { navigateMock, routerMock } = vi.hoisted(() => {
  const navigateMock = vi.fn();

  return { navigateMock, routerMock: { navigate: navigateMock } };
});

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => routerMock,
  useNavigate: () => navigateMock,
}));

vi.mock('./the-icon/LazyIcon', () => ({ LazyIcon: () => null }));

import { LinkAppActionFabric } from '#shared/lib/link-app-actions';
import { DebouncedSearchInput } from './DebouncedSearchInput';
import { TextInput } from './TextInput';

const cmActions = new LinkAppActionFabric<{ comw: number }>('cm');
const actionProbe = vi.fn();

const ActionProbe = () => {
  cmActions.useOnAction(({ props }) => {
    actionProbe(props);
    return true;
  });

  return null;
};

const pasteText = (element: HTMLElement, text: string) =>
  act(async () => {
    fireEvent.paste(element, { clipboardData: { getData: () => text } });
  });

describe('link paste navigation', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { host: 'localhost:3627', href: 'http://localhost:3627/', assign: vi.fn() },
    });

    navigateMock.mockReset();
    actionProbe.mockReset();
  });

  it('navigates to a pasted same-host url and clears the input', async () => {
    const onInput = vi.fn();
    const { container } = render(
      <>
        <TextInput
          defaultValue="initial"
          onInput={onInput}
        />
        <ActionProbe />
      </>,
    );
    const input = container.querySelector('input') ?? container.querySelector('textarea')!;

    await pasteText(input, 'http://localhost:3627/cm/i?comw=5 extra words');

    expect(navigateMock).toHaveBeenCalledWith({ to: '/cm/i?comw=5' });
    expect(input).toHaveProperty('value', '');
    expect(onInput).toHaveBeenCalledWith('');
    expect(actionProbe).not.toHaveBeenCalled();
  });

  it('runs the appAction executor for a pasted app action link', async () => {
    const { container } = render(
      <>
        <TextInput defaultValue="initial" />
        <ActionProbe />
      </>,
    );
    const input = container.querySelector('input') ?? container.querySelector('textarea')!;

    await pasteText(input, 'http://localhost:3627/?appAction=cm&comw=1615038152200 extra words');

    expect(actionProbe).toHaveBeenCalledWith({ comw: 1615038152200 });
    expect(navigateMock).toHaveBeenCalledWith({ to: '/cm/i' });
    expect(input).toHaveProperty('value', '');
  });

  it('ignores a foreign-host url', async () => {
    const { container } = render(
      <>
        <TextInput defaultValue="initial" />
        <ActionProbe />
      </>,
    );
    const input = container.querySelector('input')!;

    await pasteText(input, 'http://another-host:3627/?appAction=cm&comw=5');

    expect(navigateMock).not.toHaveBeenCalled();
    expect(actionProbe).not.toHaveBeenCalled();
    expect(input).toHaveProperty('value', 'initial');
  });

  it('ignores a plain text paste', async () => {
    const { container } = render(<TextInput defaultValue="initial" />);
    const input = container.querySelector('input')!;

    await pasteText(input, 'just a search term');

    expect(navigateMock).not.toHaveBeenCalled();
    expect(input).toHaveProperty('value', 'initial');
  });

  it('lets a passed onPaste handler prevent the navigation', async () => {
    const { container } = render(
      <TextInput onPaste={event => event.preventDefault()} />,
    );
    const input = container.querySelector('input')!;

    await pasteText(input, 'http://localhost:3627/cm/i?comw=5');

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('navigates through the strongDefaultValue render path', async () => {
    const { container } = render(
      <TextInput
        strongDefaultValue
        defaultValue="initial"
      />,
    );
    const input = container.querySelector('input')!;

    await pasteText(input, 'http://localhost:3627/cm/i?comw=5');

    expect(navigateMock).toHaveBeenCalledWith({ to: '/cm/i?comw=5' });
    expect(input).toHaveProperty('value', '');
  });

  it('navigates from the cm search input', async () => {
    const termAtom = atom('');
    const { container } = render(
      <>
        <DebouncedSearchInput
          termAtom={termAtom}
          debouncedTermAtom={termAtom}
        />
        <ActionProbe />
      </>,
    );
    const input = container.querySelector('input')!;

    await pasteText(input, 'http://localhost:3627/?appAction=cm&comw=1615038152200 extra words');

    expect(actionProbe).toHaveBeenCalledWith({ comw: 1615038152200 });
    expect(termAtom.get()).toBe('');
  });
});
