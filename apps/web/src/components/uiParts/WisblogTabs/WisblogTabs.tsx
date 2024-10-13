'use client';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Typography } from '@mui/material';
import { type FC, type ReactNode, useState } from 'react';

type TabType = {
  value: string;
  label: string;
  children: ReactNode;
};

type Props = {
  defaultValue: string;
  tabs: TabType[];
};

export const WisblogTabs: FC<Props> = ({ defaultValue, tabs }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabContext value={value}>
      <TabList onChange={(_e, value) => setValue(value)} textColor='secondary' indicatorColor='secondary'>
        {tabs.map(tab => (
          <Tab
            key={tab.label}
            label={<Typography variant='body2'>{tab.label}</Typography>}
            wrapped
            value={tab.value}
            sx={{
              '&.Mui-selected': {
                '.MuiTypography-root': { fontWeight: 700 },
              },
            }}
          />
        ))}
      </TabList>
      {tabs.map(tab => (
        <TabPanel
          key={tab.label}
          value={tab.value}
          sx={{
            p: 0,
          }}
        >
          {tab.children}
        </TabPanel>
      ))}
    </TabContext>
  );
};
