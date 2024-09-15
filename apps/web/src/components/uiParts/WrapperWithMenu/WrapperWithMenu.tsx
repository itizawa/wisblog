'use client';

import { ListItemButton, Menu, type SxProps } from '@mui/material';
import { type FC, type ReactNode, useCallback, useState } from 'react';

type MenuItem = {
  key: string;
  onClick: () => void;
  icon?: ReactNode;
  text: ReactNode;
  sx?: SxProps;
};

type Props = {
  children: ({
    triggerMenu,
    open,
  }: {
    triggerMenu: (e: React.MouseEvent<HTMLElement>) => void;
    open: boolean;
  }) => ReactNode;
  menuItems: MenuItem[];
};

export const WrapperWithMenu: FC<Props> = ({ children, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const triggerMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      {children({ triggerMenu, open })}
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        {menuItems.map(v => {
          return (
            <ListItemButton
              key={v.key}
              onClick={() => {
                v.onClick();
                handleClose();
              }}
              sx={v.sx}
            >
              {v.icon}
              {v.text}
            </ListItemButton>
          );
        })}
      </Menu>
    </>
  );
};
