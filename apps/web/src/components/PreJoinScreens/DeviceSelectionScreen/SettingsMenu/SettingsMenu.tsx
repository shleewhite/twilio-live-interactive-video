import React, { useState } from 'react';
import { Box } from '@twilio-paste/core/box';
import { Menu, MenuButton, MenuItem, useMenuState } from '@twilio-paste/core/menu';
import { MoreIcon } from '@twilio-paste/icons/esm/MoreIcon';
import { ProductSettingsIcon } from '@twilio-paste/icons/esm/ProductSettingsIcon';

import AboutDialog from '../../../AboutDialog/AboutDialog';
import ConnectionOptionsDialog from '../../../ConnectionOptionsDialog/ConnectionOptionsDialog';
import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog';
import { useAppState } from '../../../../state';

export default function SettingsMenu() {
  const menuState = useMenuState();
  const { roomType } = useAppState();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
  const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false);

  return (
    <>
      <Box display={['block', 'block', 'none']}>
        <MenuButton {...menuState} variant="reset">
          <MoreIcon decorative /> More
        </MenuButton>
      </Box>
      <Box display={['none', 'none', 'block']}>
        <MenuButton {...menuState} variant="reset">
          <ProductSettingsIcon decorative /> Settings
        </MenuButton>
      </Box>
      <Menu {...menuState} aria-label="Settings menu">
        <MenuItem {...menuState} onClick={() => setAboutOpen(true)}>
          About
        </MenuItem>
        <MenuItem {...menuState} onClick={() => setDeviceSettingsOpen(true)}>
          Audio and Video Settings
        </MenuItem>
        {roomType !== 'peer-to-peer' && roomType !== 'go' && (
          <MenuItem {...menuState} onClick={() => setConnectionSettingsOpen(true)}>
            Connection Settings
          </MenuItem>
        )}
      </Menu>

      <AboutDialog
        open={aboutOpen}
        onClose={() => {
          setAboutOpen(false);
        }}
      />
      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
        }}
      />
      <ConnectionOptionsDialog
        open={connectionSettingsOpen}
        onClose={() => {
          setConnectionSettingsOpen(false);
        }}
      />
    </>
  );
}
