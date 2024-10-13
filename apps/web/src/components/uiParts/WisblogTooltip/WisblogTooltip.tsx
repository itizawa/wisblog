import { Tooltip } from '@mui/material';
import type { FC, ReactElement } from 'react';

type Props = {
  title: string;
  children: ReactElement;
};

export const WisblogTooltip: FC<Props> = ({ title, children }) => {
  return (
    <Tooltip title={title} placement='top' arrow>
      {children}
    </Tooltip>
  );
};
