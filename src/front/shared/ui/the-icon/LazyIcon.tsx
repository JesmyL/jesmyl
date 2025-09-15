import React, { memo } from 'react';
import { LazyIconProps } from './LazyLoadedIcon';

const TheIconLazy = React.lazy(() => import('./LazyLoadedIcon'));

export const LazyIcon = memo((props: LazyIconProps) => <TheIconLazy {...props} />);
