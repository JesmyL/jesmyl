import { useState } from 'react';

export const useFloatPopupCoords = <Additions>(initState: ({ x: number; y: number } & Additions) | null = null) =>
  useState(initState);
