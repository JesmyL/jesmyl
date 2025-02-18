import React from 'react';
import { LazyIconProps } from './LazyLoadedIcon';

const TheIconLazy = React.lazy(() => import('./LazyLoadedIcon'));

export const LazyIcon = (props: LazyIconProps) => <TheIconLazy {...props} />;
