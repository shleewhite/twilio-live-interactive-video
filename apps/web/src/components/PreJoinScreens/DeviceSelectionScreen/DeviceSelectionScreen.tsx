import React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Heading } from '@twilio-paste/core/heading';

import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import { appActionTypes, ActiveScreen, appStateTypes } from '../../../state/appState/appReducer';
import SettingsMenu from './SettingsMenu/SettingsMenu';

import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

interface DeviceSelectionScreenProps {
  state: appStateTypes;
  dispatch: React.Dispatch<appActionTypes>;
  connect: () => void;
}

export default function DeviceSelectionScreen({ state, dispatch, connect }: DeviceSelectionScreenProps) {
  const { isAcquiringLocalTracks } = useVideoContext();

  function handleGoBack() {
    if (state.hasSpeakerInvite) {
      dispatch({ type: 'set-has-speaker-invite', hasSpeakerInvite: false });
    } else {
      dispatch({
        type: 'set-active-screen',
        activeScreen:
          state.participantType === 'host' ? ActiveScreen.CreateNewEventScreen : ActiveScreen.JoinEventNameScreen,
      });
    }
  }

  return (
    <>
      <Heading as="h2" variant="heading20">
        Join {state.eventName}
      </Heading>

      <Box display="flex" flexDirection="column" rowGap="space50">
        <Grid gutter="space50">
          <Column span={[12, 12, 7]}>
            <LocalVideoPreview identity={state.participantName} />
          </Column>
          <Column span={[12, 12, 5]}>
            <Box display={['none', 'none', 'flex']} flexDirection="column" justifyContent="space-evenly" height="100%">
              <ToggleAudioButton disabled={isAcquiringLocalTracks} />
              <ToggleVideoButton disabled={isAcquiringLocalTracks} />
            </Box>
          </Column>
        </Grid>
        <Grid gutter="space50">
          <Column span={[12, 12, 7]}>
            <Box
              alignItems="center"
              display={['flex', 'flex', 'none']}
              justifyContent="space-between"
              height="100%"
              paddingBottom={['space50', 'space50', 'space0']}
            >
              <ToggleAudioButton disabled={isAcquiringLocalTracks} variant="reset" />
              <ToggleVideoButton disabled={isAcquiringLocalTracks} variant="reset" />
              <SettingsMenu />
            </Box>
            <Box alignItems="center" height="100%" display={['none', 'none', 'flex']}>
              <SettingsMenu />
            </Box>
          </Column>
          <Column span={[12, 12, 5]}>
            <Box
              display="flex"
              flexDirection={['column-reverse', 'column-reverse', 'row']}
              justifyContent={['stretch', 'stretch', 'space-between']}
              rowGap="space40"
            >
              <Button variant="secondary" onClick={handleGoBack}>
                Go Back
              </Button>
              <Button variant="primary" data-cy-join-now onClick={connect} disabled={isAcquiringLocalTracks}>
                {state.participantType === 'host' ? 'Create Event' : 'Join Event'}
              </Button>
            </Box>
          </Column>
        </Grid>
      </Box>
    </>
  );
}
