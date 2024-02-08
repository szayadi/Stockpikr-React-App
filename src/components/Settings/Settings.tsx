import * as React from 'react';
import { Account } from './Drawer/Account';
import { Appearance } from './Drawer/Appearance';
import { Help } from './Drawer/Help';
import { Notifications } from './Drawer/Notifications';
import { Security } from './Drawer/Security';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../../index';

const drawerWidth = 240;
const drawingContents = ['Account', 'Notifications', 'Security', 'Appearance', 'Help'];
const defaultSettingView = 'Account';

const componentMapping: Record<string, React.ComponentType<any>> = {
  Account: Account,
  Notifications: Notifications,
  Security: Security,
  Appearance: Appearance,
  Help: Help
};

export default function Settings() {
  const [selectedComponent, setSelectedComponent] = React.useState(defaultSettingView);

  const handleItemClick = (setting: string) => {
    setSelectedComponent(setting);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawingContents.map((setting) => (
          <ListItem key={setting} disablePadding>
            <ListItemButton onClick={() => handleItemClick(setting)}>
              <ListItemText primary={setting} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: '11%' }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Typography component={'span'}>
          {selectedComponent && React.createElement(componentMapping[selectedComponent])}
        </Typography>
      </Box>
    </Box>
  );
}
