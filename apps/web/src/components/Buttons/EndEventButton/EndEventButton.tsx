import React from 'react';
import { Button } from '@twilio-paste/core/button';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../../state';
import { deleteStream } from '../../../state/api/api';

export default function EndCallButton(props: { className?: string }) {
  const { room } = useVideoContext();
  const { appState, appDispatch } = useAppState();

  async function disconnect() {
    room!.disconnect();
    appDispatch({ type: 'reset-state' });
    await deleteStream(appState.eventName);
  }

  return (
    <Button variant="destructive" onClick={disconnect} data-cy-disconnect>
      End Event
    </Button>
  );
}
