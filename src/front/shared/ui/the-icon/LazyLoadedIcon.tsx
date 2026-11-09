import { indexIDB, indexIsPlayAnimationsAtom } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { HTMLAttributes, useEffect, useState } from 'react';
import { itInvokeIt } from 'shared/utils';
import { StameskaIconName } from 'stameska-icon/pack';
import {
  makeStameskaIconSvgAttributeProps,
  makeStameskaIconSvgHTMLProp,
  StameskaIconKind,
  StameskaIconPack,
} from 'stameska-icon/utils';

export type LazyIconProps = HTMLAttributes<HTMLOrSVGElement> & {
  icon: KnownStameskaIconName;
  fallbackIcon?: StameskaIconName;
  kind?: StameskaIconKind;
  withoutAnimation?: boolean;
  pack?: StameskaIconPack;
};

export default function TheIconLazy({
  icon,
  fallbackIcon,
  kind = 'StrokeRounded',
  withoutAnimation,
  className,
  children,
  pack,
  ...props
}: LazyIconProps) {
  withoutAnimation = withoutAnimation ?? !indexIsPlayAnimationsAtom.get();

  if (pack !== undefined) {
    return (
      // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
      <svg
        {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
        {...props}
        dangerouslySetInnerHTML={makeStameskaIconSvgHTMLProp(pack!, kind)}
        children={undefined}
      />
    );
  }

  if (cachedStaticProps[`${icon}/${kind}`] === undefined) {
    if (cachedPacks[icon] !== undefined) {
      return (
        // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
        <svg
          {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
          {...props}
          dangerouslySetInnerHTML={
            (cachedStaticProps[`${icon}/${kind}`] = makeStameskaIconSvgHTMLProp(cachedPacks[icon], kind))
          }
          children={undefined}
        />
      );
    }

    return (
      <WithoutStaticProps
        icon={icon}
        kind={kind}
        withoutAnimation
        className={className}
        children={children}
        fallbackIcon={fallbackIcon}
        {...props}
      />
    );
  }

  return (
    // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
    <svg
      {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
      {...props}
      dangerouslySetInnerHTML={cachedStaticProps[`${icon}/${kind}`]}
      children={undefined}
    />
  );
}

const cachedStaticProps: PRecord<
  `${StameskaIconName}/${StameskaIconKind}`,
  ReturnType<typeof makeStameskaIconSvgHTMLProp>
> = {};

const cachedPacks: PRecord<StameskaIconName, StameskaIconPack> = {};

const packsUpdateListenersSet = new Set<() => void>();
let createTimeout: TimeOut;

indexIDB.tb.iconPacks.hook('creating', () => {
  clearTimeout(createTimeout);
  createTimeout = setTimeout(() => {
    packsUpdateListenersSet.forEach(itInvokeIt);
  }, 1000);
});

const packFetches: PRecord<StameskaIconName, Promise<{ pack: StameskaIconPack }>> = {};

const WithoutStaticProps = ({
  icon,
  fallbackIcon,
  className,
  kind = 'StrokeRounded',
  withoutAnimation,
  ...props
}: LazyIconProps) => {
  const [staticIconProps, setStaticIconProps] = useState<ReturnType<typeof makeStameskaIconSvgHTMLProp>>();

  useEffect(() => {
    let fetchTimeout: TimeOut;
    let isUnmounted = false;

    const takePack = async (iconName: StameskaIconName) =>
      cachedPacks[iconName] ?? (await indexIDB.tb.iconPacks.get(iconName))?.pack;

    const applyPack = (iconName: StameskaIconName, pack: StameskaIconPack | nil) => {
      if (!pack) return false;

      cachedPacks[iconName] ??= pack;
      const staticProps = (cachedStaticProps[`${iconName}/${kind}`] ??= makeStameskaIconSvgHTMLProp(pack, kind));

      if (!isUnmounted) setStaticIconProps(staticProps);
      return true;
    };

    const applyFallback = async () => {
      if (fallbackIcon === undefined) return false;

      return applyPack(fallbackIcon, await takePack(fallbackIcon));
    };

    const updateFromCachedPacks = async () => {
      if (applyPack(icon, await takePack(icon))) return;

      await applyFallback();
    };

    (async () => {
      if (applyPack(icon, await takePack(icon))) return;

      await applyFallback();

      fetchTimeout = setTimeout(async () => {
        if (applyPack(icon, (await (packFetches[icon] ??= indexTsjrpcClientMethods.getIconPack({ icon }))).pack))
          return;

        if (fallbackIcon !== undefined)
          applyPack(
            fallbackIcon,
            (await (packFetches[fallbackIcon] ??= indexTsjrpcClientMethods.getIconPack({ icon: fallbackIcon }))).pack,
          );
      }, 300);

      packsUpdateListenersSet.add(updateFromCachedPacks);
    })();

    return () => {
      isUnmounted = true;
      clearTimeout(fetchTimeout);
      packsUpdateListenersSet.delete(updateFromCachedPacks);
    };
  }, [icon, fallbackIcon, kind]);

  return (
    // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml-with-children
    <svg
      {...makeStameskaIconSvgAttributeProps({ icon, className, kind, withoutAnimation })}
      {...props}
      dangerouslySetInnerHTML={staticIconProps}
      children={undefined}
    />
  );
};
