import React from 'react';

import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Text } from '@twilio-paste/core/text';
import { Button } from '@twilio-paste/core/button';
import { Box } from '@twilio-paste/core/box';

import { ArrowBackIcon } from '@twilio-paste/icons/esm/ArrowBackIcon';
import { ArrowForwardIcon } from '@twilio-paste/icons/esm/ArrowForwardIcon';

import { appActionTypes, ActiveScreen, appStateTypes } from '../../../state/appState/appReducer';
import SpeakerIcon from '../../../icons/SpeakerIcon';
import ViewerIcon from '../../../icons/ViewerIcon';

import { CalloutButton } from '../CreateOrJoinScreen/CreateOrJoinScreen';

interface SpeakerOrViewerScreenProps {
  state: appStateTypes;
  dispatch: React.Dispatch<appActionTypes>;
}

export default function SpeakerOrViewerScreen({ state, dispatch }: SpeakerOrViewerScreenProps) {
  return (
    <>
      <Heading as="h1" variant="heading20">
        Speaker or Viewer?
      </Heading>
      <Paragraph>Do you plan on chatting up the room or are you more of the quiet, mysterious audience type?</Paragraph>

      <Box display="flex" flexDirection="column" justifyContent="space-around" rowGap="space60" marginBottom="space80">
        <CalloutButton onClick={() => dispatch({ type: 'set-participant-type', participantType: 'speaker' })}>
          <SpeakerIcon />
          <Box display="flex" flexGrow={1} flexDirection="column" textAlign="left">
            <Heading as="h3" variant="heading50" marginBottom="space0">
              Join as speaker
            </Heading>
            <Text
              as="span"
              color="colorTextWeak"
              textAlign={['center', 'left']}
              fontSize="fontSize20"
              lineHeight="lineHeight20"
            >
              Your audio/video will be shared by default.
            </Text>
          </Box>
          <Box>
            <ArrowForwardIcon decorative={true} size="sizeIcon80" color="colorTextIcon" />
          </Box>
        </CalloutButton>
        <CalloutButton onClick={() => dispatch({ type: 'set-participant-type', participantType: 'viewer' })}>
          <ViewerIcon />
          <Box display="flex" flexGrow={1} flexDirection="column" textAlign="left">
            <Heading as="h3" variant="heading50" marginBottom="space0">
              Join as viewer
            </Heading>
            <Text
              as="span"
              color="colorTextWeak"
              textAlign={['center', 'left']}
              fontSize="fontSize20"
              lineHeight="lineHeight20"
            >
              You’ll have to raise your hand to speak or share video.
            </Text>
            <Text
              as="span"
              color="colorTextWeak"
              textAlign={['center', 'left']}
              fontSize="fontSize20"
              lineHeight="lineHeight20"
            >
              Your audio/video will not be shared by default.
            </Text>
          </Box>
          <Box>
            <ArrowForwardIcon decorative={true} size="sizeIcon80" color="colorTextIcon" />
          </Box>
        </CalloutButton>
      </Box>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        justifyContent={['stretch', 'stretch', 'flex-start']}
      >
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: 'set-active-screen', activeScreen: ActiveScreen.ParticipantNameScreen })}
          size="small"
        >
          <ArrowBackIcon decorative={true} />
          Go back
        </Button>
      </Box>
    </>
  );
}
