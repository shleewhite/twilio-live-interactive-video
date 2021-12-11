import React from 'react';
import { Menu, MenuButton, MenuItem, useMenuState } from '@twilio-paste/core/menu';
import { ChevronDownIcon } from '@twilio-paste/icons/esm/ChevronDownIcon';
import { joinStreamAsViewer } from '../../../state/api/api';
import { useAppState } from '../../../state';
import usePlayerContext from '../../../hooks/usePlayerContext/usePlayerContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useSyncContext from '../../../hooks/useSyncContext/useSyncContext';

export default function LeaveEventButton(props: { buttonClassName?: string }) {
  const menuState = useMenuState({ placement: 'top-start' });
  const { room } = useVideoContext();
  const { appState, appDispatch } = useAppState();
  const { connect: playerConnect } = usePlayerContext();
  const { registerUserDocument } = useSyncContext();

  async function switchToViewer() {
    const { data } = await joinStreamAsViewer(appState.participantName, appState.eventName);
    await playerConnect(data.token);
    registerUserDocument(data.sync_object_names.user_document);
    room!.disconnect();
  }

  function disconnect() {
    room!.disconnect();
    appDispatch({ type: 'reset-state' });
  }

  return (
    <>
      <MenuButton {...menuState} variant="destructive">
        Leave Event
        <ChevronDownIcon decorative />
      </MenuButton>
      <Menu {...menuState} aria-label="leave event">
        <MenuItem {...menuState} onClick={switchToViewer}>
          Leave and View Event
        </MenuItem>

        <MenuItem {...menuState} onClick={disconnect}>
          Leave Event
        </MenuItem>
      </Menu>
    </>
  );
}
