import React, { useCallback } from 'react';

import { Menu, MenuButton, MenuItem, useMenuState } from '@twilio-paste/core/menu';
import { Button } from '@twilio-paste/core/button';
import { Box } from '@twilio-paste/core/box';

import { ChevronDownIcon } from '@twilio-paste/icons/esm/ChevronDownIcon';

import { useAppState } from '../../../state';
import UserAvatar from './UserAvatar/UserAvatar';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const UserMenu: React.FC = () => {
  const menu = useMenuState();

  const { user, signOut } = useAppState();
  const { localTracks } = useVideoContext();

  const handleSignOut = useCallback(() => {
    localTracks.forEach(track => track.stop());
    signOut?.();
  }, [localTracks, signOut]);

  if (process.env.REACT_APP_SET_AUTH === 'passcode') {
    return (
      <Box position="absolute" top={0} right={0} margin="space50" color="colorTextIconBrandInverse">
        <Button onClick={handleSignOut} variant="reset">
          Logout
        </Button>
      </Box>
    );
  }

  if (process.env.REACT_APP_SET_AUTH === 'firebase') {
    return (
      <Box position="absolute" top={0} right={0} margin="space50" color="colorTextIconBrandInverse">
        <UserAvatar user={user} />
        <MenuButton {...menu} variant="reset">
          {user!.displayName}
          <ChevronDownIcon decorative />
        </MenuButton>
        <Menu {...menu} aria-label="User Options">
          <MenuItem {...menu} onClick={handleSignOut}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return null;
};

export default UserMenu;
