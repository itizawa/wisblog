'use client';

import { SnackbarProvider as SnackbarProviderOrigin, useSnackbar as useSnackbarOrigin } from 'notistack';
import type { ReactNode } from 'react';

export const useSnackbar = useSnackbarOrigin;

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  return <SnackbarProviderOrigin maxSnack={3}>{children}</SnackbarProviderOrigin>;
};
