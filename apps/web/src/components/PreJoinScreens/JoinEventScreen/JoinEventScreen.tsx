import React, { ChangeEvent, FormEvent } from 'react';

import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { Button } from '@twilio-paste/core/button';
import { Box } from '@twilio-paste/core/box';

import { appActionTypes, ActiveScreen, appStateTypes } from '../../../state/appState/appReducer';

interface JoinEventScreenProps {
  state: appStateTypes;
  dispatch: React.Dispatch<appActionTypes>;
  connect: () => void;
}

export default function JoinEventScreen({ state, dispatch, connect }: JoinEventScreenProps) {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-event-name', eventName: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.participantType === 'speaker') {
      dispatch({ type: 'set-active-screen', activeScreen: ActiveScreen.DeviceSelectionScreen });
    } else {
      connect();
    }
  };

  return (
    <>
      <Heading as="h1" variant="heading20">
        Join event
      </Heading>
      <Paragraph>Enter the event name to join.</Paragraph>
      <Box as="form" onSubmit={handleSubmit}>
        <Box width="100%" marginBottom="space150">
          <Label htmlFor="input-event-name">Event Name</Label>
          <Input type="text" id="input-event-name" value={state.eventName} onChange={handleNameChange} />
        </Box>
        <Box
          display="flex"
          flexDirection={['column', 'column', 'row']}
          justifyContent={['stretch', 'stretch', 'flex-end']}
        >
          <Button variant="primary" type="submit" disabled={!state.eventName}>
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
}
